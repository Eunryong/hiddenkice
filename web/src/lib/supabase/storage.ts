const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// DB의 image_url(예: "image/banner/main_banner.webp" = 버킷/경로)을
// Supabase Storage public URL로 변환한다.
// image_url 자체가 "버킷/경로" 형태라 public 접두사 뒤에 그대로 붙인다.
export function storageUrl(imagePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${imagePath}`;
}
