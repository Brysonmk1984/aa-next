/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: '/api/proxy/:path*', destination: 'http://127.0.0.1:8111/:path*' }],
    };
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
