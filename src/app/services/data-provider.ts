import { createServerSupabaseClient } from "@/lib/supabase-server";

// This file contains server-side data fetching functions for the services main page

/**
 * Fetch all active services for the main services page
 */
export async function getAllServices() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data || [];
}
