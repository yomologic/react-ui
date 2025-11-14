import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@yomologic/react-ui': '../src',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@yomologic/react-ui': '../src',
    };
    return config;
  },
};

export default nextConfig;
