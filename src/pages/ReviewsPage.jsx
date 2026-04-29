import { Box, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'
import { palette, radii } from '../theme/index.js'

const REVIEWS = [
  {
    rating: 5,
    quote: '디자인이 너무 예뻐서 친구들한테 자랑했어요.\n신랑도 만족해서 정말 잘 골랐다 싶었습니다.',
    avatar: '👰',
    name: '김서영 신부',
    period: '2025년 11월 예식',
  },
  {
    rating: 5,
    quote: '청첩장 링크 하나 보내면 끝이라 너무 편했어요.\n어르신들도 어려움 없이 보시더라고요!',
    avatar: '🤵',
    name: '박준혁 신랑',
    period: '2025년 10월 예식',
  },
  {
    rating: 5,
    quote: 'RSVP 받기 기능으로 식사 인원 파악이 정말\n수월했어요. 예식 준비 부담이 확 줄었습니다.',
    avatar: '💑',
    name: '이지은 & 최도현',
    period: '2026년 1월 예식',
  },
  {
    rating: 5,
    quote: '전문 업체에서 견적 받고 부담스러웠는데,\n이 가격에 이런 퀄리티라니 정말 만족이에요.',
    avatar: '👫',
    name: '정유진 & 강민호',
    period: '2025년 12월 예식',
  },
  {
    rating: 5,
    quote: '럭셔리·가든·클래식까지 디자인이 다양해서\n취향에 딱 맞는 걸 고를 수 있었어요.',
    avatar: '👰',
    name: '한지민 신부',
    period: '2026년 2월 예식',
  },
  {
    rating: 5,
    quote: '딸 결혼식 청첩장인데 이런 모바일 청첩장은\n처음이라 신기하면서도 너무 편했습니다.',
    avatar: '👵',
    name: '박순자 어머니',
    period: '2025년 9월 예식',
  },
  {
    rating: 5,
    quote: '디자인 → 정보 입력 → 결제 3단계가 정말 간단해서\n바쁜 와중에도 금방 만들 수 있었어요.',
    avatar: '🤵',
    name: '윤성훈 신랑',
    period: '2025년 11월 예식',
  },
  {
    rating: 5,
    quote: '카톡으로 청첩장 링크 보냈는데, 다들 예쁘다고\n칭찬해 주셔서 기분 좋게 시작했어요!',
    avatar: '👰',
    name: '최예린 신부',
    period: '2026년 3월 예식',
  },
  {
    rating: 5,
    quote: '인사말이랑 예식장 정보 입력하니까\n바로 청첩장이 완성되어서 신기했어요.',
    avatar: '💑',
    name: '오현우 & 신아영',
    period: '2025년 10월 예식',
  },
  {
    rating: 5,
    quote: '모바일에서 펼쳤을 때 진짜 깔끔해서\n어디서 봐도 부족하지 않았어요. 강력 추천합니다!',
    avatar: '🤵',
    name: '김도현 신랑',
    period: '2026년 1월 예식',
  },
  {
    rating: 4,
    quote: '가격 부담 없이 시작할 수 있어서 좋았고,\n디자인도 만족스러웠습니다.',
    avatar: '👰',
    name: '이수민 신부',
    period: '2025년 12월 예식',
  },
  {
    rating: 5,
    quote: '청첩장 링크 한 번 보내고 끝! 종이 청첩장\n돌릴 시간도 비용도 절약돼서 좋았어요.',
    avatar: '👫',
    name: '서지훈 & 한유나',
    period: '2026년 2월 예식',
  },
]

export default function ReviewsPage() {
  const navigate = useNavigate()

  return (
    <>
      <SectionContainer tone="surface">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={6}>
          <Badge tone="rose">실제 후기</Badge>
          <Typography variant="h2">신랑·신부님들의 진짜 후기</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            오즈청첩장으로 결혼식을 마친 분들이 직접 남겨주신 솔직한 이야기예요.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {REVIEWS.map((r) => (
            <Grid key={r.name} item xs={12} sm={6} md={4}>
              <TestimonialCard {...r} />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer tone="light">
        <Box
          sx={{
            background: palette.pinkSoft,
            borderRadius: `${radii.lg}px`,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4">우리들의 청첩장도 만들어볼까요?</Typography>
            <Typography color="text.secondary">
              지금 시작하면 평균 3분 안에 첫 청첩장이 완성됩니다.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={1}>
              <PillButton size="large" onClick={() => navigate('/signup')}>
                무료로 시작하기 →
              </PillButton>
              <PillButton size="large" variant="outline" onClick={() => navigate('/pricing')}>
                요금제 보기
              </PillButton>
            </Stack>
          </Stack>
        </Box>
      </SectionContainer>
    </>
  )
}
