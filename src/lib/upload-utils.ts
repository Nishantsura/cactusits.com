import { supabase } from "./supabase";

/**
 * Upload an image file to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket (default: 'images')
 * @param path Optional folder path within the bucket
 * @returns Object containing the file URL if successful
 */
export async function uploadImage(
  file: File,
  bucket: string = "images",
  path?: string,
) {
  try {
    // Generate a unique filename to avoid conflicts
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

    // Create the full path including any folder structure
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
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
    return { data: null, error };
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
