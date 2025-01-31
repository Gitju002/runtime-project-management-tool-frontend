import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://runtime-project-management-tool-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
