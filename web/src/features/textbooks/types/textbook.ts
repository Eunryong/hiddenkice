// textbooks 테이블 한 행에 대응하는 타입. (DDL은 README 참고)
export type TextbookType = "단품" | "패스";

export interface Textbook {
  id: number;
  title: string;
  textbook_type: TextbookType;
  image_url: string | null;
  original_price: number | null;
  discount_rate: number;
  price: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
}
