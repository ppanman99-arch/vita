import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== '' && 
  supabaseAnonKey !== '' &&
  supabaseUrl.startsWith('http');

// Create and export Supabase client
// Only create real client if properly configured, otherwise create a mock
let supabase: SupabaseClient;

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase environment variables are not set. App will run without Supabase features. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabase.ts:17',message:'Supabase not configured - creating mock client',data:{isSupabaseConfigured:false,supabaseUrl:supabaseUrl||'empty',hasAnonKey:!!supabaseAnonKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // Create a mock client that implements the minimum required interface
  // This prevents errors while allowing the app to run
  const mockSubscription = {
    unsubscribe: () => {},
  };
  
  const mockChannel = {
    on: () => mockChannel,
    subscribe: () => ({ unsubscribe: () => {} }),
  };
  
  supabase = {
    auth: {
      getSession: async () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ 
        data: { subscription: mockSubscription } 
      }),
      signOut: async () => Promise.resolve({ error: null }),
      getUser: async () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: async () => Promise.resolve({ data: { session: null, user: null }, error: null }),
      signUp: async () => Promise.resolve({ data: { session: null, user: null }, error: null }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
    channel: () => mockChannel,
    removeChannel: () => {},
  } as any;
} else {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabase.ts:47',message:'Supabase configured - creating real client',data:{isSupabaseConfigured:true,supabaseUrl:supabaseUrl.substring(0,30)+'...',hasAnonKey:!!supabaseAnonKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabase.ts:56',message:'Supabase client created',data:{hasChannel:typeof supabase.channel==='function',hasRemoveChannel:typeof supabase.removeChannel==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
}

export { supabase };

// Export types for TypeScript support
export type { User, Session, AuthError } from '@supabase/supabase-js';

