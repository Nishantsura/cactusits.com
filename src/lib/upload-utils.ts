import { supabase } from "./supabase";
import { StorageError } from "@supabase/storage-js";

// We'll use a single bucket name since we might not have permissions to create buckets
// This should be a bucket that already exists in your Supabase project
const DEFAULT_BUCKET = "cactus-images";

/**
 * Upload an image file to Supabase Storage
 * @param file The file to upload
 * @param folder Optional folder within the default bucket to organize images (e.g., 'services', 'industries')
 * @param subfolder Optional subfolder path within the folder (e.g., 'hero')
 * @returns Object containing the file URL if successful
 */
export async function uploadImage(
  file: File,
  folder: string = "",
  subfolder?: string,
) {
  try {
    // We'll use folder structure within a single bucket instead of creating multiple buckets

    // Generate a unique filename to avoid conflicts
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

    // Create the full path including folder structure for organization
    let filePath = fileName;

    if (folder && subfolder) {
      filePath = `${folder}/${subfolder}/${fileName}`;
    } else if (folder) {
      filePath = `${folder}/${fileName}`;
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(DEFAULT_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(`Error uploading to bucket '${DEFAULT_BUCKET}':`, error);
      throw error;
    }

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(DEFAULT_BUCKET)
      .getPublicUrl(filePath);

    return {
      data: {
        path: filePath,
        url: publicUrlData.publicUrl,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error uploading image:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to upload image";

    if (error instanceof Error) {
      // Extract more useful information from the error
      const errorString = error.toString().toLowerCase();

      if (
        errorString.includes("permission denied") ||
        errorString.includes("403")
      ) {
        errorMessage =
          "Permission denied. The bucket may not be public or your API key lacks permissions.";
      } else if (
        errorString.includes("not found") ||
        errorString.includes("404")
      ) {
        errorMessage = `Bucket '${DEFAULT_BUCKET}' not found. It may not exist or you don't have access.`;
      } else if (
        errorString.includes("too large") ||
        errorString.includes("413")
      ) {
        errorMessage = "File too large. Maximum file size exceeded.";
      } else {
        errorMessage = error.message || errorMessage;
      }
    }

    return {
      data: null,
      error: new Error(errorMessage),
    };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param path The file path to delete
 * @param bucket The storage bucket (default: 'images')
 */
export async function deleteImage(path: string, bucket: string = "images") {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw error;
    return { data: true, error: null };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { data: null, error };
  }
}
