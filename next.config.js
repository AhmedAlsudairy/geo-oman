/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn4.premiumread.com',
      },
      {
        protocol: 'https',
        hostname: 'alwatan.om',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'modo3.com',
      },
      {
        protocol: 'https',
        hostname: 'shabiba.eu-central-1.linodeobjects.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'peregrinetreks.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'wejhatt.com',
      },
    ],
  },
}

module.exports = nextConfig
