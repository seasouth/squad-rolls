import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: NextConfig = {
  reactStrictMode: true
};

module.exports = withPWA(nextConfig);