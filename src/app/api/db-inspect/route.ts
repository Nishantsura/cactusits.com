import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // First, let's try to get the actual column names from the database
    const { data, error } = await supabase
      .from("testimonials")
      .select()
      .limit(1);

    // If we can't get the data, let's check what tables exist
    if (error) {
      return NextResponse.json({
        error: error.message,
        errorDetails: error,
        suggestion:
          "Could not fetch testimonials data. The table might not exist.",
      });
    }

    // If data exists, return the schema information
    if (data && data.length > 0) {
      const firstRecord = data[0];
      return NextResponse.json({
        success: true,
        columnNames: Object.keys(firstRecord),
        sampleData: firstRecord,
      });
    } else {
      // If no data exists, let's try to fetch the column definitions
      return NextResponse.json({
        message: "No data found in testimonials table.",
        suggestion:
          "Try accessing the Supabase dashboard to check the table structure.",
      });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
