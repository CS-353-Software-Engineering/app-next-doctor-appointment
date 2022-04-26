/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'com.roveapps.findmeadoctor'
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['via.placeholder.com', 'lh3.googleusercontent.com',],
  },
  target: 'serverless',
  async rewrites() {
    return [
      // Rewrite everything else to `block-styles/index`
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
