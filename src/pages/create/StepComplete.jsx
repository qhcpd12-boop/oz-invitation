import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { useNavigate } from 'react-router-dom'
import PillButton from '../../components/PillButton.jsx'
import { useDraft } from './draftContext.js'
import { publishInvitation } from '../../lib/invitations/invitationsService.js'
import { readCurrentDraftFromSession } from '../../lib/invitations/useInvitationDraft.js'
import { palette, radii } from '../../theme/index.js'

const PAID_DRAFT_SESSION_KEY = 'oz-invitation:last-paid-draft'

export default function StepComplete() {
  const navigate = useNavigate()
  const { invitation, patch } = useDraft()
  const autoPublished = useRef(false)
  const paidSessionInvitation = useMemo(() => readPaidSessionDraft(), [])
  const currentSessionInvitation = useMemo(() => readCurrentDraftFromSession(), [])
  const sourceInvitation = pickFreshestDraft(
    invitation,
    paidSessionInvitation,
    currentSessionInvitation,
  )
  const defaultSlug = useMemo(() => {
    if (!sourceInvitation) return ''
    return sourceInvitation.slug || makeShortSlug(sourceInvitation)
  }, [sourceInvitation])

  const [slug, setSlug] = useState(sourceInvitation?.slug || defaultSlug)
  const [publishedSlug, setPublishedSlug] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (defaultSlug) setSlug(defaultSlug)
  }, [defaultSlug])

  const activeSlug = publishedSlug || slug
  const publicUrl = `${window.location.origin}/i/${activeSlug}`

  const publishNow = useCallback(async () => {
    setError('')
    const nextSlug = slug || defaultSlug
    if (!nextSlug) {
      setError('공유 링크를 만들 수 없습니다. 잠시 후 다시 시도해 주세요.')
      return
    }
    // 가장 최신 데이터를 sessionStorage에서 한 번 더 읽어 발행 직전에 갱신
    const latestDraft = pickFreshestDraft(
      sourceInvitation,
      readCurrentDraftFromSession(),
      readPaidSessionDraft(),
    )
    if (!latestDraft) {
      setError('청첩장 데이터가 없습니다. 처음부터 다시 시도해 주세요.')
      return
    }
    setPublishing(true)
    try {
      await publishInvitation(latestDraft.id, nextSlug, latestDraft)
      patch({ slug: nextSlug, status: 'published', step: 4 })
      setSlug(nextSlug)
      setPublishedSlug(nextSlug)
    } catch (e) {
      setError(e.message || '공유 링크 생성 중 오류가 발생했습니다.')
    } finally {
      setPublishing(false)
    }
  }, [defaultSlug, patch, slug, sourceInvitation])

  useEffect(() => {
    if (!sourceInvitation || autoPublished.current) return
    if (sourceInvitation.status !== 'paid' && sourceInvitation.status !== 'published') return
    autoPublished.current = true
    // 기존 slug가 있어도 항상 최신 데이터로 다시 발행해 같은 링크에 덮어쓴다
    publishNow()
  }, [publishNow, sourceInvitation])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {}
  }

  const onShare = async () => {
    if (!navigator.share) return onCopy()
    try {
      await navigator.share({
        title: `${sourceInvitation?.wedding?.groom || '신랑'} & ${sourceInvitation?.wedding?.bride || '신부'} 결혼식 초대장`,
        text: '모바일 청첩장을 공유합니다.',
        url: publicUrl,
      })
    } catch {}
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 720, mx: 'auto' }}>
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                background:
                  'linear-gradient(135deg, rgba(251,113,133,1) 0%, rgba(219,39,119,1) 100%)',
                boxShadow: '0 16px 32px rgba(225,29,72,0.22)',
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 34 }} />
            </Box>

            <Stack spacing={1}>
              <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 900, letterSpacing: '-0.04em' }}>
                결제가 완료되었습니다
              </Typography>
              <Typography sx={{ color: palette.textMuted, fontSize: { xs: 14, md: 15 }, lineHeight: 1.7 }}>
                모바일 청첩장 링크가 준비됐어요. 링크를 복사해서 카카오톡, 문자, SNS로
                하객들에게 바로 공유할 수 있습니다.
              </Typography>
            </Stack>

            {error && <Alert severity="error">{error}</Alert>}

            <Box
              sx={{
                width: '100%',
                maxWidth: 560,
                borderRadius: `${radii.lg}px`,
                background: 'linear-gradient(180deg, #FFF6F8 0%, #FFFFFF 100%)',
                border: '1px solid rgba(225,29,72,0.12)',
                p: { xs: 2, sm: 2.5 },
                textAlign: 'left',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: palette.primary, mb: 0.75 }}>
                공유 링크
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: { xs: 14, sm: 15 },
                  wordBreak: 'break-all',
                  color: palette.textPrimary,
                  lineHeight: 1.6,
                }}
              >
                {publishing ? '공유 링크를 만드는 중입니다...' : publicUrl}
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.2}
              sx={{ width: '100%', maxWidth: 560 }}
            >
              <PillButton
                fullWidth
                startIcon={<ContentCopyRoundedIcon />}
                onClick={onCopy}
                disabled={publishing || !activeSlug}
              >
                {copied ? '복사 완료' : '링크 복사'}
              </PillButton>
              <PillButton
                fullWidth
                variant="outline"
                startIcon={<IosShareRoundedIcon />}
                onClick={onShare}
                disabled={publishing || !activeSlug}
              >
                공유하기
              </PillButton>
              <PillButton
                fullWidth
                variant="outline"
                startIcon={<OpenInNewRoundedIcon />}
                onClick={() => window.open(publicUrl, '_blank')}
                disabled={publishing || !activeSlug}
              >
                열어보기
              </PillButton>
            </Stack>

            <Typography sx={{ color: palette.textMuted, fontSize: 12.5, lineHeight: 1.65 }}>
              이름, 일정, 장소, 사진을 수정해도 같은 공유 링크에 변경 내용이 반영됩니다.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.2}
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
          >
            <Box>
              <Typography sx={{ fontWeight: 800, color: palette.textPrimary }}>
                청첩장 내용을 더 수정해야 하나요?
              </Typography>
              <Typography sx={{ mt: 0.5, color: palette.textMuted, fontSize: 13.5 }}>
                수정 후 저장하면 같은 링크에 변경 내용이 반영됩니다.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <PillButton variant="outline" size="small" onClick={() => navigate('/create/details')}>
                정보 수정
              </PillButton>
              <PillButton variant="ghost" size="small" onClick={() => navigate('/')}>
                홈으로
              </PillButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

function makeShortSlug(invitation) {
  const source = `${invitation.id || ''}|${invitation.wedding?.groom || ''}|${invitation.wedding?.bride || ''}`
  let hash = 0
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  }
  return hash.toString(36).padStart(8, '0').slice(0, 8)
}

function readPaidSessionDraft() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(PAID_DRAFT_SESSION_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

const STATUS_RANK = { draft: 0, paid: 1, published: 2 }

function pickFreshestDraft(...candidates) {
  // 결제·발행 상태가 더 진행된 쪽 우선, 같다면 마지막 수정 시각이 더 늦은 쪽 우선
  let best = null
  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== 'object') continue
    if (!best) {
      best = candidate
      continue
    }
    const a = STATUS_RANK[best.status] ?? -1
    const b = STATUS_RANK[candidate.status] ?? -1
    if (b > a) {
      best = candidate
      continue
    }
    if (b === a) {
      const at = Date.parse(best.updatedAt || best.paidAt || best.publishedAt || '') || 0
      const bt = Date.parse(candidate.updatedAt || candidate.paidAt || candidate.publishedAt || '') || 0
      if (bt > at) best = candidate
    }
  }
  return best
}
