import { Box, Stack, Typography } from '@mui/material'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

/**
 * 히어로/카드 그리드의 폰 카드 목업.
 *  variant: 'luxury' | 'classic' | 'garden' | 'natural' | 'vintage'
 */
const PRESET = {
  luxury: {
    bg: 'linear-gradient(180deg, #15110C 0%, #0A0A0A 100%)',
    color: '#fff',
    accent: '#D4AF7A',
    label: '럭셔리 누아르',
    motif: 'diamond',
  },
  garden: {
    bg: 'linear-gradient(180deg, #DCFCE7 0%, #FEFCF9 100%)',
    color: palette.textPrimary,
    accent: '#16A34A',
    label: '가든 디자인',
    motif: null,
  },
  classic: {
    bg: 'linear-gradient(180deg, #FBF1ED 0%, #FFFAF8 60%, #F7E6E2 100%)',
    color: '#3A2A2E',
    accent: '#C97A8C',
    label: '로맨틱 로즈',
    motif: 'leaf',
  },
  natural: {
    bg: 'linear-gradient(165deg, #4a7c59 0%, #2d5a3d 50%, #1a3328 100%)',
    color: '#fff',
    accent: '#fff',
    label: '내추럴 포토',
    motif: null,
  },
  vintage: {
    bg: '#f5f4f0',
    color: '#1a1a1a',
    accent: '#1a1a1a',
    label: '빈티지 일러스트',
    motif: null,
  },
  minimal: {
    bg: '#FFFFFF',
    color: '#0A0A0A',
    accent: '#0A0A0A',
    label: '모던 미니멀',
    motif: 'tick',
  },
  letter: {
    bg: 'linear-gradient(180deg, #F5EFE3 0%, #FDFAF1 100%)',
    color: '#3A2E22',
    accent: '#8B6F47',
    label: '클래식 편지',
    motif: 'stamp',
  },
  midnight: {
    bg: 'radial-gradient(ellipse at top, #142850 0%, #0B1A3A 50%, #050B1F 100%)',
    color: '#EDF1F8',
    accent: '#9DB2D6',
    label: '미드나잇 블루',
    motif: 'star',
  },
}

function DiamondMotif({ color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, lineHeight: 0 }}>
      <Box sx={{ width: 14, height: 1, background: color, opacity: 0.7 }} />
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0 L8 4 L4 8 L0 4 Z" stroke={color} strokeWidth="0.8" fill="none" />
      </svg>
      <Box sx={{ width: 14, height: 1, background: color, opacity: 0.7 }} />
    </Box>
  )
}

function LeafMotif({ color }) {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5 Q5 4 11 5 Q17 6 21 5" stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M5 5 Q6 1 8 2 Q7 4 5 5 Z" fill={color} opacity="0.85" />
      <path d="M17 5 Q16 9 14 8 Q15 6 17 5 Z" fill={color} opacity="0.85" />
    </svg>
  )
}

function TickMotif({ color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, lineHeight: 0 }}>
      <Box sx={{ width: 18, height: 2, background: color }} />
      <Box sx={{ width: 6, height: 6, background: color }} />
      <Box sx={{ width: 18, height: 2, background: color }} />
    </Box>
  )
}

function StampMotif({ color }) {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="17" height="11" rx="1" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="1.6 1.6" />
      <circle cx="10" cy="7" r="2.6" fill="none" stroke={color} strokeWidth="0.6" />
      <path d="M10 4.5 Q12 7 10 9 Q8 7 10 4.5" fill={color} opacity="0.6" />
    </svg>
  )
}

function StarMotifMini({ color }) {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7 L5 4 L6 7 L9 7 L6 8 L5 11 L4 8 L1 7 Z" fill={color} opacity="0.7" />
      <path d="M14 7 L15.4 3 L16.8 7 L20 8 L16.8 9 L15.4 13 L14 9 L11 8 Z" fill={color} />
    </svg>
  )
}

export default function PhoneMockup({
  variant = 'luxury',
  groom = '김민준',
  bride = '이서연',
  date = '2026.05.24 SAT',
  venue,
  imgSrc,
  width = 220,
  rotate = 0,
  label,
}) {
  const p = PRESET[variant]
  const displayLabel = label || p.label
  const height = Math.round(width * 2)
  const hasImage = !!imgSrc

  const backgroundStyle = hasImage
    ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imgSrc}')`
    : p.bg;

  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: `${Math.round(width * 0.16)}px`,
        background: backgroundStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: hasImage ? '#fff' : p.color,
        boxShadow: shadows.elevated,
        transform: `rotate(${rotate}deg)`,
        transition:
          'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        '&:hover': {
          transform: `rotate(${rotate}deg) translateY(-6px)`,
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
        },
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: `1px solid rgba(255,255,255,0.08)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack spacing={1.2} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
        {!hasImage && p.motif === 'diamond' && <DiamondMotif color={p.accent} />}
        {!hasImage && p.motif === 'leaf' && <LeafMotif color={p.accent} />}
        {!hasImage && p.motif === 'tick' && <TickMotif color={p.accent} />}
        {!hasImage && p.motif === 'stamp' && <StampMotif color={p.accent} />}
        {!hasImage && p.motif === 'star' && <StarMotifMini color={p.accent} />}

        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.3em', color: p.accent, fontWeight: 700 }}
        >
          WEDDING
        </Typography>

        <Typography sx={{ fontFamily: fontFamily.sans, fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>
          {groom}
        </Typography>
        <Typography sx={{ color: p.accent, fontFamily: fontFamily.serif, fontSize: 18 }}>
          &
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.sans, fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>
          {bride}
        </Typography>
        <Box sx={{ width: 40, height: 1, background: 'currentColor', opacity: 0.4, my: 1 }} />
        <Typography variant="caption" sx={{ opacity: 0.85 }}>
          {date}
        </Typography>
        {venue && (
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {venue}
          </Typography>
        )}
        <Box
          sx={{
            mt: 1.5,
            px: 1.5,
            py: 0.5,
            borderRadius: `${radii.pill}px`,
            background:
              variant === 'classic' ? 'rgba(201, 122, 140, 0.15)' :
              variant === 'minimal' ? 'rgba(10, 10, 10, 0.08)' :
              variant === 'letter' ? 'rgba(139, 111, 71, 0.14)' :
              'rgba(255,255,255,0.12)',
            color: p.accent,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {displayLabel}
        </Box>
      </Stack>
    </Box>
  )
}
