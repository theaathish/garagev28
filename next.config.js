/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['framer-motion'],
    turbo: {
      memoryLimit: 512,
    },
  },
  
  // Simple image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200],
    imageSizes: [16, 32, 64, 128, 256],
  },
  
  // Optimize output
  output: 'standalone',
  
  // Reduce memory usage
  webpack: (config, { dev, isServer }) => {
    // Optimize for production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
