import { useMemo, useState } from 'react'
import {
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../../components/PillButton.jsx'
import { useDraft } from './draftContext.js'
import { getTemplateById, UNIFORM_PRICE } from '../../lib/invitations/templates.js'
import { palette } from '../../theme/index.js'

export default function StepCheckout() {
  const navigate = useNavigate()
  const { invitation, patch, flush } = useDraft()
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState(invitation?.buyerName || '')
  const [phone, setPhone] = useState(formatPhone(invitation?.buyerPhone || ''))

  const template = useMemo(
    () => getTemplateById(invitation?.templateId || ''),
    [invitation?.templateId],
  )
  const originalPrice = template?.price || UNIFORM_PRICE
  const discount = 0
  const finalPrice = Math.max(0, originalPrice - discount)
  const normalizedPhone = normalizePhone(phone)
  const canPay = !!name.trim() && normalizedPhone.length >= 10

  /** 실제 PG는 후속 단계에서 연동한다. 현재는 결제 완료 플로우만 검증한다. */
  const onPay = async () => {
    if (!canPay) return
    setSubmitting(true)
    patch({
      buyerName: name.trim(),
      buyerPhone: normalizedPhone,
    })
    await flush()
    await new Promise((r) => setTimeout(r, 450))
    patch({ status: 'paid', step: 3 })
    navigate('/create/complete')
    setSubmitting(false)
  }

  return (
    <Stack spacing={3}>
      <Typography color="text.secondary">
        결제 정보를 확인해 주세요. 성함과 휴대폰번호는 이후 주문 조회에 사용됩니다.
      </Typography>

      <Card>
        <CardContent>
          <Stack spacing={2.25}>
            <Typography variant="h5">결제 정보</Typography>

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

            <PaymentRow label="템플릿명" value={template?.name || '미선택'} />
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

      {!canPay && (
        <Typography variant="caption" sx={{ color: palette.textMuted }}>
          결제를 진행하려면 성함과 휴대폰번호를 입력해 주세요.
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
