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
        display: 'inline',
        WebkitBoxDecorationBreak: 'clone', /* 텍스트가 줄바꿈되어도 그라데이션이 각 줄에 정상 적용되도록 함 */
        boxDecorationBreak: 'clone',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
