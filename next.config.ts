import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
        domains: ['images.unsplash.com']
  },
  allowedDevOrigins: ['http://localhost:3000'],
}

export default nextConfig
