import { Box } from '@mui/material'
import { palette } from '../theme/index.js'

/**
 * Stat 수치나 강조 텍스트에 사용하는 그라데이션 텍스트.
 */
export default function GradientText({
  gradient = palette.primaryGradient,
  component = 'span',
  sx,
  children,
}) {
  return (
    <Box
      component={component}
      sx={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        display: 'inline-block',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
