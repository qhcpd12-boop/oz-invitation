import { Box, Dialog, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PillButton from './PillButton.jsx'
import TemplateRenderer from './TemplateRenderer.jsx'
import { getTemplateById } from '../lib/invitations/templates.js'

/** 미리보기 모달용 샘플 데이터 (실제 사용자 입력은 편집 화면에서) */
const SAMPLE_DATA = {
  groom: '김민준',
  bride: '이서연',
  date: '2026-05-24',
  time: '14:00',
  venue: '더 그랜드볼룸',
  address: '서울시 강남구 테헤란로 123',
  greeting:
    '두 사람이 사랑으로 만나 한 가정을 이루게 되었습니다.\n부디 오셔서 자리를 빛내 주시기 바랍니다.',
}

export default function TemplatePreviewModal({ templateId, open, onClose, onSelect }) {
  const template = templateId ? getTemplateById(templateId) : null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      sx={{ '& .MuiDialog-paper': { background: '#0D0D0D' } }}
    >
      {/* 상단 바 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          py: 2,
          background: 'rgba(13, 13, 13, 0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Stack>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
            {template?.name || '미리보기'}
          </Typography>
          {template?.style && (
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
              {template.style}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          {template?.price && (
            <Typography sx={{ color: '#E5C088', fontWeight: 700, fontSize: 16 }}>
              ₩{template.price.toLocaleString()}
            </Typography>
          )}
          <PillButton size="small" variant="filled" onClick={onSelect}>
            이 디자인으로 만들기 →
          </PillButton>
          <IconButton onClick={onClose} sx={{ color: '#fff' }} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* 청첩장 본문 */}
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        {templateId && <TemplateRenderer templateId={templateId} data={SAMPLE_DATA} />}
      </Box>
    </Dialog>
  )
}
