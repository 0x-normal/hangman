/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configs ...
  async redirects() {
    return [
      {
        source: '/',
        destination: '/hangman.html', // Use the path relative to the public directory
        permanent: true,
      },
    ];
  },
  output: 'export',
};

module.exports = nextConfig;
