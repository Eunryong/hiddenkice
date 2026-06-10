import type { NextConfig } from "next";

// Supabase Storage public 이미지를 next/image로 최적화하기 위해 호스트를 허용한다.
// 프로젝트 ref 하드코딩 대신 env의 Supabase URL에서 호스트를 추출한다.
const supabaseHost = new URL(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co"
).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
