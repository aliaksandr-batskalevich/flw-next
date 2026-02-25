/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'flw.by',
      },
      // если есть поддомены, например dev.flw.by:
      // {
      //   protocol: 'https',
      //   hostname: 'dev.flw.by',
      // },
    ],
  },
};

module.exports = nextConfig;
