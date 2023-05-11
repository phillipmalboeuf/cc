/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/5pywcqx1gkry/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.ctfassets.net',
        port: '',
        pathname: '/5pywcqx1gkry/**',
      },
    ],
  },
}

module.exports = nextConfig
