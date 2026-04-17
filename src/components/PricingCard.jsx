import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import PillButton from './PillButton.jsx'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

/**
 * 요금제 카드 — 라이트/스탠다드(BEST)/프리미엄
 *  highlight=true 일 때 강조(보더, 그라데이션 헤더, 뱃지)
 */
export default function PricingCard({
  name,
  tagline,
  priceLabel = '시작가',
  currency = '₩',
  price,
  period,
  features = [],
  bonus,
  ctaLabel,
  badge,
  highlight = false,
  onSelect,
}) {
  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        borderRadius: `${radii.lg}px`,
        border: highlight ? `2px solid ${palette.primary}` : `1px solid ${palette.border}`,
        boxShadow: highlight ? shadows.elevated : shadows.card,
        background: '#fff',
        overflow: 'visible',
      }}
    >
      {badge && (
        <Box
          sx={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: palette.ctaGradient,
            color: '#fff',
            px: 2,
            py: 0.5,
            borderRadius: `${radii.pill}px`,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.04em',
            boxShadow: shadows.cta,
          }}
        >
          {badge}
        </Box>
      )}

      <Box
        sx={{
          background: highlight ? palette.ctaGradient : palette.surface,
          color: highlight ? '#fff' : palette.textPrimary,
          p: { xs: 3, md: 4 },
          borderTopLeftRadius: `${radii.lg}px`,
          borderTopRightRadius: `${radii.lg}px`,
          borderBottom: highlight ? 'none' : `1px solid ${palette.border}`,
        }}
      >
        <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 24, fontWeight: 700 }}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ opacity: highlight ? 0.85 : 0.7, display: 'block', mt: 0.5 }}
        >
          {tagline}
        </Typography>

        <Stack direction="row" alignItems="baseline" spacing={0.5} mt={2}>
          <Typography
            variant="caption"
            sx={{ opacity: highlight ? 0.85 : 0.6, fontWeight: 700 }}
          >
            {priceLabel}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="baseline" spacing={0.5}>
          <Typography sx={{ fontSize: 22, fontWeight: 700 }}>{currency}</Typography>
          <Typography sx={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{price}</Typography>
        </Stack>
        <Typography variant="caption" sx={{ opacity: highlight ? 0.85 : 0.6 }}>
          {period}
        </Typography>
      </Box>

      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={1.5}>
          {features.map((f, i) => (
            <Stack
              key={i}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{
                pb: 1.5,
                borderBottom: i < features.length - 1 ? `1px solid ${palette.divider}` : 'none',
              }}
            >
              <Box sx={{ color: palette.primary, fontWeight: 700, lineHeight: 1.4 }}>✓</Box>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {f}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {bonus && (
          <Box
            sx={{
              mt: 3,
              p: 2.5,
              background: palette.surface,
              borderRadius: `${radii.md}px`,
              border: `1px solid ${palette.border}`,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: palette.primary, mb: 0.5 }}>
              {bonus.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {bonus.body}
            </Typography>
          </Box>
        )}

        <PillButton
          fullWidth
          size="large"
          variant={highlight ? 'dark' : 'filled'}
          sx={{ mt: 3 }}
          onClick={onSelect}
        >
          {ctaLabel}
        </PillButton>
      </CardContent>
    </Card>
  )
}
