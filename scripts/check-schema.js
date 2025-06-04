// Script to check the Supabase database schema
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase credentials. Make sure .env.local file exists with proper keys.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  try {
    // Fetch the testimonials table structure
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error fetching testimonials:", error);
      return;
    }

    if (data && data.length > 0) {
      console.log("Testimonial table structure:");
      console.log(Object.keys(data[0]));
      console.log("\nSample testimonial:");
      console.log(data[0]);
    } else {
      // If no data, create a dummy query to get column info
      console.log("No testimonials found. Trying to get column info...");

      // List all tables
      const { data: tableData, error: tableError } =
        await supabase.rpc("list_tables");

      if (tableError) {
        console.error("Error listing tables:", tableError);
      } else {
        console.log("Tables in database:");
        console.log(tableData);
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

checkSchema();
