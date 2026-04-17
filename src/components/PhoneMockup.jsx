import { Box, Stack, Typography } from '@mui/material'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

/**
 * 히어로 섹션의 폰 카드 목업.
 *  variant: 'luxury' | 'garden' | 'classic'
 *  data: { groom, bride, date, venue, label }
 */
const PRESET = {
  luxury: {
    bg: '#1A1A1A',
    color: '#fff',
    accent: '#E5C088',
    label: '럭셔리 디자인',
  },
  garden: {
    bg: 'linear-gradient(180deg, #DCFCE7 0%, #FEFCF9 100%)',
    color: palette.textPrimary,
    accent: '#16A34A',
    label: '가든 디자인',
  },
  classic: {
    bg: '#FFFBF5',
    color: palette.textPrimary,
    accent: palette.primary,
    label: '클래식 디자인',
  },
}

export default function PhoneMockup({
  variant = 'luxury',
  groom = '김민준',
  bride = '이서연',
  date = '2026.05.24 SAT',
  venue,
  width = 220,
  rotate = 0,
}) {
  const p = PRESET[variant]
  const height = Math.round(width * 2)

  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: `${Math.round(width * 0.16)}px`,
        background: p.bg,
        color: p.color,
        boxShadow: shadows.elevated,
        transform: `rotate(${rotate}deg)`,
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.3em', color: p.accent, fontWeight: 700 }}
        >
          WEDDING
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 22, fontWeight: 700 }}>
          {groom}
        </Typography>
        <Typography sx={{ color: p.accent, fontFamily: fontFamily.serif, fontSize: 18 }}>
          &
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 22, fontWeight: 700 }}>
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
            background: 'rgba(255,255,255,0.12)',
            color: p.accent,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {p.label}
        </Box>
      </Stack>
    </Box>
  )
}
