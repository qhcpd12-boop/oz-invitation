/**
 * 디자인 토큰 — Figma node 1:1246 (오즈청첩장)에서 추출한 단일 출처.
 * 모든 컴포넌트/섹션은 이 토큰만 참조한다. (직접 hex 사용 금지)
 */

export const palette = {
  // Brand
  primary: '#E11D48', // rose-600 (배지 텍스트, 액센트)
  primaryDark: '#9F1239', // rose-800
  primaryGradient: 'linear-gradient(160deg, #F43F5E 0%, #722F37 100%)',
  ctaGradient: 'linear-gradient(135deg, #E11D48 0%, #BE185D 100%)',

  // Surfaces
  bgDark: '#1A1A1A',
  surface: '#FEFCF9', // 카드/패널 오프화이트
  surfaceWhite: '#FFFFFF',

  // Pastel accents (FeatureCard / IconTile)
  pinkSoft: '#FFE4E6', // rose-100
  peachSoft: '#FFEDD5',
  greenSoft: '#DCFCE7',
  blueSoft: '#DBEAFE',
  yellowSoft: '#FEF3C7',
  purpleSoft: '#F3E8FF',

  // Text
  textPrimary: '#2D2D2D',
  textMuted: '#6B5B50',
  textOnDark: '#FFFFFF',
  textPlaceholder: '#A8A29E',

  // Lines / borders
  border: 'rgba(0, 0, 0, 0.08)',
  borderStrong: 'rgba(0, 0, 0, 0.16)',
  divider: 'rgba(0, 0, 0, 0.06)',

  // States
  warning: '#F59E0B',
  success: '#10B981',
  danger: '#DC2626',
  star: '#F59E0B',
}

export const radii = {
  sm: 8,
  md: 16, // 입력/작은 카드
  lg: 24, // 큰 카드/CTA 박스
  pill: 100, // 필 버튼/배지
}

export const shadows = {
  card: '0px 4px 16px rgba(0, 0, 0, 0.06)',
  elevated: '0px 16px 64px rgba(0, 0, 0, 0.16)',
  // 핑크 컬러 그림자 → 중성 그림자로 변경 (강조 버튼에서도 깔끔하게)
  cta: '0px 6px 18px rgba(0, 0, 0, 0.10)',
  ctaHover: '0px 10px 24px rgba(0, 0, 0, 0.14)',
}

export const spacing = {
  sectionX: 60, // 섹션 좌우 패딩(데스크톱)
  sectionXSm: 20,
  sectionY: 96,
  sectionYSm: 56,
  containerMax: 1280,
}

export const fontFamily = {
  sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
  serif: '"Cormorant Garamond", "Noto Serif KR", "Times New Roman", serif',
}

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}
