/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.u-archive.com",
      },
      {
        protocol: "https",
        hostname: "u-archive.com",
      },
    ],
  },
}

export default nextConfig
