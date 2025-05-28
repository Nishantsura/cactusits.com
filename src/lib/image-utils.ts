import { supabase } from "./supabase";

/**
 * Upload an image to Supabase Storage
 * @param file The file to upload
 * @param folder The folder to upload to (e.g., 'services', 'industries')
 * @returns The relative path to the uploaded file
 */
export async function uploadImage(file: File, folder: string) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    return filePath;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Get the public URL for an image
 * @param filePath The relative path to the image
 * @returns The public URL
 */
export async function getImageUrl(filePath: string) {
  try {
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error getting image URL:", error);
    throw error;
  }
}

/**
 * Delete an image from storage
 * @param filePath The relative path to the image
 */
export async function deleteImage(filePath: string) {
  try {
    const { error } = await supabase.storage.from("images").remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
