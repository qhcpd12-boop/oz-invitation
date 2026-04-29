import { useState } from 'react'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TEMPLATES } from '../../lib/invitations/templates.js'
import { useDraft } from './draftContext.js'
import PhoneMockup from '../../components/PhoneMockup.jsx'
import PillButton from '../../components/PillButton.jsx'
import Badge from '../../components/Badge.jsx'
import TemplatePreviewModal from '../../components/TemplatePreviewModal.jsx'
import { palette, radii } from '../../theme/index.js'

export default function StepDesign() {
  const { patch } = useDraft()
  const navigate = useNavigate()
  const [previewId, setPreviewId] = useState(null)

  const openPreview = (id) => setPreviewId(id)
  const closePreview = () => setPreviewId(null)

  const onChooseTemplate = (id) => {
    patch({ templateId: id, step: 1 })
    setPreviewId(null)
    navigate('/create/details')
  }

  return (
    <>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h5">디자인 템플릿 선택</Typography>
          <Typography color="text.secondary">
            마음에 드는 템플릿의 "미리보기"를 눌러 자세히 확인 후 선택해 주세요.
            모든 템플릿은 결제 후 평생 소장됩니다.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {TEMPLATES.map((t) => (
            <Grid key={t.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: `1px solid ${palette.border}`,
                  borderRadius: `${radii.lg}px`,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    borderColor: palette.primary,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  },
                }}
              >
                <Box
                  sx={{
                    background: palette.surface,
                    p: 3,
                    display: 'grid',
                    placeItems: 'center',
                    minHeight: 360,
                  }}
                >
                  <PhoneMockup variant={t.mockup} width={170} />
                </Box>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack spacing={0.25}>
                        <Typography variant="h6">{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.style}
                        </Typography>
                      </Stack>
                      {t.badge && <Badge>{t.badge}</Badge>}
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography
                        sx={{ color: palette.primary, fontWeight: 700, fontSize: 18 }}
                      >
                        ₩{t.price.toLocaleString()}
                      </Typography>
                      <PillButton
                        size="small"
                        variant="outline"
                        onClick={() => openPreview(t.id)}
                      >
                        미리보기
                      </PillButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <TemplatePreviewModal
        templateId={previewId}
        open={!!previewId}
        onClose={closePreview}
        onSelect={() => onChooseTemplate(previewId)}
      />
    </>
  )
}
