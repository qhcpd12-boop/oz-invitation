import { Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'

const T = [
  {
    quote: '디자인이 너무 예뻐서 친구들한테 자랑했어요.\n신랑도 만족해서 정말 잘 골랐다 싶었습니다.',
    avatar: '👰',
    name: '김서영 신부',
    period: '2025년 11월 예식',
  },
  {
    quote: '청첩장 링크 하나 보내면 끝이라 너무 편했어요.\n어르신들도 어려움 없이 보시더라고요!',
    avatar: '🤵',
    name: '박준혁 신랑',
    period: '2025년 10월 예식',
  },
  {
    quote: 'RSVP 받기 기능으로 식사 인원 파악이 정말\n수월했어요. 예식 준비 부담이 확 줄었습니다.',
    avatar: '💑',
    name: '이지은 & 최도현',
    period: '2026년 1월 예식',
  },
]

export default function TestimonialsSection() {
  const navigate = useNavigate()
  return (
    <SectionContainer tone="light" id="testimonials">
      <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
        <Badge tone="rose">실제 후기</Badge>
        <Typography variant="h2">신랑·신부님들의 후기</Typography>
      </Stack>

      <Grid container spacing={3}>
        {T.map((t) => (
          <Grid key={t.name} item xs={12} md={4}>
            <TestimonialCard {...t} />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="center" mt={5}>
        <PillButton variant="outline" onClick={() => navigate('/reviews')}>
          전체 후기 보기 →
        </PillButton>
      </Stack>
    </SectionContainer>
  )
}
