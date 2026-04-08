import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/orthomoleculaire-therapie',
        destination: '/orthomoleculair',
        permanent: true,
      },
      {
        source: '/qest4',
        destination: '/qest',
        permanent: true,
      },
      {
        source: '/over-mij',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
