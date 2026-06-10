"use client";

import { useState } from "react";

// 검색 영역. Figma: 250×42, border #CED0D4, radius 6, 검색아이콘 + "검색" placeholder + x(clear).
// 입력값은 로컬 draft로 두고 엔터(제출) 시에만 onSearch로 커밋한다. (키 입력마다 필터링하지 않음)
// x 버튼은 입력과 검색 결과를 함께 초기화한다.
interface TextbookSearchProps {
  onSearch: (value: string) => void;
}

export default function TextbookSearch({ onSearch }: TextbookSearchProps) {
  const [draft, setDraft] = useState("");

  const handleClear = () => {
    setDraft("");
    onSearch("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(draft.trim());
      }}
      className="flex h-[42px] w-[250px] items-center gap-2 rounded-[6px] border border-[#CED0D4] p-2"
    >
      <div className="flex flex-1 items-center gap-1.5">
        <SearchIcon />
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="검색"
          className="w-full bg-transparent text-base font-semibold leading-[1.6] text-[#1C1E21] placeholder:text-[#979CA5] focus:outline-none"
        />
      </div>
      {draft && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={handleClear}
          className="shrink-0 text-[#979CA5]"
        >
          <XIcon />
        </button>
      )}
    </form>
  );
}

function SearchIcon() {
  return (
    <svg className="size-5 shrink-0 text-[#979CA5]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
