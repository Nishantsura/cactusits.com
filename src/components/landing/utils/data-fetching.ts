import { createServerSupabaseClient } from '@/lib/supabase-server';

/**
 * Utility functions for fetching data on the server side for landing page components
 */

export async function getIndustriesForLanding() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('industries')
    .select('slug, name, description, image')
    .eq('is_active', true)
    .order('order_index', { ascending: true })
    .limit(4);
  
  if (error) {
    console.error('Error fetching industries for landing:', error);
    return [];
  }
  
  return data || [];
}

export async function getServicesForLanding() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('slug, title, description, icon_name, accent_color, accent_position')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching services for landing:', error);
    return [];
  }
  
  return data || [];
}

export async function getTestimonialsForLanding(featured = true) {
  const supabase = createServerSupabaseClient();
  
  let query = supabase
    .from('testimonials')
    .select('*');
    
  if (featured) {
    query = query.eq('is_featured', true);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  
  return data || [];
}
