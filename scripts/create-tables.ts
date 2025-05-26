// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Import dependencies
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Create Services Table
 */
async function createServicesTable() {
  console.log('Creating services table...');
  
  // Check if table exists
  const { data: tables } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', 'services');

  // If table exists, we'll drop it and recreate (for development only)
  if (tables && tables.length > 0) {
    console.log('Services table already exists, updating schema...');
    
    // For development, we can alter the table instead of dropping it
    // Let's add any missing columns
    const { error: alterError } = await supabase.rpc('execute_sql', {
      sql: `
        -- Make sure all needed columns exist in services table
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_schema = 'public' 
                          AND table_name = 'services' 
                          AND column_name = 'description') THEN
                ALTER TABLE public.services ADD COLUMN description TEXT;
            END IF;

            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_schema = 'public' 
                          AND table_name = 'services' 
                          AND column_name = 'potential_service_cards') THEN
                ALTER TABLE public.services ADD COLUMN potential_service_cards JSONB;
            END IF;

            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_schema = 'public' 
                          AND table_name = 'services' 
                          AND column_name = 'explore_service_features') THEN
                ALTER TABLE public.services ADD COLUMN explore_service_features JSONB;
            END IF;

            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_schema = 'public' 
                          AND table_name = 'services' 
                          AND column_name = 'explore_service_details') THEN
                ALTER TABLE public.services ADD COLUMN explore_service_details JSONB;
            END IF;
        END $$;
      `
    });

    if (alterError) {
      console.error('Error updating services table:', alterError);
      return;
    }
    
    console.log('Services table updated successfully!');
    return;
  }

  // Create the table if it doesn't exist
  const { error: createError } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE public.services (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        order_index INTEGER,
        
        -- Basic fields for services admin/listing
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_name TEXT NOT NULL,
        accent_color TEXT,
        accent_position TEXT,
        image TEXT,
        image_position TEXT,
        image_width INTEGER,
        image_height INTEGER,
        image_alt TEXT,
        
        -- Hero section fields
        hero_service TEXT NOT NULL,
        hero_title TEXT NOT NULL,
        hero_description TEXT NOT NULL,
        hero_bulletpoints JSONB,
        hero_image TEXT,
        
        -- Potential section fields
        potential_description TEXT,
        potential_service_cards JSONB,
        
        -- Explore section fields
        explore_service_features JSONB,
        explore_service_details JSONB,
        
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX idx_services_slug ON services(slug);
    `
  });

  if (createError) {
    console.error('Error creating services table:', createError);
    return;
  }
  
  console.log('Services table created successfully!');
}

/**
 * Create Industries Table
 */
async function createIndustriesTable() {
  console.log('Creating industries table...');
  
  // Check if table exists
  const { data: tables } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', 'industries');

  // If table exists, we'll alter it to add missing columns
  if (tables && tables.length > 0) {
    console.log('Industries table already exists, updating schema...');
    
    // Add any missing columns
    const { error: alterError } = await supabase.rpc('execute_sql', {
      sql: `
        -- Make sure all needed columns exist in industries table
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_schema = 'public' 
                          AND table_name = 'industries' 
                          AND column_name = 'approach_items') THEN
                ALTER TABLE public.industries ADD COLUMN approach_items JSONB;
            END IF;
        END $$;
      `
    });

    if (alterError) {
      console.error('Error updating industries table:', alterError);
      return;
    }
    
    console.log('Industries table updated successfully!');
    return;
  }

  // Create the table if it doesn't exist
  const { error: createError } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE public.industries (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        
        -- Basic fields for listing
        name TEXT NOT NULL,
        description TEXT,
        image TEXT,
        order_index INTEGER,
        is_active BOOLEAN DEFAULT TRUE,
        
        -- Hero section fields
        hero_industry TEXT NOT NULL,
        hero_title TEXT NOT NULL,
        hero_description TEXT NOT NULL,
        hero_image TEXT,
        
        -- Approach section
        approach_items JSONB,
        
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX idx_industries_slug ON industries(slug);
    `
  });

  if (createError) {
    console.error('Error creating industries table:', createError);
    return;
  }
  
  console.log('Industries table created successfully!');
}

/**
 * Main function to create all required tables
 */
async function main() {
  console.log('🚀 Creating database tables...');
  
  try {
    // Try to execute a simple SQL query to check if we have permissions
    const { error: checkError } = await supabase
      .from('services')
      .select('count(*)', { count: 'exact', head: true })
      .then(() => ({ error: null }))
      .catch(err => ({ error: err }));

    if (checkError) {
      console.log('Table may not exist yet, attempting to create tables directly...');
      // Let's try creating the tables directly
      const { error: createError } = await supabase
        .from('execute_ddl')
        .rpc('execute_sql', { query: 'SELECT 1;' })
        .then(() => ({ error: null }))
        .catch(err => ({ error: err }));
        
      if (createError) {
        console.warn('Direct table creation not possible. You may need to create tables manually using Supabase SQL editor.');
        console.warn('Please refer to the SQL in supabase_tables.sql to create the required tables.');
        // Continue to attempt table creation - it might work with different permissions
      }
    }
    
    // Create tables
    await createServicesTable();
    await createIndustriesTable();
    
    console.log('🎉 Database tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
  }
}

// Create a helper function for the rpc endpoint
async function createSqlFunction() {
  const { error } = await supabase.rest.rpc('createfunction', {
    name: 'execute_sql',
    definition: `
    CREATE OR REPLACE FUNCTION execute_sql(sql text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$;`
  });
  
  if (error) {
    console.error('Error creating SQL function:', error);
    return false;
  }
  
  return true;
}

// Run the main function
main();
