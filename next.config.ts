import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mintlify-demo',
        destination: 'https://onboardingsophia.mintlify.app',
      },
      {
        source: '/mintlify-demo/:match*',
        destination: 'https://onboardingsophia.mintlify.app/:match*',
      },
      {
        source: '/mintlify-assets/:match*',
        destination: 'https://onboardingsophia.mintlify.app/mintlify-assets/:match*',
      },
    ]
  },
}

export default nextConfig
