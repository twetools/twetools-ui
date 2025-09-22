const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize bundle size for library examples
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },

  // Enable tree shaking
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
