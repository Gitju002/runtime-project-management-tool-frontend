import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://runtime-project-management-tool-production.up.railway.app/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
