# Hidden Kice Textbook Page

Next.js 기반으로 구현하는 교재 목록 페이지입니다.

Figma 시안의 화면을 기준으로 Header, 교재 메인 배너, 검색/카테고리 영역, 교재 목록, Footer를 구성하고, 교재 및 배너 데이터는 Supabase에서 CSR 방식으로 조회하는 것을 목표로 합니다.

## 요구사항

- Next.js로 구현
- 화면에 보이는 영역 중심으로 구현
- Supabase에 교재 더미 데이터를 저장
- 교재 정보를 CSR 방식으로 조회해 화면에 표시
- GitHub에 코드 업로드
- Vercel을 이용해 배포
- 향후 확장을 고려한 폴더 구조 설계

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

### Next.js

Vercel 배포와 잘 맞고, App Router 기반으로 페이지와 레이아웃을 구조화하기 좋다고 판단했습니다.

### TypeScript

Supabase에서 조회하는 교재, 배너 데이터의 구조를 타입으로 정의해 컴포넌트 간 props 계약을 명확하게 관리하기 위해 사용합니다.

### Tailwind CSS

Figma 시안은 간격, 색상, 카드 크기, 반응형 배치처럼 스타일 값이 많은 화면입니다.

Tailwind CSS를 사용하면 컴포넌트 안에서 레이아웃과 스타일을 빠르게 조합할 수 있고, 반응형 그리드도 명확하게 표현할 수 있다고 판단했습니다.

다만 Tailwind 클래스가 길어질 수 있는 부분은 Header, TextbookCard, TextbookGrid처럼 의미 있는 컴포넌트로 분리해 가독성을 유지합니다.

### Supabase

교재 목록과 메인 배너 데이터를 DB에서 관리하고, 과제 요구사항에 맞게 클라이언트 사이드에서 조회하기 위해 사용합니다.

### WebP 이미지

교재 표지와 메인 배너는 화면에서 차지하는 비중이 크기 때문에 이미지 최적화를 고려합니다.

이미지는 용량 대비 품질 효율이 좋은 WebP 포맷을 우선 사용하고, DB에는 이미지 파일 자체가 아니라 이미지 URL만 저장합니다.

## 화면 구현 기준

Figma에는 `1440px` 고정 너비, absolute position 등 디자인 도구에서 생성된 값이 포함되어 있습니다.

실제 구현에서는 이 값을 그대로 복사하기보다, 화면의 시각적 비율, 간격, 색상, 정보 계층은 유지하되 웹 환경에 맞는 Flex/Grid 기반 레이아웃으로 재구성합니다.

특히 교재 목록은 고정 좌표가 아니라 반응형 Grid로 구성해 화면 크기에 따라 자연스럽게 배치되도록 설계합니다.

## 컴포넌트 분리 기준

컴포넌트는 Figma의 Frame 단위를 그대로 따르기보다, 실제 서비스에서의 재사용 가능성과 기능 확장 가능성을 기준으로 분리합니다.

### Header

Header는 로고, 메뉴, 장바구니, 알림, 사용자 아이콘을 포함하는 상단 공통 영역입니다.

교재 목록 페이지뿐 아니라 다른 페이지에서도 반복적으로 사용될 가능성이 높기 때문에 재사용 가능한 공통 레이아웃 컴포넌트로 분리합니다.

### Footer

Footer는 회사 정보, 약관 링크, 저작권 정보를 포함하는 하단 공통 영역입니다.

Header와 마찬가지로 여러 페이지에서 동일하게 사용될 수 있으므로 별도 컴포넌트로 분리합니다.

### TextbookMainBanner

메인 배너는 Header나 Footer처럼 모든 페이지에서 반복되는 전역 공통 영역이 아니라, 교재 목록 페이지에서 교재를 홍보하기 위한 상품 도메인 배너라고 판단했습니다.

따라서 `components/layout`이 아니라 `features/textbooks/components` 내부에 배치합니다.

또한 Figma 시안에 `1/5` 페이지 표시가 있기 때문에 단일 이미지가 아니라 여러 개의 운영 배너를 순차적으로 보여주는 영역으로 판단했습니다. 배너 데이터는 코드에 하드코딩하지 않고 Supabase에서 조회하도록 설계합니다.

### TextbookSearch

검색 영역은 현재 화면에서는 단순 입력 UI처럼 보이지만, 실제 서비스에서는 검색어 입력, 초기화, 디바운싱, Supabase 쿼리 조건 변경 같은 독립적인 기능이 추가될 가능성이 높습니다.

따라서 검색 영역을 별도 컴포넌트로 분리해 이후 검색 기능이 확장되더라도 교재 카드나 그리드에 영향을 주지 않도록 설계합니다.

### TextbookCategoryFilter

카테고리 필터는 `전체`, `단품`, `패스`와 같은 교재 유형 선택을 담당합니다.

선택 상태에 따라 교재 목록 조회 조건이 달라질 수 있으므로 검색과 분리된 독립 컴포넌트로 구성합니다.

### TextbookGrid

TextbookGrid는 교재 배열을 받아 목록의 배치와 반응형 그리드 레이아웃을 담당합니다.

개별 교재 UI는 TextbookCard가 담당하고, TextbookGrid는 목록을 어떤 구조로 배치할지만 책임지도록 분리합니다. 이렇게 하면 카드 디자인 변경과 목록 레이아웃 변경을 독립적으로 관리할 수 있습니다.

### TextbookCard

TextbookCard는 개별 교재의 이미지, 유형, 제목, 정가, 할인율, 판매가를 보여주는 최소 단위 UI입니다.

교재 카드는 메인 목록뿐 아니라 추천 교재, 관련 교재, 구매 완료 교재 등 다른 화면에서도 재사용될 수 있다고 판단해 독립 컴포넌트로 분리합니다.

## 폴더 구조

단일 페이지 과제이지만, 이후 장바구니, 주문, 마이페이지, 교재 상세 페이지로 확장될 가능성을 고려해 feature 중심 구조로 설계합니다.

```txt
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── IconButton.tsx
│       └── SearchInput.tsx
│
├── features/
│   └── textbooks/
│       ├── api/
│       │   ├── textbookApi.ts
│       │   └── textbookBannerApi.ts
│       ├── components/
│       │   ├── TextbookMainBanner.tsx
│       │   ├── TextbookSearch.tsx
│       │   ├── TextbookCategoryFilter.tsx
│       │   ├── TextbookGrid.tsx
│       │   └── TextbookCard.tsx
│       ├── hooks/
│       │   ├── useTextbooks.ts
│       │   └── useTextbookBanners.ts
│       ├── types/
│       │   ├── textbook.ts
│       │   └── textbookBanner.ts
│       └── utils/
│           └── formatPrice.ts
│
├── lib/
│   └── supabase/
│       └── client.ts
│
└── styles/
    └── globals.css
```

### 구조 설계 기준

- 재사용 가능한 UI와 도메인 전용 UI를 분리합니다.
- 페이지 컴포넌트는 전체 화면 조합만 담당합니다.
- Supabase 조회 로직은 컴포넌트 내부에 직접 작성하지 않습니다.
- 교재 관련 코드가 흩어지지 않도록 `features/textbooks`에 응집시킵니다.
- 이후 장바구니, 주문, 인증, 마이페이지 기능이 추가되어도 같은 패턴으로 확장할 수 있게 합니다.

## 도메인 명칭 결정

초기에는 가격, 장바구니, 구매 상태가 있어 `products` 도메인명을 고려할 수 있습니다.

하지만 과제 요구사항이 "Supabase를 이용해서 교재 정보를 더미로 넣고 CSR로 불러와서 보여지게 할 것"이고, 화면에서 다루는 핵심 엔티티도 일반 상품보다 학습용 교재에 가깝다고 판단했습니다.

따라서 도메인명을 `products`가 아니라 `textbooks`로 정했습니다.

## Supabase 데이터 설계

이번 과제의 필수 구현 범위는 교재 목록과 교재 메인 배너를 Supabase에서 조회해 화면에 표시하는 것입니다.

### textbooks

교재의 기본 정보를 관리합니다.

```sql
create table textbooks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  textbook_type text not null,
  image_url text,
  original_price integer,
  discount_rate integer default 0,
  price integer not null,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

필드 설계 기준은 다음과 같습니다.

- `id`: 교재를 고유하게 식별하기 위한 값
- `title`: 교재명
- `textbook_type`: `단품`, `패스` 등 교재 유형
- `image_url`: 교재 표지 이미지 URL
- `original_price`: 정가
- `discount_rate`: 할인율
- `price`: 실제 판매가
- `display_order`: 화면 노출 순서
- `is_active`: 노출 여부
- `created_at`: 등록 시점

### textbook_banners

교재 목록 상단 메인 배너 데이터를 관리합니다.

Figma 시안에는 배너가 정적 이미지처럼 보이지만, 실제 서비스에서는 운영자가 교체하거나 순서를 변경할 수 있는 영역이라고 판단했습니다. 따라서 배너는 화면 장식이 아니라 운영 데이터로 보고 Supabase에서 조회하도록 설계합니다.

```sql
create table textbook_banners (
  id uuid default gen_random_uuid() primary key,
  title text,
  image_url text not null,
  link_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

필드 설계 기준은 다음과 같습니다.

- `id`: 배너 고유 ID
- `title`: 배너 대체 텍스트 또는 관리용 제목
- `image_url`: 배너 이미지 URL
- `link_url`: 클릭 시 이동할 링크
- `display_order`: 배너 노출 순서
- `is_active`: 배너 노출 여부
- `created_at`: 배너 등록 시점

## 가격 데이터 처리 기준

판매가 `price`는 클라이언트에서 매번 계산하지 않고 Supabase에 저장된 값을 그대로 사용합니다.

할인율과 정가만으로 판매가를 계산할 수도 있지만, 실제 서비스에서는 쿠폰, 이벤트, 기간 할인, 관리자 수동 가격 조정 등으로 인해 단순 계산 결과와 실제 판매가가 달라질 수 있습니다.

따라서 화면에서는 Supabase에 저장된 `price`를 기준 판매가로 사용하고, `original_price`와 `discount_rate`는 사용자에게 할인 정보를 보여주기 위한 표시 데이터로 사용합니다.

## CSR 데이터 조회 흐름

교재 목록과 메인 배너는 모두 Supabase에서 클라이언트 사이드로 조회합니다.

- `useTextbooks`: 교재 목록 조회
- `useTextbookBanners`: 메인 배너 목록 조회

페이지 컴포넌트는 데이터를 직접 요청하지 않고 각 hook을 통해 필요한 상태만 전달받습니다.

이렇게 분리하면 교재 목록 조회 조건과 배너 조회 조건이 서로 독립적으로 변경될 수 있고, 이후 검색어, 카테고리, 정렬 조건이 추가되어도 데이터 요청 로직을 한 곳에서 관리할 수 있습니다.

## 구매 여부에 따른 확장 고려

상품 목록 화면은 단순히 `textbooks` 테이블의 데이터를 그대로 보여주는 것이 아니라, 실제 서비스에서는 사용자의 구매 이력에 따라 노출 방식이 달라질 수 있다고 판단했습니다.

예를 들어 사용자가 이미 구매한 교재는 다음과 같은 방식으로 처리할 수 있습니다.

- 목록에서 제외
- 구매 완료 뱃지 표시
- 구매 버튼 비활성화
- 학습하기 버튼으로 변경
- 패스 상품 구매 시 포함된 단품 상품의 표시 방식 변경

구매 여부는 교재 자체의 속성이 아니라 사용자별 상태입니다.

따라서 `textbooks` 테이블에 `is_purchased` 같은 값을 직접 저장하지 않고, 사용자별 교재 접근 권한 테이블을 별도로 두는 방향을 고려했습니다.

```sql
create table user_textbook_entitlements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  textbook_id uuid not null references textbooks(id),
  access_status text not null default 'active',
  starts_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now()
);
```

주문 내역만으로 구매 여부를 판단할 수도 있지만, 교재/강의/패스 상품처럼 구매 후 접근 권한이 생기는 서비스에서는 주문 내역과 실제 이용 권한을 분리하는 것이 더 안전하다고 판단했습니다.

결제 취소, 환불, 관리자 지급, 기간제 패스 만료 같은 상황이 생길 수 있기 때문에, 상품 목록에서 "구매한 교재인지"를 판단할 때는 사용자별 접근 권한 데이터를 기준으로 삼는 구조가 더 확장성이 좋습니다.

## 인터랙션 확장 고려

이번 과제의 필수 구현 범위는 교재 목록과 배너 데이터를 CSR로 조회해 화면에 표시하는 것입니다.

다만 Figma 화면에 포함된 배너 페이지 표시, 알림 badge, 장바구니 badge는 단순 장식이 아니라 데이터와 인터랙션이 연결될 수 있는 확장 지점으로 판단했습니다.

### 배너

메인 배너에는 `1/5` 페이지 표시가 있어 여러 개의 배너를 순차적으로 보여주는 영역으로 판단했습니다.

향후 다음 기능으로 확장할 수 있습니다.

- 이전/다음 배너 이동
- 자동 롤링
- 현재 배너 번호 표시
- 배너 클릭 시 `link_url`로 이동
- 비활성 배너 제외

### 알림

Header의 알림 아이콘에는 badge가 표시되어 있어 사용자별 알림 상태가 존재할 수 있다고 판단했습니다.

향후 알림 버튼 클릭 시 드롭다운 또는 패널을 열어 최근 알림 목록을 보여줄 수 있습니다.

- 읽지 않은 알림 수 표시
- 알림 목록 드롭다운
- 알림 클릭 시 관련 페이지 이동
- 읽음 처리
- 빈 알림 상태 표시

### 장바구니

장바구니 아이콘의 badge는 사용자가 담은 교재 수를 의미할 수 있습니다.

향후 로그인 기능과 장바구니 기능이 추가되면 `cart_items` 데이터를 기준으로 badge count를 계산하고, 클릭 시 장바구니 페이지로 이동하도록 확장할 수 있습니다.

## 로딩, 에러, 빈 상태

CSR로 Supabase 데이터를 조회하기 때문에 로딩, 에러, 빈 상태를 분리해서 고려합니다.

- 로딩 상태: 데이터를 가져오는 동안 skeleton 또는 loading UI 표시
- 에러 상태: Supabase 조회 실패 시 안내 UI 표시
- 빈 상태: 검색 또는 필터 결과가 없을 때 빈 목록 UI 표시

데이터 상태를 명확히 분리하면 사용자가 네트워크 상황이나 검색 결과에 따라 현재 화면 상태를 이해하기 쉽고, 컴포넌트의 조건부 렌더링도 관리하기 쉬워집니다.

## 이미지 처리 기준

교재 이미지와 배너 이미지는 DB에 파일 자체를 저장하지 않고 URL만 저장합니다.

이미지 파일은 과제 단계에서는 `public` 폴더에 둘 수 있고, 실제 서비스 확장 시에는 Supabase Storage에서 관리하는 구조로 확장할 수 있습니다.

- 교재 표지 이미지: WebP 사용
- 메인 배너 이미지: WebP 사용
- DB 저장 값: 이미지 URL
- 렌더링: Next.js `Image` 컴포넌트 사용
- 카드 이미지 영역: 명확한 width/height 또는 aspect-ratio를 지정해 layout shift 방지

## 환경 변수

Supabase 접속 정보는 환경 변수로 관리하며, 실제 키 값은 GitHub에 포함하지 않습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Vercel 배포 환경에서도 동일한 환경 변수를 등록해야 CSR 조회가 정상 동작합니다.

## 실행 방법

```bash
npm install
npm run dev
```

로컬 실행 후 아래 주소에서 확인할 수 있습니다.

```txt
http://localhost:3000
```

## 배포

GitHub에 코드를 push하면 Vercel이 main 브랜치를 기준으로 자동 배포하도록 구성합니다.

배포 시 Vercel Project Settings의 Environment Variables에 Supabase 환경 변수를 등록합니다.

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 구현 범위와 확장 범위

이번 과제에서는 필수 요구사항에 맞춰 교재 목록과 교재 메인 배너를 Supabase에서 CSR로 조회해 화면에 표시하는 범위까지 구현합니다.

장바구니, 주문, 구매 권한, 알림, 관리자 배너 등록 기능은 실제 구현 범위에는 포함하지 않지만, 이후 확장을 고려해 데이터 구조와 폴더 구조에서 분리 가능하도록 설계했습니다.
