/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export → uploads straight to Hostinger public_html/
  output: 'export',
  // Each route becomes a folder with index.html (clean URLs on shared hosting)
  trailingSlash: true,
  // No Next image optimization server on static hosting
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
