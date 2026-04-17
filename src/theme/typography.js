import { fontFamily } from './tokens.js'

/**
 * MUI Typography 매핑 — Figma 텍스트 스타일을 1:1로 옮겼다.
 *  - 헤딩: Noto Serif KR 600/700
 *  - 본문/버튼/라벨: Noto Sans KR 400/700
 */
export const typography = {
  fontFamily: fontFamily.sans,
  htmlFontSize: 16,

  // Display (Hero)
  h1: {
    fontFamily: fontFamily.serif,
    fontWeight: 700,
    fontSize: '3.5rem', // 56px
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontFamily: fontFamily.serif,
    fontWeight: 700,
    fontSize: '2.625rem', // 42px (Section 제목)
    lineHeight: 1.3,
    letterSpacing: '-0.005em',
  },
  h3: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '1.75rem', // 28px (Stat 수치)
    lineHeight: 1.2,
  },
  h4: {
    fontFamily: fontFamily.serif,
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: fontFamily.serif,
    fontWeight: 600,
    fontSize: '1.125rem', // 18px
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '1rem', // 16px
    lineHeight: 1.4,
  },

  subtitle1: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '1.0625rem', // 17px (Hero 서브카피)
    lineHeight: 1.7,
  },
  subtitle2: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '0.875rem', // 14px (라벨)
    lineHeight: 1.4,
  },

  body1: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '0.9375rem', // 15px
    lineHeight: 1.7,
  },
  body2: {
    fontFamily: fontFamily.sans,
    fontWeight: 400,
    fontSize: '0.875rem', // 14px
    lineHeight: 1.7,
  },

  button: {
    fontFamily: fontFamily.sans,
    fontWeight: 700,
    fontSize: '0.9375rem',
    lineHeight: 1,
    letterSpacing: 0,
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
