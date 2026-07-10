# 3H지압침대 진주경상·남강센터 통합 홈페이지

3H지압침대 진주경상센터와 남강센터를 함께 안내하고, 진주 지역 고객이 제품 정보를 확인한 뒤 가까운 센터에 무료체험을 문의할 수 있도록 만든 정적 반응형 홈페이지입니다.

온라인 결제보다 다음 전환 흐름을 우선합니다.

> 검색·광고 유입 → 브랜드·제품 신뢰 형성 → 진주센터 선택 → 무료체험 문의 → 방문 비교 → 구매·렌탈·설치 상담

## 기술 스택

- Astro 7 + TypeScript strict mode
- Tailwind CSS 4 Vite 플러그인
- Astro 정적 빌드와 `@astrojs/sitemap`
- TypeScript 데이터 파일 기반 콘텐츠 관리
- 최소한의 바닐라 JavaScript
- GitHub Actions + GitHub Pages

Astro와 Tailwind CSS는 CDN을 사용하지 않습니다. 아이콘은 필요한 SVG만 컴포넌트로 포함하고, 외부 추적 스크립트는 실제 ID가 설정된 경우에만 지연 로드합니다.

## 로컬 실행

요구 환경: Node.js 24 이상, npm 11 이상

```bash
npm install
npm run dev
```

개발 주소는 기본적으로 `http://localhost:4321/3hbed/`입니다. GitHub Pages와 동일한 base path를 로컬에서도 사용합니다.

## 검사와 빌드

```bash
npm run check
npm run build
npm run audit:build
npm run preview
```

- `check`: Astro 및 TypeScript 검사
- `build`: 검사 후 `dist/` 정적 빌드
- `audit:build`: 필수 페이지, SEO 메타데이터, 내부 링크·자산, 이미지 파생 파일 검사
- `preview`: 빌드 결과를 `/3hbed/` 경로에서 미리 보기

## 페이지 구조

- `/` 통합 메인
- `/experience/` 무료체험 안내
- `/products/` 제품 라인업
- `/products/[slug]/` 제품 상세
- `/technology/` 3H 기술과 의료기기 정보
- `/certifications/` 인증·허가 자료
- `/centers/` 진주센터 통합 안내
- `/centers/namgang/` 남강센터
- `/centers/gyeongsang/` 진주경상센터
- `/reviews/` 실제 고객 후기 영역
- `/faq/` 자주 묻는 질문
- `/ad/` 광고 전용 랜딩페이지
- `/ad.html` 기존 광고 URL 호환 리디렉션

## 콘텐츠 데이터 수정

반복되는 정보를 HTML에 직접 복사하지 않습니다.

| 파일 | 관리 정보 |
| --- | --- |
| `src/data/site.ts` | 사이트명, 대표 전화·문자, 본사 URL, 제조사 정보, 인증 메타 |
| `src/data/centers.ts` | 주소, 전화, 운영시간, 주차, 네이버 플레이스, 사진, 전시 제품 |
| `src/data/products.ts` | 제품명, 모델, 이미지, 사양, 인증, 전시 상태, 공식 URL |
| `src/data/certifications.ts` | 허가·인증 종류, 번호, 발급기관, 적용 범위, 공개 이미지 상태 |
| `src/data/reviews.ts` | 후기 원문, 출처, 동의, 개인정보 마스킹 상태 |
| `src/data/faqs.ts` | 질문, 답변, 분류, 공개 여부 |
| `src/data/navigation.ts` | 헤더와 푸터 메뉴 |
| `src/data/tracking.ts` | 추적 ID와 지원 이벤트 |

## 센터 정보 변경

1. `src/data/centers.ts`에서 대상 센터를 찾습니다.
2. 네이버 플레이스와 센터 담당자가 확인한 주소·전화·운영시간·휴무·주차 정보를 입력합니다.
3. 센터 사진은 `public/images/centers/{center}/`에 저장하고 `ImageAsset`로 연결합니다.
4. 네이버 리뷰 수는 확인일과 함께 갱신하고 원문 링크를 유지합니다.
5. 전시 제품은 실제 확인 후 `experienceProducts`에 추가합니다.
6. `npm run build && npm run audit:build`로 확인합니다.

현재 두 센터의 주소·전화·운영시간·휴무·주차·찾아오는 길·편의시설은 2026-07-10 네이버 플레이스에서 확인한 정보입니다. 운영 정보가 바뀌면 `src/data/centers.ts`와 구조화 데이터를 함께 갱신합니다.

## 제품 추가

1. 본사 공식 제품명, 모델명, 공식 URL을 확인합니다.
2. 사용 권한이 있는 원본 이미지를 `public/images/products/`에 저장합니다.
3. `npm run optimize:images`로 WebP·AVIF를 생성합니다.
4. `src/data/products.ts`에 모든 필드를 추가합니다.
5. 센터 전시 상태는 반드시 `displayed`, `availableByReservation`, `notDisplayed`, `unknown` 중 하나로 설정합니다.
6. 제품별 의료기기 인증이 확인되지 않으면 인증번호·등급을 비워둡니다.

가격, 렌탈 조건, 크기, 소재, 사용 목적, 주의사항은 공식 자료가 확인된 경우에만 공개합니다.

## 인증서 추가

1. 원본 인증서는 비공개 보관소에 보관하고 `public/`에 넣지 않습니다.
2. 생년월일, 연락처, 서명 등 불필요한 개인정보를 복원 불가능하게 마스킹합니다.
3. 공개용 별도 이미지를 `public/images/certifications/`에 저장합니다.
4. `src/data/certifications.ts`에서 `imagePublic: true`, `personalDataMasked: true`를 모두 확인합니다.
5. 적용 대상과 적용 모델을 구체적으로 입력합니다.

`.gitignore`는 `public/images/certifications/private/`와 `originals/`를 배포 대상에서 제외합니다. 자세한 기준은 `CONTENT_GUIDE.md`를 따릅니다.

## 실제 후기 추가

후기는 다음 조건을 모두 충족해야 공개됩니다.

- 실제 고객이 작성한 원문과 출처 보관
- 원문 URL 또는 확인 가능한 증빙
- 이름·프로필·연락처 등 개인정보 마스킹
- 홈페이지 사용 동의 확인
- 제품·센터 정보 사실 확인
- `isPublished: true`, `usageConsent: true`

조건이 충족되지 않으면 화면에 노출하지 않습니다.

## 이미지 최적화

```bash
npm run optimize:images
```

`public/images/products/`, `brand/`, `video/`, `centers/`의 JPG·PNG 원본에서 WebP와 AVIF를 생성하고 OG 이미지를 갱신합니다. 제품명 기반 영문 파일명을 사용하고 `width`, `height`, 의미 있는 `alt`를 데이터에 지정합니다.

본사 이미지 URL을 `<img>`에 직접 연결하지 않습니다. 실제 센터 사진만 로컬 자산으로 관리하며 타 매장 사진이나 생성 이미지를 센터 사진으로 사용하지 않습니다.

## 환경변수와 추적 ID

`.env.example`을 참고해 로컬 `.env` 또는 GitHub Repository Variables에 설정합니다.

```env
PUBLIC_SITE_URL=https://djmonnar.github.io
PUBLIC_GA4_ID=
PUBLIC_META_PIXEL_ID=
PUBLIC_NAVER_WCS_ID=
PUBLIC_NAVER_CONVERSION_ID=
```

지원 이벤트:

- `phone_click`, `sms_click`, `place_click`, `center_select`, `reservation_click`
- `product_view`, `product_center_click`, `certificate_view`, `video_play`, `faq_open`
- `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90`

공통 데이터에는 센터, 제품, 페이지 경로·제목, UTM, referrer, 네이버 `NaPm`, 메타 `fbclid`가 포함됩니다. UTM과 클릭 ID는 세션 저장소에 보존됩니다.

현재 별도 1차 수집 서버가 없어 `navigator.sendBeacon`을 임의의 엔드포인트로 보내지 않습니다. 전화·문자 이동 전 이벤트를 즉시 dataLayer·설정된 픽셀로 전달하고 짧은 이동 지연을 사용합니다. 향후 자사 수집 API를 도입하면 `sendBeacon` 또는 `fetch(..., { keepalive: true })`를 연결할 수 있습니다.

## SEO 설정

- `astro.config.mjs`: `site`, `/3hbed` base, trailing slash, sitemap
- `src/layouts/BaseLayout.astro`: title, description, canonical, Open Graph, Twitter Card, JSON-LD
- `src/pages/robots.txt.ts`: robots와 sitemap 위치
- `public/manifest.webmanifest`, `favicon.svg`, OG 이미지
- BreadcrumbList, Organization, Store, Product, FAQPage, VideoObject 구조화 데이터

진주센터는 의료기관이 아니라 제품 체험·상담 대리점이므로 `MedicalBusiness` 대신 사실관계에 맞는 `Store` 유형을 사용합니다. 확인된 주소·전화·운영시간은 Store 구조화 데이터에 포함하고 가격과 좌표는 근거가 확보될 때만 추가합니다.

## GitHub Pages 배포

1. GitHub 저장소 `Settings → Pages → Build and deployment`에서 Source를 `GitHub Actions`로 선택합니다.
2. 필요한 추적 ID를 `Settings → Secrets and variables → Actions → Variables`에 등록합니다.
3. `renewal-v1` 검토 후 `main`에 병합합니다.
4. `main` push 시 `.github/workflows/deploy.yml`이 Node 24로 빌드하고 `dist/`를 배포합니다.
5. 배포 후 `/`, `/ad/`, `/ad.html`, 제품·센터 하위 경로를 직접 새로고침해 확인합니다.

워크플로는 현재 `main` push와 수동 실행만 배포합니다. `renewal-v1` 작업만으로 기존 배포를 덮어쓰지 않습니다.

## 콘텐츠·의료광고 관리 원칙

- 본사 공식 문구나 심의 문구의 의미를 강하게 바꾸지 않습니다.
- 제조업 허가와 제품별 품목 인증을 구분합니다.
- 특정 인증을 모든 제품의 인증처럼 표시하지 않습니다.
- 질환 치료·완치, 보편적 효과, 임의의 1위 표현을 만들지 않습니다.
- 변경 가능한 가격·렌탈·전시·운영 정보는 갱신일과 출처를 확인합니다.
- 미확정 답변은 `isPublished: false`로 유지합니다.

자세한 운영 기준은 [CONTENT_GUIDE.md](CONTENT_GUIDE.md), 구현·검수 결과는 [IMPLEMENTATION_REPORT.md](IMPLEMENTATION_REPORT.md), 남은 자료는 [TODO.md](TODO.md)를 확인하세요.
