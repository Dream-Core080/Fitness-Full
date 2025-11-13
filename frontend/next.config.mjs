/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_API_URL: "http://localhost:5004/api",
    FIREBASE_API: "AIzaSyB00s1AAWCcODQKBRL2Q30lE9-x3MBQTis"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;