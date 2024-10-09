/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Hoặc 'http' nếu cần
        hostname: 'image.tmdb.org', // Địa chỉ của TMDB
        port: '', // Để trống nếu không sử dụng cổng tùy chỉnh
        pathname: '/**', // Sử dụng dấu hoa thị để cho phép bất kỳ đường dẫn nào
      },
    ],
  },
};

export default nextConfig;
