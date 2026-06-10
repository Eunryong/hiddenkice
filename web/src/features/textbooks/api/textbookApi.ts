import { supabase } from "@/lib/supabase";
import type { Textbook } from "../types/textbook";

// 노출 대상 교재 목록을 display_order 순으로 조회한다.
// Supabase 쿼리는 이 api 레이어에만 두고 컴포넌트에는 두지 않는다.
export async function fetchTextbooks(): Promise<Textbook[]> {
  const { data, error } = await supabase
    .from("textbooks")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
