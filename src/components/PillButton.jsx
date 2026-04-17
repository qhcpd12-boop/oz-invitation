import { Button } from '@mui/material'
import { palette, radii, shadows } from '../theme/index.js'

/**
 * 시안의 모서리 100px 라운드 버튼.
 * variant: 'filled' | 'outline' | 'ghost' | 'dark'
 */
export default function PillButton({
  variant = 'filled',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  sx,
  children,
  ...rest
}) {
  const variantSx = {
    filled: {
      background: palette.ctaGradient,
      color: '#fff',
      boxShadow: shadows.cta,
      '&:hover': { background: palette.ctaGradient, opacity: 0.95 },
    },
    outline: {
      background: 'transparent',
      color: palette.textPrimary,
      border: `2px solid ${palette.textPrimary}`,
      '&:hover': { background: 'rgba(0,0,0,0.04)' },
    },
    ghost: {
      background: 'transparent',
      color: palette.primary,
      '&:hover': { background: palette.pinkSoft },
    },
    dark: {
      background: palette.bgDark,
      color: '#fff',
      '&:hover': { background: '#000' },
    },
    light: {
      background: '#fff',
      color: palette.primary,
      '&:hover': { background: '#fff', opacity: 0.92 },
    },
  }[variant]

  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: `${radii.pill}px`,
        paddingInline: size === 'large' ? 4 : 3,
        paddingBlock: size === 'large' ? 1.75 : 1.25,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        ...variantSx,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
