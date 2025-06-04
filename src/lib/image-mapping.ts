/**
 * This utility provides image mapping between Supabase and local images
 * to ensure reliable image loading throughout the application
 */

// Map of industry images: the key is a distinguishing part of the Supabase image URL,
// and the value is the local image path in the public folder
const industryImageMap: Record<string, string> = {
  // Information Technology images
  "information-technology": "/landing/pexels-tima-miroshnichenko-5685931.jpg",
  "it-solutions": "/landing/pexels-tima-miroshnichenko-5685931.jpg",
  
  // Banking & Financial images
  "banking": "/landing/pexels-artempodrez-5715847.jpg",
  "financial": "/landing/pexels-artempodrez-5715847.jpg",
  
  // Healthcare images
  "healthcare": "/landing/pexels-tiger-lily-7109063.jpg",
  "medical": "/landing/pexels-tiger-lily-7109063.jpg",
  
  // Public Sector & Defense images
  "public": "/landing/pexels-yankrukov-7792745.jpg",
  "defense": "/landing/pexels-yankrukov-7792745.jpg",
  "defence": "/landing/pexels-yankrukov-7792745.jpg",
  
  // Generic fallbacks by industry type
  "technology": "/landing/pexels-tima-miroshnichenko-5685937.jpg",
  "finance": "/landing/pexels-artempodrez-5715847.jpg",
  "government": "/landing/pexels-yankrukov-7792745.jpg",
};

/**
 * Maps an external image URL or key to a local image path
 * @param imageUrl The original image URL from Supabase
 * @param industrySlug Optional industry slug to help with mapping
 * @returns A path to a local image in the public folder
 */
export function mapToLocalImage(imageUrl: string | null | undefined, industrySlug?: string): string {
  // Default fallback
  const defaultImage = "/landing/pexels-tima-miroshnichenko-5685931.jpg";
  
  // If no image URL provided, return default
  if (!imageUrl) return defaultImage;
  
  // First try to match by industry slug if provided
  if (industrySlug) {
    // Try direct match
    if (industryImageMap[industrySlug]) {
      return industryImageMap[industrySlug];
    }
    
    // Try partial match
    for (const key of Object.keys(industryImageMap)) {
      if (industrySlug.includes(key)) {
        return industryImageMap[key];
      }
    }
  }
  
  // Try to match by parts of the image URL
  for (const key of Object.keys(industryImageMap)) {
    if (imageUrl.toLowerCase().includes(key)) {
      return industryImageMap[key];
    }
  }
  
  // Return default if no match found
  return defaultImage;
}
