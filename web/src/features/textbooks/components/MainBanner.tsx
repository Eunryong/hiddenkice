import Image from "next/image";
import { storageUrl } from "@/lib/supabase";
import type { Banner } from "../types/banner";

// 교재 목록 페이지의 도메인 프로모션 배너. full-bleed(1440), 비율 1440:491 유지.
// 이미지는 Supabase Storage(public 버킷)에서 가져온다.
// 여러 배너 순차 노출(캐러셀)은 확장 지점 — 현재는 display_order 우선 배너 1개를 표시.
interface MainBannerProps {
  banners: Banner[];
}

export default function MainBanner({ banners }: MainBannerProps) {
  const banner = banners[0];
  if (!banner) return null;

  return (
    <section className="w-full">
      <div className="relative aspect-[1440/491] w-full">
        <Image
          src={storageUrl(banner.image_url)}
          alt={banner.title ?? "메인 배너"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
