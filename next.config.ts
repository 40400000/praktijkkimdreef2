import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Orthomoleculaire therapie redirect
      {
        source: '/orthomoleculaire-therapie',
        destination: '/orthomoleculair',
        permanent: true,
      },
      // Qest4 redirect
      {
        source: '/qest4',
        destination: '/qest',
        permanent: true,
      },
      // Over-mij redirect to contact page
      {
        source: '/over-mij',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
