"use client";

import { useMemo, useState } from "react";
import MainBanner from "@/features/textbooks/components/MainBanner";
import TextbookSearch from "@/features/textbooks/components/TextbookSearch";
import TextbookCategoryFilter, {
  type TextbookCategory,
} from "@/features/textbooks/components/TextbookCategoryFilter";
import TextbookGrid from "@/features/textbooks/components/TextbookGrid";
import { useBanners } from "@/features/textbooks/hooks/useBanners";
import { useTextbooks } from "@/features/textbooks/hooks/useTextbooks";

// 교재 목록 페이지. 화면 조합만 담당하고 데이터는 hook을 통해 받는다.
// 검색어/카테고리는 page가 소유하고, 조회된 교재에 적용해 그리드로 전달한다.
export default function Home() {
  const { banners } = useBanners();
  const { textbooks, isLoading, error } = useTextbooks();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TextbookCategory>("전체");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return textbooks.filter((textbook) => {
      const matchesCategory =
        category === "전체" || textbook.textbook_type === category;
      const matchesKeyword =
        keyword === "" || textbook.title.toLowerCase().includes(keyword);
      return matchesCategory && matchesKeyword;
    });
  }, [textbooks, query, category]);

  return (
    <>
      {/* 배너는 메인 콘텐츠 프레임 밖의 full-bleed 영역 */}
      <MainBanner banners={banners} />

      {/* 메인 콘텐츠 프레임 — 검색/카테고리 행 + 교재 그리드 */}
      <main className="flex-1 px-5 py-[50px] lg:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-9">
          {/* 검색 + 카테고리 행 (우측 정렬, gap 17) */}
          <div className="flex items-center justify-end gap-[17px]">
            <TextbookSearch onSearch={setQuery} />
            <TextbookCategoryFilter selected={category} onSelect={setCategory} />
          </div>

          {/* 교재 그리드 — 로딩/에러/빈 상태 분리 */}
          {error ? (
            <p className="py-20 text-center text-base text-[#979CA5]">
              교재를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </p>
          ) : isLoading ? (
            <p className="py-20 text-center text-base text-[#979CA5]">불러오는 중…</p>
          ) : textbooks.length === 0 ? (
            <p className="py-20 text-center text-base text-[#979CA5]">표시할 교재가 없습니다.</p>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-base text-[#979CA5]">검색 결과가 없습니다.</p>
          ) : (
            <TextbookGrid textbooks={filtered} />
          )}
        </div>
      </main>
    </>
  );
}
