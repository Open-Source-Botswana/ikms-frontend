import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,

  reactStrictMode: true,
  swcMinify: true,
  images: {
        domains: ['images.unsplash.com']
  },
  allowedDevOrigins: ['http://localhost:3000'],
}

export default nextConfig
