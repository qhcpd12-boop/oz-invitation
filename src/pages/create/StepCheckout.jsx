import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PillButton from '../../components/PillButton.jsx'
import Badge from '../../components/Badge.jsx'
import { useDraft } from './draftContext.js'
import { getPlanById, PLANS } from '../../lib/pricing.js'
import { palette, radii } from '../../theme/index.js'

export default function StepCheckout() {
  const navigate = useNavigate()
  const { invitation, patch } = useDraft()
  const [params] = useSearchParams()
  const [submitting, setSubmitting] = useState(false)

  const planId = params.get('plan') || invitation?.plan || 'standard'
  const plan = getPlanById(planId)

  useEffect(() => {
    if (invitation && invitation.plan !== planId) patch({ plan: planId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId, invitation?.id])

  /** 실제 PG·`/api/payments/checkout` 없이, 결제 완료로만 처리 (Firestore rules 상 `paid`는 서버 전용이므로 persist 하지 않음) */
  const onPay = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 450))
    patch({ status: 'paid', step: 3 }, { persist: false })
    navigate('/create/complete')
    setSubmitting(false)
  }

  return (
    <Stack spacing={3}>
      <Typography color="text.secondary">
        결제 후 즉시 청첩장이 발행되며, 마이페이지에서 언제든 수정할 수 있습니다.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">요금제 선택</Typography>
                <Stack spacing={1.5}>
                  {PLANS.map((p) => {
                    const active = p.id === planId
                    return (
                      <Box
                        key={p.id}
                        onClick={() => navigate(`/create/checkout?plan=${p.id}`)}
                        sx={{
                          cursor: 'pointer',
                          p: 2.5,
                          borderRadius: `${radii.md}px`,
                          border: `2px solid ${active ? palette.primary : palette.border}`,
                          background: active ? palette.pinkSoft : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Stack>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>{p.name}</Typography>
                            {p.badge && <Badge>{p.badge}</Badge>}
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            {p.tagline}
                          </Typography>
                        </Stack>
                        <Typography fontWeight={700}>₩{p.priceLabel}</Typography>
                      </Box>
                    )
                  })}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">결제 요약</Typography>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">{plan?.name} 요금제</Typography>
                  <Typography>₩{plan?.priceLabel}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">VAT</Typography>
                  <Typography>포함</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={700}>총 결제 금액</Typography>
                  <Typography fontWeight={700} color="primary">
                    ₩{plan?.priceLabel}
                  </Typography>
                </Stack>

                <Alert severity="info" sx={{ textAlign: 'left' }}>
                  개발용: 실제 결제·결제 API는 연동하지 않습니다. 버튼을 누르면 결제가 완료된 것으로 처리되며, Firestore의 상태는
                  그대로 두고 화면만 다음 단계로 넘어갑니다.
                </Alert>

                <PillButton size="large" disabled={submitting} onClick={onPay}>
                  {submitting ? '결제 진행 중…' : `₩${plan?.priceLabel} 결제하기`}
                </PillButton>
                <PillButton variant="outline" onClick={() => navigate('/create/details')}>
                  ← 정보 다시 보기
                </PillButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}
