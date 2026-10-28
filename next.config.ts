import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    // Semua gambar di /public/assets dilayani secara lokal, tidak perlu domain eksternal
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
