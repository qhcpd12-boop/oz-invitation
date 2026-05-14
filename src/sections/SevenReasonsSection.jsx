import { Box, Grid, Stack, Typography } from '@mui/material'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

const REASONS = [
  {
    title: '8가지 프리미엄 디자인',
    desc: '럭셔리·로맨틱·가든·미니멀 등 각각의 시각 정체성을 갖춘 8종 디자인을 선택할 수 있어요.',
  },
  {
    title: '구매 후에도 무제한 수정',
    desc: '결제 후에도 이름, 일정, 장소, 인사말, 사진까지 언제든 자유롭게 변경할 수 있어요.',
  },
  {
    title: '1회 결제, 평생 소장',
    desc: '한 번의 결제로 청첩장을 평생 보관하고, 결혼식 이후에도 콘텐츠를 그대로 유지해요.',
  },
  {
    title: '단일 가격 ₩19,900, 그 이상의 가치',
    desc: '플랜별 추가 비용 없이 단 한 번의 결제로 8가지 프리미엄 디자인 전부를 자유롭게 선택해 만들 수 있어요.',
  },
  {
    title: '실시간 미리보기로 완성',
    desc: '정보를 입력하는 즉시 화면에 반영되어 결제 전에 완성도를 직접 확인할 수 있어요.',
  },
  {
    title: '모바일 완벽 최적화',
    desc: '모든 디자인이 모바일 퍼스트로 설계되어 어디서 봐도 흐트러지지 않아요.',
  },
  {
    title: 'URL·카톡·SNS 한 번에 공유',
    desc: '고유 청첩장 링크를 카톡·문자·SNS로 한 번에 공유하고, OS 네이티브 공유 시트도 지원해요.',
  },
]

export default function SevenReasonsSection() {
  return (
    <SectionContainer tone="surface" py={{ xs: 7, md: 11 }} id="seven-reasons">
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <Reveal>
            <Box
              sx={{
                position: { md: 'sticky' },
                top: { md: 100 },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontFamily: fontFamily.sans,
                  fontWeight: 800,
                  fontSize: { xs: 28, md: 38 },
                  lineHeight: 1.3,
                  letterSpacing: '-0.03em',
                  color: palette.textPrimary,
                }}
              >
                잘 만든 모바일 청첩장
                <br />
                다 이유가 있어요!
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  color: palette.textMuted,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                <Box component="span" sx={{ color: palette.textPrimary, fontWeight: 700 }}>
                  '오즈청첩장'
                </Box>
                이 자부하는{' '}
                <Box component="span" sx={{ color: palette.primary, fontWeight: 700 }}>
                  7가지 이유
                </Box>
              </Typography>
            </Box>
          </Reveal>
        </Grid>

        <Grid item xs={12} md={7}>
          <Stack spacing={1.5}>
            {REASONS.map((reason, idx) => (
              <Reveal key={reason.title} delay={idx * 80} y={20}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: { xs: 2, md: 3 },
                    alignItems: 'flex-start',
                    background: palette.surfaceWhite,
                    borderRadius: `${radii.md}px`,
                    border: `1px solid ${palette.border}`,
                    boxShadow: shadows.card,
                    p: { xs: 2.25, md: 2.75 },
                    transition:
                      'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: fontFamily.serif,
                      fontWeight: 700,
                      fontSize: { xs: 20, md: 24 },
                      color: palette.textPlaceholder,
                      minWidth: 24,
                      lineHeight: 1.2,
                    }}
                  >
                    {idx + 1}
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 15, md: 17 },
                        color: palette.textPrimary,
                        mb: 0.5,
                      }}
                    >
                      {reason.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: palette.textMuted,
                        fontSize: { xs: 13, md: 14 },
                        lineHeight: 1.65,
                      }}
                    >
                      {reason.desc}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </SectionContainer>
  )
}
