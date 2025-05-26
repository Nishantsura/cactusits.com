import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing from environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Import services data from the data.tsx file
import { data } from '../src/app/services/[service]/data';

/**
 * Seed services data from the existing data.tsx file into the Supabase database
 */
async function seedServicesData() {
  console.log('Starting services data seeding...');
  
  // Track successes and failures
  const results = {
    success: 0,
    failure: 0,
    errors: [] as string[],
  };
  
  for (let i = 0; i < data.length; i++) {
    const service = data[i];
    
    // Generate slug from service name
    const slug = service.Hero.service
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    // Map icon React components to string names for database storage
    const mapServiceCards = service.Potential.serviceCards.map(card => ({
      title: card.title,
      description: card.description,
      icon: getIconNameFromComponent(card.icon),
    }));
    
    // Map icon React components to string names for database storage
    const mapServiceFeatures = service.Explore.serviceFeatures.map(feature => ({
      id: feature.id,
      title: feature.title,
      icon: getIconNameFromComponent(feature.icon),
    }));
    
    // Prepare data for insertion
    const serviceData = {
      slug,
      order_index: i,
      
      // Basic fields
      title: service.Hero.service,
      description: service.Hero.description,
      icon_name: 'Server', // Default icon
      accent_color: '#5046e5', // Default accent color
      accent_position: 'top-right',
      image: service.Hero.image || '',
      image_position: 'center',
      image_width: 500,
      image_height: 500,
      image_alt: `${service.Hero.service} image`,
      
      // Hero section
      hero_service: service.Hero.service,
      hero_title: service.Hero.title,
      hero_description: service.Hero.description,
      hero_bulletpoints: service.Hero.bulletpoints,
      hero_image: service.Hero.image,
      
      // Potential section
      potential_description: service.Potential.description,
      potential_service_cards: mapServiceCards,
      
      // Explore section
      explore_service_features: mapServiceFeatures,
      explore_service_details: service.Explore.serviceDetails,
      
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    try {
      // Check if service with this slug already exists
      const { data: existingService, error: queryError } = await supabase
        .from('services')
        .select('id')
        .eq('slug', slug)
        .single();
      
      if (queryError && queryError.code !== 'PGRST116') {
        // Handle error (not including "no rows returned" error)
        throw queryError;
      }
      
      let result;
      
      if (existingService) {
        // Update existing service
        result = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', existingService.id);
          
        if (result.error) throw result.error;
        console.log(`Updated service: ${service.Hero.service}`);
      } else {
        // Insert new service
        result = await supabase
          .from('services')
          .insert([serviceData]);
          
        if (result.error) throw result.error;
        console.log(`Inserted service: ${service.Hero.service}`);
      }
      
      results.success++;
    } catch (error: any) {
      console.error(`Error with service ${service.Hero.service}:`, error.message);
      results.failure++;
      results.errors.push(`${service.Hero.service}: ${error.message}`);
    }
  }
  
  console.log('Services seeding completed!');
  console.log(`Successes: ${results.success}`);
  console.log(`Failures: ${results.failure}`);
  
  if (results.errors.length > 0) {
    console.log('Errors:');
    results.errors.forEach(err => console.log(` - ${err}`));
  }
}

/**
 * Helper function to convert React component to icon name string
 */
function getIconNameFromComponent(iconComponent: any): string {
  if (!iconComponent) return 'Server';
  
  // Convert the component to string and extract the name
  const iconStr = iconComponent.type?.name || 
                 iconComponent.type?.render?.name || 
                 String(iconComponent);
  
  // Extract icon name from common patterns
  const iconMatch = iconStr.match(/([A-Z][a-zA-Z0-9]+)/);
  return iconMatch ? iconMatch[0] : 'Server';
}

// Run the seeding function
seedServicesData().catch(error => {
  console.error('Fatal error during seeding:', error);
  process.exit(1);
});
