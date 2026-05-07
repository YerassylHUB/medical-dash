/** @type {import('next').NextConfig} */
const BACKEND = process.env.BACKEND_URL || "http://127.0.0.1:4000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND}/v1/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/activity", destination: "/leadership/activity", permanent: false },
      { source: "/plan-fact", destination: "/leadership/plan-fact", permanent: false },
      { source: "/services-plan", destination: "/leadership/services-plan", permanent: false },
      { source: "/markers", destination: "/leadership/markers", permanent: false },
      { source: "/doctors-load", destination: "/leadership/doctors-load", permanent: false },
      { source: "/analysis", destination: "/leadership/analysis", permanent: false },
      { source: "/analysis/:path*", destination: "/leadership/analysis/:path*", permanent: false },
    ];
  },
};

module.exports = nextConfig;
