# Hidden Kice 설계 메모

이 문서는 README 작성 전 논의한 설계 고민과 결정 이유를 정리한 메모입니다.

## 1. 컴포넌트 분리 기준

Figma의 Frame 단위를 그대로 컴포넌트로 옮기기보다, 실제 서비스에서의 재사용 가능성과 기능 확장 가능성을 기준으로 분리하기로 했습니다.

분리 대상은 다음과 같습니다.

- Header
- Footer
- TextbookMainBanner
- TextbookSearch
- TextbookCategoryFilter
- TextbookGrid
- TextbookCard

### Header, Footer

Header와 Footer는 여러 페이지에서 반복적으로 사용될 수 있는 공통 레이아웃이므로 분리합니다.

### TextbookCard, TextbookGrid

TextbookCard는 개별 교재 정보를 표현하는 최소 단위 UI이고, TextbookGrid는 교재 배열의 배치와 반응형 레이아웃만 담당합니다.

카드 UI 변경과 목록 레이아웃 변경을 독립적으로 관리하기 위해 둘을 분리합니다.

### TextbookSearch

검색은 현재는 단순 입력 UI처럼 보이지만, 이후 검색어 상태, 초기화, 디바운싱, Supabase 쿼리 조건 변경 같은 독립 기능이 추가될 가능성이 큽니다.

따라서 교재 목록이나 카드와 분리된 독립 컴포넌트로 구성합니다.

### TextbookCategoryFilter

`전체`, `단품`, `패스` 같은 유형 필터는 교재 목록 조회 조건과 연결될 수 있으므로 검색과 별도 컴포넌트로 분리합니다.

## 2. 도메인 명칭 결정

처음에는 가격, 장바구니, 구매 상태가 있기 때문에 `products` 도메인도 고려할 수 있었습니다.

하지만 과제 요구사항이 “교재 정보”를 Supabase에 넣고 CSR로 불러오는 것이고, 화면의 핵심 엔티티도 일반 상품보다 학습용 교재에 가깝다고 판단했습니다.

따라서 도메인명은 `products`가 아니라 `textbooks`로 정했습니다.

## 3. MainBanner 위치 결정

MainBanner는 전역 공통 배너가 아니라 교재 목록 페이지에서 교재를 홍보하기 위한 도메인 배너입니다.

따라서 `components/layout`이 아니라 `features/textbooks/components` 내부에 배치하는 것이 맞다고 판단했습니다.

만약 추후 사이트 전체 공통 프로모션 배너로 성격이 바뀐다면 그때 `components/layout` 또는 공통 영역으로 이동할 수 있습니다.

## 4. Supabase 데이터 설계

이번 과제의 필수 구현 범위는 교재 목록과 교재 메인 배너를 Supabase에서 CSR로 조회해 화면에 표시하는 것입니다.

### textbooks

교재 기본 정보를 저장합니다.

주요 필드:

- `id`
- `title`
- `textbook_type`
- `image_url`
- `original_price`
- `discount_rate`
- `price`
- `display_order`
- `is_active`
- `created_at`

판매가 `price`는 클라이언트에서 계산하지 않고 DB에 저장된 값을 사용합니다.

할인율과 정가만으로 판매가를 계산할 수도 있지만, 실제 서비스에서는 이벤트, 쿠폰, 관리자 수동 가격 조정 등으로 인해 계산값과 실제 판매가가 달라질 수 있기 때문입니다.

### banners

Figma에는 배너가 정적인 이미지처럼 보이지만, 실제 서비스에서는 운영자가 교체하거나 노출 순서를 바꿀 수 있는 영역이라고 판단했습니다.

따라서 배너는 코드에 하드코딩하지 않고 Supabase에서 조회하는 운영 데이터로 설계합니다.

주요 필드:

- `id`
- `title`
- `image_url`
- `link_url`
- `display_order`
- `is_active`
- `created_at`

## 5. 구매 여부에 따른 표시 정책

교재 목록은 단순히 `textbooks` 테이블의 데이터를 그대로 보여주는 것만으로는 부족할 수 있습니다.

실제 서비스에서는 사용자가 이미 구매한 교재인지에 따라 다음처럼 UI가 달라질 수 있습니다.

- 목록에서 제외
- 구매 완료 뱃지 표시
- 구매 버튼 비활성화
- 학습하기 버튼으로 변경
- 패스 상품 구매 시 포함된 단품 교재 표시 방식 변경

구매 여부는 교재 자체의 속성이 아니라 사용자별 상태입니다.

따라서 `textbooks` 테이블에 `is_purchased` 같은 필드를 직접 두지 않고, 사용자별 교재 접근 권한 테이블을 따로 두는 방향을 고려했습니다.

예상 테이블명:

- `user_textbook_entitlements`

이 테이블은 결제 취소, 환불, 관리자 지급, 기간제 패스 만료 같은 상황까지 대응하기 위한 확장 지점입니다.

## 6. 폴더 구조 설계

단일 페이지 과제이지만, 이후 장바구니, 주문, 인증, 마이페이지, 교재 상세 페이지로 확장될 가능성을 고려해 feature 중심 구조로 설계합니다.

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── icon.svg          # 파비콘 (App Router 파일 규칙)
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── IconButton.tsx
│       ├── Logo.tsx
│       └── SearchInput.tsx
│
├── features/
│   └── textbooks/
│       ├── index.ts          # 공개 API(배럴) — 외부는 이 파일로만 접근
│       ├── api/
│       │   ├── textbookApi.ts
│       │   └── bannerApi.ts
│       ├── components/
│       │   ├── MainBanner.tsx
│       │   ├── TextbookSearch.tsx
│       │   ├── TextbookCategoryFilter.tsx
│       │   ├── TextbookGrid.tsx
│       │   └── TextbookCard.tsx
│       ├── hooks/
│       │   ├── useTextbooks.ts
│       │   └── useBanners.ts
│       ├── types/
│       │   ├── textbook.ts        # 엔티티 타입은 DB 테이블명 기준(Textbook)
│       │   └── banner.ts          # 엔티티 타입은 DB 테이블명 기준(Banner)
│       └── utils/
│           └── formatPrice.ts
│
├── lib/
│   └── supabase/
│       ├── index.ts          # 공개 API(배럴)
│       ├── client.ts
│       └── storage.ts
│
└── (globals.css 는 app/ 에 위치)
```

핵심 기준:

- 재사용 가능한 UI와 도메인 전용 UI를 분리합니다.
- 페이지 컴포넌트는 화면 조합만 담당합니다.
- Supabase 조회 로직은 컴포넌트 내부에 직접 작성하지 않습니다.
- 교재 관련 로직은 `features/textbooks`에 응집시킵니다.
- **각 기능/인프라는 `index.ts` 배럴로 공개 API만 노출**합니다. 외부(app, 다른 기능)는 배럴을 통해서만 접근하고, 내부 구현(`TextbookCard`, `api/*`, `utils/*`)은 비공개로 둡니다. → 경계가 강제되어 내부 리팩터링이 자유롭습니다.
- **엔티티 타입은 소유 기능이 가집니다.** `Textbook`/`Banner` 타입은 `features/textbooks`가 소유하고, 다른 기능(예: 향후 `cart`)은 이를 **import만**(단방향 의존) 합니다. 파일명은 DB 테이블명을 따르고(`textbook.ts`/`banner.ts`), 동작(컴포넌트·훅·api)에는 도메인 접두사를 둡니다(`TextbookGrid`, `useTextbooks`). 단, 도메인 폴더로 이미 네임스페이스가 명확한 경우 `MainBanner`처럼 접두사를 생략할 수 있습니다.

## 7. Tailwind CSS와 이미지 최적화

Tailwind CSS는 Figma의 간격, 색상, 카드 크기, 반응형 레이아웃을 빠르게 구현하기 위해 사용합니다.

클래스가 길어질 수 있는 문제는 의미 있는 컴포넌트 분리로 해결합니다.

교재 표지와 배너 이미지는 화면에서 차지하는 비중이 크기 때문에 WebP 포맷을 우선 사용합니다.

DB에는 이미지 파일 자체가 아니라 이미지 URL만 저장하고, 렌더링은 Next.js `Image` 컴포넌트를 사용하는 방향으로 고려합니다.

## 8. 인터랙션 확장 고려

Figma 화면에 있는 배너 페이지 표시, 알림 badge, 장바구니 badge는 단순 장식이 아니라 데이터와 인터랙션이 연결될 수 있는 확장 지점으로 판단했습니다.

### 배너

`1/5` 표시가 있으므로 다음 기능으로 확장할 수 있습니다.

- 이전/다음 이동
- 자동 롤링
- 현재 배너 번호 표시
- 배너 클릭 시 `link_url` 이동

### 알림

알림 아이콘 badge는 사용자별 읽지 않은 알림 수로 확장할 수 있습니다.

클릭 시 알림 드롭다운 또는 패널을 열고, 읽음 처리와 관련 페이지 이동을 붙일 수 있습니다.

### 장바구니

장바구니 badge는 사용자가 담은 교재 수로 확장할 수 있습니다.

추후 `cart_items` 데이터를 기준으로 badge count를 계산하고, 클릭 시 장바구니 페이지로 이동하도록 구성할 수 있습니다.

## 9. 구현 범위와 확장 범위 구분

이번 과제에서는 교재 목록과 교재 메인 배너를 Supabase에서 CSR로 조회해 화면에 표시하는 것을 필수 구현 범위로 둡니다.

장바구니, 주문, 구매 권한, 알림, 관리자 배너 등록 기능은 실제 구현 범위에는 포함하지 않지만, 이후 확장을 고려해 데이터 구조와 폴더 구조에서 분리 가능하도록 설계합니다.
