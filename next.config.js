/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "upload.wikimedia.org",
      "m.media-amazon.com",
    ],
  },
};
