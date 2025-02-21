import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  async rewrites() {
      return [
        {
          source: "/backend/:path*",
          destination: "http://localhost:5000/api/:path*"
        }
      ]
  },
};

export default nextConfig;
