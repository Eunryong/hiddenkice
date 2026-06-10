"use client";

import { Fragment } from "react";

// 교재 유형 필터. Figma: 전체 | 단품 | 패스, gap 11, Pretendard 600/16.
// 활성 #1C1E21(gray-800) · 비활성/구분자 #979CA5(gray-300).
// controlled — 선택 상태는 상위(page)가 소유하고 조회 조건으로 사용한다.
export type TextbookCategory = "전체" | "단품" | "패스";
export const TEXTBOOK_CATEGORIES: TextbookCategory[] = ["전체", "단품", "패스"];

interface TextbookCategoryFilterProps {
  selected: TextbookCategory;
  onSelect: (category: TextbookCategory) => void;
}

export default function TextbookCategoryFilter({
  selected,
  onSelect,
}: TextbookCategoryFilterProps) {
  return (
    <div className="flex items-center gap-[11px] text-base font-semibold leading-[1.6]">
      {TEXTBOOK_CATEGORIES.map((category, i) => (
        <Fragment key={category}>
          {i > 0 && (
            <span className="text-[#979CA5]" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={selected === category}
            className={selected === category ? "text-[#1C1E21]" : "text-[#979CA5]"}
          >
            {category}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
