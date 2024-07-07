/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return {
      beforeFiles: [{ source: '/api/proxy/:path*', destination: 'http://127.0.0.1:8111/:path*' }],
    };
  },
  async redirects() {
    return [
      {
        source: '/campaign/levels/:slug',
        destination: '/campaign/levels/:slug/prebattle',
        permanent: true,
      },
    ];
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
