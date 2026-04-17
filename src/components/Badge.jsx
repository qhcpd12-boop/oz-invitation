import { Box } from '@mui/material'
import { palette, radii } from '../theme/index.js'

/**
 * Pill 형태의 섹션 태그/뱃지.
 * tone: 'rose' | 'dark' | 'light'
 */
export default function Badge({ tone = 'rose', children, sx }) {
  const palettes = {
    rose: { bg: palette.pinkSoft, color: palette.primary },
    dark: { bg: 'rgba(255,255,255,0.12)', color: '#fff' },
    light: { bg: '#fff', color: palette.primary },
  }[tone]

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 2,
        py: 0.75,
        borderRadius: `${radii.pill}px`,
        background: palettes.bg,
        color: palettes.color,
        fontFamily: 'inherit',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.04em',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
