import Image from "next/image";
import { storageUrl } from "@/lib/supabase";
import { formatPrice } from "../utils/formatPrice";
import type { Textbook } from "../types/textbook";

// 개별 교재 카드. Figma: 이미지 박스(250×320) + 유형/제목/가격.
// 갭: 이미지→정보 4px, 제목→가격 8px, 할인율→판매가 6px (유형→제목은 붙임).
// 가격은 DB의 price를 기준 판매가로 쓰고, original_price/discount_rate는 표시용.
// 할인(discount_rate > 0)이 있으면 정가(취소선) + 할인율 + 판매가, 없으면 판매가만.
interface TextbookCardProps {
  textbook: Textbook;
}

export default function TextbookCard({ textbook }: TextbookCardProps) {
  const { title, textbook_type, image_url, original_price, discount_rate, price } = textbook;
  const hasDiscount = discount_rate > 0 && original_price != null;

  return (
    <article className="flex w-[250px] flex-col gap-1">
      {/* 표지 이미지 박스 */}
      <div className="relative h-[320px] w-[250px] overflow-hidden rounded-[6px] border border-[#E9EAEC] bg-white">
        {image_url && (
          <Image
            src={storageUrl(image_url)}
            alt={title}
            fill
            sizes="250px"
            className="object-cover"
          />
        )}
      </div>

      {/* 정보 */}
      <div className="flex flex-col">
        <p className="text-base font-semibold leading-[1.6] text-[#979CA5]">
          {textbook_type}
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold leading-[1.6] text-black">{title}</p>

          <div className="flex flex-col">
            {hasDiscount && (
              <p className="text-sm font-medium leading-[1.5] text-[#B2B6BD] line-through">
                {formatPrice(original_price)}
              </p>
            )}
            <div className="flex items-center gap-1.5">
              {hasDiscount && (
                <span className="text-base font-semibold leading-[1.6] text-[#FA622F]">
                  {discount_rate}%
                </span>
              )}
              <span className="text-base font-semibold leading-[1.6] text-black">
                {formatPrice(price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
