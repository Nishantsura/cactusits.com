-- Contact Submissions Table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,             -- Phone number
  message TEXT,
  user_type TEXT DEFAULT 'hiringManager',
  organization TEXT,
  website TEXT,
  hiring_positions JSONB, -- For storing array of positions
  hiring_type TEXT,       -- 'contractor', 'permanent', or 'both'
  roles JSONB,            -- For storing array of roles
  nationality TEXT,
  file_name TEXT,         -- Name of uploaded file (actual files stored in Storage)
  status TEXT DEFAULT 'new', -- Status of the submission: 'new', 'in_progress', 'contacted', 'closed'
  notes TEXT,             -- Admin notes about the submission
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs Table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  salary TEXT,
  location TEXT,
  type TEXT,              -- 'Full-Time', 'Part-Time', 'Contract', etc.
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT,          -- 'Development', 'Design', 'Marketing', etc.
  company TEXT DEFAULT 'Cactus IT Solutions',
  description TEXT,
  apply_link TEXT,        -- External link (LinkedIn, etc.) for applications
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table (Updated to match PagePropsSer structure in data.tsx)
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,  -- URL-friendly version for routing
  order_index INTEGER,        -- For custom ordering of services
  
  -- Basic fields for services admin/listing
  title TEXT NOT NULL,        -- Title for admin dashboard
  description TEXT NOT NULL,  -- Short description for admin dashboard
  icon_name TEXT NOT NULL,    -- Name of icon from Lucide React (e.g., 'Globe', 'Shield')
  accent_color TEXT,          -- Optional CSS background color (e.g., 'bg-purple-500')
  accent_position TEXT,       -- Optional CSS position (e.g., 'top-right', 'bottom-left')
  image TEXT,                 -- Optional path to the image (e.g., '/landing/services-1.png')
  image_position TEXT,        -- Optional CSS positioning (e.g., 'top-0 right-0')
  image_width INTEGER,        -- Optional image width
  image_height INTEGER,       -- Optional image height
  image_alt TEXT,             -- Optional image alt text
  
  -- Hero section fields from PagePropsSer
  hero_service TEXT NOT NULL, -- Service name (e.g., 'IT CONSULTING, STRATEGY & SERVICES')
  hero_title TEXT NOT NULL,   -- Hero title (e.g., 'Redefine Your Business Strategy')
  hero_description TEXT NOT NULL, -- Hero description
  hero_bulletpoints JSONB,    -- Array of bulletpoints
  hero_image TEXT,           -- Path to hero image
  
  -- Potential section fields
  potential_description TEXT, -- Description for the Potential section
  potential_service_cards JSONB, -- Array of service cards (icon, title, description)
  
  -- Explore section fields
  explore_service_features JSONB, -- Array of service features (id, title, icon)
  explore_service_details JSONB,  -- Object of service details
  
  is_active BOOLEAN DEFAULT TRUE, -- For enabling/disabling without deletion
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industries Table
CREATE TABLE industries (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,  -- URL-friendly version for routing (e.g., 'information-technology')
  
  -- Basic fields for listing
  name TEXT NOT NULL,         -- Display name for admin dashboard
  description TEXT,           -- Short description for admin listing
  image TEXT,                 -- Optional image for listing
  order_index INTEGER,        -- For custom ordering
  is_active BOOLEAN DEFAULT TRUE, -- For enabling/disabling without deletion
  
  -- Hero section fields
  hero_industry TEXT NOT NULL, -- Industry name (e.g., 'Information Technology')
  hero_title TEXT NOT NULL,    -- Hero title (e.g., 'Connecting You with IT Professionals Who Drive Success')
  hero_description TEXT NOT NULL, -- Hero description
  hero_image TEXT,            -- Path to hero image
  
  -- Approach section
  approach_items JSONB,        -- Array of approach items (title, description)
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  image_path TEXT,
  rating INTEGER,             -- 1-5 star rating
  type TEXT DEFAULT 'client', -- 'client' or 'employee'
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_industries_slug ON industries(slug);
CREATE INDEX idx_testimonials_type ON testimonials(type);
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
