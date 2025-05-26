-- Script to add all required columns to the services table
-- This follows your preference for clean, simple solutions

DO $$
BEGIN
    -- Basic info columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'description') THEN
        ALTER TABLE services ADD COLUMN description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'icon_name') THEN
        ALTER TABLE services ADD COLUMN icon_name TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'accent_color') THEN
        ALTER TABLE services ADD COLUMN accent_color TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'accent_position') THEN
        ALTER TABLE services ADD COLUMN accent_position TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image') THEN
        ALTER TABLE services ADD COLUMN image TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image_position') THEN
        ALTER TABLE services ADD COLUMN image_position TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image_width') THEN
        ALTER TABLE services ADD COLUMN image_width INTEGER;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image_height') THEN
        ALTER TABLE services ADD COLUMN image_height INTEGER;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image_alt') THEN
        ALTER TABLE services ADD COLUMN image_alt TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order_index') THEN
        ALTER TABLE services ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'is_active') THEN
        ALTER TABLE services ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;

    -- Hero section
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_service') THEN
        ALTER TABLE services ADD COLUMN hero_service TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_title') THEN
        ALTER TABLE services ADD COLUMN hero_title TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_description') THEN
        ALTER TABLE services ADD COLUMN hero_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_bulletpoints') THEN
        ALTER TABLE services ADD COLUMN hero_bulletpoints JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'hero_image') THEN
        ALTER TABLE services ADD COLUMN hero_image TEXT;
    END IF;

    -- Potential section
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'potential_description') THEN
        ALTER TABLE services ADD COLUMN potential_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'potential_service_cards') THEN
        ALTER TABLE services ADD COLUMN potential_service_cards JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- Explore section
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'explore_service_features') THEN
        ALTER TABLE services ADD COLUMN explore_service_features JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'explore_service_details') THEN
        ALTER TABLE services ADD COLUMN explore_service_details JSONB DEFAULT '{}'::jsonb;
    END IF;

    RAISE NOTICE 'Services table enhanced with all required columns';
END
$$;
