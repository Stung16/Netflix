/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 3600,
    remotePatterns: [{protocol: 'https', hostname: '**'}],
  },
  reactStrictMode: false,
  output: 'standalone',
}

export default nextConfig
