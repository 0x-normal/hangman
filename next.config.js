/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use redirects instead of rewrites for the static file entry point
  async redirects() {
    return [
      {
        // Source path: When a user visits the root of the app
        source: '/',
        // Destination path: Redirects the browser to the static HTML file
        destination: '/hangman.html',
        // Make this a permanent redirect
        permanent: true,
      },
    ];
  },

  // This is still required to create the static build
  output: 'export', 
};

module.exports = nextConfig;
