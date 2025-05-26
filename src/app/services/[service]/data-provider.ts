import { createServerSupabaseClient } from '@/lib/supabase-server';
import { PagePropsSer } from './data';

export async function getServiceBySlug(slug: string): Promise<PagePropsSer | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  if (error || !data) {
    console.error('Error fetching service:', error);
    return null;
  }
  
  // Convert database record to PagePropsSer format
  return {
    Hero: {
      service: data.hero_service,
      title: data.hero_title,
      description: data.hero_description,
      bulletpoints: data.hero_bulletpoints || [],
      image: data.hero_image || '',
    },
    Potential: {
      description: data.potential_description || '',
      serviceCards: (data.potential_service_cards || []).map((card: any) => ({
        icon: null, // We can't restore React components from the database
        title: card.title,
        description: card.description
      })),
    },
    Explore: {
      serviceFeatures: (data.explore_service_features || []).map((feature: any) => ({
        id: feature.id,
        title: feature.title,
        icon: null, // We can't restore React components from the database
      })),
      serviceDetails: data.explore_service_details || {},
    }
  };
}

export async function getAllServiceSlugs() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('slug')
    .eq('is_active', true);
  
  if (error || !data) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
  
  return data.map(service => ({ service: service.slug }));
}
