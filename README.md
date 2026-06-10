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

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Supabase
- Vercel (Node.js 22)

### Next.js

버전은 **Next.js 16**을 사용합니다.

- Next.js는 Vercel이 직접 만드는 프레임워크라 별도로 버전을 맞출 필요 없이 최신 안정 버전이 Vercel 배포에서 1순위로 지원됩니다. Vercel은 `package.json`에 명시된 `next` 버전을 그대로 빌드에 사용합니다.
- 16.0 초기 릴리스가 아니라 패치가 충분히 쌓인 안정 버전(16.2.x)을 사용하므로 메이저 초기 버전의 불안정성 부담이 없습니다.
- 16은 App Router와 React 19를 기본값으로 제공해, 이 프로젝트에서 정한 App Router 기반 페이지/레이아웃 구조와 그대로 맞습니다.
- dev/build 번들러는 16 기본값인 Turbopack을 사용합니다. 의존성이 Supabase 클라이언트와 Tailwind 정도로 단순해 호환성 이슈 가능성이 낮습니다.

Vercel 배포 시 프로젝트의 Node.js Version은 Next 16 요구사항(Node 20.9+)을 만족하도록 **22.x**로 설정합니다.

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

### MainBanner

메인 배너는 Header나 Footer처럼 모든 페이지에서 반복되는 전역 공통 영역이 아니라, 교재 목록 페이지에서 교재를 홍보하기 위한 상품 도메인 배너라고 판단했습니다.

따라서 `components/layout`이 아니라 `features/textbooks/components` 내부에 배치합니다. (`features/textbooks` 폴더가 이미 도메인 네임스페이스 역할을 하므로 이름에 `Textbook` 접두사는 두지 않습니다.)

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
└── lib/
    └── supabase/
        ├── index.ts          # 공개 API(배럴)
        ├── client.ts
        └── storage.ts
```

### 구조 설계 기준

- 재사용 가능한 UI와 도메인 전용 UI를 분리합니다.
- 페이지 컴포넌트는 전체 화면 조합만 담당합니다.
- Supabase 조회 로직은 컴포넌트 내부에 직접 작성하지 않습니다.
- 교재 관련 코드가 흩어지지 않도록 `features/textbooks`에 응집시킵니다.
- 이후 장바구니, 주문, 인증, 마이페이지 기능이 추가되어도 같은 패턴으로 확장할 수 있게 합니다.
- 각 기능/인프라는 `index.ts` 배럴로 **공개 API만** 노출합니다. 외부(app, 다른 기능)는 배럴을 통해서만 접근하고 내부 구현(`TextbookCard`, `api/*`, `utils/*`)은 비공개로 둬, 경계를 강제하고 내부 리팩터링을 자유롭게 합니다.
- 엔티티 타입은 소유 기능이 가집니다. `Textbook`/`Banner`는 `features/textbooks`가 소유하고, 다른 기능(예: 향후 `cart`)은 이를 단방향으로 import만 합니다. 타입 파일은 DB 테이블명(`textbook.ts`/`banner.ts`)을, 동작(컴포넌트·훅·api)은 도메인 접두사를 따르되, 폴더로 네임스페이스가 명확한 경우(`MainBanner`)는 접두사를 생략합니다.

## 도메인 명칭 결정

초기에는 가격, 장바구니, 구매 상태가 있어 `products` 도메인명을 고려할 수 있습니다.

하지만 과제 요구사항이 "Supabase를 이용해서 교재 정보를 더미로 넣고 CSR로 불러와서 보여지게 할 것"이고, 화면에서 다루는 핵심 엔티티도 일반 상품보다 학습용 교재에 가깝다고 판단했습니다.

따라서 도메인명을 `products`가 아니라 `textbooks`로 정했습니다.

## Supabase 데이터 설계

이번 과제의 필수 구현 범위는 교재 목록과 교재 메인 배너를 Supabase에서 조회해 화면에 표시하는 것입니다.

Supabase import용 CSV는 `docs/supabase` 디렉터리에 있습니다.

- `docs/supabase/textbooks.csv`: `textbooks` 테이블 더미 데이터
- `docs/supabase/banners.csv`: `banners` 테이블 더미 데이터
- `docs/supabase/DATA_FIELDS.md`: 각 CSV 필드에 들어가는 데이터 설명

### textbooks

교재의 기본 정보를 관리합니다.

```sql
create table textbooks (
  id bigint generated by default as identity primary key,
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

- `id`: 교재를 고유하게 식별하기 위한 자동 증가 숫자값
- `title`: 교재명
- `textbook_type`: `단품`, `패스` 등 교재 유형
- `image_url`: 교재 표지 이미지 URL
- `original_price`: 정가
- `discount_rate`: 할인율
- `price`: 실제 판매가
- `display_order`: 화면 노출 순서
- `is_active`: 노출 여부
- `created_at`: 등록 시점

### banners

교재 목록 상단 메인 배너 데이터를 관리합니다.

Figma 시안에는 배너가 정적 이미지처럼 보이지만, 실제 서비스에서는 운영자가 교체하거나 순서를 변경할 수 있는 영역이라고 판단했습니다. 따라서 배너는 화면 장식이 아니라 운영 데이터로 보고 Supabase에서 조회하도록 설계합니다.

```sql
create table banners (
  id bigint generated by default as identity primary key,
  title text,
  image_url text not null,
  link_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

필드 설계 기준은 다음과 같습니다.

- `id`: 배너를 고유하게 식별하기 위한 자동 증가 숫자값
- `title`: 배너 대체 텍스트 또는 관리용 제목
- `image_url`: 배너 이미지 URL
- `link_url`: 클릭 시 이동할 링크
- `display_order`: 배너 노출 순서
- `is_active`: 배너 노출 여부
- `created_at`: 배너 등록 시점

### 기본키 설계 기준

이번 과제는 단일 Supabase 프로젝트 안에서 교재 목록과 배너 데이터를 관리하는 범위이므로 `uuid` 대신 자동 증가 숫자 ID를 사용합니다.

`uuid`는 외부 시스템과 데이터를 병합하거나, 여러 데이터베이스 사이에서 ID 충돌을 피해야 하거나, 공개 URL에 예측하기 어려운 식별자가 필요한 경우에 더 적합합니다.

현재 구조에서는 그런 요구가 없기 때문에 `bigint` 기반 숫자 ID가 더 단순하고 Supabase Table Editor 확인, 프론트엔드 타입 관리 측면에서도 직관적입니다.

CSV import 후 Supabase에서 행을 직접 확인하고 수정하기 쉽도록 CSV에도 `id`를 포함합니다. 이 경우 테이블의 ID 컬럼은 `generated always as identity`가 아니라 `generated by default as identity`로 둡니다.

`generated by default`는 평소에는 DB가 ID를 자동 생성하지만, CSV처럼 명시적인 `id` 값이 들어올 때도 허용합니다.

단, 기본키 이름은 `index`가 아니라 `id`로 둡니다. `index`는 화면 정렬 순서처럼 오해될 수 있으므로, 데이터의 고유 식별자는 `id`, 화면 노출 순서는 `display_order`로 분리합니다.

이미 `generated always as identity`로 테이블을 만들었다면 다음처럼 변경할 수 있습니다.

```sql
alter table textbooks alter column id set generated by default;
alter table banners alter column id set generated by default;
```

## 가격 데이터 처리 기준

판매가 `price`는 클라이언트에서 매번 계산하지 않고 Supabase에 저장된 값을 그대로 사용합니다.

할인율과 정가만으로 판매가를 계산할 수도 있지만, 실제 서비스에서는 쿠폰, 이벤트, 기간 할인, 관리자 수동 가격 조정 등으로 인해 단순 계산 결과와 실제 판매가가 달라질 수 있습니다.

따라서 화면에서는 Supabase에 저장된 `price`를 기준 판매가로 사용하고, `original_price`와 `discount_rate`는 사용자에게 할인 정보를 보여주기 위한 표시 데이터로 사용합니다.

## CSR 데이터 조회 흐름

교재 목록과 메인 배너는 모두 Supabase에서 클라이언트 사이드로 조회합니다.

- `useTextbooks`: 교재 목록 조회
- `useBanners`: 메인 배너 목록 조회

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
  id bigint generated by default as identity primary key,
  user_id uuid not null,
  textbook_id bigint not null references textbooks(id),
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

이미지 파일은 Supabase Storage의 public 버킷에서 관리하고, DB에는 버킷 경로만 저장합니다. (초기에는 `public` 폴더에 두고 개발했으나, 실제 서비스 구조에 맞춰 Supabase Storage로 옮기고 로컬 사본은 제거했습니다.)

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

Next.js 앱은 저장소 루트가 아니라 `web/` 하위 디렉터리에 있습니다. (설계 문서·이미지 원본은 루트에 두고, 앱 코드만 분리)

```bash
cd web
npm install
npm run dev
```

로컬 실행 후 아래 주소에서 확인할 수 있습니다.

```txt
http://localhost:3000
```

`web/.env.local`에 Supabase 환경 변수를 채워야 CSR 조회가 동작합니다. (`web/.env.local.example` 참고)

## 배포

GitHub에 코드를 push하면 Vercel이 main 브랜치를 기준으로 자동 배포하도록 구성합니다.

앱이 `web/` 하위에 있으므로 Vercel 프로젝트 설정에서 다음을 지정합니다.

- **Root Directory**: `web`
- **Node.js Version**: 22.x
- **Environment Variables**:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 구현하며 결정한 사항

위 설계를 실제로 구현하면서 추가로 판단·결정한 내용을 정리합니다.

### 저장소 구조 (web 서브디렉터리)

설계 문서(`docs/`)와 이미지 원본(`image/`)은 루트에 두고, Next.js 앱은 `web/`에 분리했습니다. 한 저장소에서 문서/에셋과 앱 코드를 함께 관리하되 역할을 구분하기 위함이며, Vercel은 Root Directory를 `web`으로 지정해 그 하위만 빌드합니다.

### Next.js 16 / Tailwind CSS 4

Vercel이 Next.js를 직접 만드는 만큼 최신 안정 버전이 가장 잘 지원되어 Next 16을 사용합니다. (자세한 이유는 [기술 스택 > Next.js](#nextjs) 참고) Tailwind는 v4의 CSS-first 방식이라 `tailwind.config.js` 없이 `globals.css`의 `@theme`에서 브랜드 컬러·폰트 토큰을 정의했습니다.

### 폰트 (Pretendard)

Figma 시안의 본문 폰트가 Pretendard라 전역 폰트로 적용했습니다. Google Fonts에는 없어 CDN(variable, dynamic-subset)으로 불러오고, `--font-sans` 우선순위를 Pretendard로 두되 system-ui를 폴백으로 둡니다. 한글 비중이 큰 화면이라 dynamic-subset으로 용량을 줄였습니다.

### 로고 (인라인 SVG 컴포넌트)

로고는 글자 하나하나가 vector로 구성된 커스텀 워드마크라 웹폰트 텍스트로는 재현되지 않습니다. Figma에서 `LOGO` 프레임을 SVG 하나로 export한 뒤, `fill="currentColor"`로 바꿔 인라인 컴포넌트(`components/ui/Logo.tsx`)로 만들었습니다. 이렇게 하면 디자인과 픽셀 단위로 일치하고, 색상을 `text-brand`로 코드에서 제어할 수 있으며, 추가 네트워크 요청이 없습니다.

파비콘은 create-next-app 기본 아이콘을 제거하고, 브랜드 컬러(`#7F77DD`) 바탕에 흰색 `H` 모노그램 SVG(`app/icon.svg`)로 교체했습니다. App Router 파일 규칙에 따라 Next.js가 `<link rel="icon">`을 자동 주입합니다.

### 이미지 (Supabase Storage public 버킷)

교재 표지와 배너 이미지는 Supabase Storage의 **public 버킷(`image`)** 에 올리고, DB의 `image_url`(`image/...` = 버킷/경로)을 public URL로 조합하는 헬퍼(`lib/supabase/storage.ts`)를 두었습니다. 공개 카탈로그 이미지라 만료되는 서명 URL(private 버킷) 대신 public 버킷이 적합합니다. `next/image`로 최적화하기 위해 `next.config.ts`의 `remotePatterns`에 Supabase 호스트를 등록했고, 호스트는 환경 변수에서 추출해 프로젝트 ref를 하드코딩하지 않습니다.

### RLS 읽기 정책

테이블은 RLS를 켜 둔 채 **anon 역할에 대한 SELECT 정책(`using (true)`)만** 열었습니다. CSR에서 anon 키로 조회하므로 공개 읽기는 필요하지만, 쓰기 정책은 만들지 않아 클라이언트에서 수정은 불가능합니다. (RLS는 켜져 있는데 읽기 정책이 없으면 데이터가 있어도 0건으로 조회되는 점을 확인해 정책을 추가했습니다.)

### 레이아웃 구조 (배너는 메인 프레임 밖)

`Header` → `MainBanner` → `main`(콘텐츠 프레임) → `Footer`를 모두 최상위 형제로 배치했습니다. 배너는 화면 전체 폭(full-bleed)을 차지하는 영역이라 `max-width` 콘텐츠 프레임 안이 아니라 그 밖에 두고, 검색/필터/그리드만 `<main>` 콘텐츠 프레임(`max-w-[1280px]`)에 담습니다.

### Figma 수치 반영 방식

`1440` 고정 폭 시안을 그대로 복사하지 않고, 콘텐츠 폭(헤더 1280 / 푸터 1320 / 본문 1280)을 기준으로 재구성했습니다. 헤더는 로고+메뉴와 아이콘 그룹을 `flex` 비율(879:401)로 나눠 남는 여백이 그룹 내부에 들어가게 했고, 교재 목록은 고정 좌표 대신 반응형 Grid(`sm`2 → `md`3 → `lg`4열)로 만들어 화면 크기에 따라 배치되도록 했습니다.

### 가격 표시 (데이터 기반)

카드의 가격은 DB의 `price`를 기준 판매가로 그대로 쓰고, `original_price`/`discount_rate`는 표시용입니다. `discount_rate > 0`이면 정가(취소선) + 할인율 + 판매가를, 할인이 없으면 판매가만 보여주도록 데이터에 따라 분기합니다.

### 검색 / 카테고리 필터 (상태 끌어올림)

검색어와 선택 카테고리는 각 컴포넌트 내부가 아니라 페이지가 소유(controlled)하고, 조회된 교재 목록에 `useMemo`로 필터를 적용해 그리드에 전달합니다. 검색과 카테고리 조건이 서로 독립적으로 변하면서 함께 적용(AND)되도록 하기 위함입니다.

- **검색**: 키 입력마다 필터링하면 화면이 매번 바뀌어 거슬리므로, 입력값은 로컬 `draft`로 두고 **엔터(폼 제출) 시에만** 커밋합니다.
- **카테고리**: `전체` / `단품` / `패스` 선택 시 즉시 반영합니다.
- 데이터가 12건 규모라 전체 조회 후 클라이언트에서 필터링했고, 데이터가 커지면 `useTextbooks`에 검색어·유형을 넘겨 Supabase 쿼리 조건(`ilike`/`eq`)으로 바꾸는 것이 확장 방향입니다.

### 로딩 / 에러 / 빈 상태

CSR 조회 특성상 상태를 분리해 처리합니다. 로딩 중, 조회 실패(에러), 데이터 자체가 없는 경우("표시할 교재가 없습니다"), 검색·필터 결과가 없는 경우("검색 결과가 없습니다")를 구분해 안내합니다.

### 목록 표시 (페이지네이션 미적용)

Figma 시안은 교재를 한 화면에 모두 노출하고 별도 페이지 컨트롤이 없어, 조회된 교재를 전부 그리드로 표시하는 방식으로 두었습니다. 데이터가 많아지면 `더보기`(증분 로드)나 번호 페이지네이션으로 확장할 수 있고, 그 시점에는 Supabase `range()` 기반 서버 페이지네이션으로 가는 것이 적합합니다.

### 가격 더미 데이터 구성

카드의 가격 분기(할인 유무)를 데이터로 모두 확인할 수 있도록, 더미 교재 중 일부는 할인이 있는 상품(정가·할인율·판매가), 일부는 할인이 없는 상품(`discount_rate = 0`, 판매가만)으로 섞어 구성했습니다.

## 구현 범위와 확장 범위

이번 과제에서는 필수 요구사항에 맞춰 교재 목록과 교재 메인 배너를 Supabase에서 CSR로 조회해 화면에 표시하는 범위까지 구현합니다.

장바구니, 주문, 구매 권한, 알림, 관리자 배너 등록 기능은 실제 구현 범위에는 포함하지 않지만, 이후 확장을 고려해 데이터 구조와 폴더 구조에서 분리 가능하도록 설계했습니다.
