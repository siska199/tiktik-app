/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env :{
    PROJECT_ID : process.env.NEXT_PUBLIC_PROJECT_ID,
    DATASET : process.env.NEXT_PUBLIC_DATASET,
    TOKEN : process.env.NEXT_PUBLIC_SANITY_TOKEN,
    BASE_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET : process.env.JWT_SECRET
  }
}

module.exports = nextConfig
