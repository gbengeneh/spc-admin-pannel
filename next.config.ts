import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    
    remotePatterns:[
      {
        protocol:'https',
        hostname: 'irxxnscufqeessozhcmd.supabase.co',
      },
      {
          protocol: 'https',
          hostname: 'images.unsplash.com',
      },
    ]
  }
};

module.exports= {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
