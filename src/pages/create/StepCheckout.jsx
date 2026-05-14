import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import PillButton from '../../components/PillButton.jsx'
import { useDraft } from './draftContext.js'
import { getTemplateById, UNIFORM_PRICE } from '../../lib/invitations/templates.js'
import { palette } from '../../theme/index.js'

const PAID_DRAFT_SESSION_KEY = 'oz-invitation:last-paid-draft'

export default function StepCheckout() {
  const navigate = useNavigate()
  const { invitation, patch, flush } = useDraft()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [name, setName] = useState(
    invitation?.buyerName || invitation?.wedding?.groom || invitation?.wedding?.bride || '',
  )
  const [phone, setPhone] = useState(
    formatPhone(
      invitation?.buyerPhone ||
        invitation?.wedding?.contactGroom ||
        invitation?.wedding?.contactBride ||
        '',
    ),
  )

  const template = useMemo(
    () => getTemplateById(invitation?.templateId || ''),
    [invitation?.templateId],
  )
  const originalPrice = template?.price || UNIFORM_PRICE
  const discount = 0
  const finalPrice = Math.max(0, originalPrice - discount)
  const normalizedPhone = normalizePhone(phone)
  const canPay =
    !!name.trim() &&
    normalizedPhone.length >= 10 &&
    !!template?.id

  /**
   * 발표용 MVP에서는 실결제 환경변수가 없으면 완료 흐름만 처리한다.
   * VITE_ENABLE_PG=1 && production 일 때만 checkout API 호출.
   */
  const onPay = async () => {
    if (!canPay) return
    setSubmitting(true)
    setSubmitError('')
    const paymentPatch = {
      buyerName: name.trim(),
      buyerPhone: normalizedPhone,
    }
    patch(paymentPatch)
    await flush()
    try {
      if (shouldUseRealCheckout()) {
        const body = {
          templateId: template.id,
          name: name.trim(),
          phoneNumber: normalizedPhone,
        }
        if (isPersistedInvitationId(invitation?.id)) body.invitationId = invitation.id

        const res = await fetch('/api/payments/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const json = await res.json()
        if (!res.ok || !json?.url) {
          throw new Error(json?.error || '결제 세션 생성 실패')
        }
        window.location.assign(json.url)
        return
      }

      await new Promise((r) => setTimeout(r, 450))
      const paidDraft = {
        ...invitation,
        ...paymentPatch,
        status: 'paid',
        step: 3,
        paidAt: new Date().toISOString(),
      }
      try {
        window.sessionStorage.setItem(PAID_DRAFT_SESSION_KEY, JSON.stringify(paidDraft))
      } catch {
        /* 세션 저장소를 사용할 수 없어도 결제 흐름은 계속 진행 */
      }
      patch(paidDraft)
      navigate('/create/complete')
    } catch (e) {
      setSubmitError(e.message || '결제 요청 중 오류가 발생했습니다.')
      setSubmitting(false)
      return
    }
    setSubmitting(false)
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 720, mx: 'auto' }}>
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Stack spacing={2.25}>
            <Stack spacing={1.2} alignItems="center" textAlign="center">
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  background:
                    'linear-gradient(135deg, rgba(251,113,133,1) 0%, rgba(219,39,119,1) 100%)',
                  boxShadow: '0 14px 30px rgba(225,29,72,0.22)',
                }}
              >
                <CreditCardRoundedIcon sx={{ fontSize: 30 }} />
              </Box>
              <Typography sx={{ fontSize: { xs: 25, md: 30 }, fontWeight: 900, letterSpacing: '-0.04em' }}>
                청첩장 결제하기
              </Typography>
              <Typography sx={{ color: palette.textMuted, fontSize: { xs: 14, md: 15 }, lineHeight: 1.7 }}>
                결제가 완료되면 하객에게 공유할 수 있는 모바일 청첩장 링크가 바로 발급됩니다.
              </Typography>
            </Stack>

            <Divider />

            <PaymentRow label="성함">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
              />
            </PaymentRow>
            <Divider />

            <PaymentRow label="휴대폰번호">
              <TextField
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="010-1234-5678"
              />
            </PaymentRow>
            <Divider />

            <PaymentRow label="정가" value={toWon(originalPrice)} />
            <Divider />

            <PaymentRow label="할인" value={toWon(discount)} />
            <Divider />

            <PaymentRow label="결제금액" value={toWon(finalPrice)} strong />
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
        <PillButton variant="outline" onClick={() => navigate('/create/details')}>
          ← 정보 다시 보기
        </PillButton>
        <PillButton size="large" disabled={!canPay || submitting} onClick={onPay}>
          {submitting ? '결제 진행 중…' : `${toWon(finalPrice)} 결제하기`}
        </PillButton>
      </Stack>

      {submitError && <Alert severity="error">{submitError}</Alert>}

      {!canPay && (
        <Typography variant="caption" sx={{ color: palette.textMuted }}>
          결제를 진행하려면 디자인 선택 후 성함과 휴대폰번호를 입력해 주세요.
        </Typography>
      )}
    </Stack>
  )
}

function PaymentRow({ label, value, strong = false, children }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      justifyContent="space-between"
      alignItems={{ sm: 'center' }}
    >
      <Typography color="text.secondary" sx={{ minWidth: 88 }}>
        {label}
      </Typography>
      {children || (
        <Typography fontWeight={strong ? 700 : 500} color={strong ? 'primary' : 'text.primary'}>
          {value}
        </Typography>
      )}
    </Stack>
  )
}

function toWon(amount) {
  return `₩${Number(amount || 0).toLocaleString()}`
}

function normalizePhone(value) {
  return String(value || '').replace(/\D+/g, '')
}

function formatPhone(value) {
  const n = normalizePhone(value).slice(0, 11)
  if (n.length < 4) return n
  if (n.length < 8) return `${n.slice(0, 3)}-${n.slice(3)}`
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}`
}

function shouldUseRealCheckout() {
  return import.meta.env.PROD && import.meta.env.VITE_ENABLE_PG === '1'
}

function isPersistedInvitationId(id) {
  return !!id && !String(id).startsWith('draft-')
}
