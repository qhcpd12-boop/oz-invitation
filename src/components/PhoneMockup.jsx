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
    image: '/wedding-1.png',
    color: '#fff',
    accent: '#B07B45',
    label: '럭셔리 디자인',
  },
  garden: {
    bg: 'linear-gradient(180deg, #DCFCE7 0%, #FEFCF9 100%)',
    image: '/wedding-2.png',
    color: '#fff',
    accent: '#2C8A5A',
    label: '가든 디자인',
  },
  classic: {
    bg: '#FFFBF5',
    image: '/wedding-3.png',
    color: '#fff',
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
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <Box
        component="img"
        src={p.image}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '52%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />
      <Stack
        spacing={0.9}
        alignItems="center"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          px: 2.3,
          pb: 2.2,
          pt: 5.5,
          color: p.color,
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.3em', color: p.accent, fontWeight: 700 }}
        >
          WEDDING
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 21, fontWeight: 700, color: p.color, textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
          {groom}
        </Typography>
        <Typography sx={{ color: p.accent, fontFamily: fontFamily.serif, fontSize: 17, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          &
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 21, fontWeight: 700, color: p.color, textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
          {bride}
        </Typography>
        <Box sx={{ width: 40, height: 1, background: p.color, opacity: 0.45, my: 0.4 }} />
        <Typography variant="caption" sx={{ opacity: 0.95, color: p.color, textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>
          {date}
        </Typography>
        {venue && (
          <Typography variant="caption" sx={{ opacity: 0.9, color: p.color, textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>
            {venue}
          </Typography>
        )}
        <Box
          sx={{
            mt: 0.7,
            px: 1.5,
            py: 0.5,
            borderRadius: `${radii.pill}px`,
            background: `${p.accent}20`,
            color: p.accent,
            fontSize: 11,
            fontWeight: 700,
            border: `1px solid ${p.accent}55`,
          }}
        >
          {p.label}
        </Box>
      </Stack>
    </Box>
  )
}
