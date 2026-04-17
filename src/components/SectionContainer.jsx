import { Box } from '@mui/material'
import { palette } from '../theme/index.js'

/**
 * 섹션 단위 컨테이너.
 *  - tone: 'light' | 'dark' | 'surface' | 'transparent'
 *  - id: 앵커 링크용
 */
export default function SectionContainer({
  id,
  tone = 'light',
  py = { xs: 7, md: 12 },
  children,
  innerSx,
  sx,
}) {
  const bg = {
    light: palette.surfaceWhite,
    surface: palette.surface,
    dark: palette.bgDark,
    transparent: 'transparent',
  }[tone]

  const color = tone === 'dark' ? palette.textOnDark : palette.textPrimary

  return (
    <Box
      component="section"
      id={id}
      sx={{
        backgroundColor: bg,
        color,
        width: '100%',
        ...sx,
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2.5, sm: 4, md: 7.5 },
          py,
          ...innerSx,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
