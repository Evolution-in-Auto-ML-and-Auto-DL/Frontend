const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['hqvjoyvkzizlzyreqtzj.supabase.co', 'lh3.googleusercontent.com', 'https://lh3.googleusercontent.com'],
  },
});
