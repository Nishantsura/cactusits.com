-- First, let's check what data already exists
SELECT * FROM services;
SELECT * FROM industries;

-- Insert new services only if they don't already exist
INSERT INTO services (slug, title)
VALUES 
('it-consulting', 'IT CONSULTING'),
('digital-transformation', 'DIGITAL TRANSFORMATION'),
('cloud-services', 'CLOUD SERVICES'),
('data-ai', 'DATA & AI')
ON CONFLICT (slug) DO NOTHING;

-- Insert new industries only if they don't already exist
INSERT INTO industries (slug, name)
VALUES 
('information-technology', 'Information Technology'),
('banking-financial', 'Banking & Financial Services'),
('healthcare', 'Healthcare')
ON CONFLICT (slug) DO NOTHING;
