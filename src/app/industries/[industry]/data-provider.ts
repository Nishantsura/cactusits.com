import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mapToLocalImage } from "@/lib/image-mapping";

// The actual image mapping is done in the page component
// This maintains the original data structure from Supabase

interface IndustryPageProps {
  Hero: {
    industry: string;
    title: string;
    description: string;
    image: string;
  };
  Approach: {
    title: string;
    description: string;
  }[];
}

export async function getIndustryBySlug(
  slug: string,
): Promise<IndustryPageProps | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    console.error("Error fetching industry:", error);
    return null;
  }

  // Convert database record to IndustryPageProps format
  return {
    Hero: {
      industry: data.hero_industry,
      title: data.hero_title,
      description: data.hero_description,
      image: mapToLocalImage(data.hero_image || ""),
    },
    Approach: data.approach_items || [],
  };
}

export async function getAllIndustrySlugs() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("industries")
    .select("slug")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (error || !data) {
    console.error("Error fetching industry slugs:", error);
    return [];
  }

  return data.map((industry) => ({ industry: industry.slug }));
}
