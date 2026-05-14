import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useNavigate } from 'react-router-dom'
import { useDraft } from './draftContext.js'
import { DEFAULT_THEME_OPTIONS } from './StepDetails.jsx'
import { palette } from '../../theme/index.js'

const DESIGN_CARDS = [
  {
    id: 'clean-photo',
    templateId: 'modern-natural',
    title: '클린 포토',
    image: '/wedding-01.png',
    mainLayout: 'polaroidLove',
    photoFrame: 'fill',
  },
  {
    id: 'natural-wedding',
    templateId: 'midnight-blue',
    title: '내추럴 웨딩',
    image: '/wedding-02.png',
    mainLayout: 'onePerfectDay',
    photoFrame: 'fill',
  },
  {
    id: 'classic-studio',
    templateId: 'classic-letter',
    title: '클래식 스튜디오',
    image: '/wedding-03.png',
    mainLayout: 'saveTheDate',
    photoFrame: 'default',
  },
  {
    id: 'two-of-us',
    templateId: 'luxury-noir',
    title: '투 오브 어스',
    image: '/wedding-04.png',
    mainLayout: 'dashedFrame',
    photoFrame: 'fill',
  },
  {
    id: 'better-together',
    templateId: 'garden-bloom',
    title: '베터 투게더',
    image: '/wedding-05.png',
    mainLayout: 'betterTogether',
    photoFrame: 'default',
  },
  {
    id: 'sunset-letter',
    templateId: 'romantic-rose',
    title: '선셋 레터',
    image: '/wedding-06.png',
    mainLayout: 'gettingMarriedHero',
    photoFrame: 'fill',
  },
  {
    id: 'city-moment',
    templateId: 'modern-minimal',
    title: '시티 모먼트',
    image: '/wedding-07.png',
    mainLayout: 'forever',
    photoFrame: 'fill',
  },
  {
    id: 'garden-vow',
    templateId: 'modern-natural',
    title: '가든 보우',
    image: '/wedding-08.png',
    mainLayout: 'gettingMarriedHero',
    photoFrame: 'fill',
    overlay: 'bottomCaption',
  },
]

export default function StepDesign() {
  const { invitation, patch } = useDraft()
  const navigate = useNavigate()
  const [previewId, setPreviewId] = useState(null)

  const openPreview = (id) => setPreviewId(id)
  const closePreview = () => setPreviewId(null)

  const startWithSample = (sampleId) => {
    const sample = DESIGN_CARDS.find((item) => item.id === sampleId)
    if (!sample) return
    patch({
      templateId: sample.templateId,
      step: 1,
      wedding: {
        ...(invitation?.wedding || {}),
        coverImage: sample.image,
      },
      gallery: invitation?.gallery?.length ? invitation.gallery : [sample.image],
      themeOptions: {
        ...DEFAULT_THEME_OPTIONS,
        ...(invitation?.themeOptions || {}),
        mainLayout: sample.mainLayout,
        photoFrame: sample.photoFrame,
        mainEffect: 'none',
      },
    })
    setPreviewId(null)
    navigate('/create/details')
  }

  const previewSample = DESIGN_CARDS.find((item) => item.id === previewId) || null

  return (
    <>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack spacing={1} sx={{ px: { xs: 0.5, md: 0 } }}>
          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 22, md: 28 },
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              color: palette.textPrimary,
            }}
          >
            모바일청첩장 샘플
          </Typography>
          <Typography
            sx={{
              color: palette.textMuted,
              fontSize: { xs: 13, md: 14 },
              lineHeight: 1.65,
              maxWidth: 560,
            }}
          >
            원하는 메인 화면 스타일을 먼저 골라보세요. 선택한 디자인은 정보 입력 화면의
            메인 화면 디자인으로 그대로 이어집니다.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
            gap: { xs: 1.35, sm: 2.25, md: 2.75 },
            width: '100%',
          }}
        >
          {DESIGN_CARDS.map((sample) => (
            <SampleCard
              key={sample.id}
              sample={sample}
              onPreview={() => openPreview(sample.id)}
              onStart={() => startWithSample(sample.id)}
            />
          ))}
        </Box>
      </Stack>

      <SamplePreviewDialog
        sample={previewSample}
        open={!!previewSample}
        onClose={closePreview}
        onSelect={() => startWithSample(previewSample?.id)}
      />
    </>
  )
}

function SampleCard({ sample, onPreview, onStart }) {
  return (
    <Stack spacing={{ xs: 1, md: 1.15 }}>
      <Box
        component="button"
        type="button"
        onClick={onPreview}
        aria-label={`${sample.title} 미리보기`}
        sx={{
          all: 'unset',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          borderRadius: { xs: '8px', md: '10px' },
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.045)',
          border: '1px solid rgba(0,0,0,0.04)',
          transition: 'transform 0.22s ease, box-shadow 0.22s ease',
          '&:hover': {
            transform: { md: 'translateY(-3px)' },
            boxShadow: '0 16px 36px rgba(0,0,0,0.08)',
          },
          '&:focus-visible': {
            outline: `2px solid ${palette.primary}`,
            outlineOffset: 2,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '3 / 4',
            overflow: 'hidden',
            borderRadius: 'inherit',
            background: '#fff',
          }}
        >
          <SampleVisual sample={sample} lazy />
        </Box>
      </Box>

      <Button
        type="button"
        onClick={onStart}
        fullWidth
        disableElevation
        endIcon={<EditOutlinedIcon sx={{ fontSize: { xs: 14, md: 15 } }} />}
        sx={{
          minHeight: { xs: 42, md: 46 },
          borderRadius: { xs: '8px', md: '10px' },
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#fff',
          color: palette.textPrimary,
          fontWeight: 800,
          fontSize: { xs: 12.2, md: 13.5 },
          letterSpacing: '-0.015em',
          textTransform: 'none',
          boxShadow: '0 1px 2px rgba(0,0,0,0.025)',
          '& .MuiButton-endIcon': { ml: { xs: 0.35, md: 0.55 } },
          '&:hover': {
            background: '#FAFAFA',
            borderColor: 'rgba(0,0,0,0.16)',
          },
        }}
      >
        청첩장 제작하기
      </Button>
    </Stack>
  )
}

function SamplePreviewDialog({ sample, open, onClose, onSelect }) {
  if (!sample) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{ sx: { background: '#ECECEC' } }}
    >
      <DialogTitle
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          px: 2,
          py: 1.25,
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: palette.textPrimary }}>
            {sample.title}
          </Typography>
          <IconButton onClick={onClose} aria-label="미리보기 닫기" sx={{ width: 36, height: 36 }}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 2,
          py: 2.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: 'min(100%, 390px)',
            aspectRatio: '3 / 4',
            background: '#fff',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
          }}
        >
          <SampleVisual sample={sample} />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 2,
          p: 2,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Button
          type="button"
          fullWidth
          onClick={onSelect}
          sx={{
            minHeight: 48,
            borderRadius: 999,
            background: palette.primary,
            color: '#fff',
            fontWeight: 800,
            '&:hover': { background: palette.primaryDark || palette.primary },
          }}
        >
          이 디자인으로 만들기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function SampleVisual({ sample, lazy = false }) {
  const hasBottomCaption = sample.overlay === 'bottomCaption'

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Box
        component="img"
        src={sample.image}
        alt=""
        loading={lazy ? 'lazy' : undefined}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          transform: `scale(${sample.visualScale || 1.045})`,
          transformOrigin: 'center',
        }}
      />
      {hasBottomCaption && (
        <>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '34%',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.68) 100%)',
              pointerEvents: 'none',
            }}
          />
          <Stack
            spacing={{ xs: 0.65, md: 0.8 }}
            alignItems="center"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: { xs: 18, md: 22 },
              color: '#fff',
              textAlign: 'center',
              px: 2,
              textShadow: '0 1px 6px rgba(0,0,0,0.38)',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 14.5, md: 16 },
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              신랑 · 신부
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 10.5, md: 11.5 },
                lineHeight: 1,
                fontWeight: 500,
                letterSpacing: '0.14em',
                opacity: 0.92,
              }}
            >
              YYYY.MM.DD · TUESDAY
            </Typography>
          </Stack>
        </>
      )}
    </Box>
  )
}
