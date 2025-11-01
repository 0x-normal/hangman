/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add an async rewrites function
  async rewrites() {
    return [
      {
        // Source path: When a user visits the root of the app (e.g., https://your-app.com/)
        source: '/',
        // Destination path: Tell Next.js to internally serve the static HTML file
        destination: '/public/hangman.html',
      },
    ];
  },

  // This setting ensures static files like hangman.html are treated correctly by the server
  // and is often a good default for Mini Apps.
  output: 'export', 
};

module.exports = nextConfig;

