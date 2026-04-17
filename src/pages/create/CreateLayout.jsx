import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import SectionContainer from '../../components/SectionContainer.jsx'
import WizardStepper from '../../components/WizardStepper.jsx'
import { useInvitationDraft } from '../../lib/invitations/useInvitationDraft.js'
import { InvitationDraftContext } from './draftContext.js'

const STEP_BY_PATH = {
  design: 0,
  details: 1,
  checkout: 2,
  complete: 3,
}

export default function CreateLayout() {
  const draft = useInvitationDraft()
  const location = useLocation()
  const stepKey = location.pathname.split('/').pop()
  const stepIndex = STEP_BY_PATH[stepKey] ?? 0

  return (
    <SectionContainer tone="surface">
      <Stack spacing={2} mb={4}>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 36 } }}>
          내 청첩장 만들기
        </Typography>
        <WizardStepper
          steps={['디자인 선택', '정보 입력', '결제', '완료']}
          current={stepIndex}
        />
      </Stack>

      {!draft.ready ? (
        <Box sx={{ minHeight: 240, display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <InvitationDraftContext.Provider value={draft}>
          <Outlet />
        </InvitationDraftContext.Provider>
      )}
    </SectionContainer>
  )
}
