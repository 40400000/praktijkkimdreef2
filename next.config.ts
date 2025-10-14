import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Home page redirect
      // Contact page redirect
      {
        source: '/contact',
        destination: '/contact',
        permanent: true,
      },
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
      // Over-mij redirect (no about page exists, redirect to home)
      {
        source: '/over-mij',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
