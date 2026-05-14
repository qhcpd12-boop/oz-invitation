import { Box, Stack, Typography } from '@mui/material'
import GradientText from './GradientText.jsx'
import { fontFamily } from '../theme/index.js'

/**
 * Hero 아래 정보 블록의 단일 항목.
 *  value: '사진 업로드'
 *  label: '두 사람의 분위기가 담긴 사진으로 시작해요'
 */
export default function StatBlock({ value, label }) {
  return (
    <Stack alignItems="center" spacing={1}>
      <Box
        sx={{
          fontFamily: fontFamily.sans,
          fontWeight: 800,
          fontSize: { xs: 36, md: 48 },
          lineHeight: 1.2,
          letterSpacing: '-0.03em',
        }}
      >
        <GradientText>{value}</GradientText>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  )
}
