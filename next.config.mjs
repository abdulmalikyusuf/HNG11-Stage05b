/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oazbditlakstzwznhzcf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/profile-photos/**",
      },
      {
        protocol: "https",
        hostname: "oazbditlakstzwznhzcf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/devlinks/avatars/**",
      },
    ],
  },
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
