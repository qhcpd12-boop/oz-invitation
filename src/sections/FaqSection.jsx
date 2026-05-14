import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

const FAQS = [
  {
    q: '구매 후에도 청첩장을 수정할 수 있나요?',
    a: '주문 조회 페이지에서 청첩장을 다시 불러와 예식 일시, 장소, 인사말, 사진처럼 자주 바뀌는 정보를 수정할 수 있어요.',
  },
  {
    q: '사용 기간은 얼마나 되나요?',
    a: '현재 제공되는 보관 및 수정 범위는 주문/결제 화면의 안내를 기준으로 확인해 주세요. 정책이 확정되지 않은 내용은 메인 화면에서 과장해서 안내하지 않습니다.',
  },
  {
    q: '결제 전에 미리 만들어볼 수 있나요?',
    a: '디자인을 선택하고 정보를 입력하면서 화면을 먼저 확인할 수 있어요. 결제 전에는 분위기와 구성, 입력할 내용을 충분히 살펴보는 흐름으로 만들었습니다.',
  },
  {
    q: '공유는 어떤 방식으로 할 수 있나요?',
    a: 'URL 링크 복사, OS 네이티브 공유 시트로 카카오톡·문자·SNS 등 어디로든 한 번에 공유할 수 있어요. 청첩장은 모바일·데스크톱·태블릿 모두에서 동일하게 보입니다.',
  },
  {
    q: '회원가입 없이도 만들 수 있나요?',
    a: '회원가입 없이 제작과 결제가 가능해요. 결제 시 입력한 성명과 휴대폰번호로 언제든 청첩장을 다시 조회·수정할 수 있습니다.',
  },
  {
    q: '결제 후 받게 되는 청첩장 링크는 어떻게 생성되나요?',
    a: '결제가 완료되면 자동으로 고유 URL이 발급됩니다. 이 링크를 공유하면 하객이 별도 앱 설치 없이 브라우저에서 바로 청첩장을 볼 수 있어요.',
  },
  {
    q: '환불 정책이 어떻게 되나요?',
    a: '결제 후 일정 기간 내 미사용 건에 한해 환불이 가능합니다. 상세 정책은 고객센터에 문의해 주세요.',
  },
]

export default function FaqSection() {
  return (
    <SectionContainer tone="light" py={{ xs: 7, md: 11 }} id="faq">
      <Reveal>
      <Stack spacing={1.5} alignItems="center" textAlign="center" mb={5}>
        <Typography
          sx={{
            color: palette.textPlaceholder,
            fontWeight: 700,
            fontSize: { xs: 13, md: 15 },
            letterSpacing: '-0.01em',
          }}
        >
          자주 묻는 질문
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: fontFamily.sans,
            fontWeight: 800,
            fontSize: { xs: 26, md: 38 },
            lineHeight: 1.25,
            letterSpacing: '-0.03em',
            color: palette.textPrimary,
          }}
        >
          궁금한 점을 미리 확인해보세요
        </Typography>
      </Stack>
      </Reveal>

      <Box sx={{ maxWidth: 820, mx: 'auto' }}>
        {FAQS.map((item, idx) => (
          <Reveal key={idx} delay={idx * 60} y={16}>
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              background: palette.surfaceWhite,
              border: `1px solid ${palette.border}`,
              borderRadius: `${radii.md}px !important`,
              mb: 1.25,
              boxShadow: shadows.card,
              transition: 'box-shadow 0.25s ease',
              '&:hover': { boxShadow: '0 8px 22px rgba(0,0,0,0.07)' },
              '&:before': { display: 'none' },
              overflow: 'hidden',
            }}
          >
            <AccordionSummary
              expandIcon={<ChevronIcon />}
              sx={{
                px: { xs: 2.25, md: 3 },
                py: 0.5,
                '& .MuiAccordionSummary-content': { my: 1.5 },
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 15, md: 16 }, color: palette.textPrimary }}>
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: { xs: 2.25, md: 3 },
                pt: 0,
                pb: 2.5,
                borderTop: `1px solid ${palette.divider}`,
              }}
            >
              <Typography
                sx={{
                  color: palette.textMuted,
                  fontSize: { xs: 14, md: 15 },
                  lineHeight: 1.75,
                  pt: 1.5,
                }}
              >
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
          </Reveal>
        ))}
      </Box>
    </SectionContainer>
  )
}

function ChevronIcon() {
  return (
    <Box
      component="svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={palette.textMuted}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </Box>
  )
}
