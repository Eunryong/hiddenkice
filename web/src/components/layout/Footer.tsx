import Link from "next/link";

// 회사 정보, 약관 링크, 저작권을 포함하는 하단 공통 영역.
// Figma 스펙: 흰 배경, 텍스트 전부 Pretendard 500 / 14px / 150% / #B2B6BD(gray-200).

const POLICY_LINKS = [
  { label: "회사소개", href: "#" },
  { label: "이용약관", href: "#" },
  { label: "개인정보처리방침", href: "#" },
];

const COMPANY_INFO = [
  "(주)히든카이스 | 대표: 안영호 | 사업자등록번호: 735-87-02522 (사업자정보확인)",
  "주소: 경기도 고양시 일산서구 일현로 97-11, 56F | 통신판매업신고: 제 2024-고양일산서-1209 | 이메일: Hidden_kice@naver.com",
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-white px-[60px] py-10">
      <div className="flex w-full max-w-[1320px] flex-col items-start gap-2 text-sm font-medium leading-[1.5] text-[#B2B6BD]">
        {/* 약관 링크 */}
        <nav className="flex flex-row flex-wrap items-center gap-3">
          {POLICY_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">|</span>}
              <Link href={link.href} className="transition-colors hover:text-zinc-500">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* 회사 정보 */}
        <p className="break-keep">
          {COMPANY_INFO.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        {/* 저작권 */}
        <p>Copyright © 2026 히든카이스. All rights reserved.</p>
      </div>
    </footer>
  );
}
