#!/usr/bin/env node
/**
 * Migration: Import users from cổng nguyenmanhthuan into VITA unified DB.
 *
 * Prerequisites:
 * - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in env (or .env file when using dotenv).
 * - JSON file with array of { email, password? }. If password omitted, user must reset via "Quên mật khẩu".
 *
 * Usage:
 *   node .scripts/migrate-nguyenmanhthuan-users.mjs <path-to-users.json>
 *
 * Example users.json:
 *   [{"email":"user1@example.com","password":"tempPassword1"},{"email":"user2@example.com"}]
 *
 * Do NOT commit users.json with real passwords. Run locally or in CI with secrets.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).');
  process.exit(1);
}

const inputPath = process.argv[2] || resolve(__dirname, 'nguyenmanhthuan-users-import.json');
let users;
try {
  const raw = readFileSync(inputPath, 'utf8');
  users = JSON.parse(raw);
} catch (e) {
  console.error('Failed to read or parse input file:', inputPath, e.message);
  process.exit(1);
}

if (!Array.isArray(users)) {
  console.error('Input JSON must be an array of { email, password? }.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PLATFORM = 'nguyenmanhthuan';

async function main() {
  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of users) {
    const email = typeof row.email === 'string' ? row.email.trim() : null;
    if (!email) {
      console.warn('Skipping row with missing email:', row);
      skipped++;
      continue;
    }
    const password = typeof row.password === 'string' ? row.password : undefined;

    try {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password: password || undefined,
        email_confirm: true,
      });

      if (authError) {
        if (authError.message?.includes('already been registered') || authError.message?.includes('already exists')) {
          console.warn('User already exists (auth):', email);
          skipped++;
          continue;
        }
        console.error('Auth create failed for', email, authError.message);
        failed++;
        continue;
      }

      if (!authData?.user?.id) {
        console.error('No user id returned for', email);
        failed++;
        continue;
      }

      const { error: insertError } = await supabase.from('users').insert({
        email,
        platform_source: PLATFORM,
        external_id: authData.user.id,
      });

      if (insertError) {
        if (insertError.code === '23505') {
          console.warn('User already in public.users:', email);
          skipped++;
        } else {
          console.error('Insert public.users failed for', email, insertError.message);
          failed++;
        }
        continue;
      }

      created++;
      console.log('Created:', email);
    } catch (err) {
      console.error('Error for', email, err.message);
      failed++;
    }
  }

  console.log('\nDone. Created:', created, 'Skipped:', skipped, 'Failed:', failed);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
