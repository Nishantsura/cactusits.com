import { supabase } from "./supabase";

/**
 * Ensures image URLs are properly formatted for Next.js Image component
 * @param url The original image URL
 * @returns A normalized image URL that will work with Next.js Image component
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return '/placeholder.svg';
  
  // Handle empty strings or whitespace-only strings
  if (url.trim() === '') return '/placeholder.svg';
  
  try {
    // If URL is already an images.unsplash.com URL, just return it
    if (url.includes('images.unsplash.com')) {
      return url;
    }
    
    // Handle unsplash.com URLs with photo ID
    if (url.includes('unsplash.com/photos/')) {
      // Case 1: Extract the photo ID from paths like /photos/PHOTO_ID
      let photoIdMatch = url.match(/\/photos\/([^\/\?\&]+)/);
      if (photoIdMatch && photoIdMatch[1]) {
        return `https://images.unsplash.com/photo-${photoIdMatch[1]}`;
      }
      
      // Case 2: Extract from URLs that might have query parameters
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split('/');
      for (let i = 0; i < pathSegments.length; i++) {
        if (pathSegments[i] === 'photos' && i + 1 < pathSegments.length) {
          return `https://images.unsplash.com/photo-${pathSegments[i + 1]}`;
        }
      }
    }
    
    // If we can't transform the URL but it's an absolute URL, just return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // For relative URLs, ensure they start with a slash
    if (!url.startsWith('/')) {
      return `/${url}`;
    }
  } catch (error) {
    console.error('Error normalizing image URL:', error, url);
    return '/placeholder.svg';
  }
  
  // Default case - return the original URL
  return url;
}

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
