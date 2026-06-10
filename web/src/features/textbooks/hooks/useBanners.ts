"use client";

import { useEffect, useState } from "react";
import { fetchBanners } from "../api/bannerApi";
import type { Banner } from "../types/banner";

// 메인 배너 목록을 CSR로 조회한다. 교재 목록과 독립적으로 상태를 관리한다.
export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchBanners()
      .then((data) => {
        if (!ignore) setBanners(data);
      })
      .catch((err: unknown) => {
        if (!ignore) setError(err as Error);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { banners, isLoading, error };
}
