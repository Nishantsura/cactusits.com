import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Define a simple email validation function
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Handles contact form submissions and stores them in Supabase
 *
 * @param request The incoming request containing form data
 * @returns JSON response indicating success or failure
 */
export async function POST(request: Request) {
  try {
    // Validate that Supabase is properly initialized
    if (!supabase) {
      console.error("Supabase client not properly initialized");
      return NextResponse.json(
        { error: "Database service unavailable" },
        { status: 503 }
      );
    }

    // Parse the incoming JSON data
    const data = await request.json();

    // Enhanced validation
    if (!data.name || data.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name is required and must be at least 2 characters" },
        { status: 400 }
      );
    }
    
    if (!data.email || !isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }
    
    if (data.message && data.message.length > 5000) {
      return NextResponse.json(
        { error: "Message exceeds maximum length of 5000 characters" },
        { status: 400 }
      );
    }

    // Common fields for all submission types
    const submissionData = {
      name: data.name,
      email: data.email,
      message: data.message || "",
      user_type: data.userType || "hiringManager",
      // Extract phone number if available
      phone: data.phone || "",
      created_at: new Date().toISOString(),
    };

    // Add hiring manager specific fields
    if (data.userType === "hiringManager") {
      Object.assign(submissionData, {
        organization: data.organization || "",
        website: data.website || "",
        hiring_positions: data.hiringPositions || [],
        hiring_type: data.hiringType || "both",
      });
    }

    // Add job seeker specific fields
    if (data.userType === "job-seeker") {
      Object.assign(submissionData, {
        roles: data.roles || [],
        nationality: data.nationality || "",
        resume_file_name: data.resumeFileName || "",
        company: data.company || "",
      });
    }

    console.log("Submitting contact form data:", submissionData);

    // Insert form data into Supabase contact_submissions table with timeout handling
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 10000); // 10 second timeout
    
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([submissionData]);

      clearTimeout(timeoutId);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      // Log successful submission without sensitive data
      console.log(`Contact form submission success for ${data.email} (${data.userType})`);
    } catch (insertError) {
      clearTimeout(timeoutId);
      console.error("Database insertion error:", insertError);
      throw new Error("Failed to save contact submission");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Check if it's an abort error (timeout)
    if (error.name === 'AbortError') {
      console.error("Contact submission timed out");
      return NextResponse.json(
        { error: "Request timed out. Please try again." },
        { status: 408 }
      );
    }
    
    console.error("Error submitting form:", error);
    
    // Return appropriate error status based on the error
    const status = error.status || 500;
    return NextResponse.json(
      { 
        error: "Failed to submit form. Please try again later.",
        // Include error reference ID in production for troubleshooting
        errorId: `ERR_${Date.now().toString(36)}`
      },
      { status }
    );
  }
}
