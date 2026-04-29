import { useState } from 'react'
import { Alert, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { isFirebaseConfigured } from '../lib/firebase.js'
import { findInvitationsByBuyer } from '../lib/invitations/invitationsService.js'
import { getTemplateById } from '../lib/invitations/templates.js'

export default function OrdersLookupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)

  const onLookup = async () => {
    setSearched(false)
    setError('')
    const trimmedName = name.trim()
    const normalizedPhone = normalizePhone(phone)
    if (!trimmedName || normalizedPhone.length < 10) {
      setError('성함과 휴대폰번호를 정확히 입력해 주세요.')
      return
    }
    if (!isFirebaseConfigured) {
      setError('현재 조회 기능은 Firebase 환경변수 설정 후 사용할 수 있습니다.')
      return
    }

    setSubmitting(true)
    try {
      const found = await findInvitationsByBuyer({
        name: trimmedName,
        phoneNumber: normalizedPhone,
      })
      setResults(found)
      setSearched(true)
    } catch (e) {
      setError(e.message || '주문 조회 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionContainer tone="surface">
      <Stack spacing={3} sx={{ maxWidth: 760, mx: 'auto' }}>
        <Stack spacing={1}>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 36 } }}>
            템플릿 주문 조회
          </Typography>
          <Typography color="text.secondary">
            결제 시 입력한 성함과 휴대폰번호로 청첩장을 조회하고 수정할 수 있습니다.
          </Typography>
        </Stack>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <FormField
                label="성함"
                required
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormField
                label="휴대폰번호"
                required
                placeholder="01012345678"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />
              {error && <Alert severity="warning">{error}</Alert>}
              <PillButton
                size="large"
                onClick={onLookup}
                disabled={submitting}
              >
                {submitting ? '조회 중…' : '주문 조회'}
              </PillButton>
            </Stack>
          </CardContent>
        </Card>

        {searched && !results.length && (
          <Alert severity="info">일치하는 주문을 찾지 못했습니다. 입력값을 다시 확인해 주세요.</Alert>
        )}

        {!!results.length && (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">조회 결과</Typography>
                {results.map((inv, index) => {
                  const template = inv.templateId ? getTemplateById(inv.templateId) : null
                  return (
                    <Stack key={inv.id} spacing={1.25}>
                      <Typography fontWeight={700}>
                        {inv.wedding?.groom || '신랑'} · {inv.wedding?.bride || '신부'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        템플릿: {template?.name || inv.templateId || '미선택'} · 상태: {inv.status || 'draft'}
                      </Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                        {inv.slug && (
                          <PillButton
                            size="small"
                            variant="outline"
                            onClick={() => navigate(`/i/${inv.slug}`)}
                          >
                            청첩장 보기
                          </PillButton>
                        )}
                        <PillButton
                          size="small"
                          onClick={() => navigate(`/create/details?invitationId=${inv.id}`)}
                        >
                          수정하기
                        </PillButton>
                      </Stack>
                      {index < results.length - 1 && <Divider />}
                    </Stack>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </SectionContainer>
  )
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
