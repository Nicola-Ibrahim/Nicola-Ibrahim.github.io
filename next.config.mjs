/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure the base path is correct for GitHub Pages if needed.
  // For <username>.github.io, it is usually root '/'.
  // If it was a project repo like /my-portfolio, we'd need:
  // basePath: '/Nicola-Ibrahim.github.io',
};

export default nextConfig;
