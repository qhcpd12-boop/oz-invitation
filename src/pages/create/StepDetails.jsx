import { Card, CardContent, Grid, Stack, Switch, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField.jsx'
import PillButton from '../../components/PillButton.jsx'
import { useDraft } from './draftContext.js'
import { palette } from '../../theme/index.js'

export default function StepDetails() {
  const navigate = useNavigate()
  const { invitation, patch, patchWedding, flush } = useDraft()
  if (!invitation) return null
  const w = invitation.wedding || {}

  const set = (k) => (e) => patchWedding({ [k]: e.target.value })

  const onNext = async () => {
    await flush()
    patch({ step: 2 })
    navigate(`/create/checkout?plan=${invitation.plan || 'standard'}`)
  }

  return (
    <Stack spacing={3}>
      <Typography color="text.secondary">
        기본 정보를 입력해 주세요. 입력 즉시 자동 저장됩니다.
      </Typography>

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
              <Switch
                checked={!!invitation.rsvpEnabled}
                onChange={(e) => patch({ rsvpEnabled: e.target.checked })}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PillButton variant="outline" onClick={() => navigate('/create/design')}>
          ← 이전
        </PillButton>
        <PillButton size="large" onClick={onNext}>
          결제하기 →
        </PillButton>
      </Stack>
    </Stack>
  )
}
