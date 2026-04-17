import { Box, Grid, Stack, Typography } from '@mui/material'
import {
  Badge,
  ComparisonTable,
  FeatureCard,
  FormField,
  GradientText,
  IconTile,
  PhoneMockup,
  PillButton,
  PricingCard,
  SectionContainer,
  StatBlock,
  TestimonialCard,
  WizardStepper,
} from '../components/index.js'
import { palette, radii, shadows } from '../theme/index.js'

const TOKEN_SWATCHES = [
  ['primary', palette.primary],
  ['primaryDark', palette.primaryDark],
  ['bgDark', palette.bgDark],
  ['surface', palette.surface],
  ['pinkSoft', palette.pinkSoft],
  ['textPrimary', palette.textPrimary],
  ['textMuted', palette.textMuted],
]

export default function StyleGuide() {
  return (
    <Box sx={{ background: palette.surface, minHeight: '100vh', pb: 8 }}>
      <SectionContainer tone="dark" py={{ xs: 5, md: 7 }}>
        <Stack spacing={1}>
          <Badge tone="dark">디자인 시스템</Badge>
          <Typography variant="h2" sx={{ color: '#fff' }}>
            오즈청첩장 Style Guide
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Figma 시안 기반 토큰·컴포넌트 점검 페이지
          </Typography>
        </Stack>
      </SectionContainer>

      <SectionContainer tone="light">
        <Typography variant="h4" gutterBottom>
          1. Color Tokens
        </Typography>
        <Grid container spacing={2}>
          {TOKEN_SWATCHES.map(([name, hex]) => (
            <Grid key={name} item xs={6} sm={4} md={3}>
              <Box
                sx={{
                  borderRadius: `${radii.md}px`,
                  border: `1px solid ${palette.border}`,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ height: 80, background: hex }} />
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="subtitle2">{name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {hex}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer tone="surface">
        <Typography variant="h4" gutterBottom>
          2. Typography
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h1">Display H1 — 우리만의 특별한 순간</Typography>
          <Typography variant="h2">H2 — 신랑·신부님들의 후기</Typography>
          <Typography variant="h3">H3 — 28px Sans Bold</Typography>
          <Typography variant="h4">H4 — 20px Serif 600</Typography>
          <Typography variant="subtitle1">Subtitle1 — 17px 본문 도입</Typography>
          <Typography variant="body1">Body1 — 일반 본문 텍스트입니다.</Typography>
          <Typography variant="body2" color="text.secondary">
            Body2 — 보조 본문/설명입니다.
          </Typography>
          <Typography variant="caption">Caption — 13px 캡션</Typography>
          <GradientText sx={{ fontFamily: 'serif', fontSize: 48, fontWeight: 700 }}>
            20,000+
          </GradientText>
        </Stack>
      </SectionContainer>

      <SectionContainer tone="light">
        <Typography variant="h4" gutterBottom>
          3. Buttons & Badges
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <PillButton>지금 바로 만들기 →</PillButton>
          <PillButton variant="outline">디자인 미리보기</PillButton>
          <PillButton variant="ghost">로그인</PillButton>
          <PillButton variant="dark">무료 시작하기</PillButton>
          <PillButton variant="light">청첩장 보기</PillButton>
        </Stack>
        <Stack direction="row" spacing={2} mt={3}>
          <Badge>핵심 기능</Badge>
          <Badge tone="dark">실제 후기</Badge>
          <Badge tone="light">합리적인 요금제</Badge>
        </Stack>
      </SectionContainer>

      <SectionContainer tone="surface">
        <Typography variant="h4" gutterBottom>
          4. Stats & Features
        </Typography>
        <Grid container spacing={3}>
          {[
            ['20,000+', '제작된 청첩장'],
            ['4.9', '평균 고객 만족도'],
            ['98%', '재이용 추천율'],
            ['3분', '평균 제작 시간'],
          ].map(([v, l]) => (
            <Grid key={l} item xs={6} md={3}>
              <StatBlock value={v} label={l} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon="🎨"
              title="프리미엄 디자인"
              description={'트렌디한 10가지 이상의 디자인 템플릿으로\n나만의 개성 있는 청첩장을 완성하세요.'}
              tone="rose"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon="🎤"
              title="음성 축하 메시지"
              description={'하객들이 직접 녹음한 따뜻한 축하 음성을 받고\nMP3로 영구 보관하세요.'}
              tone="peach"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon="📦"
              title="전체 데이터 백업"
              description={'예식 후 사진, 방명록, 음성 메시지를 ZIP으로\n다운로드하여 영원히 간직하세요.'}
              tone="green"
            />
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer tone="light">
        <Typography variant="h4" gutterBottom>
          5. Testimonials
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TestimonialCard
              quote={'하객들이 녹음해준 축하 음성을 지금도 가끔 들어요.\n결혼식 그날의 감동이 그대로 느껴집니다.'}
              avatar="👰"
              name="김서영 신부"
              period="2025년 11월 예식"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TestimonialCard
              quote={'3분 만에 뚝딱! 이렇게 예쁜 청첩장이 이 가격이라니\n믿기지 않았습니다.'}
              avatar="🤵"
              name="박준혁 신랑"
              period="2025년 10월 예식"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TestimonialCard
              quote={'예식 끝나고 모든 데이터를 ZIP으로 받았어요.\n사진, 방명록, 음성 다 정리되어 있어서 완벽했어요!'}
              avatar="💑"
              name="이지은 & 최도현"
              period="2026년 1월 예식"
            />
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer tone="surface">
        <Typography variant="h4" gutterBottom>
          6. Pricing
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <PricingCard
              name="라이트"
              tagline="가성비 초점 · 깔끔하게"
              price="9,900"
              period="예식일 기준 1개월 (총 2~3개월 유지)"
              features={['기본 디자인 템플릿 5종', '사진 갤러리 (최대 15장)', '텍스트 방명록', '카카오톡 공유']}
              ctaLabel="라이트 시작하기"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PricingCard
              name="스탠다드"
              tagline="핵심 기능 · 베스트셀러"
              price="19,900"
              period="예식일 기준 3개월 (총 5~6개월 유지)"
              features={['전체 프리미엄 템플릿', '사진 갤러리 (최대 30장)', '🎤 하객 음성 축하 메시지']}
              bonus={{ title: '📥 식후 다운로드 (ZIP 패키지)', body: '갤러리·방명록·음성 MP3\n무료 다운로드 14일' }}
              badge="🔥 BEST"
              highlight
              ctaLabel="스탠다드 시작하기 →"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PricingCard
              name="프리미엄"
              tagline="풀패키지 · 완벽 소장"
              price="39,900"
              period="예식일 기준 6개월 이상"
              features={['스탠다드 모든 기능', '사진 갤러리 무제한', '🎬 동영상 첨부', '📊 RSVP 통계']}
              bonus={{ title: '📥 풀 아카이브', body: 'ZIP + HTML 추출\n무료 다운로드 30일' }}
              ctaLabel="프리미엄 시작하기"
            />
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer tone="light">
        <Typography variant="h4" gutterBottom>
          7. Comparison Table
        </Typography>
        <ComparisonTable
          columns={[
            { key: 'light', label: '라이트' },
            { key: 'standard', label: '스탠다드', highlight: true },
            { key: 'premium', label: '프리미엄' },
          ]}
          rows={[
            { label: '이용 기간', values: { light: '2~3개월', standard: '5~6개월', premium: '6개월+' } },
            { label: '디자인 템플릿', values: { light: '기본 5종', standard: '전체', premium: '전체' } },
            { label: '사진 갤러리', values: { light: '15장', standard: '30장', premium: '무제한' } },
            { label: '음성 축하 메시지', values: { light: false, standard: true, premium: true } },
            { label: '동영상 첨부', values: { light: false, standard: false, premium: true } },
            { label: 'RSVP 참석 관리', values: { light: false, standard: false, premium: true } },
          ]}
        />
      </SectionContainer>

      <SectionContainer tone="surface">
        <Typography variant="h4" gutterBottom>
          8. Wizard & Form
        </Typography>
        <WizardStepper steps={['디자인 선택', '정보 입력', '결제', '완료']} current={1} />
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6}>
            <FormField label="이름(성함)" required placeholder="홍길동" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="연락처" required placeholder="010-0000-0000" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="이메일" required placeholder="example@email.com" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="비밀번호"
              required
              type="password"
              placeholder="8자 이상, 영문+숫자 조합"
            />
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer tone="light">
        <Typography variant="h4" gutterBottom>
          9. Phone Mockups
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
          <PhoneMockup variant="luxury" />
          <PhoneMockup variant="garden" />
          <PhoneMockup variant="classic" venue="서울 더 그랜드볼룸" />
        </Stack>
      </SectionContainer>

      <SectionContainer tone="surface">
        <Typography variant="h4" gutterBottom>
          10. Icon Tiles & Shadows
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {['rose', 'peach', 'green', 'blue', 'yellow', 'purple'].map((t) => (
            <IconTile key={t} tone={t}>
              {{ rose: '🎨', peach: '🎤', green: '📦', blue: '🗺️', yellow: '📊', purple: '💰' }[t]}
            </IconTile>
          ))}
        </Stack>
        <Stack direction="row" spacing={3} mt={3}>
          <Box sx={{ width: 220, height: 80, background: '#fff', borderRadius: `${radii.md}px`, boxShadow: shadows.card, p: 2 }}>
            shadows.card
          </Box>
          <Box sx={{ width: 220, height: 80, background: '#fff', borderRadius: `${radii.lg}px`, boxShadow: shadows.elevated, p: 2 }}>
            shadows.elevated
          </Box>
          <Box sx={{ width: 220, height: 80, background: palette.ctaGradient, color: '#fff', borderRadius: `${radii.pill}px`, boxShadow: shadows.cta, p: 2 }}>
            shadows.cta
          </Box>
        </Stack>
      </SectionContainer>
    </Box>
  )
}
