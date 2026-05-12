/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  webpack: (config) => {
    // yahoo-finance2 pulls in deno-only test dependencies; ignore them in webpack
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@std/testing/mock': false,
      '@std/testing/bdd': false,
    };
    config.module.rules.push({
      test: /yahoo-finance2[\\/].*[\\/]tests[\\/]/,
      use: 'null-loader',
    });
    return config;
  },
};

export default nextConfig;
