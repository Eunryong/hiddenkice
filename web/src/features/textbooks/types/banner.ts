// banners 테이블 한 행에 대응하는 타입. (DDL은 README 참고)
export interface Banner {
  id: number;
  title: string | null;
  image_url: string;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}
