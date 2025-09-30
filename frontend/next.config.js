/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8000/api/:path*'
                    : 'http://backend:8000/api/:path*',
            },
        ]
    },
    // PWA configuration
    async headers() {
        return [
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig