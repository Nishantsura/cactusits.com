import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
// This approach ensures we don't create multiple connections
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if we have the required environment variables
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Missing Supabase environment variables. Please check your .env.local file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
