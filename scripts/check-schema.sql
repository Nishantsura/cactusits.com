-- Check the actual schema structure in Supabase

-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- List columns in services table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services' 
AND table_schema = 'public';

-- List columns in industries table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'industries' 
AND table_schema = 'public';
