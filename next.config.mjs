/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'people.pic1.co',
      },
      {
        protocol: 'https',
        hostname: 'app-uploads-cdn.fera.ai',
      },
      {
        hostname: 'cloud.appwrite.io',
      },
      {
        hostname: 'utfs.io',
      },
    ],
  },
};

export default nextConfig;
