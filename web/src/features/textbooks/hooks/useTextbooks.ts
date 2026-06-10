"use client";

import { useEffect, useState } from "react";
import { fetchTextbooks } from "../api/textbookApi";
import type { Textbook } from "../types/textbook";

// 교재 목록을 CSR로 조회하고 로딩/에러/데이터 상태를 함께 반환한다.
// 페이지는 직접 fetch하지 않고 이 hook이 노출하는 상태만 사용한다.
export function useTextbooks() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchTextbooks()
      .then((data) => {
        if (!ignore) setTextbooks(data);
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

  return { textbooks, isLoading, error };
}
