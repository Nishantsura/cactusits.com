import { supabase } from "./supabase";
import { StorageError } from "@supabase/storage-js";

// Standard bucket name to be used throughout the application
// This ensures consistency across all image operations
// Using the correct bucket name that exists in the Supabase project
const STORAGE_BUCKET = "images";

/**
 * Get the public URL for an image
 * @param filePath The path of the image within the storage bucket
 * @returns The public URL of the image
 */
export function getPublicImageUrl(filePath: string): string {
  if (!filePath) return "";

  try {
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);
    return data?.publicUrl || "";
  } catch (error) {
    console.error("Error getting public image URL:", error);
    return "";
  }
}

/**
 * Upload an image file to Supabase Storage
 * @param file The file to upload
 * @param folder Optional folder within the storage bucket to organize images (e.g., 'services', 'industries')
 * @param subfolder Optional subfolder path within the folder (e.g., 'hero')
 * @returns Object containing the file URL and path if successful
 */
export async function uploadImage(
  file: File,
  folder: string = "",
  subfolder?: string,
) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        "File size exceeds 5MB limit. Please choose a smaller image.",
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }

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
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(`Error uploading to bucket '${STORAGE_BUCKET}':`, error);
      throw error;
    }

    // Get public URL for the uploaded file
    const publicUrl = getPublicImageUrl(filePath);

    return {
      data: {
        path: filePath,
        url: publicUrl,
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
        errorMessage = `Bucket '${STORAGE_BUCKET}' not found. It may not exist or you don't have access.`;
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
 * @returns Object indicating success or failure
 */
export async function deleteImage(path: string) {
  if (!path) {
    return { data: null, error: new Error("No file path provided") };
  }

  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (error) throw error;
    return { data: true, error: null };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { data: null, error };
  }
}

/**
 * List all images in a folder
 * @param folder The folder to list images from
 * @param subfolder Optional subfolder within the folder
 * @returns List of images with their URLs
 */
export async function listImages(folder: string, subfolder?: string) {
  try {
    const path = subfolder ? `${folder}/${subfolder}` : folder;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(path);

    if (error) throw error;

    // Map files to include their public URLs
    const files = data
      .filter((item) => !item.id.endsWith("/"))
      .map((file) => ({
        name: file.name,
        path: `${path}/${file.name}`,
        url: getPublicImageUrl(`${path}/${file.name}`),
        metadata: file,
      }));

    return { data: files, error: null };
  } catch (error) {
    console.error("Error listing images:", error);
    return { data: null, error };
  }
}
