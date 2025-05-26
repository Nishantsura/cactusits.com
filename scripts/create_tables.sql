-- Services Table
CREATE TABLE IF NOT EXISTS services (
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

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- Industries Table
CREATE TABLE IF NOT EXISTS industries (
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

CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
