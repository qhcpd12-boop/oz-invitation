import { Button } from '@mui/material'
import { palette, radii } from '../theme/index.js'

/**
 * iOS 글래스 톤의 공통 필 버튼.
 * variant: 'filled' | 'outline' | 'ghost' | 'dark' | 'light'
 */
const GLASS_BLUR = 'blur(18px) saturate(180%)'

const sizeSx = {
  small: {
    minHeight: 42,
    px: 2,
    py: 1,
    fontSize: 13.5,
  },
  medium: {
    minHeight: 52,
    px: 3,
    py: 1.25,
    fontSize: 15,
  },
  large: {
    minHeight: 64,
    px: 4,
    py: 1.55,
    fontSize: 17,
  },
}

const glassBase = {
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  border: '1px solid rgba(255, 255, 255, 0.58)',
  boxShadow:
    '0 12px 28px rgba(45, 45, 45, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.58)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '1px 1px auto',
    height: '28%',
    borderRadius: `${radii.pill}px ${radii.pill}px 18px 18px`,
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 100%)',
    pointerEvents: 'none',
  },
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    position: 'relative',
    zIndex: 1,
  },
  '& .MuiButton-startIcon': { ml: -0.25, mr: 0.75 },
  '& .MuiButton-endIcon': { ml: 0.75, mr: -0.25 },
}

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
      ...glassBase,
      background:
        'linear-gradient(135deg, rgba(251, 113, 133, 0.94) 0%, rgba(219, 39, 119, 0.90) 100%)',
      color: '#fff',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
      border: '1px solid rgba(255, 255, 255, 0.54)',
      boxShadow:
        '0 14px 30px rgba(225, 29, 72, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.46)',
      '&:hover': {
        background:
          'linear-gradient(135deg, rgba(251, 113, 133, 0.98) 0%, rgba(219, 39, 119, 0.96) 100%)',
        boxShadow:
          '0 18px 38px rgba(225, 29, 72, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.54)',
        transform: 'translateY(-1px)',
      },
    },
    outline: {
      ...glassBase,
      background: 'rgba(255, 255, 255, 0.56)',
      color: palette.textPrimary,
      border: '1px solid rgba(45, 45, 45, 0.12)',
      boxShadow:
        '0 10px 24px rgba(45, 45, 45, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.68)',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.72)',
        borderColor: 'rgba(45, 45, 45, 0.16)',
        boxShadow:
          '0 14px 32px rgba(45, 45, 45, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.78)',
        transform: 'translateY(-1px)',
      },
    },
    ghost: {
      background: 'rgba(255, 255, 255, 0.20)',
      color: palette.primary,
      boxShadow: 'none',
      border: '1px solid transparent',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.42)',
        borderColor: 'rgba(255, 255, 255, 0.58)',
      },
    },
    dark: {
      ...glassBase,
      background: 'rgba(31, 30, 29, 0.78)',
      color: '#fff',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      '&:hover': {
        background: 'rgba(31, 30, 29, 0.88)',
        boxShadow:
          '0 14px 34px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.08)',
        transform: 'translateY(-1px)',
      },
    },
    light: {
      ...glassBase,
      background: 'rgba(255, 255, 255, 0.82)',
      color: '#151417',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.94)',
        boxShadow:
          '0 14px 32px rgba(45, 45, 45, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.86), inset 0 -1px 0 rgba(0, 0, 0, 0.04)',
        transform: 'translateY(-1px)',
      },
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
        ...sizeSx[size],
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.01em',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
        transition:
          'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, opacity 0.22s ease, background 0.22s ease',
        '&:active': { transform: 'translateY(0)' },
        ...variantSx,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
