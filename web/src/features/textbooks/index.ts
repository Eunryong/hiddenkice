// textbooks 기능의 공개 API(배럴).
// 외부(app 등)는 반드시 이 파일을 통해서만 textbooks에 접근한다.
// 내부 구현(TextbookCard, api/*, utils/*)은 의도적으로 노출하지 않는다 —
// 경계를 강제해 내부 리팩터링을 자유롭게 하기 위함.

// components
export { default as MainBanner } from "./components/MainBanner";
export { default as TextbookSearch } from "./components/TextbookSearch";
export { default as TextbookGrid } from "./components/TextbookGrid";
export {
  default as TextbookCategoryFilter,
  TEXTBOOK_CATEGORIES,
  type TextbookCategory,
} from "./components/TextbookCategoryFilter";

// hooks
export { useTextbooks } from "./hooks/useTextbooks";
export { useBanners } from "./hooks/useBanners";

// types
export type { Textbook, TextbookType } from "./types/textbook";
export type { Banner } from "./types/banner";
