import { Box, Stack, Typography } from '@mui/material'
import GradientText from './GradientText.jsx'
import { fontFamily } from '../theme/index.js'

/**
 * Hero 아래 STATS 블록의 단일 항목.
 *  value: '20,000+'
 *  label: '제작된 청첩장'
 */
export default function StatBlock({ value, label }) {
  return (
    <Stack alignItems="center" spacing={1}>
      <Box
        sx={{
          fontFamily: fontFamily.serif,
          fontWeight: 700,
          fontSize: { xs: 36, md: 48 },
          lineHeight: 1.2,
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
