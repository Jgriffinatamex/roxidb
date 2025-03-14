/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
            {
                protocol: 'https',
                hostname: 'imgages.clerk.dev'
            },
            {
                protocol: 'https',
                hostname: 'lovely-flamingo-139.convex.cloud'
            }
        ]
    }
};

export default nextConfig;