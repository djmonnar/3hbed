# 3H 진주센터 홈페이지 리뉴얼 구현 보고서

## 1. 기존 홈페이지의 문제점

- 모바일 `max-w-md` 원페이지라 데스크톱과 검색 유입용 정보 구조가 없었습니다.
- Tailwind, 아이콘, 폰트를 외부 CDN에서 전체 로드했습니다.
- 저장소에 로고 파일이 없어 실제 로고 경로가 깨져 있었습니다.
- 본사 제품 이미지를 외부 핫링크했습니다.
- canonical, Open Graph, sitemap, robots, JSON-LD가 없었습니다.
- 출처 없는 후기, VIP 쿠폰, 40분 체험, 강한 효과 암시 등 검증되지 않은 콘텐츠가 있었습니다.
- 추적 코드가 `ad.html`에 인라인으로 묶여 다른 페이지에서 재사용하기 어려웠습니다.
- GitHub Pages 자동 빌드·배포와 운영 문서가 없었습니다.

## 2. 새 정보 구조

통합 메인을 중심으로 무료체험, 제품, 기술, 인증, 두 센터, 실제 후기, FAQ, 광고 랜딩을 각각 독립 경로로 구성했습니다. 제품과 센터 상세 페이지는 TypeScript 데이터에서 정적으로 생성합니다.

## 3. 디자인 시스템

- Warm Ivory 배경
- Deep Forest Green 주요 브랜드 색
- Charcoal 본문과 어두운 섹션
- Bronze 인증·번호 포인트
- Warm Beige 제품·사진 영역
- Soft Gray 보조 영역
- Pretendard 우선 시스템 폰트 스택
- PC 최대 폭 1,248px, 모바일 1열, 태블릿·데스크톱 2~3열
- 카드 반복보다 분할 레이아웃, 큰 제목, 얇은 구분선 중심

## 4. 생성 페이지

- 통합 메인 1개
- 무료체험 1개
- 제품 목록 1개, 제품 상세 45개
- 기술 1개, 인증 1개
- 센터 목록 1개, 센터 상세 2개
- 후기 1개, FAQ 1개
- 광고 랜딩 1개
- robots API route, 기존 `ad.html` 호환, GitHub Pages 404

## 5. 주요 생성·수정 파일

- 프로젝트: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.env.example`
- 배포: `.github/workflows/deploy.yml`
- 레이아웃: `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- 공통 UI: `src/components/`
- 데이터: `src/data/site.ts`, `centers.ts`, `official-products.json`, `products.ts`, `certifications.ts`, `reviews.ts`, `faqs.ts`, `navigation.ts`, `tracking.ts`
- 페이지: `src/pages/`
- 이미지: `public/images/brand/`, `products/`, `video/`, `centers/`, `og/`
- 호환·SEO: `public/ad.html`, `public/404.html`, `manifest.webmanifest`, `favicon.svg`, `src/pages/robots.txt.ts`
- 운영 문서: `README.md`, `CONTENT_GUIDE.md`, `TODO.md`, `RENEWAL_PLAN.md`

## 6. 유지한 기존 기능

- 대표번호 `010-3552-0707` 전화·문자 CTA
- 모바일 하단 고정 CTA
- 진주경상센터 네이버 플레이스 `1201130040`
- 남강센터 네이버 플레이스 `2091436964`
- UTM, `NaPm`, `fbclid` 수집
- 전화·문자·플레이스 클릭 추적
- 광고 전용 랜딩과 `/ad.html` 주소
- 정적 페이지와 빠른 모바일 로딩

## 7. 제거한 과장·임시 콘텐츠

- VIP 무료 체험권, SPECIAL, BEST SELLER 등 임의 등급
- 확인되지 않은 40분 체험과 전 모델 체험
- 출처 없는 고객 후기와 별점
- 가상의 판매원 프로필
- 임의의 치료·완치·보편 효과 표현
- 확인되지 않은 운영시간·가격·렌탈·주차·전시 제품 표시

## 8. 공식 콘텐츠 적용 위치

- 사용자 제공 문구: 62개 황동 지압봉, 최고 70도 온열, 무료체험 흐름
- 본사 공식 제품 목록 4페이지와 상세페이지 45개를 2026-07-10 동기화했습니다.
- 제품명·모델·공식 카테고리·가격·렌탈 표시·태그·공식 URL을 구조화했습니다.
- 대표·상세 이미지 348개를 로컬 저장하고 WebP·AVIF로 최적화했습니다. 최적화된 전체 제품 이미지 용량은 약 30.5MB입니다.
- 공식 가격이 게시된 24개 제품은 가격과 확인일을 표시하고, 가격이 없는 21개 제품은 금액 미표기로 구분했습니다.
- `npm run sync:products`로 같은 수집·최적화 과정을 반복할 수 있습니다.

## 9. 인증서 개인정보 처리

원본 인증 이미지가 제공되지 않아 배포 파일에 포함하지 않았습니다. 텍스트로 확인된 회사명, 허가번호, 품목 인증번호, 발급기관, 발급일, 적용 모델만 공개했습니다. 이미지 확대 모달은 `imagePublic`과 `personalDataMasked`가 모두 참일 때만 작동합니다.

## 10. SEO

- 고유 title·description·canonical
- Open Graph·Twitter Card·1200×630 OG 이미지
- sitemap·robots·favicon·manifest
- breadcrumb
- `/3hbed/` base path와 trailing slash
- 지역 키워드를 문장 안에서 자연스럽게 사용

## 11. 구조화 데이터

- Organization
- BreadcrumbList
- Store: 센터별 주소·전화·운영시간과 네이버 플레이스 연결
- Product: 확인된 모델·카테고리·이미지와 공식 표시 가격이 있는 경우 Offer 포함
- FAQPage: 공개 답변만 포함
- VideoObject

대리점·체험 쇼룸의 실제 성격에 맞춰 `MedicalBusiness` 대신 `Store`를 사용했습니다.

## 12. 전환 추적

- GA4, Meta Pixel, Naver WCS 조건부 지연 로드
- 광고 ID를 코드에 하드코딩하지 않고 환경변수 사용
- 15개 이벤트와 공통 이벤트 데이터
- UTM·클릭 ID를 세션에 보존
- 전화·문자 이동 전 추적 호출
- 별도 1차 수집 API가 없어 `sendBeacon`은 임의 연결하지 않음

## 13. 실제 센터 이미지 반영

사용자가 제공한 진주경상센터 내부, 남강센터 내부, 진주 쇼룸, 남강센터 브랜드 이미지 4장을 로컬 저장하고 WebP·AVIF를 생성했습니다. 메인 히어로, 광고 랜딩, 센터 카드와 상세 갤러리에 실제 사진을 배치하고 사진 placeholder를 제거했습니다.

## 14. 추가로 필요한 정보

센터 실제 판매가·렌탈·배송·설치 조건, 센터별 체험 모델, 심의필과 심의번호, 공개용 마스킹 인증서, 실제 후기 본문 게시 동의, 추적 ID가 필요합니다. 추가 센터 사진은 확보되는 순서대로 갤러리를 확장합니다.

## 15. 센터 실정보와 후기 처리

2026-07-10 네이버 플레이스에서 두 센터의 주소·전화·운영시간·휴무·주차·찾아오는 길·편의시설을 확인해 반영했습니다. 후기는 임의 인용문을 만들지 않고 네이버의 현재 리뷰 수와 원문 링크를 센터별로 제공합니다.

## 16. Lighthouse 결과

Lighthouse 13.4.0, 로컬 production preview, 모바일 기준:

| 페이지 | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 메인 | 100 | 100 | 100 | 100 | 1.4s | 0ms | 0 |
| 광고 `/ad/` | 100 | 100 | 100 | 100 | 1.4s | 0ms | 0 |

원본 JSON 보고서는 로컬 `artifacts/lighthouse/`에 생성했습니다. `artifacts/`는 최종 저장소 문서에는 포함하지 않습니다.

## 17. 반응형·브라우저 검수

실제 Chromium에서 360, 390, 430, 768, 1024, 1280, 1440, 1920px를 확인했습니다.

- 모든 폭에서 가로 넘침 0
- 잘린 링크·버튼 0
- 이미지 alt 누락 0
- 1180px 이하 모바일 메뉴, 1280px 이상 데스크톱 메뉴 전환 정상
- 767px 이하 하단 전화·문자 CTA 표시 정상
- 메뉴 오픈 시 배경을 `inert` 처리해 키보드 포커스 차단
- 제품 필터, FAQ 열기, 제품·센터 하위 경로 정상
- `/ad.html` 쿼리·UTM·`NaPm` 보존 후 `/ad/` 이동 정상
- 콘솔 페이지 오류 0

## 18. 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:4321/3hbed/`에서 확인합니다.

## 19. GitHub Pages 배포

Pages Source를 GitHub Actions로 설정하고 `renewal-v1`을 검토·병합하면 `main` push에서 자동 배포됩니다. 워크플로는 `dist/`를 Pages artifact로 업로드합니다.

## 20. 브랜치와 커밋

- 브랜치: `renewal-v1`
- `docs: add renewal analysis and implementation plan`
- `feat: rebuild site with Astro and structured content`
- `fix/docs`: 접근성 검수 수정, 자동 감사, 운영 문서 정리

기존 `main`에는 직접 덮어쓰지 않았고, 원격 push와 병합도 수행하지 않았습니다.
