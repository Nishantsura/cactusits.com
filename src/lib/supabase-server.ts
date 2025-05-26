import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';

// This approach ensures we don't create multiple connections on the server
// And adds caching for better performance
export const createServerSupabaseClient = cache(() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient(supabaseUrl, supabaseKey);
});
