import { Box } from '@mui/material'
import { palette, radii } from '../theme/index.js'

/**
 * 이모지/아이콘을 담는 라운드 박스.
 * 화면설계서 5.4 기능 카드의 아이콘 영역에 사용한다.
 */
const TONE_BG = {
  rose: palette.pinkSoft,
  peach: palette.peachSoft,
  green: palette.greenSoft,
  blue: palette.blueSoft,
  yellow: palette.yellowSoft,
  purple: palette.purpleSoft,
}

export default function IconTile({ tone = 'rose', size = 56, children, sx }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${radii.md}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: TONE_BG[tone] || TONE_BG.rose,
        fontSize: Math.round(size * 0.5),
        lineHeight: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
