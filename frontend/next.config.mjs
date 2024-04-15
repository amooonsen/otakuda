/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://openapi.naver.com/:path*",
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      // svg 확장자 변환 로직
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
};

export default nextConfig;
