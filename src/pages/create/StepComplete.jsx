import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../../components/PillButton.jsx'
import { useDraft } from './draftContext.js'
import { isFirebaseConfigured } from '../../lib/firebase.js'
import { publishInvitation } from '../../lib/invitations/invitationsService.js'
import { palette, radii } from '../../theme/index.js'

const slugify = (s = '') =>
  s
    .toString()
    .normalize('NFKD')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 32)

export default function StepComplete() {
  const navigate = useNavigate()
  const { invitation, patch } = useDraft()
  const defaultSlug = useMemo(() => {
    if (!invitation) return ''
    const base = `${invitation.wedding?.groom || ''}-${invitation.wedding?.bride || ''}`
    return slugify(base) || `inv-${invitation.id?.slice(0, 6)}`
  }, [invitation])

  const [slug, setSlug] = useState(invitation?.slug || defaultSlug)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!invitation?.slug && defaultSlug) setSlug(defaultSlug)
  }, [defaultSlug, invitation?.slug])

  const publicUrl = `${window.location.origin}/i/${slug}`

  const onPublish = async () => {
    setError('')
    if (!slug) return setError('주소를 입력해 주세요.')
    setPublishing(true)
    try {
      if (isFirebaseConfigured) {
        await publishInvitation(invitation.id, slug)
      } else {
        patch({ slug, status: 'published', step: 4 })
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setPublishing(false)
    }
  }

  const isPublished = invitation?.status === 'published' || invitation?.slug === slug

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
    } catch {}
  }

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h2" sx={{ fontSize: 32 }}>
              🎉 결제가 완료되었습니다
            </Typography>
            <Typography color="text.secondary">
              아래에서 청첩장의 공개 주소를 결정하고 발행하세요.
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 520 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  InputProps={{
                    startAdornment: (
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        /i/
                      </Typography>
                    ),
                  }}
                />
                <PillButton onClick={onPublish} disabled={publishing || !slug}>
                  {isPublished ? '재발행' : '발행'}
                </PillButton>
              </Stack>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {isPublished && (
              <Box
                sx={{
                  background: palette.pinkSoft,
                  borderRadius: `${radii.md}px`,
                  p: 2.5,
                  width: '100%',
                  maxWidth: 520,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  공개 URL
                </Typography>
                <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mt: 0.5 }}>
                  {publicUrl}
                </Typography>
                <Stack direction="row" spacing={1} mt={1.5}>
                  <PillButton size="small" onClick={onCopy}>
                    링크 복사
                  </PillButton>
                  <PillButton
                    size="small"
                    variant="outline"
                    onClick={() => window.open(publicUrl, '_blank')}
                  >
                    청첩장 열기
                  </PillButton>
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={2} pt={2}>
              <PillButton variant="outline" onClick={() => navigate('/create/details')}>
                정보 수정
              </PillButton>
              <PillButton variant="ghost" onClick={() => navigate('/')}>
                홈으로
              </PillButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
