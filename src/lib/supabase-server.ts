import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

// This approach ensures we don't create multiple connections on the server
// And adds caching for better performance
export const createServerSupabaseClient = cache(() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // Check if environment variables are properly set
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Missing Supabase environment variables. Check both local and deployment environment settings.",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
});
