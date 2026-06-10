import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 교재/배너 데이터를 CSR로 조회하기 위한 단일 Supabase 클라이언트.
// 컴포넌트에서 직접 만들지 않고 이 인스턴스를 재사용한다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
