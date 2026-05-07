import type { NextConfig } from 'next'

const MINTLIFY = 'https://onboardingsophia.mintlify.app'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/mintlify-demo', destination: `${MINTLIFY}/mintlify-demo` },
      { source: '/mintlify-demo/:match*', destination: `${MINTLIFY}/mintlify-demo/:match*` },
      { source: '/mintlify-assets/:match*', destination: `${MINTLIFY}/mintlify-assets/:match*` },
      { source: '/_mintlify/:match*', destination: `${MINTLIFY}/_mintlify/:match*` },
    ]
  },
}

export default nextConfig
