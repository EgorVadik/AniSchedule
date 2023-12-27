const withPWA = require('next-pwa')({
    dest: 'public',
    cacheOnFrontEndNav: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === 'development',
    disableDevLogs: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'u.livechart.me',
            },
        ],
    },
}

module.exports = withPWA(nextConfig)
