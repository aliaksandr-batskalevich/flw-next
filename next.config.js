/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // если есть продакшн домен — добавить
    ],
  },
};

module.exports = nextConfig;
