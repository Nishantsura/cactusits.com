# Setting Up Supabase Storage for Service Images

This guide walks you through setting up Supabase storage for managing service hero images.

## Prerequisites

1. Supabase project already set up
2. Access to Supabase dashboard
3. Service Role Key (for running the setup script)

## Option 1: Automatic Setup

We've created a script to automatically set up the storage bucket with proper permissions.

1. Ensure your `.env.local` file has the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Install dependencies (if not already installed):

   ```bash
   npm install @supabase/supabase-js dotenv
   ```

3. Run the setup script:
   ```bash
   node scripts/setup-storage-bucket.js
   ```

## Option 2: Manual Setup via Supabase Dashboard

If you prefer to set up manually:

1. Log in to your Supabase dashboard
2. Navigate to "Storage" in the left sidebar
3. Click "Create a new bucket"
4. Name it `service-images`
5. Check "Public bucket" (allows files to be publicly accessible)
6. Click "Create bucket"

### Setting Permissions

1. In the Storage section, click on "Policies"
2. Click "Add policies" next to your `service-images` bucket
3. Create a policy for authenticated uploads:

   - Policy name: `authenticated_uploads`
   - For role: `authenticated`
   - Operation: `INSERT`
   - Policy definition: `true` (allows all authenticated users to upload)

4. Create a policy for public reads:
   - Policy name: `public_reads`
   - For role: `anon` (anonymous users)
   - Operation: `SELECT`
   - Policy definition: `true` (allows anyone to view files)

## Testing the Storage Setup

1. Go to the Admin Dashboard
2. Create a new service or edit an existing one
3. In the Hero Section tab, upload a JPG image
4. Save the service
5. View the service page to confirm the image appears

## Troubleshooting

If you encounter issues:

1. Check that your Supabase credentials are correct in `.env.local`
2. Verify the storage bucket exists and has the correct policies
3. Check browser console for any errors during image upload
4. Make sure the `@supabase/auth-helpers-nextjs` package is installed

## Security Considerations

- The current setup allows all authenticated users to upload files
- Only JPG files are accepted for upload
- Files are given unique names to prevent conflicts
- Consider implementing more restrictive policies based on user roles if needed
