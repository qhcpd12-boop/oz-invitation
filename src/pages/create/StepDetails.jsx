import { useState } from 'react'
import { Alert, Box, Card, CardContent, CircularProgress, Grid, IconButton, Stack, Switch, Typography } from '@mui/material'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField.jsx'
import MobilePreviewFrame from '../../components/MobilePreviewFrame.jsx'
import PillButton from '../../components/PillButton.jsx'
import TemplateRenderer from '../../components/TemplateRenderer.jsx'
import { getTemplateById } from '../../lib/invitations/templates.js'
import { uploadImage } from '../../lib/images/uploadImage.js'
import { useDraft } from './draftContext.js'
import { palette, radii } from '../../theme/index.js'

export default function StepDetails() {
  const navigate = useNavigate()
  const { invitation, patch, patchWedding, flush } = useDraft()
  if (!invitation) return null
  const w = invitation.wedding || {}
  const activeTemplateId = invitation.templateId || 'luxury-noir'
  const activeTemplate = getTemplateById(activeTemplateId)
  const gallery = invitation.gallery || []
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const set = (k) => (e) => patchWedding({ [k]: e.target.value })
  const setRsvp = (e) => patch({ rsvpEnabled: e.target.checked })

  const onAddGalleryImages = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    if (uploading) return
    const nextGallery = [...gallery]
    setUploadError('')
    setUploading(true)

    try {
      for (const [idx, file] of files.entries()) {
        if (!file.type.startsWith('image/')) continue
        if (nextGallery.length >= 6) break
        const url = await uploadImage(file, {
          invitationId: invitation.id || 'temp',
          index: idx,
        })
        nextGallery.push(url)
      }
      patch({ gallery: nextGallery })
    } catch (err) {
      setUploadError(err.message || '이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const onRemoveGalleryImage = (index) => {
    patch({ gallery: gallery.filter((_, i) => i !== index) })
  }

  const onNext = async () => {
    await flush()
    patch({ step: 2 })
    navigate(`/create/checkout?plan=${invitation.plan || 'standard'}`)
  }

  return (
    <Stack spacing={4}>
      <Typography color="text.secondary">
        좌측에서 정보를 입력하면 우측 미리보기에 바로 반영됩니다.
      </Typography>

      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} lg={7}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="h5">신랑 · 신부</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormField label="신랑 이름" required value={w.groom} onChange={set('groom')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField label="신부 이름" required value={w.bride} onChange={set('bride')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField label="신랑 부친" value={w.groomFather} onChange={set('groomFather')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField label="신랑 모친" value={w.groomMother} onChange={set('groomMother')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField label="신부 부친" value={w.brideFather} onChange={set('brideFather')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField label="신부 모친" value={w.brideMother} onChange={set('brideMother')} />
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="h5">예식 일시 · 장소</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormField label="예식 날짜" required type="date" value={w.date} onChange={set('date')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField label="예식 시간" type="time" value={w.time} onChange={set('time')} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField label="예식장 이름" required value={w.venue} onChange={set('venue')} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField label="예식장 주소" required value={w.address} onChange={set('address')} />
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="h5">인사말</Typography>
                  <FormField
                    label="청첩장 인사말"
                    multiline
                    rows={4}
                    placeholder={'두 사람이 사랑으로 만나 한 가정을 이루게 되었습니다.\n부디 오셔서 자리를 빛내 주시기 바랍니다.'}
                    value={w.greeting}
                    onChange={set('greeting')}
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ p: 2, background: palette.surface, borderRadius: 2 }}
                  >
                    <Stack>
                      <Typography fontWeight={700}>RSVP 받기</Typography>
                      <Typography variant="caption" color="text.secondary">
                        하객의 참석 여부와 식사 인원을 받습니다.
                      </Typography>
                    </Stack>
                    <Switch checked={!!invitation.rsvpEnabled} onChange={setRsvp} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Stack spacing={0.5}>
                    <Typography variant="h5">이미지 업로드</Typography>
                    <Typography variant="body2" color="text.secondary">
                      최대 6장 업로드 가능.
                    </Typography>
                  </Stack>

                  <PillButton
                    component="label"
                    variant="outline"
                    size="small"
                    startIcon={<UploadRoundedIcon />}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    {uploading ? '업로드 중…' : '이미지 선택'}
                    <input hidden accept="image/*" multiple type="file" onChange={onAddGalleryImages} disabled={uploading} />
                  </PillButton>
                  {uploading && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CircularProgress size={16} />
                      <Typography variant="caption" color="text.secondary">
                        이미지 업로드 중입니다...
                      </Typography>
                    </Stack>
                  )}
                  {uploadError && <Alert severity="warning">{uploadError}</Alert>}

                  {!gallery.length ? (
                    <Typography variant="caption" color="text.secondary">
                      아직 업로드한 이미지가 없습니다.
                    </Typography>
                  ) : (
                    <Grid container spacing={1.5}>
                      {gallery.map((src, index) => (
                        <Grid key={`${src.slice(0, 24)}-${index}`} item xs={4} sm={3}>
                          <Box
                            sx={{
                              position: 'relative',
                              borderRadius: `${radii.md}px`,
                              overflow: 'hidden',
                              border: `1px solid ${palette.border}`,
                              background: palette.surface,
                              aspectRatio: '1 / 1',
                            }}
                          >
                            <Box
                              component="img"
                              src={src}
                              alt={`gallery-${index + 1}`}
                              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => onRemoveGalleryImage(index)}
                              aria-label={`remove-image-${index + 1}`}
                              sx={{
                                position: 'absolute',
                                top: 6,
                                right: 6,
                                background: 'rgba(0,0,0,0.55)',
                                color: '#fff',
                                '&:hover': { background: 'rgba(0,0,0,0.75)' },
                              }}
                            >
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ position: { lg: 'sticky' }, top: { lg: 88 }, overflow: 'hidden' }}>
            <CardContent sx={{ pb: 1 }}>
              <Typography variant="h6">실시간 미리보기</Typography>
              <Typography variant="caption" color="text.secondary">
                {activeTemplate?.name || '기본 템플릿'} · {activeTemplate?.style || '미선택'}
              </Typography>
            </CardContent>
            <Box sx={{ borderTop: `1px solid ${palette.border}`, p: 2, background: '#0D0D0D' }}>
              <MobilePreviewFrame>
                <TemplateRenderer
                  templateId={activeTemplateId}
                  data={{ ...w, gallery }}
                />
              </MobilePreviewFrame>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PillButton variant="outline" onClick={() => navigate('/create/design')}>
          ← 이전
        </PillButton>
        <PillButton size="large" onClick={onNext}>
          저장 & 결제하기 →
        </PillButton>
      </Stack>
    </Stack>
  )
}
