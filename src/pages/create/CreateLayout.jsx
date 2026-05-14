import { useState } from 'react'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import SectionContainer from '../../components/SectionContainer.jsx'
import WizardStepper from '../../components/WizardStepper.jsx'
import PillButton from '../../components/PillButton.jsx'
import { useInvitationDraft } from '../../lib/invitations/useInvitationDraft.js'
import { InvitationDraftContext } from './draftContext.js'
import { palette, fontFamily } from '../../theme/index.js'

const STEP_BY_PATH = {
  design: 0,
  details: 1,
  checkout: 2,
  complete: 3,
}

const STEP_LABELS = ['디자인 선택', '정보 입력', '결제', '완료']

export default function CreateLayout() {
  const draft = useInvitationDraft()
  const location = useLocation()
  const stepKey = location.pathname.split('/').pop()
  const stepIndex = STEP_BY_PATH[stepKey] ?? 0
  const isDetails = stepKey === 'details'
  const [pageActions, setPageActions] = useState({})

  return (
    <Box sx={{ minHeight: '100vh', background: '#ECECEC' }}>
      <CreateHeader draft={draft} stepKey={stepKey} pageActions={pageActions} />

      <SectionContainer
        tone="transparent"
        py={{ xs: 2, md: isDetails ? 2 : 3 }}
        innerSx={{ maxWidth: isDetails ? 980 : 1280 }}
      >
        {!draft.ready ? (
          <Box sx={{ minHeight: 240, display: 'grid', placeItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <InvitationDraftContext.Provider value={draft}>
            <CreateProgress stepIndex={stepIndex} />
            <Outlet context={{ setPageActions }} />
          </InvitationDraftContext.Provider>
        )}
      </SectionContainer>
    </Box>
  )
}

function CreateHeader({ draft, stepKey, pageActions }) {
  const navigate = useNavigate()
  const showHeaderActions = stepKey !== 'design'

  const handleSave = async () => {
    if (pageActions?.onSave) {
      await pageActions.onSave()
      return
    }
    try {
      await draft.flush?.()
    } catch {
      /* 자동 저장도 동작 중 */
    }
  }

  const handleBack = () => {
    if (pageActions?.onBack) {
      pageActions.onBack()
      return
    }
    navigate(-1)
  }

  const rightAction = (() => {
    if (stepKey === 'checkout') return null
    if (stepKey === 'complete') {
      return (
        <PillButton variant="outline" size="small" onClick={() => navigate('/')} sx={headerButtonSx}>
          홈으로
        </PillButton>
      )
    }
    return (
      <PillButton variant="outline" size="small" onClick={handleSave} sx={headerButtonSx}>
        저장하기
      </PillButton>
    )
  })()

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          height: { xs: 48, md: 50 },
          px: { xs: 2.25, sm: 4, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: fontFamily.sans,
            fontWeight: 800,
            fontSize: { xs: 17, md: 18 },
            letterSpacing: '-0.03em',
            color: palette.primary,
            textDecoration: 'none',
            lineHeight: 1,
          }}
        >
          오즈청첩장
        </Box>

        {showHeaderActions && (
          <Stack direction="row" spacing={{ xs: 1.25, md: 2 }} alignItems="center">
            <Box
              component="button"
              type="button"
              onClick={handleBack}
              sx={{
                background: 'transparent',
                border: 'none',
                color: palette.textMuted,
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: { xs: 12.5, md: 13 },
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s ease',
                '&:hover': { color: palette.textPrimary },
              }}
            >
              돌아가기
            </Box>
            {rightAction}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

const headerButtonSx = {
  minHeight: 34,
  px: { xs: 1.7, md: 2.1 },
  py: 0.75,
  fontSize: { xs: 12.5, md: 13 },
  boxShadow: 'none',
  borderColor: 'rgba(0,0,0,0.28)',
  background: '#fff',
  '&::before': { display: 'none' },
}

function CreateProgress({ stepIndex }) {
  return (
    <Stack
      spacing={0.9}
      alignItems="center"
      sx={{
        mb: { xs: 1.75, md: 2.25 },
      }}
    >
      <Typography
        sx={{
          fontFamily: fontFamily.sans,
          fontWeight: 800,
          fontSize: { xs: 15, md: 16 },
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: palette.textPrimary,
        }}
      >
        내 청첩장 만들기
      </Typography>
      <WizardStepper steps={STEP_LABELS} current={stepIndex} />
    </Stack>
  )
}
