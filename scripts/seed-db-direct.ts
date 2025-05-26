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
 * Seed services data using direct SQL
 */
async function seedServices() {
  console.log("🌵 Seeding services data...");

  for (let index = 0; index < servicesData.length; index++) {
    const service = servicesData[index];
    const slug = createSlug(service.Hero.service);

    // Convert data to JSON strings
    const heroBulletpoints = JSON.stringify(service.Hero.bulletpoints || []);

    // Simple insert with minimal data to avoid schema cache issues
    const query = `
      INSERT INTO services (
        slug, 
        order_index, 
        title, 
        hero_service, 
        hero_title, 
        hero_description, 
        hero_bulletpoints,
        hero_image,
        is_active,
        created_at,
        updated_at
      ) VALUES (
        '${slug}', 
        ${index + 1}, 
        '${service.Hero.service.replace(/'/g, "''")}', 
        '${service.Hero.service.replace(/'/g, "''")}', 
        '${service.Hero.title.replace(/'/g, "''")}', 
        '${service.Hero.description.replace(/'/g, "''")}', 
        '${heroBulletpoints.replace(/'/g, "''")}',
        '${service.Hero.image || ""}',
        true,
        NOW(),
        NOW()
      ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        hero_service = EXCLUDED.hero_service,
        hero_title = EXCLUDED.hero_title,
        hero_description = EXCLUDED.hero_description,
        hero_bulletpoints = EXCLUDED.hero_bulletpoints,
        hero_image = EXCLUDED.hero_image,
        updated_at = NOW()
      RETURNING id;
    `;

    try {
      const { data, error } = await supabase.rpc("exec_sql", {
        sql_query: query,
      });

      if (error) {
        console.error(`Error inserting service ${slug}:`, error);
      } else {
        console.log(`✅ Service "${service.Hero.service}" seeded successfully`);
      }
    } catch (err) {
      console.error(`Error inserting service ${slug}:`, err);

      // Try a fallback approach
      try {
        const { error } = await supabase.from("services").upsert(
          {
            slug,
            title: service.Hero.service,
            hero_service: service.Hero.service,
            hero_title: service.Hero.title,
            hero_description: service.Hero.description,
          },
          { onConflict: "slug" },
        );

        if (error) {
          console.error(`Fallback error for service ${slug}:`, error);
        } else {
          console.log(
            `✅ Service "${service.Hero.service}" seeded with fallback method`,
          );
        }
      } catch (fallbackErr) {
        console.error(`Fallback failed for ${slug}:`, fallbackErr);
      }
    }
  }

  console.log("✨ Completed seeding services!");
}

/**
 * Seed industries data using direct SQL
 */
async function seedIndustries() {
  console.log("🌵 Seeding industries data...");

  // Iterate through industries data
  for (const [slug, industry] of Object.entries(industriesData[0])) {
    try {
      // Prepare approach items JSON
      const approachItems = JSON.stringify(industry.Approach || []);

      // Create SQL query
      const query = `
        INSERT INTO industries (
          slug,
          name,
          description,
          image,
          order_index,
          is_active,
          hero_industry,
          hero_title,
          hero_description,
          hero_image,
          approach_items,
          created_at,
          updated_at
        ) VALUES (
          '${slug}',
          '${industry.Hero.industry.replace(/'/g, "''")}',
          '${industry.Hero.description.replace(/'/g, "''")}',
          '${industry.Hero.image || ""}',
          ${getIndustryOrderIndex(industry.Hero.industry)},
          true,
          '${industry.Hero.industry.replace(/'/g, "''")}',
          '${industry.Hero.title.replace(/'/g, "''")}',
          '${industry.Hero.description.replace(/'/g, "''")}',
          '${industry.Hero.image || ""}',
          '${approachItems.replace(/'/g, "''")}',
          NOW(),
          NOW()
        ) ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          hero_industry = EXCLUDED.hero_industry,
          hero_title = EXCLUDED.hero_title,
          hero_description = EXCLUDED.hero_description,
          hero_image = EXCLUDED.hero_image,
          approach_items = EXCLUDED.approach_items,
          updated_at = NOW()
        RETURNING id;
      `;

      const { data, error } = await supabase.rpc("exec_sql", {
        sql_query: query,
      });

      if (error) {
        console.error(`Error inserting industry ${slug}:`, error);

        // Try fallback approach
        const { error: fallbackError } = await supabase
          .from("industries")
          .upsert(
            {
              slug,
              name: industry.Hero.industry,
              hero_industry: industry.Hero.industry,
              hero_title: industry.Hero.title,
              hero_description: industry.Hero.description,
            },
            { onConflict: "slug" },
          );

        if (fallbackError) {
          console.error(`Fallback error for industry ${slug}:`, fallbackError);
        } else {
          console.log(
            `✅ Industry "${industry.Hero.industry}" seeded with fallback method`,
          );
        }
      } else {
        console.log(
          `✅ Industry "${industry.Hero.industry}" seeded successfully`,
        );
      }
    } catch (err) {
      console.error(`Error processing industry ${slug}:`, err);
    }
  }

  console.log("✨ Completed seeding industries!");
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
 * Create the SQL execution function
 */
async function createSqlFunction() {
  console.log("Creating SQL execution function...");

  const query = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      result JSONB;
    BEGIN
      EXECUTE sql_query INTO result;
      RETURN result;
    EXCEPTION WHEN OTHERS THEN
      RETURN jsonb_build_object('error', SQLERRM);
    END;
    $$;
  `;

  try {
    const { error } = await supabase.rpc("exec_sql", { sql_query: query });

    if (error) {
      console.warn(
        "Could not create SQL function, will try alternative seeding method:",
        error,
      );
      return false;
    }

    console.log("SQL execution function created successfully");
    return true;
  } catch (err) {
    console.warn(
      "Error creating SQL function, will try alternative seeding method:",
      err,
    );
    return false;
  }
}

/**
 * Main function to run the seed operation
 */
async function main() {
  console.log("🚀 Starting database seeding process...");

  try {
    // Try to create SQL execution function
    await createSqlFunction();

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
