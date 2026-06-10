// 가격을 "25,200원" 형태로 표시한다. 판매가 계산은 하지 않고 표시만 담당한다.
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ko-KR")}원`;
}
