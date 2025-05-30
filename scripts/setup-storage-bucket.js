// One-time script to set up the service-images bucket in Supabase
// Run this with: node scripts/setup-storage-bucket.js

require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorageBucket() {
  try {
    console.log("Creating service-images bucket...");

    // Create the bucket if it doesn't exist
    const { data: bucketData, error: bucketError } =
      await supabase.storage.createBucket("service-images", {
        public: true, // Make files publicly accessible
        fileSizeLimit: 1024 * 1024 * 5, // 5MB limit per file
      });

    if (bucketError) {
      if (bucketError.message.includes("already exists")) {
        console.log("Bucket already exists, continuing...");
      } else {
        throw bucketError;
      }
    } else {
      console.log("Bucket created successfully:", bucketData);
    }

    // Set up security policies
    console.log("Setting up security policies...");

    // Allow authenticated users to upload files
    const { error: policyError } = await supabase.storage
      .from("service-images")
      .createPolicy("authenticated upload policy", {
        name: "authenticated_uploads",
        definition: {
          role: "authenticated",
          operation: "INSERT",
          check: "true", // Allow all authenticated users to upload
        },
      });

    if (policyError) {
      console.error("Error setting upload policy:", policyError);
    } else {
      console.log("Upload policy created successfully");
    }

    // Allow public to read files
    const { error: readPolicyError } = await supabase.storage
      .from("service-images")
      .createPolicy("public read policy", {
        name: "public_reads",
        definition: {
          role: "anon",
          operation: "SELECT",
          check: "true", // Allow all users to read
        },
      });

    if (readPolicyError) {
      console.error("Error setting read policy:", readPolicyError);
    } else {
      console.log("Read policy created successfully");
    }

    console.log("Storage bucket setup complete!");
  } catch (error) {
    console.error("Error setting up storage bucket:", error);
  }
}

setupStorageBucket();
