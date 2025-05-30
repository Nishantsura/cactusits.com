import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Uploads a service hero image to Supabase storage
 * @param file The image file to upload (jpg only)
 * @param serviceSlug The slug of the service to associate with the image
 * @returns The public URL of the uploaded image
 */
export async function uploadServiceImage(file: File, serviceSlug: string) {
  // Validate input parameters
  if (!file) {
    throw new Error("No file provided");
  }

  if (!serviceSlug) {
    throw new Error("No service slug provided");
  }

  const supabase = createClientComponentClient();

  // Validate file is a JPG image
  if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
    throw new Error("Only JPG/JPEG images are allowed");
  }

  try {
    // Create a unique filename
    const timestamp = new Date().getTime();
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `${serviceSlug}-hero-${timestamp}.${fileExt}`;
    const filePath = `services/${fileName}`;

    // Try upload directly without checking bucket existence first
    console.log("Attempting to upload to service-images bucket:", filePath);
    const { data, error } = await supabase.storage
      .from("service-images")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("service-images")
      .getPublicUrl(filePath);

    if (!urlData || !urlData.publicUrl) {
      throw new Error("Failed to get public URL for uploaded image");
    }

    console.log("Successfully uploaded image, public URL:", urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error: any) {
    // Re-throw with more detailed message
    console.error("Image upload process error:", error);
    throw new Error(`Image upload failed: ${error.message || "Unknown error"}`);
  }
}
