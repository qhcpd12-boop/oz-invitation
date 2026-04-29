import { Card, CardContent, Stack, Typography, Box } from '@mui/material'
import { palette, radii, shadows } from '../theme/index.js'

/**
 * 후기 카드(별점/인용/이모지 아바타/이름·시기)
 */
export default function TestimonialCard({ rating = 5, quote, avatar, name, period }) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: `${radii.lg}px`,
        border: `1px solid ${palette.border}`,
        background: '#fff',
        boxShadow: shadows.card,
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={2.5}>
          <Typography sx={{ color: palette.star, fontSize: 20, letterSpacing: 2 }}>
            {stars}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: 'pre-line', minHeight: 88, lineHeight: 1.75, textIndent: '0.5em' }}
          >
            “{quote}”
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: palette.pinkSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              {avatar}
            </Box>
            <Stack spacing={0}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {period}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
