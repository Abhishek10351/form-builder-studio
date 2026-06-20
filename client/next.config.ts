import  { NextConfig } from "next";

const nextConfig: NextConfig = {
     
    allowedDevOrigins: [
        '127.0.0.1',
        "192.168.*.*"
    ],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
    },
};

export default nextConfig;
