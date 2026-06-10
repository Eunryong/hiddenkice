import type { ButtonHTMLAttributes, ReactNode } from "react";

// 장바구니/알림/사용자 등 아이콘 단독 버튼을 위한 재사용 UI.
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}
