# Cactus IT Database Setup Instructions

This guide provides clear steps to set up your Supabase database for the Cactus IT website. It focuses on a simple, clean approach to get your services and industries data properly stored and accessible.

## 1. Environment Variables

Create a file named `.env.local` in the root of your project with these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password
```

You can get these values from your Supabase dashboard:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Project Settings > API
4. Copy the "URL" and "anon/public" key
5. Choose a secure admin password for dashboard access

## 2. Create Database Tables

Run the SQL commands in `supabase_tables.sql` in your Supabase SQL Editor to create all required tables.

## 3. Seed Initial Data

Run the minimal sample data script in `scripts/seed-sample-data.sql` to ensure basic content is available.

## 4. Restart the Development Server

After setting up the environment variables and database, restart your development server:

```
npm run dev
```

## 5. Access the Admin Dashboard

Go to http://localhost:3000/admin and use your admin password to log in.
