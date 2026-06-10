import type { InputHTMLAttributes } from "react";

// 검색 입력 전용 재사용 UI. 검색 로직(디바운싱 등)은 상위 컴포넌트가 담당한다.
type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput(props: SearchInputProps) {
  return <input type="search" {...props} />;
}
