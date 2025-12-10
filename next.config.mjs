/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable source maps in production builds
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    domains: ['images.unsplash.com',]
  },
  allowedDevOrigins: ['http://localhost:3000'],
};

export default nextConfig;
