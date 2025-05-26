-- Script to add missing columns to existing tables
-- This script is idempotent - it will check if columns exist before adding them

-- Add missing columns to industries table
DO $$
BEGIN
    -- Basic info columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'description') THEN
        ALTER TABLE industries ADD COLUMN description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'image') THEN
        ALTER TABLE industries ADD COLUMN image TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'order_index') THEN
        ALTER TABLE industries ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'is_active') THEN
        ALTER TABLE industries ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;

    -- Hero section columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'hero_industry') THEN
        ALTER TABLE industries ADD COLUMN hero_industry TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'hero_title') THEN
        ALTER TABLE industries ADD COLUMN hero_title TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'hero_description') THEN
        ALTER TABLE industries ADD COLUMN hero_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'hero_image') THEN
        ALTER TABLE industries ADD COLUMN hero_image TEXT;
    END IF;

    -- Approach section
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industries' AND column_name = 'approach_items') THEN
        ALTER TABLE industries ADD COLUMN approach_items JSONB;
    END IF;

    -- Add similar columns to services table
    -- Basic info columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'description') THEN
        ALTER TABLE services ADD COLUMN description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'icon_name') THEN
        ALTER TABLE services ADD COLUMN icon_name TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order_index') THEN
        ALTER TABLE services ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'is_active') THEN
        ALTER TABLE services ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;

    -- Hero section columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_service') THEN
        ALTER TABLE services ADD COLUMN hero_service TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_title') THEN
        ALTER TABLE services ADD COLUMN hero_title TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_description') THEN
        ALTER TABLE services ADD COLUMN hero_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_image') THEN
        ALTER TABLE services ADD COLUMN hero_image TEXT;
    END IF;

    -- Potential section columns for services table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'potential_description') THEN
        ALTER TABLE services ADD COLUMN potential_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'potential_service_cards') THEN
        ALTER TABLE services ADD COLUMN potential_service_cards JSONB;
    END IF;


    -- Add phone column to contact_submissions table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'phone') THEN
        ALTER TABLE contact_submissions ADD COLUMN phone TEXT;
    END IF;

    RAISE NOTICE 'Table columns added successfully';
END
$$;
