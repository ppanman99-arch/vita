import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, type User, type Session } from './supabase';

interface SupabaseContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Supabase session error:', error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.warn('Supabase getSession failed:', error);
      setLoading(false);
    });

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.warn('Error unsubscribing from auth:', error);
        }
      };
    } catch (error) {
      console.warn('Error setting up auth listener:', error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Error signing out:', error);
    }
    setSession(null);
    setUser(null);
  };

  return (
    <SupabaseContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

