import Link from "next/link";
import IconButton from "@/components/ui/IconButton";
import Logo from "@/components/ui/Logo";

// 로고, 메뉴, 장바구니, 알림, 사용자 아이콘을 포함하는 상단 공통 영역(GNB).
// Figma 스펙: 흰 배경 + box-shadow, 높이 100px, 내부 max-width 1280px.
// 메뉴 Pretendard 600/18px, 활성 #7F77DD(primary)·비활성 #979CA5(gray-300).
// 아이콘 stroke #636873(gray-500) 2px, 장바구니·알림에 primary badge.

const NAV_ITEMS = [
  { label: "스토어", href: "/", active: true },
  { label: "AI OMR WORK", href: "#" },
  { label: "챌린지", href: "#" },
  { label: "히든카이스 소개", href: "#" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center bg-white px-20 py-[10px] shadow-[0px_3px_4px_rgba(0,0,0,0.12)]">
      <div className="flex h-20 w-full max-w-[1280px] items-center">
        {/* 로고 + 메뉴 (879) — 좌측 정렬, 남는 공간은 그룹 내부 우측 여백 */}
        <div className="flex flex-[879] items-center gap-8 lg:gap-[100px]">
          <Link href="/" aria-label="HIDDEN KICE 홈" className="shrink-0 text-brand">
            <Logo className="h-[18px] w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap text-lg font-semibold leading-[1.6] transition-colors ${
                  item.active ? "text-brand" : "text-[#979CA5] hover:text-[#636873]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 장바구니 / 알림 / 사용자 (401) — 좌측 여백 두고 우측 정렬 */}
        <div className="flex flex-[401] items-center justify-end gap-6">
          <IconButton
            aria-label="장바구니"
            className="relative flex items-center text-[#636873] transition-colors hover:text-brand"
          >
            <CartIcon />
            {/* TODO: cart_items 기준 실제 수량으로 교체 */}
            <Badge count={1} />
          </IconButton>

          <IconButton
            aria-label="알림"
            className="relative flex items-center text-[#636873] transition-colors hover:text-brand"
          >
            <BellIcon />
            {/* TODO: 읽지 않은 알림 수로 교체 */}
            <Badge count={1} />
          </IconButton>

          <IconButton
            aria-label="내 정보"
            className="flex items-center text-[#636873] transition-colors hover:text-brand"
          >
            <UserIcon />
          </IconButton>

          {/* 모바일 메뉴 버튼 */}
          <IconButton
            aria-label="메뉴 열기"
            className="flex items-center text-[#636873] transition-colors hover:text-brand lg:hidden"
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

// 장바구니/알림 수량 badge. primary 원형 + 흰 숫자. 0이면 표시하지 않는다.
function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1.5 left-3.5 flex size-[15px] items-center justify-center rounded-full bg-brand text-[10px] font-normal leading-[1.4] text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function CartIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}
