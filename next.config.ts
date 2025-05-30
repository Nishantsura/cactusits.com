import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      process.env.NEXT_PUBLIC_SUPABASE_URL
        ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
        : "",
      // Backup common Supabase storage domains in case the URL parsing fails
      "rnsgfjwlbxrftovwsmmz.supabase.co",
      "supabase.co",
    ].filter(Boolean),
  },
};

export default nextConfig;
