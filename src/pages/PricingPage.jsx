import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import IconTile from '../components/IconTile.jsx'
import PricingCard from '../components/PricingCard.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { palette, radii } from '../theme/index.js'
import { ADDONS, COMPARE_COLUMNS, COMPARE_ROWS, PLANS } from '../lib/pricing.js'

export default function PricingPage() {
  const navigate = useNavigate()

  const onSelectPlan = (planId) => {
    navigate(`/create/checkout?plan=${planId}`)
  }

  return (
    <>
      <SectionContainer tone="surface">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
          <Badge>합리적인 요금제</Badge>
          <Typography variant="h2">나에게 딱 맞는 요금제를 선택하세요</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            모든 요금제에 프리미엄 디자인과 모바일 최적화가 포함되어 있습니다.
          </Typography>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {PLANS.map((p) => (
            <Grid key={p.id} item xs={12} md={4}>
              <PricingCard
                name={p.name}
                tagline={p.tagline}
                price={p.priceLabel}
                period={p.period}
                features={p.features}
                bonus={p.bonus}
                badge={p.badge}
                highlight={p.highlight}
                ctaLabel={p.ctaLabel}
                onSelect={() => onSelectPlan(p.id)}
              />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer tone="light">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={4}>
          <Badge tone="rose">추가 옵션</Badge>
          <Typography variant="h2">애드온 추가 결제</Typography>
          <Typography color="text.secondary">필요할 때만 소액 결제로 편리하게 이용하세요.</Typography>
        </Stack>

        <Grid container spacing={3}>
          {ADDONS.map((a) => (
            <Grid key={a.id} item xs={12} md={6}>
              <Card sx={{ p: { xs: 3, md: 4 } }}>
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <IconTile tone="rose">{a.icon}</IconTile>
                    <Stack spacing={1} sx={{ flex: 1 }}>
                      <Typography variant="h5">{a.title}</Typography>
                      <Typography color="text.secondary">{a.desc}</Typography>
                      <Box>
                        <Typography component="span" sx={{ fontWeight: 700, fontSize: 20 }}>
                          ₩{a.price.toLocaleString()}
                        </Typography>{' '}
                        <Typography component="span" color="text.secondary">
                          {a.unit}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer tone="surface">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={4}>
          <Typography variant="h2">요금제 비교표</Typography>
        </Stack>
        <Box sx={{ borderRadius: `${radii.lg}px`, overflowX: 'auto' }}>
          <ComparisonTable columns={COMPARE_COLUMNS} rows={COMPARE_ROWS} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" mt={2}>
          ※ 모든 요금제는 모바일 최적화·SSL·개인정보 보호가 기본 적용됩니다.
        </Typography>

        <Box mt={6} sx={{ background: palette.pinkSoft, borderRadius: `${radii.lg}px`, p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            요금제 선택이 어렵다면?
          </Typography>
          <Typography color="text.secondary">
            가장 인기 있는 <strong>스탠다드 🔥 BEST</strong> 를 추천드려요.
          </Typography>
        </Box>
      </SectionContainer>
    </>
  )
}
