import { Box, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TEMPLATES } from '../../lib/invitations/templates.js'
import { useDraft } from './draftContext.js'
import PhoneMockup from '../../components/PhoneMockup.jsx'
import PillButton from '../../components/PillButton.jsx'
import Badge from '../../components/Badge.jsx'
import { palette, radii } from '../../theme/index.js'

export default function StepDesign() {
  const { invitation, patch } = useDraft()
  const navigate = useNavigate()
  const selected = invitation?.templateId

  const onSelect = (id) => patch({ templateId: id, step: 1 })

  return (
    <Stack spacing={4}>
      <Typography color="text.secondary">
        마음에 드는 디자인을 선택해 주세요. 다음 단계에서 결혼 정보를 입력하면 즉시 미리보기에 반영됩니다.
      </Typography>

      <Grid container spacing={3}>
        {TEMPLATES.map((t) => {
          const active = t.id === selected
          return (
            <Grid key={t.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: `2px solid ${active ? palette.primary : palette.border}`,
                  borderRadius: `${radii.lg}px`,
                  position: 'relative',
                }}
              >
                <CardActionArea onClick={() => onSelect(t.id)}>
                  <Box sx={{ background: palette.surface, p: 3, display: 'grid', placeItems: 'center', minHeight: 360 }}>
                    <PhoneMockup variant={t.mockup} width={170} />
                  </Box>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack spacing={0.5}>
                        <Typography variant="h6">{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.style}
                        </Typography>
                      </Stack>
                      {t.badge && <Badge>{t.badge}</Badge>}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Stack direction="row" justifyContent="flex-end">
        <PillButton
          size="large"
          disabled={!selected}
          onClick={() => navigate('/create/details')}
        >
          다음 단계 →
        </PillButton>
      </Stack>
    </Stack>
  )
}
