import { Box } from '@mui/material'

/**
 * 메인 페이지 전체에 떠다니는 결혼식 무드 꽃잎.
 * - position: fixed, pointer-events: none, aria-hidden
 * - GPU 가속 transform/opacity 만 애니메이트
 * - prefers-reduced-motion 사용자는 애니메이션 비활성화
 */

const PALETTE = [
  '#F8B6C0', // soft pink
  '#F4C6CA', // dusty rose
  '#F2C2A4', // peach
  '#FBD7DB', // light blush
  '#FFE2D6', // cream peach
  '#FFFFFF', // pure white
  '#E9C9B6', // champagne
]

// 14장 — 화면 가로에 고르게 분포, 각자 다른 속도/지연/색/크기
const PETALS = Array.from({ length: 14 }, (_, i) => {
  const seed = (i * 37) % 100
  return {
    left: `${((i * 7.3 + 4) % 100).toFixed(1)}%`,
    delay: `${((i * 1.8) % 14).toFixed(1)}s`,
    duration: `${(12 + (i * 1.9) % 10).toFixed(1)}s`,
    swayDuration: `${(3 + (seed % 4)).toFixed(1)}s`,
    size: 14 + (i * 3) % 18, // 14~31px
    drift: -90 + (i * 23) % 180,
    spin: 240 + (i * 41) % 240,
    hue: PALETTE[i % PALETTE.length],
    opacity: 0.5 + ((i * 0.08) % 0.35),
  }
})

export default function FloatingPetals() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        '@keyframes oz-petal-fall': {
          '0%': {
            transform: 'translate3d(0, -12vh, 0) rotate(0deg)',
            opacity: 0,
          },
          '8%': {
            opacity: 'var(--petal-opacity, 0.6)',
          },
          '92%': {
            opacity: 'var(--petal-opacity, 0.6)',
          },
          '100%': {
            transform:
              'translate3d(var(--drift, 0px), 112vh, 0) rotate(var(--spin, 360deg))',
            opacity: 0,
          },
        },
        '@keyframes oz-petal-sway': {
          '0%, 100%': { transform: 'translateX(-14px)' },
          '50%': { transform: 'translateX(14px)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          display: 'none',
        },
      }}
    >
      {PETALS.map((p, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: 0,
            left: p.left,
            animation: `oz-petal-fall ${p.duration} linear ${p.delay} infinite`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            '--petal-opacity': p.opacity,
            willChange: 'transform, opacity',
          }}
        >
          <Box
            sx={{
              animation: `oz-petal-sway ${p.swayDuration} ease-in-out infinite`,
              willChange: 'transform',
            }}
          >
            <Petal size={p.size} fill={p.hue} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}

function Petal({ size, fill }) {
  return (
    <Box
      component="svg"
      width={size}
      height={size * 1.15}
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        display: 'block',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
      }}
    >
      {/* 한 잎 꽃잎 — 부드러운 타원 + 끝이 살짝 뾰족 */}
      <path
        d="M20 2 C30 6, 36 18, 32 32 C29 40, 24 44, 20 42 C16 44, 11 40, 8 32 C4 18, 10 6, 20 2 Z"
        fill={fill}
      />
      {/* 안쪽 하이라이트 */}
      <path
        d="M20 10 C25 13, 28 20, 26 28 C24 33, 21 35, 20 33 C19 35, 16 33, 14 28 C12 20, 15 13, 20 10 Z"
        fill="rgba(255,255,255,0.30)"
      />
      {/* 가운데 잎맥 */}
      <path
        d="M20 8 L20 38"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </Box>
  )
}
