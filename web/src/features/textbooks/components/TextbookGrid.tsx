import TextbookCard from "./TextbookCard";
import type { Textbook } from "../types/textbook";

// 교재 배열을 받아 반응형 Grid 배치만 담당. 개별 카드 UI는 TextbookCard가 담당한다.
// Figma는 1280에서 4열(카드 250)·세로 gap 36이지만, 고정 좌표 대신 반응형 그리드로 재구성한다.
interface TextbookGridProps {
  textbooks: Textbook[];
}

export default function TextbookGrid({ textbooks }: TextbookGridProps) {
  return (
    <ul className="grid grid-cols-1 justify-items-center gap-x-[30px] gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[93.33px]">
      {textbooks.map((textbook) => (
        <li key={textbook.id} className="w-full max-w-[250px]">
          <TextbookCard textbook={textbook} />
        </li>
      ))}
    </ul>
  );
}
