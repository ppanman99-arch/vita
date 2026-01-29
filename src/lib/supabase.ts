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
  // Only show warning in development mode to avoid console noise in production
  if (import.meta.env.DEV) {
    console.log(
      'ℹ️ Supabase environment variables are not set. App will run without Supabase features. To enable Supabase, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
  }
  
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
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export { supabase };

// Export types for TypeScript support
export type { User, Session, AuthError } from '@supabase/supabase-js';

