import { useState } from 'react'
import { Alert, Box, Card, CardActions, CardContent, CardHeader, Chip, Divider, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { isFirebaseConfigured } from '../lib/firebase.js'
import { findInvitationsByBuyer } from '../lib/invitations/invitationsService.js'
import { palette, radii } from '../theme/index.js'

const SHADCN_CARD_SX = {
  borderRadius: `${radii.md - 2}px`,
  border: `1px solid ${palette.border}`,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
  bgcolor: palette.surfaceWhite,
  overflow: 'hidden',
}

const SHADCN_HEADER_SX = {
  px: { xs: 3, md: 3.5 },
  pt: { xs: 3, md: 3.5 },
  pb: 0,
  '& .MuiCardHeader-title': {
    fontSize: { xs: 20, md: 22 },
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: palette.textPrimary,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: 14,
    color: palette.textMuted,
    mt: 0.5,
    lineHeight: 1.55,
  },
}

const SHADCN_CONTENT_SX = {
  px: { xs: 3, md: 3.5 },
  pt: { xs: 2.5, md: 3 },
  pb: { xs: 2.5, md: 3 },
}

const SHADCN_FOOTER_SX = {
  px: { xs: 3, md: 3.5 },
  pt: 0,
  pb: { xs: 3, md: 3.5 },
  gap: 1.25,
  flexWrap: 'wrap',
}

const RESULT_FOOTER_SX = {
  ...SHADCN_FOOTER_SX,
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'stretch',
  '& > *': {
    width: { xs: '100%', sm: 'auto' },
    flex: { sm: 1 },
  },
}

const STATUS_LABEL = {
  draft: '작성 중',
  paid: '결제 완료',
  published: '게시됨',
  ready: '준비 완료',
}

const STATUS_COLOR = {
  draft: { bg: palette.peachSoft, fg: '#9A6B2F' },
  paid: { bg: palette.greenSoft, fg: '#1F7A4D' },
  published: { bg: palette.pinkSoft, fg: palette.primaryDark },
  ready: { bg: palette.blueSoft, fg: '#1E3A8A' },
}

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
      <Stack spacing={3} sx={{ maxWidth: 640, mx: 'auto' }}>
        <Stack spacing={1} sx={{ px: { xs: 0.5, md: 0 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 26, md: 32 },
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: palette.textPrimary,
            }}
          >
            주문 조회
          </Typography>
          <Typography sx={{ color: palette.textMuted, fontSize: { xs: 14, md: 15 } }}>
            결제 시 입력한 성함과 휴대폰번호로 청첩장을 다시 불러와 수정할 수 있어요.
          </Typography>
        </Stack>

        <Card elevation={0} sx={SHADCN_CARD_SX}>
          <CardHeader
            title="구매자 정보 입력"
            subheader="결제 시 입력한 정보와 동일하게 적어 주세요."
            sx={SHADCN_HEADER_SX}
          />
          <CardContent sx={SHADCN_CONTENT_SX}>
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
                placeholder="010-1234-5678"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />
              {error && (
                <Alert
                  severity="warning"
                  sx={{
                    borderRadius: `${radii.sm}px`,
                    border: `1px solid ${palette.border}`,
                    bgcolor: '#FFFBEB',
                  }}
                >
                  {error}
                </Alert>
              )}
            </Stack>
          </CardContent>
          <CardActions sx={SHADCN_FOOTER_SX}>
            <PillButton
              size="medium"
              fullWidth
              onClick={onLookup}
              disabled={submitting}
            >
              {submitting ? '조회 중…' : '주문 조회하기'}
            </PillButton>
          </CardActions>
        </Card>

        {searched && !results.length && (
          <Card elevation={0} sx={SHADCN_CARD_SX}>
            <CardContent sx={{ ...SHADCN_CONTENT_SX, pt: { xs: 3, md: 3.5 } }}>
              <Stack spacing={1} alignItems="center" sx={{ py: 1.5, textAlign: 'center' }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>
                  일치하는 주문이 없어요
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: palette.textMuted }}>
                  입력하신 성함·휴대폰번호를 다시 확인해 주세요.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        {!!results.length && (
          <Stack spacing={2.5}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 0.5 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>
                조회 결과
              </Typography>
              <Typography sx={{ fontSize: 13, color: palette.textMuted }}>
                총 {results.length}건
              </Typography>
            </Stack>

            <Stack spacing={2}>
              {results.map((inv) => {
                const status = inv.status || 'draft'
                const statusLabel = STATUS_LABEL[status] || status
                const statusColor = STATUS_COLOR[status] || { bg: palette.divider, fg: palette.textMuted }
                return (
                  <Card key={inv.id} elevation={0} sx={SHADCN_CARD_SX}>
                    <CardHeader
                      sx={SHADCN_HEADER_SX}
                      title={
                        <Stack direction="row" alignItems="center" spacing={1.25} flexWrap="wrap">
                          <Box component="span">
                            {inv.wedding?.groom || '신랑'} <Box component="span" sx={{ color: palette.textMuted, fontWeight: 500 }}>·</Box> {inv.wedding?.bride || '신부'}
                          </Box>
                          <Chip
                            label={statusLabel}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 12,
                              fontWeight: 700,
                              bgcolor: statusColor.bg,
                              color: statusColor.fg,
                              border: 'none',
                              '& .MuiChip-label': { px: 1 },
                            }}
                          />
                        </Stack>
                      }
                      subheader={inv.slug ? `/i/${inv.slug}` : '공유 링크 발급 전'}
                    />
                    <CardContent sx={{ ...SHADCN_CONTENT_SX, pt: 2 }}>
                      <Divider sx={{ borderColor: palette.divider, mb: 2 }} />
                      <Stack spacing={0.75}>
                        <InfoRow label="주문 ID" value={inv.id} mono />
                        {inv.slug && <InfoRow label="공개 주소" value={`/i/${inv.slug}`} mono />}
                      </Stack>
                    </CardContent>
                    <CardActions sx={RESULT_FOOTER_SX}>
                      {inv.slug && (
                        <PillButton
                          size="medium"
                          variant="outline"
                          onClick={() => navigate(`/i/${inv.slug}`)}
                        >
                          청첩장 보기
                        </PillButton>
                      )}
                      <PillButton
                        size="medium"
                        onClick={() => navigate(`/create/details?invitationId=${inv.id}`)}
                      >
                        수정하기
                      </PillButton>
                    </CardActions>
                  </Card>
                )
              })}
            </Stack>
          </Stack>
        )}
      </Stack>
    </SectionContainer>
  )
}

function InfoRow({ label, value, mono = false }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="baseline">
      <Typography sx={{ fontSize: 12.5, color: palette.textMuted, minWidth: 64 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          color: palette.textPrimary,
          fontFamily: mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </Typography>
    </Stack>
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
