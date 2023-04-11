/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: "public",
  sw: 'OneSignalSDKWorker.js'
  // register: false,
  // skipWaiting: false
  // disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  // next.js config
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN]
  }
})
