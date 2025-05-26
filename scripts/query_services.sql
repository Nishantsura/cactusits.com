-- Query to view all services in the database
SELECT 
  id, 
  slug, 
  title,
  order_index,
  hero_service,
  hero_title,
  is_active
FROM 
  services
ORDER BY 
  order_index ASC;
