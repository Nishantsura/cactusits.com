// Load environment variables from .env.local
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Import dependencies
import { createClient } from "@supabase/supabase-js";
import { data as servicesData } from "../src/app/services/[service]/data";
import { data as industriesData } from "../src/app/industries/[industry]/data";

// Create Supabase client with env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to create a slug from a string
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

/**
 * Seed services data
 */
async function seedServices() {
  console.log("🌵 Seeding services data...");

  for (let index = 0; index < servicesData.length; index++) {
    const service = servicesData[index];
    const slug = createSlug(service.Hero.service);

    // Convert service cards to a format suitable for Supabase JSONB
    const potentialServiceCards = service.Potential.serviceCards.map((card) => {
      return {
        title: card.title,
        description: card.description,
        // We can't store React components in the database, so we'll save the icon name
        icon_name: getIconNameFromComponent(card.icon),
      };
    });

    // Convert service features to a format suitable for Supabase JSONB
    const exploreServiceFeatures = service.Explore.serviceFeatures.map(
      (feature) => {
        return {
          id: feature.id,
          title: feature.title,
          // We can't store React components in the database, so we'll save the icon name
          icon_name: getIconNameFromComponent(feature.icon),
        };
      },
    );

    // Format the service details
    const serviceDetails: Record<string, any> = {};
    Object.keys(service.Explore.serviceDetails).forEach((key) => {
      const detail = service.Explore.serviceDetails[key];
      serviceDetails[key] = {
        id: detail.id,
        title: detail.title,
        description: detail.description,
        features: detail.features,
      };
    });

    const serviceRecord = {
      slug,
      order_index: index + 1,

      // Basic fields for services admin/listing
      title: service.Hero.service,
      description: service.Hero.description,
      icon_name: "Zap", // Default icon, should be updated via admin

      // Hero section fields
      hero_service: service.Hero.service,
      hero_title: service.Hero.title,
      hero_description: service.Hero.description,
      hero_bulletpoints: service.Hero.bulletpoints,
      hero_image: service.Hero.image,

      // Potential section fields
      potential_description: service.Potential.description,
      potential_service_cards: potentialServiceCards,

      // Explore section fields
      explore_service_features: exploreServiceFeatures,
      explore_service_details: serviceDetails,

      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Insert into Supabase
    const { error } = await supabase
      .from("services")
      .upsert(serviceRecord, { onConflict: "slug" });

    if (error) {
      console.error(`Error inserting service ${slug}:`, error);
    } else {
      console.log(`✅ Service "${service.Hero.service}" seeded successfully`);
    }
  }

  console.log("✨ Completed seeding services!");
}

/**
 * Seed industries data
 */
async function seedIndustries() {
  console.log("🌵 Seeding industries data...");

  // Iterate through industries data
  for (const [slug, industry] of Object.entries(industriesData[0])) {
    const industryRecord = {
      slug,

      // Basic fields for listing
      name: industry.Hero.industry,
      description: industry.Hero.description,
      image: industry.Hero.image,
      order_index: getIndustryOrderIndex(industry.Hero.industry),
      is_active: true,

      // Hero section fields
      hero_industry: industry.Hero.industry,
      hero_title: industry.Hero.title,
      hero_description: industry.Hero.description,
      hero_image: industry.Hero.image,

      // Approach section
      approach_items: industry.Approach,

      created_at: new Date(),
      updated_at: new Date(),
    };

    // Insert into Supabase
    const { error } = await supabase
      .from("industries")
      .upsert(industryRecord, { onConflict: "slug" });

    if (error) {
      console.error(`Error inserting industry ${slug}:`, error);
    } else {
      console.log(
        `✅ Industry "${industry.Hero.industry}" seeded successfully`,
      );
    }
  }

  console.log("✨ Completed seeding industries!");
}

// Helper function to extract icon name from a React component
function getIconNameFromComponent(iconComponent: any): string {
  // This is a simplified approach - in a real implementation,
  // you might want to add more sophisticated logic to extract the icon name
  if (!iconComponent) return "Zap"; // Default

  try {
    // Try to get the name from the iconComponent
    if (iconComponent.type && typeof iconComponent.type === "function") {
      return iconComponent.type.name || "Zap";
    }

    // For JSX elements with string types like svg
    if (typeof iconComponent.type === "string") {
      return "Icon"; // Generic icon name
    }

    return "Zap"; // Default fallback
  } catch (error) {
    console.log("Error getting icon name:", error);
    return "Zap"; // Default fallback
  }
}

// Helper function to get the order index for an industry
function getIndustryOrderIndex(industry: string): number {
  const orderMap: Record<string, number> = {
    "Information Technology": 1,
    "Banking & Financial Services": 2,
    "Retail eCommerce & Consumer Packaged Goods": 3,
    Healthcare: 4,
    "Public Sector & Defence": 5,
  };

  return orderMap[industry] || 99; // Default to end of list if not found
}

/**
 * Main function to run the seed operation
 */
async function main() {
  console.log("🚀 Starting database seeding process...");

  try {
    // Seed services
    await seedServices();

    // Seed industries
    await seedIndustries();

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  }
}

// Run the main function
main();
