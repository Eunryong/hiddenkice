import { supabase } from "@/lib/supabase/client";
import type { Banner } from "../types/banner";

// 노출 대상 메인 배너를 display_order 순으로 조회한다.
export async function fetchBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
