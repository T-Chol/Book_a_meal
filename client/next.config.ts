import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
eslint: {
    ignoreDuringBuilds: true,
  },
typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;