/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Point Next.js to our examples directory
  distDir: ".next-examples",
  // Configure to serve examples from src/examples/app
  async rewrites() {
    return [
      {
        source: "/(.*)",
        destination: "/examples/app/$1",
      },
    ];
  },
};

module.exports = nextConfig;
