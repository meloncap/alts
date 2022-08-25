/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com", "static.coingecko.com", "logos.covalenthq.com", "www.covalenthq.com"]
  }
}

module.exports = nextConfig
