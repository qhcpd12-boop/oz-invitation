import { fontFamily } from './tokens.js'

/**
 * MUI Typography 매핑 — Pretendard 기반 한글 친화 헤딩.
 *  - 헤딩: Pretendard 800 (한글 가독성/모던)
 *  - 본문/버튼/라벨: Pretendard 400/700
 *  - 영문 강조(serif)는 컴포넌트에서 명시적으로 fontFamily.serif 적용
 */
export const typography = {
  fontFamily: fontFamily.sans,
  htmlFontSize: 16,

  // Display (Hero)
  h1: {
    fontFamily: fontFamily.sans,
    fontWeight: 800,
    fontSize: '3rem', // 48px
    lineHeight: 1.22,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontFamily: fontFamily.sans,
    fontWeight: 800,
    fontSize: '2.375rem', // 38px (Section 제목)
    lineHeight: 1.28,
    letterSpacing: '-0.03em',
  },
  h3: {
    fontFamily: fontFamily.sans,
    fontWeight: 800,
    fontSize: '1.75rem', // 28px (Stat 수치)
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h4: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '1.25rem', // 20px
    lineHeight: 1.4,
    letterSpacing: '-0.02em',
  },
  h5: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '1.125rem', // 18px
    lineHeight: 1.4,
    letterSpacing: '-0.02em',
  },
  h6: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '1rem', // 16px
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },

  subtitle1: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '1.0625rem', // 17px (Hero 서브카피)
    lineHeight: 1.7,
    letterSpacing: '-0.015em',
  },
  subtitle2: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '0.875rem', // 14px (라벨)
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },

  body1: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '0.9375rem', // 15px
    lineHeight: 1.7,
    letterSpacing: '-0.015em',
  },
  body2: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '0.875rem', // 14px
    lineHeight: 1.7,
    letterSpacing: '-0.015em',
  },

  button: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '0.9375rem',
    lineHeight: 1,
    letterSpacing: '-0.01em',
    textTransform: 'none',
  },

  caption: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '0.8125rem', // 13px
    lineHeight: 1.5,
  },

  overline: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '0.8125rem',
    lineHeight: 1.2,
    letterSpacing: '0.04em',
    textTransform: 'none',
  },
}
