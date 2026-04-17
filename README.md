# 오즈청첩장 — 모바일 청첩장

요금제 구매 후 결혼 정보 입력만으로 모바일 청첩장 URL을 발급해 주는 웹 서비스.

- 스택: React (Vite, JS), MUI, Firebase Auth/Firestore, Vercel(+ Serverless Functions), 결제 PG(Stripe 가정)
- 디자인 기준: [ref/화면설계서.md](ref/화면설계서.md), [ref/개발기획서.md](ref/개발기획서.md), [Figma](https://www.figma.com/design/CUPgvY0YOqis5pZB7hufGP/Full-website-design-Templates-for-Cyprus-University--Community-?node-id=1-1246)
- 개발 결과 정리: [개발결과.md](개발결과.md)

## 빠른 시작

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

스타일 가이드 페이지: `/dev/_styleguide`

## 폴더 구조

```
src/
  theme/        # 디자인 토큰, MUI 테마
  components/   # 디자인 시스템 컴포넌트
  sections/     # 랜딩 섹션 조립
  pages/        # 라우트 페이지
  layouts/      # 앱 레이아웃(헤더/푸터)
  lib/          # firebase, auth, invitations 등 도메인 로직
api/            # Vercel Serverless (결제 세션 / 웹훅)
```

## 환경변수

| 키 | 어디서 사용 | 비고 |
|----|-------------|------|
| `VITE_FIREBASE_*` | 클라이언트 | Firebase Web SDK 초기화 |
| `FIREBASE_ADMIN_*` | 서버(Vercel API) | 결제 웹훅에서 Firestore Admin 쓰기 |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | 서버 | 결제 세션·웹훅 검증 |
| `PUBLIC_BASE_URL` | 서버 | 결제 redirect용 절대 URL |

## 라우트

| 경로 | 설명 |
|------|------|
| `/` | 랜딩(Hero/Stats/Features/Designs/Testimonials/CTA) |
| `/pricing` | 요금제 + 애드온 + 비교표 |
| `/login`, `/signup` | Firebase Auth(이메일/비밀번호) |
| `/create/{design,details,checkout,complete}` | 제작 위저드(보호 라우트) |
| `/i/:slug` | 공개 청첩장(셸 미적용) |
| `/dev/_styleguide` | 디자인 시스템 점검 페이지 |

## 결제 흐름

1. STEP 3 → `POST /api/payments/checkout` (Stripe Checkout 세션 + `orders` 'pending')
2. 사용자 결제 후 Stripe → `POST /api/payments/webhook` (서명 검증)
3. 웹훅이 `orders.status='paid'`, `invitations.status='paid'` 갱신
4. 사용자 success 리다이렉트 → STEP 4 발행(slug 결정)

## 배포 (Vercel)

- 빌드: `vite build` (자동 감지). SPA fallback / `api/` Serverless 함수는 `vercel.json` 참조.
- 환경변수: 위 표의 `VITE_*`, `FIREBASE_ADMIN_*`, `STRIPE_*`, `PUBLIC_BASE_URL` 모두 Vercel 콘솔에 등록.
- Stripe 대시보드 → Webhooks: `https://<도메인>/api/payments/webhook`, 시크릿을 `STRIPE_WEBHOOK_SECRET` 에 입력.
- Firebase 콘솔 → Auth 도메인 화이트리스트에 Vercel preview·production 도메인 추가.
- Firestore: `firestore.rules`, `firestore.indexes.json` 을 Firebase CLI 로 배포(`firebase deploy --only firestore`).
