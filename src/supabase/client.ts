import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

export function createClient() {
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      auth: {
        persistSession: true, // Ensures the session is stored in cookies
        autoRefreshToken: true, // Automatically refresh tokens
      },
    }
  );
}
