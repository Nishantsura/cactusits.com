/**
 * Simple utility to return local service images
 */

// List of confirmed available local images
const AVAILABLE_IMAGES = [
  // Reliable images from landing folder
  '/landing/pexels-tima-miroshnichenko-5685937.jpg',
  '/landing/pexels-yankrukov-7792745.jpg',
  '/landing/pexels-tima-miroshnichenko-5685961.jpg',
  '/landing/pexels-tima-miroshnichenko-5686086.jpg',
  '/landing/cybersecurity.jpg',
  '/landing/infrastructure.jpg',
  '/landing/agile-management.jpg',
  
  // Services folder assets that exist
  '/services/img1.png',
  '/services/img4.png',
];

/**
 * Returns a guaranteed-to-exist local image path for a service
 * @param serviceSlug The slug of the service 
 * @param serviceTitle Optional service title 
 * @param index Optional index for consistent mapping 
 * @returns Path to a confirmed local image
 */
export function getServiceLocalImage(serviceSlug: string | undefined | null, serviceTitle?: string | undefined | null, index: number = 0): string {
  // Use index modulo to select from our confirmed images
  const imageIndex = Math.abs(index) % AVAILABLE_IMAGES.length;
  
  return AVAILABLE_IMAGES[imageIndex];
}
