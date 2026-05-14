import { useCallback, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import { useNavigate, useOutletContext } from 'react-router-dom'
import FormField from '../../components/FormField.jsx'
import PillButton from '../../components/PillButton.jsx'
import { uploadImage } from '../../lib/images/uploadImage.js'
import { useDraft } from './draftContext.js'
import { palette, radii } from '../../theme/index.js'

const REQUIRED_FIELDS = [
  ['groom', '신랑 이름을 입력해 주세요.'],
  ['bride', '신부 이름을 입력해 주세요.'],
  ['date', '예식 날짜를 선택해 주세요.'],
  ['time', '예식 시간을 선택해 주세요.'],
  ['venue', '예식장 이름을 입력해 주세요.'],
  ['address', '예식장 주소를 입력해 주세요.'],
  ['greeting', '인사말을 입력해 주세요.'],
]

const panelSx = {
  borderRadius: '12px !important',
  overflow: 'hidden',
  boxShadow: 'none',
  border: '1px solid rgba(0,0,0,0.04)',
  background: '#fff',
  '&::before': { display: 'none' },
}

const inputSx = {
  '& .MuiInputBase-root': {
    borderRadius: '14px',
    background: '#F4F4F4',
  },
  '& fieldset': { borderColor: 'transparent' },
  '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
}

export const DEFAULT_THEME_OPTIONS = {
  fontMood: 'elegant',
  fontSize: 'normal',
  backgroundColor: '#FFFFFF',
  accentColor: '#F6B8BE',
  backgroundPattern: 'none',
  backgroundEffect: 'none',
  preventZoom: true,
  revealEffect: true,
  englishSubtitle: true,
  lockMode: 'public',
  mainLayout: 'polaroidLove',
  // 메인 화면 패널 옵션
  photoFrame: 'default', // 'default' | 'fill' | 'arch' | 'oval' | 'frame'
  photoBorder: false,
  photoExtended: false,
  mainEffect: 'none', // 'none' | 'fog' | 'wave' | 'paper'
  customMainTextEnabled: false,
  customDateEnabled: false,
  customDateText: '',
  customWeekdayEnabled: false,
  customWeekdayText: '',
  customNamesEnabled: false,
  customNamesText: '',
  customGreetingEnabled: false,
  customGreetingText: '',
}

export const MAIN_LAYOUTS = [
  { id: 'polaroidLove', label: 'Join Us For Love', mini: 'Join us\nfor love' },
  { id: 'dashedFrame', label: 'Dashed Frame', mini: '26.10.24 — 12:30PM' },
  { id: 'saveTheDate', label: 'Save The Date', mini: 'Save the date!' },
  { id: 'gettingMarriedHero', label: 'Getting Married', mini: 'Getting\nMarried' },
  { id: 'dateOnTop', label: 'Date On Top', mini: '2026/10/24\nSATURDAY' },
  { id: 'onePerfectDay', label: 'One Perfect Day', mini: 'ONE PERFECT\nDAY' },
  { id: 'forever', label: 'Forever', mini: 'forever.' },
  { id: 'nowOfficial', label: 'Now Official', mini: 'NOW\nOFFICIAL' },
  { id: 'betterTogether', label: 'Better Together', mini: 'Better\nTogether' },
]

const FIXED_CANVAS_LAYOUTS = new Set([
  'polaroidLove',
  'dashedFrame',
  'saveTheDate',
  'gettingMarriedHero',
  'dateOnTop',
  'onePerfectDay',
  'forever',
  'nowOfficial',
  'betterTogether',
])

const MONTHS_EN_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]
const MONTHS_EN_FULL = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

const MAIN_EFFECT_OPTIONS_BY_FRAME = {
  default: [
    ['none', '없음'],
    ['fog', '안개'],
    ['wave', '물결'],
    ['paper', '페이퍼'],
  ],
  fill: [
    ['none', '없음'],
    ['fog', '안개', true],
    ['wave', '물결', true],
    ['paper', '페이퍼', true],
  ],
  arch: [
    ['none', '없음'],
    ['fog', '안개'],
    ['wave', '물결'],
  ],
  oval: [
    ['none', '없음'],
  ],
  frame: [
    ['none', '없음'],
    ['paper', '페이퍼'],
  ],
}

const getMainEffectOptions = (frame) =>
  MAIN_EFFECT_OPTIONS_BY_FRAME[frame] || MAIN_EFFECT_OPTIONS_BY_FRAME.default

const normalizeMainEffect = (frame, effect) => {
  const options = getMainEffectOptions(frame)
  const current = options.find(([value]) => value === effect)
  return current && !current[2] ? effect : 'none'
}

const BG_COLORS = ['#FFFFFF', '#FCF5F3', '#F1E8DE', '#EFE7E7']
const ACCENT_COLORS = ['#666666', '#F6B8BE', '#C7966E', '#C9A0AE']
const DEFAULT_COUNTDOWN_TEXT = '(신랑), (신부)의 결혼식이 (D-Day)일 남았습니다.'
const DEFAULT_ENDING_MESSAGE = `장담하건대, 세상이 다 겨울이어도
우리 사랑은 늘 봄처럼 따뜻하고
간혹, 여름처럼 뜨거울 겁니다.
이수동, 사랑가`

const FONT_OPTIONS = [
  ['elegant', '고운돋움'],
  ['ridibatang', '리디바탕'],
  ['iropke', '이롭게바탕'],
  ['roundwind', '둥근바람'],
  ['yeonsung', '연성체'],
  ['notoSans', '노토산스KR'],
]

const FONT_SIZE_OPTIONS = [
  ['small', '작게'],
  ['normal', '보통'],
  ['large', '크게'],
  ['xlarge', '더 크게'],
]

export default function StepDetails() {
  const navigate = useNavigate()
  const { setPageActions } = useOutletContext() || {}
  const { invitation, patch, patchWedding, flush } = useDraft()
  const w = invitation?.wedding || {}
  const gallery = invitation?.gallery || []
  const themeOptions = { ...DEFAULT_THEME_OPTIONS, ...(invitation?.themeOptions || {}) }
  const [uploadingKey, setUploadingKey] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [errors, setErrors] = useState({})

  if (!invitation) return null

  const set = (key) => (event) => {
    patchWedding({ [key]: event.target.value })
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const setTheme = (key, value) => {
    patch({ themeOptions: { ...themeOptions, [key]: value } })
  }

  const setPhotoFrame = (frame) => {
    patch({
      themeOptions: {
        ...themeOptions,
        photoFrame: frame,
        mainEffect: normalizeMainEffect(frame, themeOptions.mainEffect),
      },
    })
  }

  const setPersonName = (person, key, value) => {
    const lastKey = `${person}LastName`
    const firstKey = `${person}FirstName`
    const nextLast = key === lastKey ? value : (w[lastKey] || splitKoreanName(w[person]).last)
    const nextFirst = key === firstKey ? value : (w[firstKey] || splitKoreanName(w[person]).first)
    patchWedding({
      [key]: value,
      [person]: `${nextLast}${nextFirst}`.trim(),
    })
    if (errors[person]) setErrors((prev) => ({ ...prev, [person]: '' }))
  }

  const uploadSingle = async (field, file) => {
    if (!file || uploadingKey) return
    setUploadError('')
    setUploadingKey(field)
    try {
      const url = await uploadImage(file, {
        invitationId: invitation.id || 'temp',
        index: field,
      })
      patchWedding({ [field]: url })
      if (field === 'coverImage') setErrors((prev) => ({ ...prev, coverImage: '' }))
    } catch (err) {
      setUploadError(err.message || '이미지 업로드에 실패했습니다.')
    } finally {
      setUploadingKey('')
    }
  }

  const uploadGallery = async (files) => {
    const imageFiles = Array.from(files || []).filter((file) => file.type.startsWith('image/'))
    if (!imageFiles.length || uploadingKey) return
    const nextGallery = [...gallery]
    setUploadError('')
    setUploadingKey('gallery')
    try {
      for (const [idx, file] of imageFiles.entries()) {
        if (nextGallery.length >= 12) break
        const url = await uploadImage(file, {
          invitationId: invitation.id || 'temp',
          index: `gallery-${idx}`,
        })
        nextGallery.push(url)
      }
      patch({ gallery: nextGallery })
    } catch (err) {
      setUploadError(err.message || '이미지 업로드에 실패했습니다.')
    } finally {
      setUploadingKey('')
    }
  }

  const removeGalleryImage = (index) => {
    patch({ gallery: gallery.filter((_, i) => i !== index) })
  }

  const validate = useCallback(() => {
    const nextErrors = {}
    REQUIRED_FIELDS.forEach(([key, message]) => {
      if (!String(w[key] || '').trim()) nextErrors[key] = message
    })
    if (!w.coverImage) nextErrors.coverImage = '메인 화면 사진을 올려주세요.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [w])

  const onBack = useCallback(() => {
    navigate('/create/design')
  }, [navigate])

  const onNext = useCallback(async () => {
    if (!validate()) return
    await flush()
    patch({ step: 2 })
    navigate(`/create/checkout?plan=${invitation.plan || 'standard'}`)
  }, [flush, invitation.plan, navigate, patch, validate])

  useEffect(() => {
    setPageActions?.({ onBack, onSave: onNext })
    return () => setPageActions?.({})
  }, [onBack, onNext, setPageActions])

  const previewData = {
    ...w,
    themeOptions,
    coverImage: w.coverImage || '',
    greetingImage: w.greetingImage || '',
    endingImage: w.endingImage || '',
    gallery,
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: '384px 520px',
          },
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: { xs: 2.5, md: 3 },
          width: '100%',
        }}
      >
        <Box sx={{ minWidth: 0, alignSelf: { md: 'stretch' } }}>
          <PreviewPane data={previewData} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Stack spacing={1.5}>
            <InputPanel title="테마">
              <Stack spacing={3}>
                <OptionRow label="글꼴">
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} useFlexGap>
                    <SelectBox value={themeOptions.fontMood} onChange={(value) => setTheme('fontMood', value)}>
                      {FONT_OPTIONS.map(([value, label]) => (
                        <MenuItem key={value} value={value}>{label}</MenuItem>
                      ))}
                    </SelectBox>
                    <SelectBox value={themeOptions.fontSize} onChange={(value) => setTheme('fontSize', value)}>
                      {FONT_SIZE_OPTIONS.map(([value, label]) => (
                        <MenuItem key={value} value={value}>{label}</MenuItem>
                      ))}
                    </SelectBox>
                  </Stack>
                </OptionRow>

                <OptionRow label="배경 색상">
                  <SwatchGroup
                    colors={BG_COLORS}
                    value={themeOptions.backgroundColor}
                    onChange={(value) => setTheme('backgroundColor', value)}
                  />
                </OptionRow>

                <OptionRow label="강조 색상">
                  <SwatchGroup
                    colors={ACCENT_COLORS}
                    value={themeOptions.accentColor}
                    onChange={(value) => setTheme('accentColor', value)}
                  />
                </OptionRow>

                <OptionRow label="배경 패턴">
                  <SegmentGroup
                    value={themeOptions.backgroundPattern}
                    onChange={(value) => setTheme('backgroundPattern', value)}
                    options={[
                      ['none', '없음'],
                      ['smallFlower', '작은 꽃'],
                      ['largeFlower', '큰 꽃'],
                    ]}
                  />
                </OptionRow>

                <OptionRow label="배경 이펙트">
                  <SegmentGroup
                    value={themeOptions.backgroundEffect}
                    onChange={(value) => setTheme('backgroundEffect', value)}
                    options={[
                      ['none', '없음'],
                      ['petals', '벚꽃'],
                      ['snow', '눈'],
                      ['fall', '낙엽'],
                      ['confetti', '개나리'],
                      ['fogFlower', '안개꽃'],
                    ]}
                  />
                </OptionRow>

              </Stack>
            </InputPanel>

            <InputPanel title="기본 정보">
              <Stack spacing={3}>
                <PersonBlock
                  type="groom"
                  title="🤵 신랑"
                  wedding={w}
                  error={errors.groom}
                  onNameChange={setPersonName}
                  onChange={(delta) => patchWedding(delta)}
                />
                <Box sx={{ height: 1, background: 'rgba(0,0,0,0.1)' }} />
                <PersonBlock
                  type="bride"
                  title="👰 신부"
                  wedding={w}
                  error={errors.bride}
                  onNameChange={setPersonName}
                  onChange={(delta) => patchWedding(delta)}
                />
                <Box sx={{ height: 1, background: 'rgba(0,0,0,0.1)' }} />
                <OptionRow label="故人 표기">
                  <SquareCheck
                    checked={w.deceasedFlowerMark !== false}
                    label="국화 꽃으로 표기"
                    onChange={(checked) => patchWedding({ deceasedFlowerMark: checked })}
                  />
                </OptionRow>
                <OptionRow label="항목 순서">
                  <SquareCheck
                    checked={!!w.brideFirst}
                    label="신부측 먼저 표시"
                    onChange={(checked) => patchWedding({ brideFirst: checked })}
                  />
                </OptionRow>
              </Stack>
            </InputPanel>

            <InputPanel title="메인 화면" defaultExpanded>
              <Stack spacing={2.75}>
                <MainDesignPicker
                  currentId={themeOptions.mainLayout}
                  onChange={(id) => setTheme('mainLayout', id)}
                  data={{ ...w, themeOptions }}
                />

                <Stack alignItems="center">
                  <SegmentGroup
                    value={themeOptions.photoFrame}
                    onChange={setPhotoFrame}
                    options={[
                      ['default', '기본'],
                      ['fill', '채우기'],
                      ['arch', '아치'],
                      ['oval', '타원'],
                      ['frame', '액자'],
                    ]}
                  />
                </Stack>

                <Box sx={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />

                <OptionRow label="사진">
                  <Box
                    component="label"
                    htmlFor="main-photo-upload"
                    sx={{
                      position: 'relative',
                      width: 116,
                      height: 116,
                      borderRadius: `${radii.md}px`,
                      border: w.coverImage
                        ? '1px solid rgba(0,0,0,0.08)'
                        : '1px dashed rgba(0,0,0,0.34)',
                      background: '#F4F4F4',
                      display: 'grid',
                      placeItems: 'center',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    {w.coverImage ? (
                      <>
                        <Box
                          component="img"
                          src={w.coverImage}
                          alt="메인"
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.preventDefault()
                            patchWedding({ coverImage: '' })
                          }}
                          aria-label="메인 사진 삭제"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 22,
                            height: 22,
                            background: 'rgba(0,0,0,0.55)',
                            color: '#fff',
                            '&:hover': { background: 'rgba(0,0,0,0.75)' },
                          }}
                        >
                          <Box component="span" sx={{ fontSize: 12, lineHeight: 1 }}>×</Box>
                        </IconButton>
                      </>
                    ) : uploadingKey === 'coverImage' ? (
                      <CircularProgress size={22} />
                    ) : (
                      <AddRoundedIcon sx={{ fontSize: 30, color: 'rgba(0,0,0,0.5)' }} />
                    )}
                    <input
                      id="main-photo-upload"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        event.target.value = ''
                        if (file) uploadSingle('coverImage', file)
                      }}
                    />
                  </Box>
                </OptionRow>
                {errors.coverImage && (
                  <Alert severity="warning">{errors.coverImage}</Alert>
                )}

                <OptionRow label="디자인 변형">
                  <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap>
                    <SquareCheck
                      checked={!!themeOptions.photoBorder}
                      label="테두리 선"
                      onChange={(checked) => setTheme('photoBorder', checked)}
                    />
                    <SquareCheck
                      checked={!!themeOptions.photoExtended}
                      label="사진 확장"
                      onChange={(checked) => setTheme('photoExtended', checked)}
                    />
                  </Stack>
                </OptionRow>

                <OptionRow label="이펙트">
                  <SegmentGroup
                    value={normalizeMainEffect(themeOptions.photoFrame, themeOptions.mainEffect)}
                    onChange={(value) => setTheme('mainEffect', value)}
                    options={getMainEffectOptions(themeOptions.photoFrame)}
                  />
                </OptionRow>

                <CustomMainTextBlock
                  enabled={!!themeOptions.customMainTextEnabled}
                  onToggle={(checked) => setTheme('customMainTextEnabled', checked)}
                  wedding={w}
                  themeOptions={themeOptions}
                  setTheme={setTheme}
                />
              </Stack>
            </InputPanel>

            <InputPanel title="인사말">
              <GreetingPanel
                wedding={w}
                onTitleChange={set('greetingTitle')}
                onContentChange={set('greeting')}
                onApplySample={(text) => patchWedding({ greeting: text })}
                onPatchWedding={patchWedding}
                error={errors.greeting}
                inputSx={inputSx}
                uploadingKey={uploadingKey}
                uploadSingle={uploadSingle}
              />
            </InputPanel>

            <InputPanel title="예식 일시">
              <WeddingDateTimePanel
                wedding={w}
                onPatch={patchWedding}
                errors={errors}
              />
            </InputPanel>

            <InputPanel title="예식 장소">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormField label="예식장명" required value={w.venue || ''} onChange={set('venue')} error={errors.venue} sx={inputSx} />
                </Grid>
                <Grid item xs={12}>
                  <FormField label="주소" required value={w.address || ''} onChange={set('address')} error={errors.address} sx={inputSx} />
                </Grid>
              </Grid>
            </InputPanel>

            <InputPanel title="갤러리">
              <GalleryUploader
                gallery={gallery}
                uploading={uploadingKey === 'gallery'}
                onUpload={uploadGallery}
                onRemove={removeGalleryImage}
              />
            </InputPanel>

            <InputPanel
              title={(
                <Box
                  component="span"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                >
                  <Box component="span">엔딩 사진, 문구</Box>
                  <Box
                    component="span"
                    sx={{
                      px: 0.65,
                      py: 0.15,
                      borderRadius: 1,
                      background: '#FFE800',
                      color: '#121212',
                      fontSize: 11,
                      fontWeight: 900,
                      lineHeight: 1.3,
                    }}
                  >
                    강력추천😊
                  </Box>
                </Box>
              )}
            >
              <EndingPanel
                wedding={w}
                uploading={uploadingKey === 'endingImage'}
                onUpload={(file) => uploadSingle('endingImage', file)}
                onPatch={patchWedding}
              />
            </InputPanel>

            {uploadError && <Alert severity="warning">{uploadError}</Alert>}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

function PreviewPane({ data }) {
  return (
    <Box
      role="region"
      aria-label="청첩장 모바일 미리보기"
      sx={{
        position: { md: 'sticky' },
        top: { md: 132 },
        width: '100%',
        maxWidth: { xs: 420, md: 384 },
        mx: 'auto',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: { xs: 'auto', md: 620 },
          borderRadius: { xs: '8px', md: '10px' },
          background: '#FBFAF8',
          overflowX: 'hidden',
          overflowY: { xs: 'visible', md: 'scroll' },
          overscrollBehavior: { md: 'contain' },
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'auto',
          scrollbarColor: '#A0A0A0 #EEEAE3',
          '&::-webkit-scrollbar': { width: 10, background: '#EEEAE3' },
          '&::-webkit-scrollbar-track': { background: '#EEEAE3', borderRadius: 6 },
          '&::-webkit-scrollbar-thumb': {
            background: '#A0A0A0',
            borderRadius: 6,
            border: '2px solid #EEEAE3',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#7A7A7A',
          },
          boxShadow: '0 1px 0 rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <PreviewGuideBody data={data} />
      </Box>
    </Box>
  )
}

const FONT_FAMILY_BY_MOOD = {
  elegant: '"Gowun Dodum", "Pretendard Variable", Pretendard, sans-serif',
  ridibatang: '"Gowun Batang", "Nanum Myeongjo", "Noto Serif KR", serif',
  iropke: '"Noto Serif KR", "Gowun Batang", serif',
  roundwind: '"Gowun Dodum", "Noto Sans KR", "Pretendard Variable", sans-serif',
  yeonsung: '"Yeon Sung", "Noto Serif KR", serif',
  notoSans: '"Noto Sans KR", "Pretendard Variable", Pretendard, sans-serif',
  serif: '"Cormorant Garamond", "Noto Serif KR", serif',
  modern: '"Inter", "Pretendard Variable", sans-serif',
}

const HEADING_FONT_BY_MOOD = {
  elegant: '"Cormorant Garamond", "Gowun Dodum", serif',
  ridibatang: '"Gowun Batang", "Nanum Myeongjo", "Noto Serif KR", serif',
  iropke: '"Noto Serif KR", "Gowun Batang", serif',
  roundwind: '"Gowun Dodum", "Noto Sans KR", sans-serif',
  yeonsung: '"Yeon Sung", "Noto Serif KR", serif',
  notoSans: '"Noto Sans KR", "Pretendard Variable", sans-serif',
  serif: '"Cormorant Garamond", "Noto Serif KR", serif',
  modern: '"Inter", "Pretendard Variable", sans-serif',
}

const FONT_SCALE = { small: 0.86, normal: 1, large: 1.18, xlarge: 1.34 }

const LOCK_LABEL = {
  public: null,
  afterWedding: '예식 이후 잠금',
  locked: '비공개 / 잠금',
}

export function PreviewGuideBody({ data }) {
  const [now, setNow] = useState(() => new Date())
  const { date, time, greetingTitle, greeting, greetingImage, themeOptions = {} } = data
  const {
    fontMood = 'elegant',
    fontSize: fsKey = 'normal',
    backgroundColor = '#FFFFFF',
    accentColor = '#F6B8BE',
    backgroundPattern = 'none',
    backgroundEffect = 'none',
    revealEffect = true,
    englishSubtitle = true,
    lockMode = 'public',
  } = themeOptions

  const dateObj = parseDateSafe(date, time)

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const bodyFont = FONT_FAMILY_BY_MOOD[fontMood] || FONT_FAMILY_BY_MOOD.elegant
  const headingFont = HEADING_FONT_BY_MOOD[fontMood] || HEADING_FONT_BY_MOOD.elegant
  const scale = FONT_SCALE[fsKey] ?? 1
  const accentSoft = `${accentColor}E0` // accent + alpha
  const lockText = LOCK_LABEL[lockMode]
  const isFilledMain = themeOptions.photoFrame === 'fill'

  // 기본 정보 추출
  const groomName =
    data.groom?.trim() ||
    `${data.groomLastName || ''}${data.groomFirstName || ''}`.trim()
  const brideName =
    data.bride?.trim() ||
    `${data.brideLastName || ''}${data.brideFirstName || ''}`.trim()
  const brideFirst = !!data.brideFirst
  const flowerMark = data.deceasedFlowerMark !== false

  const nameA = brideFirst ? brideName : groomName
  const nameB = brideFirst ? groomName : brideName
  const placeholderA = brideFirst ? '신부' : '신랑'
  const placeholderB = brideFirst ? '신랑' : '신부'

  const groomLine = buildParentLine(
    data.groomFather,
    data.groomFatherDeceased,
    data.groomMother,
    data.groomMotherDeceased,
    data.groomFatherRelation || data.groomMotherRelation,
    groomName,
    flowerMark,
  )
  const brideLine = buildParentLine(
    data.brideFather,
    data.brideFatherDeceased,
    data.brideMother,
    data.brideMotherDeceased,
    data.brideFatherRelation || data.brideMotherRelation,
    brideName,
    flowerMark,
  )
  const parentLines = brideFirst
    ? [brideLine, groomLine].filter(Boolean)
    : [groomLine, brideLine].filter(Boolean)

  return (
    <Box
      sx={{
        minHeight: { xs: 'auto', md: '100%' },
        height: 'auto',
        background: backgroundColor || '#FFFFFF',
        position: 'relative',
        overflow: 'visible',
        transition: 'background 0.25s ease',
      }}
    >
      <PatternOverlay pattern={backgroundPattern} accent={accentColor} />
      <EffectLayer effect={backgroundEffect} accent={accentColor} />

      <Stack
        sx={{
          height: 'auto',
          width: '100%',
          outline: 'none',
          px: isFilledMain ? 0 : { xs: 1.5, md: 2 },
          pt: isFilledMain ? 0 : { xs: 1.5, md: 2 },
          pb: { xs: 2.25, md: 2.75 },
          alignItems: 'center',
          textAlign: 'center',
          color: '#3B342E',
          fontFamily: bodyFont,
          position: 'relative',
          zIndex: 2,
          animation: revealEffect
            ? 'oz-preview-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both'
            : 'none',
          '@keyframes oz-preview-reveal': {
            from: { opacity: 0, transform: 'translateY(8px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
        spacing={1.25}
        key={`${fontMood}-${fsKey}-${backgroundColor}-${accentColor}-${revealEffect}-${brideFirst}-${themeOptions.mainLayout}-${themeOptions.photoFrame}`}
      >
        {lockText && (
          <Box
            sx={{
              alignSelf: 'center',
              px: 1.25,
              py: 0.4,
              borderRadius: 999,
              background: 'rgba(0,0,0,0.06)',
              color: 'rgba(0,0,0,0.65)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            🔒 {lockText}
          </Box>
        )}

        <Box
          sx={{
            width: isFilledMain
              ? { xs: 'calc(100% + 24px)', md: 'calc(100% + 32px)' }
              : '100%',
            mx: isFilledMain ? { xs: '-12px', md: '-16px' } : 0,
            mt: 0,
            py: isFilledMain ? 0 : 1,
          }}
        >
          <MainLayoutCanvas
            layoutId={themeOptions.mainLayout || 'polaroidLove'}
            data={data}
            fullBleed={isFilledMain}
          />
        </Box>

        <Stack spacing={0.75} alignItems="center">
          {englishSubtitle && (
            <Typography
              sx={{
                fontFamily: headingFont,
                fontSize: { xs: 11 * scale, md: 12 * scale },
                letterSpacing: '0.34em',
                color: accentColor,
                fontWeight: 600,
              }}
            >
              INVITATION
            </Typography>
          )}
          <Typography
            sx={{
              fontFamily: bodyFont,
              fontSize: { xs: 14 * scale, md: 16 * scale },
              fontWeight: 500,
              color: accentColor,
              letterSpacing: '-0.01em',
            }}
          >
            {greetingTitle || '소중한 분들을 초대합니다'}
          </Typography>
        </Stack>

        {greeting && (
          <Typography
            sx={{
              fontFamily: bodyFont,
              fontSize: { xs: 11 * scale, md: 12 * scale },
              lineHeight: 1.85,
              color: 'rgba(0,0,0,0.68)',
              whiteSpace: 'pre-line',
            maxWidth: 300,
            }}
          >
            {greeting}
          </Typography>
        )}

        {greetingImage && (
          <Box sx={{ width: '100%', maxWidth: 320, mx: 'auto', mt: 1 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                pt: '125%',
                overflow: 'hidden',
                borderRadius: 1.5,
                background: '#F4F4F4',
              }}
            >
              <Box
                component="img"
                src={greetingImage}
                alt="인사말 사진"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        )}

        {parentLines.length > 0 && (
          <Stack spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
            {parentLines.map((line, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: bodyFont,
                  fontSize: { xs: 10 * scale, md: 11 * scale },
                  color: 'rgba(0,0,0,0.6)',
                  letterSpacing: '-0.01em',
                  textAlign: 'center',
                }}
              >
                {line}
              </Typography>
            ))}
          </Stack>
        )}

        {/* 예식 일시 섹션 */}
        <SectionDivider accent={accentColor} />
        <WeddingDatePreview
          dateObj={dateObj}
          hasTime={!!time}
          bodyFont={bodyFont}
          headingFont={headingFont}
          accent={accentColor}
          scale={scale}
          showCalendar={data.showCalendar !== false}
          showCountdown={data.showCountdown !== false}
          countdownText={data.countdownText || DEFAULT_COUNTDOWN_TEXT}
          groomName={groomName || '신랑'}
          brideName={brideName || '신부'}
          now={now}
        />

        {/* 예식 장소 섹션 */}
        <SectionDivider accent={accentColor} />
        <SectionHeading english="LOCATION" korean="예식 장소" headingFont={headingFont} bodyFont={bodyFont} accent={accentColor} scale={scale} englishSubtitle={englishSubtitle} />
        {data.venue || data.address ? (
          <Stack spacing={0.5} alignItems="center">
            {data.venue && (
              <Typography sx={{ fontFamily: bodyFont, fontSize: { xs: 13 * scale, md: 15 * scale }, color: '#2F2A24', fontWeight: 600 }}>
                {data.venue}
              </Typography>
            )}
            {data.address && (
              <Typography sx={{ fontFamily: bodyFont, fontSize: { xs: 11 * scale, md: 12 * scale }, color: 'rgba(0,0,0,0.6)' }}>
                {data.address}
              </Typography>
            )}
          </Stack>
        ) : (
          <Typography sx={{ fontFamily: bodyFont, fontSize: 13, color: 'rgba(0,0,0,0.6)', fontWeight: 500 }}>
            예식장 이름과 주소를 입력해 주세요.
          </Typography>
        )}

        {/* 갤러리 섹션 */}
        {Array.isArray(data.gallery) && data.gallery.length > 0 && (
          <>
            <SectionDivider accent={accentColor} />
            <SectionHeading english="GALLERY" korean="갤러리" headingFont={headingFont} bodyFont={bodyFont} accent={accentColor} scale={scale} englishSubtitle={englishSubtitle} />
            <Box
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 0.5,
                px: 0.5,
              }}
            >
              {data.gallery.slice(0, 9).map((src, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={src}
                  alt={`갤러리 ${idx + 1}`}
                  sx={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          </>
        )}

        {/* 엔딩 섹션 */}
        {(data.endingImage || data.endingMessage) && (
          <>
            <SectionDivider accent={accentColor} />
            <EndingPreview
              image={data.endingImage}
              message={data.endingMessage || DEFAULT_ENDING_MESSAGE}
              visualType={data.endingVisualType || 'default'}
              effect={data.endingEffect || 'none'}
              ratio={data.endingPhotoRatio || 'fixed'}
              bodyFont={bodyFont}
              accent={accentColor}
              scale={scale}
              textBold={!!data.endingTextBold}
              textItalic={!!data.endingTextItalic}
              textUnderline={!!data.endingTextUnderline}
              textAlign={data.endingTextAlign || 'left'}
              textAccent={!!data.endingTextAccent}
            />
          </>
        )}
      </Stack>
    </Box>
  )
}

function EndingPreview({
  image,
  message,
  visualType,
  effect,
  ratio,
  bodyFont,
  accent,
  scale,
  textBold,
  textItalic,
  textUnderline,
  textAlign,
  textAccent,
}) {
  return (
    <Stack spacing={1.4} alignItems="center" sx={{ width: '100%', maxWidth: 300, mx: 'auto' }}>
      {image && (
        <EndingImageDisplay
          src={image}
          visualType={visualType}
          effect={effect}
          ratio={ratio}
          accent={accent}
        />
      )}
      {message && (
        <Typography
          sx={{
            fontFamily: bodyFont,
            fontSize: { xs: 11 * scale, md: 12 * scale },
            lineHeight: 1.85,
            color: textAccent ? accent : 'rgba(0,0,0,0.68)',
            whiteSpace: 'pre-line',
            maxWidth: 280,
            textAlign,
            mx: 'auto',
            fontWeight: textBold ? 800 : 500,
            fontStyle: textItalic ? 'italic' : 'normal',
            textDecoration: textUnderline ? 'underline' : 'none',
            textUnderlineOffset: 3,
          }}
        >
          {message}
        </Typography>
      )}
    </Stack>
  )
}

function EndingImageDisplay({ src, visualType, effect, ratio, accent }) {
  const fixed = ratio !== 'auto'
  const baseImageSx = {
    display: 'block',
    width: '100%',
    height: fixed ? '100%' : 'auto',
    objectFit: fixed ? 'cover' : 'contain',
    ...mainImageEffectSx(effect, false),
  }

  if (visualType === 'blurCard') {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '82%',
          maxWidth: 260,
          aspectRatio: fixed ? '4 / 5' : 'auto',
          minHeight: fixed ? 'auto' : 180,
          borderRadius: 3,
          overflow: 'hidden',
          background: '#F5F2ED',
          boxShadow: '0 16px 34px rgba(0,0,0,0.08)',
        }}
      >
        <Box
          component="img"
          src={src}
          alt=""
          sx={{
            position: 'absolute',
            inset: -12,
            width: 'calc(100% + 24px)',
            height: 'calc(100% + 24px)',
            objectFit: 'cover',
            filter: 'blur(16px)',
            opacity: 0.42,
            transform: 'scale(1.04)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            width: '82%',
            height: fixed ? '78%' : 'auto',
            mx: 'auto',
            my: fixed ? '11%' : 2,
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: `0 0 0 1px ${accent}33`,
            background: '#fff',
          }}
        >
          <Box component="img" src={src} alt="엔딩 사진" sx={baseImageSx} />
          <EffectOverlay effect={effect} />
        </Box>
      </Box>
    )
  }

  if (visualType === 'scroll') {
    return (
      <Box
        sx={{
          width: '76%',
          maxWidth: 248,
          height: fixed ? 260 : 220,
          borderRadius: 2,
          overflow: 'hidden',
          background: '#F4F4F4',
          position: 'relative',
          boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
        }}
      >
        <Box
          component="img"
          src={src}
          alt="엔딩 사진"
          sx={{
            ...baseImageSx,
            height: '122%',
            objectFit: 'cover',
            animation: 'oz-ending-scroll 7s ease-in-out infinite alternate',
            '@keyframes oz-ending-scroll': {
              from: { transform: 'translateY(0) scale(1.02)' },
              to: { transform: 'translateY(-18%) scale(1.02)' },
            },
          }}
        />
        <EffectOverlay effect={effect} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '74%',
        maxWidth: 252,
        aspectRatio: fixed ? '4 / 5' : 'auto',
        borderRadius: 2,
        overflow: 'hidden',
        background: '#F4F4F4',
        position: 'relative',
        boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
      }}
    >
      <Box component="img" src={src} alt="엔딩 사진" sx={baseImageSx} />
      <EffectOverlay effect={effect} />
    </Box>
  )
}

function WeddingDatePreview({
  dateObj,
  hasTime,
  bodyFont,
  headingFont,
  accent,
  scale,
  showCalendar,
  showCountdown,
  countdownText,
  groomName,
  brideName,
  now,
}) {
  if (!dateObj) {
    return (
      <Typography sx={{ fontFamily: bodyFont, fontSize: 13, color: 'rgba(0,0,0,0.6)', fontWeight: 500 }}>
        예식 날짜와 시간을 입력해 주세요.
      </Typography>
    )
  }

  const dateLine = formatDotDate(dateObj)
  const timeLine = formatKoreanShortDateTime(dateObj, hasTime)
  const countdown = getCountdownParts(dateObj, now)

  return (
    <Stack
      spacing={{ xs: 1.75, md: 2 }}
      alignItems="center"
      sx={{
        width: '100%',
        maxWidth: 292,
        mx: 'auto',
        py: { xs: 0.75, md: 1 },
      }}
    >
      <Stack spacing={0.55} alignItems="center">
        <Typography
          sx={{
            fontFamily: headingFont,
            fontSize: { xs: 18 * scale, md: 21 * scale },
            color: '#2F2A24',
            fontWeight: 500,
            letterSpacing: '0.02em',
            lineHeight: 1.15,
          }}
        >
          {dateLine}
        </Typography>
        <Typography
          sx={{
            fontFamily: bodyFont,
            fontSize: { xs: 11.5 * scale, md: 12.5 * scale },
            color: 'rgba(0,0,0,0.62)',
            lineHeight: 1.45,
            letterSpacing: '-0.01em',
          }}
        >
          {timeLine}
        </Typography>
      </Stack>

      {showCalendar && (
        <>
          <PreviewRule />
          <CalendarMonthPreview dateObj={dateObj} bodyFont={bodyFont} accent={accent} scale={scale} />
        </>
      )}

      {showCountdown && (
        <>
          <PreviewRule />
          <CountdownPreview
            countdown={countdown}
            bodyFont={bodyFont}
            headingFont={headingFont}
            accent={accent}
            scale={scale}
            message={countdownText}
            groomName={groomName}
            brideName={brideName}
          />
        </>
      )}
    </Stack>
  )
}

function PreviewRule() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 248,
        height: 1,
        background: 'rgba(0,0,0,0.08)',
      }}
    />
  )
}

function CalendarMonthPreview({ dateObj, bodyFont, accent, scale }) {
  const cells = getMonthCells(dateObj)
  const selectedDay = dateObj.getDate()

  return (
    <Box sx={{ width: '100%', maxWidth: 238 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: { xs: 1.35, md: 1.55 },
          columnGap: 0.2,
          alignItems: 'center',
        }}
      >
        {WEEKDAYS_KR.map((day, index) => (
          <Typography
            key={day}
            sx={{
              fontFamily: bodyFont,
              fontSize: { xs: 10.5 * scale, md: 11.5 * scale },
              fontWeight: 700,
              color: index === 0 ? accent : 'rgba(0,0,0,0.7)',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            {day}
          </Typography>
        ))}
        {cells.map((day, index) => {
          const isSunday = index % 7 === 0
          const isSelected = day === selectedDay
          return (
            <Box
              key={`${index}-${day || 'blank'}`}
              sx={{
                height: { xs: 24, md: 26 },
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {day ? (
                <Box
                  sx={{
                    width: { xs: 27, md: 30 },
                    height: { xs: 27, md: 30 },
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: isSelected ? accent : 'transparent',
                    color: isSelected ? '#fff' : isSunday ? accent : 'rgba(0,0,0,0.62)',
                    fontFamily: bodyFont,
                    fontSize: { xs: 10.5 * scale, md: 11.5 * scale },
                    fontWeight: isSelected ? 700 : 500,
                    lineHeight: 1,
                  }}
                >
                  {day}
                </Box>
              ) : null}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

function CountdownPreview({ countdown, bodyFont, headingFont, accent, scale, message, groomName, brideName }) {
  const labels = ['DAYS', 'HOUR', 'MIN', 'SEC']
  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds]

  return (
    <Stack spacing={1.1} alignItems="center" sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          justifyContent: 'center',
          columnGap: { xs: 1.45, md: 1.7 },
          rowGap: 0.45,
        }}
      >
        {labels.map((label) => (
          <Typography
            key={label}
            sx={{
              fontFamily: headingFont,
              fontSize: { xs: 8.5 * scale, md: 9.5 * scale },
              color: 'rgba(0,0,0,0.38)',
              textAlign: 'center',
              letterSpacing: '0.08em',
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        ))}
        {values.map((value, index) => (
          <Typography
            key={`${index}-${value}`}
            sx={{
              fontFamily: headingFont,
              fontSize: { xs: 17 * scale, md: 19 * scale },
              color: '#5B514B',
              textAlign: 'center',
              lineHeight: 1,
              letterSpacing: '0.04em',
              '&::after': {
                content: index < values.length - 1 ? '":"' : '""',
                display: 'inline-block',
                ml: { xs: 1.1, md: 1.35 },
                color: '#7A716C',
              },
            }}
          >
            {value}
          </Typography>
        ))}
      </Box>
      <CountdownMessage
        template={message}
        daysLeft={countdown.remainingDays}
        groomName={groomName}
        brideName={brideName}
        bodyFont={bodyFont}
        accent={accent}
        scale={scale}
      />
    </Stack>
  )
}

function CountdownMessage({ template, daysLeft, groomName, brideName, bodyFont, accent, scale }) {
  const text = template || DEFAULT_COUNTDOWN_TEXT
  const normalized = text
    .replaceAll('(신랑)', groomName || '신랑')
    .replaceAll('(신부)', brideName || '신부')
  const parts = normalized.split('(D-Day)')

  if (parts.length < 2) {
    return (
      <Typography sx={{ fontFamily: bodyFont, fontSize: { xs: 11 * scale, md: 12 * scale }, color: 'rgba(0,0,0,0.62)', lineHeight: 1.55, textAlign: 'center' }}>
        {normalized}
      </Typography>
    )
  }

  return (
    <Typography sx={{ fontFamily: bodyFont, fontSize: { xs: 11 * scale, md: 12 * scale }, color: 'rgba(0,0,0,0.62)', lineHeight: 1.55, textAlign: 'center' }}>
      {parts[0]}
      <Box component="span" sx={{ color: accent, fontWeight: 800 }}>
        {daysLeft}
      </Box>
      {parts.slice(1).join(String(daysLeft))}
    </Typography>
  )
}

function SectionDivider({ accent }) {
  return (
    <Box
      sx={{
        width: 36,
        height: 1,
        background: accent || 'rgba(0,0,0,0.18)',
        opacity: 0.5,
        my: 0.5,
      }}
    />
  )
}

function SectionHeading({ english, korean, headingFont, bodyFont, accent, scale, englishSubtitle }) {
  return (
    <Stack spacing={0.4} alignItems="center" sx={{ mt: 0.2 }}>
      {englishSubtitle && english && (
        <Typography
          sx={{
            fontFamily: headingFont,
            fontSize: { xs: 10.5 * scale, md: 11.5 * scale },
            letterSpacing: '0.34em',
            color: accent,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {english}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: bodyFont,
          fontSize: { xs: 14 * scale, md: 15 * scale },
          color: '#1F1B17',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {korean}
      </Typography>
    </Stack>
  )
}

function buildParentLine(father, fatherDec, mother, motherDec, relation, childName, flowerMark) {
  const fmt = (name, dec) => {
    if (!name) return ''
    if (!dec) return name
    return flowerMark ? `🌼 ${name}` : `故 ${name}`
  }
  const parents = [fmt(father, fatherDec), fmt(mother, motherDec)]
    .filter(Boolean)
    .join(' · ')
  if (!parents && !childName) return ''
  if (!parents) return childName
  const tail = relation ? `의 ${relation}` : '의'
  return `${parents}${tail} ${childName}`.trim()
}

function PatternOverlay({ pattern, accent }) {
  if (!pattern || pattern === 'none') return null
  const size = pattern === 'largeFlower' ? 52 : 32
  const stroke = pattern === 'largeFlower' ? 1.4 : 1.1
  const opacity = pattern === 'largeFlower' ? 0.10 : 0.08
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
       <g fill='none' stroke='${accent}' stroke-width='${stroke}' opacity='1'>
         <circle cx='${size / 2}' cy='${size / 2}' r='${size * 0.18}' />
         <ellipse cx='${size / 2}' cy='${size * 0.22}' rx='${size * 0.10}' ry='${size * 0.22}' />
         <ellipse cx='${size / 2}' cy='${size * 0.78}' rx='${size * 0.10}' ry='${size * 0.22}' />
         <ellipse cx='${size * 0.22}' cy='${size / 2}' rx='${size * 0.22}' ry='${size * 0.10}' />
         <ellipse cx='${size * 0.78}' cy='${size / 2}' rx='${size * 0.22}' ry='${size * 0.10}' />
       </g>
     </svg>`,
  )
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat',
        opacity,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

const EFFECT_PRESETS = {
  petals: { color: '#F8B6C0', size: [10, 16], speed: [4, 7], count: 10, shape: 'petal' },
  snow: { color: '#FFFFFF', size: [3, 6], speed: [6, 10], count: 14, shape: 'dot' },
  fall: { color: '#D9A766', size: [10, 16], speed: [5, 9], count: 9, shape: 'leaf' },
  confetti: { color: '#F2C94C', size: [4, 8], speed: [4, 8], count: 14, shape: 'dot' },
  fogFlower: { color: '#F4E2DC', size: [12, 20], speed: [7, 11], count: 8, shape: 'petal' },
}

function EffectLayer({ effect, accent }) {
  if (!effect || effect === 'none') return null
  const preset = EFFECT_PRESETS[effect]
  if (!preset) return null
  const items = Array.from({ length: preset.count }, (_, i) => {
    const seed = (i * 53) % 100
    const size = preset.size[0] + ((i * 7) % (preset.size[1] - preset.size[0]))
    const speed = preset.speed[0] + ((i * 5) % (preset.speed[1] - preset.speed[0]))
    return {
      left: `${(seed * 0.95) % 95}%`,
      size,
      duration: `${speed}s`,
      delay: `${(i * 0.7) % preset.speed[1]}s`,
      rotate: (i * 47) % 360,
    }
  })
  const tint = effect === 'snow' || effect === 'fogFlower' ? preset.color : accent || preset.color
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        '@keyframes oz-effect-fall': {
          '0%': { transform: 'translateY(-15%) rotate(0deg)', opacity: 0 },
          '15%': { opacity: 0.85 },
          '85%': { opacity: 0.85 },
          '100%': { transform: 'translateY(115%) rotate(360deg)', opacity: 0 },
        },
      }}
    >
      {items.map((it, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            top: 0,
            left: it.left,
            width: it.size,
            height: it.size,
            transform: `rotate(${it.rotate}deg)`,
            animation: `oz-effect-fall ${it.duration} linear ${it.delay} infinite`,
          }}
        >
          <EffectShape shape={preset.shape} color={tint} />
        </Box>
      ))}
    </Box>
  )
}

function EffectShape({ shape, color }) {
  if (shape === 'dot') {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: color,
          opacity: 0.85,
        }}
      />
    )
  }
  if (shape === 'leaf') {
    return (
      <Box
        component="svg"
        viewBox="0 0 24 24"
        sx={{ width: '100%', height: '100%' }}
      >
        <path
          d="M3 21 C8 8, 18 4, 22 3 C20 11, 14 19, 3 21 Z"
          fill={color}
          opacity={0.85}
        />
      </Box>
    )
  }
  // petal
  return (
    <Box
      component="svg"
      viewBox="0 0 40 46"
      sx={{ width: '100%', height: '100%' }}
    >
      <path
        d="M20 2 C30 6, 36 18, 32 32 C29 40, 24 44, 20 42 C16 44, 11 40, 8 32 C4 18, 10 6, 20 2 Z"
        fill={color}
        opacity={0.85}
      />
    </Box>
  )
}

const WEEKDAYS_EN = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

const WEEKDAYS_KR = ['일', '월', '화', '수', '목', '금', '토']

function parseDateSafe(date, time) {
  if (!date) return null
  const base = `${date}T${time || '00:00'}`
  const d = new Date(base)
  return Number.isNaN(d.getTime()) ? null : d
}

function formatKoreanFullDateTime(d, hasTime) {
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  const weekday = WEEKDAYS_KR[d.getDay()]
  if (!hasTime) return `${y}년 ${m}월 ${day}일 ${weekday}요일`
  const h = d.getHours()
  const min = d.getMinutes()
  const ampm = h < 12 ? '오전' : '오후'
  const hour12 = h % 12 || 12
  return `${y}년 ${m}월 ${day}일 ${weekday}요일 ${ampm} ${hour12}시${min > 0 ? ` ${min}분` : ''}`
}

function formatDotDate(d) {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function formatKoreanShortDateTime(d, hasTime) {
  const weekday = WEEKDAYS_KR[d.getDay()]
  if (!hasTime) return `${weekday}요일`
  const h = d.getHours()
  const min = d.getMinutes()
  const ampm = h < 12 ? '오전' : '오후'
  const hour12 = h % 12 || 12
  return `${weekday}요일 ${ampm} ${hour12}시${min > 0 ? ` ${min}분` : ''}`
}

function getMonthCells(dateObj) {
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const cells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: lastDate }, (_, index) => index + 1),
  ]
  const remainder = cells.length % 7
  if (remainder) {
    cells.push(...Array.from({ length: 7 - remainder }, () => null))
  }
  return cells
}

function getCountdownParts(targetDate, now) {
  const diff = Math.max(targetDate.getTime() - now.getTime(), 0)
  const dayMs = 24 * 60 * 60 * 1000
  const hourMs = 60 * 60 * 1000
  const minuteMs = 60 * 1000
  const days = Math.floor(diff / dayMs)
  const hours = Math.floor((diff % dayMs) / hourMs)
  const minutes = Math.floor((diff % hourMs) / minuteMs)
  const seconds = Math.floor((diff % minuteMs) / 1000)
  return {
    days: pad2(days),
    hours: pad2(hours),
    minutes: pad2(minutes),
    seconds: pad2(seconds),
    remainingDays: Math.max(Math.ceil(diff / dayMs), 0),
  }
}

function pad2(value) {
  return String(value).padStart(2, '0')
}

function OptionRow({ label, children }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2 }}
      alignItems={{ sm: 'center' }}
    >
      <Typography sx={{ width: { sm: 100 }, flex: '0 0 auto', fontSize: 15, fontWeight: 700 }}>
        {label}
      </Typography>
      <Box sx={{ minWidth: 0, flex: 1 }}>{children}</Box>
    </Stack>
  )
}

function WeddingDateTimePanel({ wedding, onPatch, errors }) {
  const showCalendar = wedding.showCalendar !== false
  const showCountdown = wedding.showCountdown !== false
  const countdownText =
    wedding.countdownText ||
    '(신랑), (신부)의 결혼식이 (D-Day)일 남았습니다.'

  return (
    <Stack spacing={2.25}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 1.4, sm: 2 },
        }}
      >
        <DateTimeField
          label="예식일"
          required
          type="date"
          value={wedding.date || ''}
          placeholder="연도. 월. 일."
          icon={<CalendarMonthRoundedIcon />}
          error={errors.date}
          onChange={(value) => onPatch({ date: value })}
        />
        <DateTimeField
          label="예식시간"
          required
          type="time"
          value={wedding.time || ''}
          placeholder="-- --:--"
          icon={<AccessTimeRoundedIcon />}
          error={errors.time}
          onChange={(value) => onPatch({ time: value })}
        />
      </Box>

      <OptionRow label="표시">
        <Stack spacing={1}>
          <SquareCheck
            checked={showCalendar}
            label="캘린더 표시"
            onChange={(checked) => onPatch({ showCalendar: checked })}
          />
          <SquareCheck
            checked={showCountdown}
            label="디데이 & 카운트다운 표시"
            onChange={(checked) => onPatch({ showCountdown: checked })}
          />
        </Stack>
      </OptionRow>

      <OptionRow label="문구">
        <TextField
          multiline
          minRows={2}
          value={countdownText}
          onChange={(event) => onPatch({ countdownText: event.target.value })}
          sx={{
            ...inputSx,
            '& .MuiInputBase-input': {
              fontSize: 14,
              lineHeight: 1.7,
            },
          }}
        />
      </OptionRow>
    </Stack>
  )
}

function DateTimeField({ label, required, type, value, placeholder, icon, error, onChange }) {
  return (
    <Stack spacing={0.8}>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 800,
          color: '#1F1B17',
          letterSpacing: '-0.02em',
        }}
      >
        {label}
        {required && <Box component="span" sx={{ color: palette.primary }}> *</Box>}
      </Typography>
      <TextField
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        error={!!error}
        helperText={error || ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: 'grid', placeItems: 'center', color: '#111' }}>
                {icon}
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-root': {
            minHeight: 58,
            borderRadius: '14px',
            background: '#F4F4F4',
          },
          '& .MuiInputBase-input': {
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: type === 'time' ? '0.03em' : '-0.02em',
            color: '#222',
            py: 1.65,
            '&::-webkit-calendar-picker-indicator': {
              opacity: 0,
              cursor: 'pointer',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            },
          },
          '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
          '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.16)' },
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            fontSize: 22,
          },
        }}
      />
    </Stack>
  )
}

function EndingPanel({ wedding, uploading, onUpload, onPatch }) {
  const visualType = wedding.endingVisualType || 'default'
  const effect = wedding.endingEffect || 'none'
  const photoRatio = wedding.endingPhotoRatio || 'fixed'
  const message = wedding.endingMessage || DEFAULT_ENDING_MESSAGE

  return (
    <Stack spacing={2.05}>
      <OptionRow label="사진">
        <EndingPhotoSlot
          src={wedding.endingImage}
          uploading={uploading}
          onUpload={onUpload}
          onRemove={() => onPatch({ endingImage: '' })}
        />
      </OptionRow>

      <OptionRow label="비주얼 타입">
        <SegmentGroup
          value={visualType}
          onChange={(value) => onPatch({ endingVisualType: value })}
          options={[
            ['default', '기본'],
            ['scroll', '스크롤 애니메이션'],
            ['blurCard', '블러 카드'],
          ]}
        />
      </OptionRow>

      <OptionRow label="이펙트">
        <SegmentGroup
          value={effect}
          onChange={(value) => onPatch({ endingEffect: value })}
          options={[
            ['none', '없음'],
            ['fog', '안개'],
            ['wave', '물결'],
            ['paper', '페이퍼'],
          ]}
        />
      </OptionRow>

      <OptionRow label="사진 비율">
        <SegmentGroup
          value={photoRatio}
          onChange={(value) => onPatch({ endingPhotoRatio: value })}
          options={[
            ['fixed', '고정'],
            ['auto', '사진 비율대로 높이 자동조절'],
          ]}
        />
      </OptionRow>

      <OptionRow label="문구 내용">
        <EndingTextEditor
          value={message}
          onChange={(value) => onPatch({ endingMessage: value })}
          formats={{
            bold: !!wedding.endingTextBold,
            italic: !!wedding.endingTextItalic,
            underline: !!wedding.endingTextUnderline,
            align: wedding.endingTextAlign || 'left',
            accent: !!wedding.endingTextAccent,
          }}
          onFormat={(delta) => onPatch(delta)}
        />
      </OptionRow>
    </Stack>
  )
}

function EndingPhotoSlot({ src, uploading, onUpload, onRemove }) {
  const inputId = 'ending-photo-upload'
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
      <Box
        component="label"
        htmlFor={inputId}
        sx={{
          width: 122,
          height: 122,
          borderRadius: '2px',
          border: src ? '1px solid rgba(0,0,0,0.10)' : '1px dashed rgba(0,0,0,0.42)',
          background: '#F8F8F8',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {src ? (
          <>
            <Box component="img" src={src} alt="엔딩 사진" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <IconButton
              size="small"
              onClick={(event) => {
                event.preventDefault()
                onRemove()
              }}
              aria-label="엔딩 사진 삭제"
              sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                width: 24,
                height: 24,
                background: 'rgba(0,0,0,0.55)',
                color: '#fff',
                '&:hover': { background: 'rgba(0,0,0,0.72)' },
              }}
            >
              <Box component="span" sx={{ fontSize: 13, lineHeight: 1 }}>×</Box>
            </IconButton>
          </>
        ) : uploading ? (
          <CircularProgress size={22} />
        ) : (
          <AddRoundedIcon sx={{ fontSize: 32, color: 'rgba(0,0,0,0.58)' }} />
        )}
        <input
          id={inputId}
          hidden
          accept="image/*"
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) onUpload(file)
          }}
        />
      </Box>

      <PillButton component="label" htmlFor={inputId} variant="outline" size="small" startIcon={<UploadRoundedIcon />}>
        사진 올리기
      </PillButton>
    </Stack>
  )
}

function EndingTextEditor({ value, onChange, formats, onFormat }) {
  const toolbarButtonSx = (active = false) => ({
    minWidth: 26,
    height: 28,
    px: 0.45,
    border: 'none',
    borderRadius: 1,
    background: active ? 'rgba(0,0,0,0.08)' : 'transparent',
    color: active ? '#111' : '#4D4D4D',
    fontFamily: 'inherit',
    fontSize: 17,
    fontWeight: 800,
    cursor: 'pointer',
    lineHeight: 1,
  })

  return (
    <Box
      sx={{
        border: '1px solid rgba(0,0,0,0.16)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <Stack
        direction="row"
        spacing={0.35}
        alignItems="center"
        sx={{
          minHeight: 40,
          px: 1.1,
          borderBottom: '1px solid rgba(0,0,0,0.14)',
          background: '#fff',
        }}
      >
        <Box component="button" type="button" aria-label="굵게" onClick={() => onFormat({ endingTextBold: !formats.bold })} sx={toolbarButtonSx(formats.bold)}>
          B
        </Box>
        <Box component="button" type="button" aria-label="기울임" onClick={() => onFormat({ endingTextItalic: !formats.italic })} sx={{ ...toolbarButtonSx(formats.italic), fontStyle: 'italic' }}>
          I
        </Box>
        <Box component="button" type="button" aria-label="밑줄" onClick={() => onFormat({ endingTextUnderline: !formats.underline })} sx={{ ...toolbarButtonSx(formats.underline), textDecoration: 'underline' }}>
          U
        </Box>
        <Box component="button" type="button" aria-label="취소선" sx={{ ...toolbarButtonSx(false), textDecoration: 'line-through' }}>
          S
        </Box>
        <Box component="button" type="button" aria-label="왼쪽 정렬" onClick={() => onFormat({ endingTextAlign: 'left' })} sx={toolbarButtonSx(formats.align === 'left')}>
          ≡
        </Box>
        <Box component="button" type="button" aria-label="가운데 정렬" onClick={() => onFormat({ endingTextAlign: 'center' })} sx={toolbarButtonSx(formats.align === 'center')}>
          ☰
        </Box>
        <Box component="button" type="button" aria-label="강조 색상" onClick={() => onFormat({ endingTextAccent: !formats.accent })} sx={{ ...toolbarButtonSx(formats.accent), color: formats.accent ? palette.primary : '#4D4D4D' }}>
          A
        </Box>
        <Box
          component="button"
          type="button"
          aria-label="색상"
          onClick={() => onFormat({ endingTextAccent: !formats.accent })}
          sx={{
            ...toolbarButtonSx(formats.accent),
            width: 26,
            background: formats.accent
              ? 'linear-gradient(135deg, #FF6B8A 0 50%, #20C997 50% 100%)'
              : 'linear-gradient(135deg, #FF6B8A 0 33%, #FFD43B 33% 66%, #20C997 66% 100%)',
          }}
        />
      </Stack>
      <TextField
        multiline
        minRows={4}
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={DEFAULT_ENDING_MESSAGE}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 0,
            background: '#fff',
          },
          '& fieldset': { border: 'none' },
          '& .MuiInputBase-input': {
            fontSize: 14,
            lineHeight: 1.75,
            color: '#222',
            fontWeight: formats.bold ? 800 : 500,
            fontStyle: formats.italic ? 'italic' : 'normal',
            textDecoration: formats.underline ? 'underline' : 'none',
            textAlign: formats.align,
          },
        }}
      />
    </Box>
  )
}

function SelectBox({ value, onChange, children }) {
  return (
    <TextField
      select
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              mt: 0.75,
              borderRadius: '0 0 18px 18px',
              overflow: 'hidden',
              boxShadow: '0 16px 30px rgba(0,0,0,0.18)',
              '& .MuiMenuItem-root': {
                minHeight: 44,
                fontSize: 15,
                fontWeight: 500,
              },
              '& .Mui-selected': {
                background: 'rgba(239, 82, 130, 0.10) !important',
                fontWeight: 800,
              },
            },
          },
        },
      }}
      sx={{
        minWidth: { xs: '100%', sm: 160 },
        flex: 1,
        ...inputSx,
        '& .MuiInputBase-root': {
          borderRadius: '12px',
          background: '#F4F4F4',
          fontSize: 14.5,
          fontWeight: 600,
        },
        '& .MuiSelect-select': {
          py: 1.15,
        },
        '& .Mui-focused fieldset': {
          borderColor: `${palette.primary} !important`,
          borderWidth: '2px !important',
        },
      }}
    >
      {children}
    </TextField>
  )
}

function SwatchGroup({ colors, value, onChange }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {colors.map((color) => {
        const selected = value === color
        return (
          <Box
            key={color}
            component="button"
            type="button"
            aria-label={`색상 ${color}`}
            onClick={() => onChange(color)}
            sx={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: selected ? '2px solid #111' : '2px solid rgba(0,0,0,0.12)',
              background: color,
              boxShadow: 'inset 0 0 0 3px #fff',
              cursor: 'pointer',
            }}
          />
        )
      })}
    </Stack>
  )
}

function SegmentGroup({ options, value, onChange }) {
  return (
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
      {options.map(([optionValue, label, disabled = false]) => {
        const selected = value === optionValue
        return (
          <Box
            key={optionValue}
            component="button"
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) onChange(optionValue)
            }}
            sx={{
              minHeight: 38,
              px: 1.5,
              borderRadius: '8px',
              border: selected ? '1.5px solid #111' : '1px solid transparent',
              background: disabled ? '#FAFAFA' : selected ? '#fff' : '#F4F4F4',
              color: disabled ? '#C8C8C8' : selected ? '#111' : '#A9A9A9',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.72 : 1,
            }}
          >
            {label}
          </Box>
        )
      })}
    </Stack>
  )
}

function SquareCheck({ checked, label, onChange }) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <Checkbox
        checked={!!checked}
        onChange={(event) => onChange(event.target.checked)}
        sx={{
          p: 0,
          color: '#D1D5DB',
          '&.Mui-checked': { color: '#000' },
          '& .MuiSvgIcon-root': { fontSize: 22 },
        }}
      />
      <Typography sx={{ color: checked ? '#555' : '#9A9A9A', fontSize: 14, fontWeight: 600 }}>
        {label}
      </Typography>
    </Stack>
  )
}

function PersonBlock({ type, title, wedding, error, onNameChange, onChange }) {
  const name = splitKoreanName(wedding[type])
  const lastKey = `${type}LastName`
  const firstKey = `${type}FirstName`
  const fatherKey = `${type}Father`
  const motherKey = `${type}Mother`
  const fatherRelationKey = `${type}FatherRelation`
  const motherRelationKey = `${type}MotherRelation`
  const fatherDeceasedKey = `${type}FatherDeceased`
  const motherDeceasedKey = `${type}MotherDeceased`

  return (
    <Stack spacing={2.25}>
      <BasicInfoRow label={title}>
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          <CompactInput
            placeholder="성"
            value={wedding[lastKey] ?? name.last}
            onChange={(value) => onNameChange(type, lastKey, value)}
            sx={{ width: 88 }}
          />
          <CompactInput
            placeholder="이름"
            value={wedding[firstKey] ?? name.first}
            onChange={(value) => onNameChange(type, firstKey, value)}
            sx={{ width: 160 }}
          />
        </Stack>
        {error && <Alert severity="warning" sx={{ mt: 1 }}>{error}</Alert>}
      </BasicInfoRow>

      <ParentRow
        label="아버지"
        name={wedding[fatherKey] || ''}
        relation={wedding[fatherRelationKey] || ''}
        deceased={!!wedding[fatherDeceasedKey]}
        onNameChange={(value) => onChange({ [fatherKey]: value })}
        onRelationChange={(value) => onChange({ [fatherRelationKey]: value })}
        onDeceasedChange={(checked) => onChange({ [fatherDeceasedKey]: checked })}
      />
      <ParentRow
        label="어머니"
        name={wedding[motherKey] || ''}
        relation={wedding[motherRelationKey] || ''}
        deceased={!!wedding[motherDeceasedKey]}
        onNameChange={(value) => onChange({ [motherKey]: value })}
        onRelationChange={(value) => onChange({ [motherRelationKey]: value })}
        onDeceasedChange={(checked) => onChange({ [motherDeceasedKey]: checked })}
      />
    </Stack>
  )
}

function ParentRow({ label, name, relation, deceased, onNameChange, onRelationChange, onDeceasedChange }) {
  return (
    <BasicInfoRow label={label}>
      <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap alignItems="center">
        <CompactInput
          placeholder="성함"
          value={name}
          onChange={onNameChange}
          sx={{ width: { xs: '100%', sm: 260 } }}
        />
        <CompactInput
          placeholder="관계"
          value={relation}
          onChange={onRelationChange}
          sx={{ width: 140 }}
        />
        <SquareCheck checked={deceased} label="故" onChange={onDeceasedChange} />
      </Stack>
    </BasicInfoRow>
  )
}

function BasicInfoRow({ label, children }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems={{ md: 'center' }}>
      <Typography sx={{ width: { md: 100 }, flex: '0 0 auto', fontSize: 15, fontWeight: 700 }}>
        {label}
      </Typography>
      <Box sx={{ minWidth: 0, flex: 1 }}>{children}</Box>
    </Stack>
  )
}

function CompactInput({ value, placeholder, disabled = false, onChange = () => {}, sx }) {
  return (
    <TextField
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      sx={{
        ...inputSx,
        ...sx,
        '& .MuiInputBase-input': {
          py: 1.25,
          fontSize: 14.5,
          fontWeight: 600,
        },
      }}
    />
  )
}

function InputPanel({ title, defaultExpanded = false, children }) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const titleContent = typeof title === 'string'
    ? (
      <Typography sx={{ fontSize: { xs: 14.5, md: 15 }, fontWeight: 800, letterSpacing: '-0.01em' }}>
        {title}
      </Typography>
      )
    : title

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, nextExpanded) => setExpanded(nextExpanded)}
      disableGutters
      sx={panelSx}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon sx={{ fontSize: 20, color: '#111' }} />}
        sx={{
          minHeight: 48,
          px: { xs: 1.75, md: 2 },
          '&.Mui-expanded': { minHeight: 48 },
          '& .MuiAccordionSummary-content': { my: 0.85 },
          '& .MuiAccordionSummary-content.Mui-expanded': { my: 0.85 },
        }}
      >
        {titleContent}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: { xs: 1.75, md: 2 },
          pt: 1.5,
          pb: 1.75,
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

function splitKoreanName(value = '') {
  const trimmed = String(value || '').trim()
  if (!trimmed) return { last: '', first: '' }
  if (trimmed.includes(' ')) {
    const [last = '', ...rest] = trimmed.split(/\s+/)
    return { last, first: rest.join(' ') }
  }
  return { last: trimmed.slice(0, 1), first: trimmed.slice(1) }
}

function ImageSlot({ title, description, src, required = false, error, uploading, onUpload, onRemove }) {
  const inputId = `${title.replace(/\s+/g, '-')}-upload`
  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.4}>
        <Typography sx={{ fontSize: 15, fontWeight: 900 }}>
          {title}
          {required && <Box component="span" sx={{ color: palette.primary }}> *</Box>}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
        <Box
          component="label"
          htmlFor={inputId}
          sx={{
            width: 116,
            height: 116,
            borderRadius: `${radii.md}px`,
            border: src ? '1px solid rgba(0,0,0,0.08)' : '1px dashed rgba(0,0,0,0.34)',
            background: '#F4F4F4',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          {src ? (
            <Box component="img" src={src} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : uploading ? (
            <CircularProgress size={22} />
          ) : (
            <AddRoundedIcon sx={{ fontSize: 30, color: 'rgba(0,0,0,0.5)' }} />
          )}
          <input
            id={inputId}
            hidden
            accept="image/*"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (file) onUpload(file)
            }}
          />
        </Box>

        <Stack spacing={1} alignItems="flex-start">
          <PillButton component="label" htmlFor={inputId} variant="outline" size="small" startIcon={<UploadRoundedIcon />}>
            {src ? '사진 변경' : '사진 올리기'}
          </PillButton>
          {src && (
            <PillButton variant="ghost" size="small" onClick={onRemove}>
              삭제
            </PillButton>
          )}
        </Stack>
      </Stack>

      {error && <Alert severity="warning">{error}</Alert>}
    </Stack>
  )
}

function GalleryUploader({ gallery, uploading, onUpload, onRemove }) {
  const inputId = 'gallery-upload'
  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        여러 장의 사진을 올리면 청첩장 갤러리에 표시됩니다. 최대 12장까지 넣을 수 있어요.
      </Typography>
      <Grid container spacing={1.5}>
        {gallery.map((src, index) => (
          <Grid key={`${src.slice(0, 24)}-${index}`} item xs={4} sm={3}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: `${radii.md}px`,
                overflow: 'hidden',
                background: '#F4F4F4',
                aspectRatio: '1 / 1',
              }}
            >
              <Box component="img" src={src} alt={`갤러리 ${index + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <IconButton
                size="small"
                onClick={() => onRemove(index)}
                aria-label={`갤러리 사진 ${index + 1} 삭제`}
                sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  background: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  '&:hover': { background: 'rgba(0,0,0,0.75)' },
                }}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
        {gallery.length < 12 && (
          <Grid item xs={4} sm={3}>
            <Box
              component="label"
              htmlFor={inputId}
              sx={{
                aspectRatio: '1 / 1',
                borderRadius: `${radii.md}px`,
                border: '1px dashed rgba(0,0,0,0.34)',
                background: '#F4F4F4',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              {uploading ? <CircularProgress size={24} /> : <AddRoundedIcon sx={{ fontSize: 38, color: 'rgba(0,0,0,0.62)' }} />}
              <input
                id={inputId}
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(event) => {
                  onUpload(event.target.files)
                  event.target.value = ''
                }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Stack>
  )
}

function MainDesignPicker({ currentId, onChange, data }) {
  const [open, setOpen] = useState(false)
  const current = MAIN_LAYOUTS.find((l) => l.id === currentId) || MAIN_LAYOUTS[0]
  return (
    <>
      <Box
        sx={{
          background: '#F4F4F4',
          borderRadius: 2.5,
          p: { xs: 2, md: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1.75, md: 2 },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 260, md: 300 },
            maxWidth: 320,
            aspectRatio: '5 / 7',
            background: '#fff',
            borderRadius: 2,
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1.25, md: 1.5 },
          }}
        >
          <MainLayoutMiniature layout={current.id} data={data} scale={0.62} />
        </Box>
        <Box
          component="button"
          type="button"
          onClick={() => setOpen(true)}
          sx={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 999,
            px: { xs: 3, md: 3.5 },
            py: { xs: 1, md: 1.1 },
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: { xs: 13, md: 14 },
            color: '#2F2A24',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            '&:hover': { background: '#FBFAF8' },
          }}
        >
          디자인 선택
        </Box>
      </Box>
      <MainLayoutModal
        open={open}
        currentId={currentId}
        onClose={() => setOpen(false)}
        onApply={(id) => {
          onChange(id)
          setOpen(false)
        }}
        data={data}
      />
    </>
  )
}

function MainLayoutModal({ open, currentId, onClose, onApply, data }) {
  const [picked, setPicked] = useState(currentId)
  useEffect(() => {
    if (open) setPicked(currentId)
  }, [open, currentId])
  const catalogData = {
    ...(data || {}),
    themeOptions: {
      ...((data && data.themeOptions) || {}),
      photoFrame: 'default',
      mainEffect: 'none',
      photoBorder: false,
      photoExtended: false,
    },
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: '#fff',
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: '-0.01em',
          pt: 3,
        }}
      >
        메인 화면
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2.5, md: 4 }, pb: 1 }}>
        <Grid container spacing={2}>
          {MAIN_LAYOUTS.map((layout) => {
            const selected = picked === layout.id
            return (
              <Grid key={layout.id} item xs={6} sm={4} md={3}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => setPicked(layout.id)}
                  sx={{
                    width: '100%',
                    aspectRatio: '5 / 7',
                    border: selected
                      ? '2px solid #3F7BFE'
                      : '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 2,
                    background: '#FBFAF8',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    p: 1.5,
                    fontFamily: 'inherit',
                    transition: 'border 0.2s ease, transform 0.2s ease',
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}
                >
                  {selected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: '#3F7BFE',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                        zIndex: 2,
                      }}
                    >
                      ✓
                    </Box>
                  )}
                  <MainLayoutMiniature layout={layout.id} data={catalogData} />
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, md: 3 }, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 999,
            py: 1.4,
            color: '#2F2A24',
            borderColor: 'rgba(0,0,0,0.12)',
            fontWeight: 700,
            '&:hover': { borderColor: 'rgba(0,0,0,0.3)', background: 'transparent' },
          }}
        >
          닫기
        </Button>
        <Button
          onClick={() => onApply(picked)}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 999,
            py: 1.4,
            fontWeight: 800,
            background: palette.ctaGradient,
            color: '#fff',
            boxShadow: '0 8px 18px rgba(225, 29, 72, 0.18)',
            '&:hover': {
              background: palette.ctaGradient,
              boxShadow: '0 10px 24px rgba(225, 29, 72, 0.24)',
              opacity: 0.96,
            },
          }}
        >
          적용하기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function MainLayoutMiniature({ layout, data, scale }) {
  return <MainLayoutCanvas layoutId={layout} data={data} miniature miniatureScale={scale} />
}

export function MainLayoutCanvas({ layoutId, data, miniature = false, fullBleed = false, miniatureScale }) {
  const ctx = buildLayoutCtx(data, { miniature, miniatureScale })
  const fillMode = ctx.photoFrame === 'fill' && !miniature
  const cropCanvas = miniature || fillMode || fullBleed
  const naturalCanvas = !cropCanvas && !FIXED_CANVAS_LAYOUTS.has(layoutId)
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: naturalCanvas ? 'auto' : '5 / 7',
        height: miniature ? '100%' : 'auto',
        maxHeight: miniature ? '100%' : 'none',
        background: data?.themeOptions?.backgroundColor || '#fff',
        borderRadius: fullBleed ? 0 : miniature ? 1.5 : 2,
        display: 'flex',
        alignItems: cropCanvas || !naturalCanvas ? 'center' : 'stretch',
        justifyContent: cropCanvas || !naturalCanvas ? 'center' : 'flex-start',
        textAlign: 'center',
        overflow: naturalCanvas ? 'visible' : 'hidden',
        p: fillMode || fullBleed ? 0 : miniature ? 0.25 : 0.75,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: cropCanvas ? '100%' : naturalCanvas ? 'auto' : '100%',
          minHeight: naturalCanvas ? 'auto' : '100%',
          boxSizing: 'border-box',
          py: naturalCanvas ? 1.25 : cropCanvas ? 0 : 1.25,
          display: 'flex',
          alignItems: cropCanvas ? 'stretch' : !naturalCanvas ? 'center' : 'flex-start',
          justifyContent: 'center',
        }}
      >
        <MainLayoutRenderer layoutId={layoutId} ctx={ctx} miniature={miniature} />
      </Box>
    </Box>
  )
}

function buildLayoutCtx(data = {}, opts = {}) {
  const { miniature = false, miniatureScale } = opts
  const themeOptions = data.themeOptions || {}
  const accent = themeOptions.accentColor || '#F6B8BE'
  const fontMood = themeOptions.fontMood || 'elegant'
  const fontSize = themeOptions.fontSize || 'normal'
  const fontScale = FONT_SCALE[fontSize] ?? 1
  const baseMiniScale = miniatureScale ?? 0.31
  const canvasScale = miniature ? baseMiniScale * fontScale : fontScale
  const dateScale = miniature ? canvasScale : Math.min(canvasScale * 0.52, 0.62)
  const headingFont = HEADING_FONT_BY_MOOD[fontMood] || HEADING_FONT_BY_MOOD.elegant
  const bodyFont = FONT_FAMILY_BY_MOOD[fontMood] || FONT_FAMILY_BY_MOOD.elegant
  const dateObj = parseDateSafe(data.date, data.time)
  const yyyy = dateObj ? String(dateObj.getFullYear()) : 'YYYY'
  const mm = dateObj ? String(dateObj.getMonth() + 1).padStart(2, '0') : 'MM'
  const dd = dateObj ? String(dateObj.getDate()).padStart(2, '0') : 'DD'
  const defaultWeekday = dateObj ? WEEKDAYS_EN[dateObj.getDay()] : 'TUESDAY'
  const defaultKorean = dateObj
    ? formatKoreanFullDateTime(dateObj, !!data.time)
    : '2026년 5월 12일 화요일'
  const defaultGroom =
    data.groom?.trim() ||
    `${data.groomLastName || ''}${data.groomFirstName || ''}`.trim() ||
    '신랑'
  const defaultBride =
    data.bride?.trim() ||
    `${data.brideLastName || ''}${data.brideFirstName || ''}`.trim() ||
    '신부'

  const customWeekday =
    themeOptions.customWeekdayEnabled && (themeOptions.customWeekdayText || '').trim()
      ? themeOptions.customWeekdayText.trim()
      : null
  const customKorean =
    themeOptions.customGreetingEnabled && (themeOptions.customGreetingText || '').trim()
      ? themeOptions.customGreetingText
      : null
  const customNamesText =
    themeOptions.customNamesEnabled && (themeOptions.customNamesText || '').trim()
      ? themeOptions.customNamesText.trim()
      : null
  const customDateText =
    themeOptions.customDateEnabled && (themeOptions.customDateText || '').trim()
      ? themeOptions.customDateText.trim()
      : null

  let groom = defaultGroom
  let bride = defaultBride
  if (customNamesText) {
    const parts = customNamesText.split(/[·•&]|\sand\s/i).map((s) => s.trim()).filter(Boolean)
    if (parts.length >= 2) {
      groom = parts[0]
      bride = parts[1]
    } else {
      groom = customNamesText
      bride = ''
    }
  }

  return {
    miniature,
    accent,
    headingFont,
    bodyFont,
    yyyy,
    mm,
    dd,
    weekdayEn: customWeekday || defaultWeekday,
    koreanLine: customKorean || defaultKorean,
    groom,
    bride,
    dateText: customDateText || `${yyyy}.${mm}.${dd}`,
    namesText: customNamesText || `${defaultGroom} · ${defaultBride}`,
    coverImage: data.coverImage || '',
    fontScale,
    scale: canvasScale,
    dateScale,
    photoFrame: themeOptions.photoFrame || 'default',
    photoBorder: !!themeOptions.photoBorder,
    photoExtended: !!themeOptions.photoExtended,
    mainEffect: normalizeMainEffect(
      themeOptions.photoFrame || 'default',
      themeOptions.mainEffect || 'none',
    ),
  }
}

function MainLayoutRenderer({ layoutId, ctx, miniature = false }) {
  if (ctx.photoFrame === 'fill' && !miniature) {
    return <FilledHero ctx={ctx} />
  }
  switch (layoutId) {
    case 'polaroidLove':
      return <PolaroidLoveMain ctx={ctx} miniature={miniature} />
    case 'dashedFrame':
      return <DashedFrameMain ctx={ctx} miniature={miniature} />
    case 'saveTheDate':
      return <SaveTheDateMain ctx={ctx} miniature={miniature} />
    case 'gettingMarriedHero':
      return <GettingMarriedHeroMain ctx={ctx} miniature={miniature} />
    case 'dateOnTop':
      return <DateOnTopMain ctx={ctx} miniature={miniature} />
    case 'onePerfectDay':
      return <OnePerfectDayMain ctx={ctx} miniature={miniature} />
    case 'nowOfficial':
      return <NowOfficialMain ctx={ctx} miniature={miniature} />
    case 'betterTogether':
      return <BetterTogetherMain ctx={ctx} miniature={miniature} />
    case 'forever':
    default:
      return <ForeverMain ctx={ctx} miniature={miniature} />
  }
}

function applyPhotoFrameSx(frame, miniature, border = false, accent) {
  const frameSx = (() => {
    switch (frame) {
      case 'arch':
        return {
          borderTopLeftRadius: '50% 22%',
          borderTopRightRadius: '50% 22%',
        }
      case 'oval':
        return {
          borderRadius: '50%',
        }
      case 'frame':
        return {
          padding: miniature ? '3%' : '5%',
          background: '#fff',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 6px 16px rgba(0,0,0,0.06)',
        }
      default:
        return {}
    }
  })()
  if (border) {
    return {
      ...frameSx,
      outline: `1px solid ${accent || 'rgba(0,0,0,0.2)'}`,
      outlineOffset: miniature ? 2 : 4,
    }
  }
  return frameSx
}

function FilledHero({ ctx }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {ctx.coverImage ? (
        <Box
          component="img"
          src={ctx.coverImage}
          alt=""
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.08)',
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(0,0,0,0.4)',
            fontSize: 14,
          }}
        >
          photo
        </Box>
      )}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          py: 3,
          px: 2.5,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textShadow: '0 1px 3px rgba(0,0,0,0.45)',
          }}
        >
          {(ctx.groom || '').toUpperCase()}  &nbsp;·&nbsp;  {(ctx.bride || '').toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            color: 'rgba(255,255,255,0.92)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            mt: 0.6,
            textShadow: '0 1px 3px rgba(0,0,0,0.45)',
          }}
        >
          {ctx.yyyy}.{ctx.mm}.{ctx.dd} · {ctx.weekdayEn}
        </Typography>
      </Box>
    </Box>
  )
}


function ForeverMain({ ctx, miniature }) {
  const s = ctx.scale
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: miniature ? 1 : 1.5 }}>
      {ctx.coverImage && (
        <Box
          component="img"
          src={ctx.coverImage}
          alt=""
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <Box sx={{ position: 'relative', width: '100%', height: '100%', p: miniature ? 1 : 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <Typography
            sx={{
              fontFamily: ctx.headingFont,
              fontSize: 36 / 0.36 * s,
              fontWeight: 800,
              color: ctx.coverImage ? '#F8EE1F' : '#0A0A0A',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              textShadow: ctx.coverImage ? '0 2px 6px rgba(0,0,0,0.25)' : 'none',
            }}
          >
            for<br />ever.
          </Typography>
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ pt: 1 }}>
          <Typography sx={{ fontFamily: ctx.bodyFont, fontSize: 8 / 0.36 * s, fontWeight: 700, color: ctx.coverImage ? '#fff' : '#1a1a1a', textShadow: ctx.coverImage ? '0 1px 3px rgba(0,0,0,0.4)' : 'none' }}>
            {ctx.groom.toUpperCase()}
          </Typography>
          <Typography sx={{ fontFamily: ctx.bodyFont, fontSize: 8 / 0.36 * s, fontWeight: 700, color: ctx.coverImage ? '#fff' : '#1a1a1a', textShadow: ctx.coverImage ? '0 1px 3px rgba(0,0,0,0.4)' : 'none' }}>
            {ctx.bride.toUpperCase()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

function OnePerfectDayMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Stack alignItems="center" spacing={0} sx={{ position: 'absolute', top: miniature ? 6 : 14, left: 0, right: 0 }}>
        <Typography sx={{ fontFamily: ctx.bodyFont, fontSize: 6.5 / 0.36 * ds, color: '#2F2A24', letterSpacing: '0.02em', fontStyle: 'italic' }}>
          {ctx.groom}
        </Typography>
        <Typography sx={{ fontFamily: ctx.bodyFont, fontSize: 6.5 / 0.36 * ds, color: '#2F2A24', letterSpacing: '0.02em', fontStyle: 'italic' }}>
          &amp; {ctx.bride}
        </Typography>
      </Stack>
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: miniature ? 4 : 10,
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'left center',
          fontFamily: ctx.bodyFont,
          fontSize: 6 / 0.36 * ds,
          color: 'rgba(0,0,0,0.55)',
          letterSpacing: '0.18em',
          whiteSpace: 'nowrap',
        }}
      >
        Wedding Invitation
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          right: miniature ? 4 : 10,
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'right center',
          fontFamily: ctx.bodyFont,
          fontSize: 6 / 0.36 * ds,
          color: 'rgba(0,0,0,0.55)',
          letterSpacing: '0.18em',
          whiteSpace: 'nowrap',
        }}
      >
        {ctx.yyyy}.{ctx.mm}.{ctx.dd} · 12:30PM
      </Typography>
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: miniature ? '64%' : '70%', aspectRatio: '4 / 5.4', overflow: 'hidden', background: '#F0EDE7', position: 'relative', ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent) }}>
          {ctx.coverImage && (
            <Box component="img" src={ctx.coverImage} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...mainImageEffectSx(ctx.mainEffect, miniature) }} />
          )}
          <Stack alignItems="center" spacing={0} sx={{ position: 'absolute', bottom: '6%', left: 0, right: 0, zIndex: 1 }}>
            <Typography sx={{ fontFamily: ctx.headingFont, fontSize: 16 / 0.36 * s, color: 'rgba(40,40,40,0.78)', lineHeight: 1, fontWeight: 400, letterSpacing: '0.04em', mixBlendMode: 'multiply' }}>
              ONE
            </Typography>
            <Typography sx={{ fontFamily: ctx.headingFont, fontSize: 16 / 0.36 * s, color: 'rgba(40,40,40,0.78)', lineHeight: 1, fontWeight: 400, letterSpacing: '0.04em', mixBlendMode: 'multiply' }}>
              PERFECT
            </Typography>
            <Typography sx={{ fontFamily: ctx.headingFont, fontSize: 16 / 0.36 * s, color: 'rgba(40,40,40,0.78)', lineHeight: 1, fontWeight: 400, letterSpacing: '0.04em', mixBlendMode: 'multiply' }}>
              DAY
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Typography
        sx={{
          position: 'absolute',
          bottom: miniature ? 6 : 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 9 / 0.36 * ds,
          color: 'rgba(0,0,0,0.55)',
          lineHeight: 1,
        }}
      >
        *
      </Typography>
    </Box>
  )
}

function NowOfficialMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  const orange = '#E84A2A'
  const monthIdx = Math.max(0, Math.min(11, parseInt(ctx.mm, 10) - 1))
  const monthFull = MONTHS_EN_FULL[monthIdx] || 'OCTOBER'
  const monthLabel = monthFull.charAt(0) + monthFull.slice(1).toLowerCase()
  const weekday = ctx.weekdayEn || 'SATURDAY'
  const weekdayLabel = weekday.charAt(0) + weekday.slice(1).toLowerCase()
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        py: miniature ? 0.8 : 2,
        px: miniature ? 1 : 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          flex: 1,
          overflow: 'hidden',
          borderRadius: miniature ? 0.5 : 1,
          background: '#DDD',
          ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent),
        }}
      >
        {ctx.coverImage ? (
          <Box
            component="img"
            src={ctx.coverImage}
            alt=""
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: '#E5E1DC',
              display: 'grid',
              placeItems: 'center',
              color: 'rgba(0,0,0,0.3)',
              fontSize: 9 / 0.36 * s,
            }}
          >
            photo
          </Box>
        )}
        <Typography
          sx={{
            position: 'absolute',
            top: miniature ? 6 : 14,
            right: miniature ? 8 : 18,
            fontSize: 16 / 0.36 * s,
            color: orange,
            lineHeight: 1,
            transform: 'rotate(12deg)',
          }}
        >
          ✶
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: miniature ? 6 : 14,
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: ctx.headingFont,
              fontSize: 26 / 0.36 * s,
              fontWeight: 900,
              color: orange,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.18)',
            }}
          >
            NOW
          </Typography>
          <Typography
            sx={{
              fontFamily: ctx.headingFont,
              fontSize: 26 / 0.36 * s,
              fontWeight: 900,
              color: orange,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.18)',
            }}
          >
            OFFICIAL
          </Typography>
        </Box>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: miniature ? 0.6 : 1.4, width: '100%' }}
      >
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 7 / 0.36 * ds,
            color: '#1A1A1A',
            fontWeight: 700,
          }}
        >
          {ctx.dd}th {monthLabel} {ctx.yyyy}
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 7 / 0.36 * ds,
            color: '#1A1A1A',
            fontWeight: 700,
          }}
        >
          {weekdayLabel} 12:30 PM
        </Typography>
      </Stack>
    </Box>
  )
}

function BetterTogetherMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  const green = '#5C7E3E'
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: miniature ? 1 : 2.4,
        px: miniature ? 1 : 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
        spacing={miniature ? 0.5 : 1.2}
        sx={{ width: '100%' }}
      >
        <Stack alignItems="flex-start">
          <Typography
            sx={{
              fontFamily: ctx.headingFont,
              fontSize: 18 / 0.36 * s,
              fontStyle: 'italic',
              fontWeight: 700,
              color: green,
              lineHeight: 0.96,
            }}
          >
            Better
          </Typography>
          <Typography
            sx={{
              fontFamily: ctx.headingFont,
              fontSize: 18 / 0.36 * s,
              fontStyle: 'italic',
              fontWeight: 700,
              color: green,
              lineHeight: 1.02,
            }}
          >
            Together
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
            fontSize: 7 / 0.36 * s,
            color: green,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            transform: miniature ? 'translateY(-3px)' : 'translateY(-8px)',
          }}
        >
          Save the date
        </Typography>
      </Stack>
      <Box sx={{ position: 'relative', width: '70%', mt: miniature ? 0.6 : 1.8, mb: miniature ? 0.4 : 1.4 }}>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '100 / 130',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: '6%',
              overflow: 'hidden',
              background: '#F0EDE7',
              ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent),
            }}
          >
            {ctx.coverImage ? (
              <Box
                component="img"
                src={ctx.coverImage}
                alt=""
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <Box sx={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'rgba(0,0,0,0.3)', fontSize: 9 / 0.36 * s }}>
                photo
              </Box>
            )}
          </Box>
          <Box
            component="svg"
            viewBox="0 0 100 130"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <path
              d="M 12 10 Q 22 -2 50 6 Q 78 -2 90 14 Q 100 32 94 60 Q 100 92 86 116 Q 70 132 50 124 Q 26 132 12 116 Q 0 92 6 60 Q 0 32 12 10 Z"
              fill="none"
              stroke={green}
              strokeWidth="0.9"
            />
          </Box>
        </Box>
      </Box>
      <Stack alignItems="center" spacing={miniature ? 0.15 : 0.4} sx={{ mt: miniature ? 0.3 : 0.8 }}>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 6.5 / 0.36 * ds,
            color: green,
            letterSpacing: '0.04em',
            fontWeight: 600,
          }}
        >
          Wedding Invitation
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 7 / 0.36 * ds,
            color: green,
            fontWeight: 700,
          }}
        >
          {ctx.groom} &amp; {ctx.bride}
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 6.5 / 0.36 * ds,
            color: green,
            whiteSpace: 'nowrap',
          }}
        >
          {ctx.yyyy}.{ctx.mm}.{ctx.dd} 12:30P.M.
        </Typography>
      </Stack>
    </Box>
  )
}

function PolaroidLoveMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  const monthIdx = Math.max(0, Math.min(11, parseInt(ctx.mm, 10) - 1))
  const monthFull = MONTHS_EN_FULL[monthIdx] || 'OCTOBER'
  const weekShort = (ctx.weekdayEn || 'SAT').slice(0, 3)
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: miniature ? 1 : 2.5,
        px: miniature ? 1 : 2,
      }}
    >
      <Box sx={{ position: 'relative', width: '88%', mt: miniature ? 0.4 : 1.2 }}>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '4 / 5',
            overflow: 'hidden',
            background: '#E8E5DE',
            position: 'relative',
            borderRadius: 0.5,
            ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent),
          }}
        >
          {ctx.coverImage ? (
            <Box component="img" src={ctx.coverImage} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...mainImageEffectSx(ctx.mainEffect, miniature) }} />
          ) : (
            <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(0,0,0,0.3)', fontSize: 9 / 0.36 * s }}>
              photo
            </Box>
          )}
        </Box>
        <Typography
          sx={{
            position: 'absolute',
            top: miniature ? '-4%' : '-6%',
            right: miniature ? '-6%' : '-10%',
            fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
            fontSize: 11 / 0.36 * s,
            color: '#1A1A1A',
            lineHeight: 1.05,
            transform: 'rotate(-10deg)',
            textAlign: 'right',
          }}
        >
          Join us
          <br />
          for love
        </Typography>
      </Box>
      <Stack alignItems="center" spacing={miniature ? 0.2 : 0.5} sx={{ mt: miniature ? 0.8 : 2 }}>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 8 / 0.36 * s,
            color: '#1A1A1A',
            fontWeight: 700,
            letterSpacing: '0.18em',
          }}
        >
          {ctx.groom.toUpperCase()} &nbsp;&amp;&nbsp; {ctx.bride.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 6.5 / 0.36 * ds,
            color: 'rgba(0,0,0,0.78)',
            letterSpacing: '0.08em',
          }}
        >
          {ctx.yyyy} {monthFull} {ctx.dd}, {weekShort} 12:30PM
        </Typography>
        <Typography sx={{ fontSize: 8 / 0.36 * ds, color: '#1A1A1A', lineHeight: 1, mt: miniature ? 0.2 : 0.6 }}>✦</Typography>
      </Stack>
    </Box>
  )
}

function DashedFrameMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  const yy = (ctx.yyyy || '2026').slice(2, 4)
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: miniature ? 1 : 2.5,
        px: miniature ? 1 : 2,
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ width: '100%', mb: miniature ? 0.6 : 1.5 }}>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 8 / 0.36 * s,
            color: '#1A1A1A',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {yy}.{ctx.mm}.{ctx.dd}
        </Typography>
        <Box sx={{ flex: 1, mx: miniature ? 0.5 : 1.2, borderTop: '1px solid rgba(0,0,0,0.65)' }} />
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 8 / 0.36 * s,
            color: '#1A1A1A',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          12:30 PM
        </Typography>
      </Stack>
      <Box
        sx={{
          width: '92%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          borderTopLeftRadius: '50% 22%',
          borderTopRightRadius: '50% 22%',
          background: '#E8E5DE',
          position: 'relative',
          ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent),
        }}
      >
        {ctx.coverImage ? (
          <Box component="img" src={ctx.coverImage} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...mainImageEffectSx(ctx.mainEffect, miniature) }} />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(0,0,0,0.3)', fontSize: 9 / 0.36 * s }}>
            photo
          </Box>
        )}
      </Box>
      <Stack direction="row" alignItems="center" sx={{ width: '100%', mt: miniature ? 0.6 : 1.4 }}>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 9 / 0.36 * s,
            color: '#1A1A1A',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {ctx.groom}
        </Typography>
        <Box sx={{ flex: 1, mx: miniature ? 0.5 : 1.2, borderTop: '1px solid rgba(0,0,0,0.5)' }} />
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 9 / 0.36 * s,
            color: '#1A1A1A',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {ctx.bride}
        </Typography>
      </Stack>
      <Typography
        sx={{
          fontFamily: ctx.bodyFont,
          fontSize: 6.5 / 0.36 * ds,
          color: 'rgba(0,0,0,0.78)',
          mt: miniature ? 0.3 : 0.8,
          textAlign: 'center',
        }}
      >
        더채플앳청담, 커티지움, 3층
      </Typography>
      <Typography
        sx={{
          fontFamily: ctx.bodyFont,
          fontSize: 5.5 / 0.36 * ds,
          color: 'rgba(0,0,0,0.55)',
          mt: 0.2,
          textAlign: 'center',
        }}
      >
        서울 강남구 선릉로 757
      </Typography>
    </Box>
  )
}

function SaveTheDateMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  const blue = '#2A4FBE'
  const monthIdx = Math.max(0, Math.min(11, parseInt(ctx.mm, 10) - 1))
  const monthFull = MONTHS_EN_FULL[monthIdx] || 'OCTOBER'
  const monthLabel = monthFull.charAt(0) + monthFull.slice(1).toLowerCase()
  const weekFull = ctx.weekdayEn || 'SATURDAY'
  const weekLabel = weekFull.charAt(0) + weekFull.slice(1).toLowerCase()
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', py: miniature ? 1 : 2.5, px: miniature ? 1 : 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={miniature ? 0.4 : 1}
        sx={{ width: '100%' }}
      >
        <Typography
          sx={{
            fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
            fontSize: 12 / 0.36 * s,
            color: blue,
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {ctx.groom}
        </Typography>
        <Typography sx={{ fontSize: 9 / 0.36 * s, color: blue, lineHeight: 1 }}>♥</Typography>
        <Typography
          sx={{
            fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
            fontSize: 12 / 0.36 * s,
            color: blue,
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {ctx.bride}
        </Typography>
      </Stack>
      <Box
        sx={{
          position: 'relative',
          width: miniature ? '64%' : '70%',
          aspectRatio: '4 / 5',
          mx: 'auto',
          mt: miniature ? 0.8 : 1.8,
          background: '#E8E5DE',
          overflow: 'hidden',
          ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent),
        }}
      >
        {ctx.coverImage ? (
          <Box component="img" src={ctx.coverImage} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...mainImageEffectSx(ctx.mainEffect, miniature) }} />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(0,0,0,0.3)', fontSize: 9 / 0.36 * s }}>
            photo
          </Box>
        )}
      </Box>
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: miniature ? 6 : 14,
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'left center',
          fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
          fontSize: 11 / 0.36 * ds,
          color: blue,
          fontStyle: 'italic',
          whiteSpace: 'nowrap',
        }}
      >
        Save the date!
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          right: miniature ? 6 : 14,
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'right center',
          fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
          fontSize: 10 / 0.36 * ds,
          color: blue,
          fontStyle: 'italic',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          lineHeight: 1.15,
        }}
      >
        {monthLabel} {ctx.dd}, {ctx.yyyy} · {weekLabel}, PM 12:30
      </Typography>
    </Box>
  )
}

function GettingMarriedHeroMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  const monthIdx = Math.max(0, Math.min(11, parseInt(ctx.mm, 10) - 1))
  const monthShort = MONTHS_EN_SHORT[monthIdx] || 'OCT'
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {ctx.coverImage ? (
        <Box component="img" src={ctx.coverImage} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...mainImageEffectSx(ctx.mainEffect, miniature) }} />
      ) : (
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #C7A06C 0%, #4A2E1D 100%)' }} />
      )}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      <Typography
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: miniature ? '14%' : '16%',
          textAlign: 'center',
          fontFamily: '"Pinyon Script", "Cormorant Garamond", cursive',
          fontSize: 28 / 0.36 * s,
          color: '#fff',
          lineHeight: 0.95,
          fontStyle: 'italic',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        Getting
        <br />
        Married
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: 'absolute',
          left: miniature ? 12 : 24,
          right: miniature ? 12 : 24,
          bottom: miniature ? 8 : 18,
        }}
      >
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 7 / 0.36 * ds,
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {ctx.dd}TH
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 7 / 0.36 * ds,
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {monthShort}
        </Typography>
        <Typography
          sx={{
            fontFamily: ctx.bodyFont,
            fontSize: 7 / 0.36 * ds,
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {ctx.yyyy}
        </Typography>
      </Stack>
    </Box>
  )
}

function DateOnTopMain({ ctx, miniature }) {
  const s = ctx.scale
  const ds = ctx.dateScale
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: miniature ? 1 : 2.5,
        px: miniature ? 1 : 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: ctx.headingFont,
          fontSize: 13 / 0.36 * s,
          color: '#1A1A1A',
          fontWeight: 500,
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        {ctx.yyyy} / {ctx.mm} / {ctx.dd}
      </Typography>
      <Typography
        sx={{
          fontFamily: ctx.bodyFont,
          fontSize: 6.5 / 0.36 * ds,
          color: 'rgba(0,0,0,0.65)',
          letterSpacing: '0.42em',
          mt: miniature ? 0.2 : 0.5,
          whiteSpace: 'nowrap',
        }}
      >
        {ctx.weekdayEn}
      </Typography>
      <Box
        sx={{
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          background: '#E8E5DE',
          position: 'relative',
          mt: miniature ? 0.8 : 1.8,
          borderRadius: 0.5,
          ...applyPhotoFrameSx(ctx.photoFrame, miniature, ctx.photoBorder, ctx.accent),
        }}
      >
        {ctx.coverImage ? (
          <Box component="img" src={ctx.coverImage} alt="" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...mainImageEffectSx(ctx.mainEffect, miniature) }} />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(0,0,0,0.3)', fontSize: 9 / 0.36 * s }}>
            photo
          </Box>
        )}
      </Box>
    </Box>
  )
}

function CoverArea({ ctx, miniature }) {
  const s = ctx.scale
  const frame = ctx.photoFrame || 'default'
  const border = !!ctx.photoBorder
  const extended = !!ctx.photoExtended
  const effect = ctx.mainEffect || 'none'

  const frameWidth = {
    default: miniature ? '58%' : '92%',
    fill: miniature ? '68%' : '96%',
    arch: miniature ? '60%' : '90%',
    oval: miniature ? '60%' : '88%',
    frame: miniature ? '60%' : '88%',
  }[frame] || (miniature ? '64%' : '84%')

  const baseWidth = extended
    ? (miniature ? '80%' : '98%')
    : frameWidth

  // 프레임별 스타일
  const frameSx = (() => {
    const radius = miniature ? 1 : 2
    if (frame === 'oval') {
      return { borderRadius: '50%' }
    }
    if (frame === 'arch') {
      return {
        borderTopLeftRadius: '50% 28%',
        borderTopRightRadius: '50% 28%',
        borderBottomLeftRadius: radius * 4,
        borderBottomRightRadius: radius * 4,
      }
    }
    if (frame === 'frame') {
      return {
        borderRadius: radius * 2,
        padding: miniature ? 0.5 : 1,
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.10), 0 6px 16px rgba(0,0,0,0.06)',
      }
    }
    if (frame === 'fill') {
      return { borderRadius: 0 }
    }
    return { borderRadius: radius * 2 }
  })()

  const borderSx = border
    ? { outline: `1px solid ${ctx.accent || 'rgba(0,0,0,0.18)'}`, outlineOffset: miniature ? 2 : 4 }
    : null

  const aspect = frame === 'fill' ? '4 / 5' : frame === 'oval' ? '1 / 1.18' : '4 / 5'

  const inner = ctx.coverImage ? (
    <Box
      component="img"
      src={ctx.coverImage}
      alt="cover"
      sx={{
        width: '100%',
        height: '100%',
        objectFit: frame === 'default' && !extended ? 'contain' : 'cover',
        background: '#F7F5F1',
        display: 'block',
        borderRadius: frame === 'frame' ? '4px' : 'inherit',
        ...mainImageEffectSx(effect, miniature),
      }}
    />
  ) : (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.05)',
        display: 'grid',
        placeItems: 'center',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 9 / 0.36 * s,
        borderRadius: 'inherit',
      }}
    >
      photo
    </Box>
  )

  return (
    <Box
      sx={{
        position: 'relative',
        width: baseWidth,
        aspectRatio: aspect,
        overflow: frame === 'frame' ? 'visible' : 'hidden',
        ...frameSx,
        ...(borderSx || {}),
      }}
    >
      {inner}
      <EffectOverlay effect={effect} />
    </Box>
  )
}

function mainImageEffectSx(effect, miniature) {
  if (effect === 'wave') {
    return {
      transform: 'scale(1.035)',
      transformOrigin: '50% 50%',
      animation: miniature ? 'none' : 'oz-main-image-wave 2.8s ease-in-out infinite alternate',
      '@keyframes oz-main-image-wave': {
        from: { transform: 'translateY(-4px) scale(1.035)' },
        to: { transform: 'translateY(5px) scale(1.045)' },
      },
    }
  }

  if (effect === 'paper') {
    const paperMask =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path fill='black' d='M4 3 L12 1 L21 3 L31 1 L40 4 L49 2 L59 4 L69 2 L79 4 L89 1 L97 5 L99 15 L96 25 L99 35 L96 45 L99 55 L96 66 L99 77 L96 88 L98 96 L88 98 L78 96 L67 99 L57 96 L47 99 L36 96 L25 99 L15 96 L4 98 L2 87 L5 76 L1 65 L4 54 L1 43 L5 32 L2 22 L5 12 Z'/></svg>\")"
    return {
      WebkitMaskImage: paperMask,
      maskImage: paperMask,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
    }
  }

  return null
}

function EffectOverlay({ effect }) {
  if (!effect || effect === 'none') return null
  if (effect === 'fog') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: [
            'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.20) 18%, rgba(255,255,255,0) 42%)',
            'linear-gradient(0deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.20) 18%, rgba(255,255,255,0) 42%)',
            'linear-gradient(90deg, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0) 22%)',
            'linear-gradient(270deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0) 20%)',
          ].join(', '),
          backdropFilter: 'blur(0.6px)',
          WebkitBackdropFilter: 'blur(0.6px)',
          pointerEvents: 'none',
        }}
      />
    )
  }
  if (effect === 'wave') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.18) 5px, rgba(255,255,255,0) 13px)',
          backgroundSize: '100% 34px',
          mixBlendMode: 'soft-light',
          opacity: 0.72,
          animation: 'oz-main-wave-lines 2.8s ease-in-out infinite alternate',
          '@keyframes oz-main-wave-lines': {
            from: { backgroundPosition: '0 -12px', transform: 'translateY(-2px)' },
            to: { backgroundPosition: '0 16px', transform: 'translateY(3px)' },
          },
          pointerEvents: 'none',
        }}
      />
    )
  }
  if (effect === 'paper') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: -2,
          background: [
            'radial-gradient(circle at 3% 7%, #fff 0 9px, transparent 10px)',
            'radial-gradient(circle at 13% 1%, #fff 0 7px, transparent 8px)',
            'radial-gradient(circle at 27% 4%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 44% 1%, #fff 0 7px, transparent 8px)',
            'radial-gradient(circle at 62% 4%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 84% 2%, #fff 0 9px, transparent 10px)',
            'radial-gradient(circle at 98% 13%, #fff 0 9px, transparent 10px)',
            'radial-gradient(circle at 99% 34%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 97% 58%, #fff 0 9px, transparent 10px)',
            'radial-gradient(circle at 99% 82%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 88% 99%, #fff 0 10px, transparent 11px)',
            'radial-gradient(circle at 66% 97%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 43% 99%, #fff 0 9px, transparent 10px)',
            'radial-gradient(circle at 20% 97%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 2% 87%, #fff 0 9px, transparent 10px)',
            'radial-gradient(circle at 1% 61%, #fff 0 8px, transparent 9px)',
            'radial-gradient(circle at 3% 34%, #fff 0 9px, transparent 10px)',
          ].join(', '),
          pointerEvents: 'none',
        }}
      />
    )
  }
  return null
}

function CustomMainTextBlock({ enabled, onToggle, wedding, themeOptions = {}, setTheme }) {
  const [open, setOpen] = useState(false)
  const dateObj = parseDateSafe(wedding.date, wedding.time)
  const dateLine = dateObj
    ? formatKoreanFullDateTime(dateObj, !!wedding.time)
    : '예식 날짜와 시간을 입력해 주세요.'
  const groomName =
    wedding.groom?.trim() ||
    `${wedding.groomLastName || ''}${wedding.groomFirstName || ''}`.trim() ||
    '신랑'
  const brideName =
    wedding.bride?.trim() ||
    `${wedding.brideLastName || ''}${wedding.brideFirstName || ''}`.trim() ||
    '신부'
  const defaultDate = dateObj
    ? `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`
    : '0000.00.00'
  const defaultWeekday = dateObj ? WEEKDAYS_EN[dateObj.getDay()] : 'SUNDAY'
  const defaultNames = `${groomName} · ${brideName}`
  const defaultGreeting = `${dateLine}${wedding.venue ? `\n${wedding.venue}${wedding.address ? ` ${wedding.address}` : ''}` : ''}`

  return (
    <Stack spacing={1}>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        sx={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>
          문구
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'rgba(0,0,0,0.7)' }}>
          메인화면 문구 커스텀
        </Typography>
        <Box
          component="span"
          sx={{
            ml: 'auto',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
            color: 'rgba(0,0,0,0.5)',
            fontSize: 16,
          }}
        >
          ⌃
        </Box>
      </Box>

      {open && (
        <Stack spacing={1.25} sx={{ pt: 0.5 }}>
          <CustomTextRow
            checked={!!themeOptions.customDateEnabled}
            onCheckedChange={(v) => setTheme && setTheme('customDateEnabled', v)}
            value={themeOptions.customDateText ?? ''}
            onValueChange={(v) => setTheme && setTheme('customDateText', v)}
            placeholder={defaultDate}
          />
          <CustomTextRow
            checked={!!themeOptions.customWeekdayEnabled}
            onCheckedChange={(v) => setTheme && setTheme('customWeekdayEnabled', v)}
            value={themeOptions.customWeekdayText ?? ''}
            onValueChange={(v) => setTheme && setTheme('customWeekdayText', v)}
            placeholder={defaultWeekday}
          />
          <CustomTextRow
            checked={!!themeOptions.customNamesEnabled}
            onCheckedChange={(v) => setTheme && setTheme('customNamesEnabled', v)}
            value={themeOptions.customNamesText ?? ''}
            onValueChange={(v) => setTheme && setTheme('customNamesText', v)}
            placeholder={defaultNames}
          />
          <CustomTextRow
            checked={!!themeOptions.customGreetingEnabled}
            onCheckedChange={(v) => setTheme && setTheme('customGreetingEnabled', v)}
            value={themeOptions.customGreetingText ?? ''}
            onValueChange={(v) => setTheme && setTheme('customGreetingText', v)}
            placeholder={defaultGreeting}
            multiline
          />
          <Stack spacing={0.5} sx={{ pt: 1 }}>
            <Typography sx={{ fontSize: 12.5, color: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box component="span" sx={{ fontSize: 14 }}>ⓘ</Box>
              체크박스를 켜면 메인 화면의 해당 문구를 직접 입력할 수 있어요.
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box component="span" sx={{ fontSize: 14 }}>ⓘ</Box>
              입력을 비우면 기본 문구가 사용되고, 체크박스를 해제하면 영역이 사라집니다.
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

function CustomTextRow({ checked, onCheckedChange, value, onValueChange, placeholder, multiline = false }) {
  return (
    <Stack direction="row" spacing={1} alignItems={multiline ? 'flex-start' : 'center'}>
      <Box sx={{ pt: multiline ? 0.6 : 0 }}>
        <SquareCheck checked={checked} label="" onChange={(v) => onCheckedChange(v)} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <TextField
          fullWidth
          size="small"
          multiline={multiline}
          minRows={multiline ? 2 : 1}
          disabled={!checked}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          sx={{
            '& .MuiOutlinedInput-root': {
              background: checked ? '#fff' : '#F4F4F4',
              borderRadius: 1.5,
              fontSize: 13.5,
              '& fieldset': {
                borderColor: checked ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.08)',
              },
              '&:hover fieldset': {
                borderColor: checked ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.08)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#111',
              },
            },
            '& .MuiOutlinedInput-input': {
              py: 1.1,
              px: 1.4,
            },
          }}
        />
      </Box>
    </Stack>
  )
}

const GREETING_SAMPLES = [
  `저희 두 사람의 작은 만남이
사랑의 결실을 이루어
소중한 결혼식을 올리게 되었습니다.

평생 서로 귀하게 여기며
첫 마음 그대로 존중하고 배려하며 살겠습니다.

오로지 믿음과 사랑을 약속하는 날
오셔서 축복해 주시면 더 없는 기쁨으로
간직하겠습니다.`,
  `서로에게 행복을 주는 사람을 만났습니다.
웃는 모습이 너무나 예쁜 그 사람을 만났습니다.
배려하는 마음이 따뜻한 그 사람을 만났습니다.

운명처럼 만나게 된 우리의 인연
그 인연에 이끌려 이제 영원을
함께 약속하려 합니다.

저희의 하나 됨을 지켜보아 주시고
격려해 주시면 더없는 기쁨으로
간직하겠습니다.`,
  `오랜 기다림 속에서
저희 두사람, 한 마음 되어
참된 사랑의 결실을 맺게 되었습니다.

10월의 어느 햇살 고운 날,
귀한 걸음 하시어 따뜻한 마음으로
축복해 주시면 더 없는 기쁨이 되겠습니다.`,
  `저절로 웃음이 났다.
웃는 남자를 보고 여자도 웃었다.
마음에 꽃이 피는 것 같았다.
정말로 봄이었다.

정현주 < 다시, 사랑 > 중에서

둘이 함께 맞이하는 0 번째 봄,
저희 두 사람 결혼합니다.
앞으로 맞이할 저희의 봄날을 축복해주세요.`,
  `함께 있을 때 가장 나다운 모습이 되고
함께 있을 때 미래를 꿈꾸게 하는 사람을 만나
함께 맞는 0 번째 봄, 결혼합니다.

지금처럼 서로에게 가장 친한 친구가 되어
예쁘고 행복하게 잘 살겠습니다.

저희 두 사람의 새로운 시작을
함께하시어 축복해 주시면 감사하겠습니다.`,
  `풀들이 향기를 가득 머금은 계절,
사랑으로 하나 되어
한길을 걸어가고자 합니다.

그 시작의 첫걸음에 함께 하시어
축복으로 가득 채워주십시오.

더없는 기쁨으로
깊이 간직하며 살겠습니다.`,
  `햇살처럼 따뜻하게 안아줄 수 있는
늘 곁에서 서로를 웃게 해줄 수 있는
소중한 사람을 만났습니다.

햇살가득한 00월
결혼합니다.

기쁜 날, 가까이서 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`,
]

function GreetingPanel({ wedding, onTitleChange, onContentChange, onApplySample, onPatchWedding, error, inputSx, uploadingKey, uploadSingle }) {
  const [open, setOpen] = useState(false)
  return (
    <Stack spacing={2.25}>
      <FormField
        label="제목"
        value={wedding.greetingTitle || '소중한 분들을 초대합니다'}
        onChange={onTitleChange}
        sx={inputSx}
      />
      <Stack spacing={0.75}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', minWidth: 32 }}>
            내용
            <Box component="span" sx={{ color: '#E11D48', ml: 0.25 }}>*</Box>
          </Typography>
          <Box
            component="button"
            type="button"
            onClick={() => setOpen(true)}
            sx={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              color: '#E11D48',
              fontFamily: 'inherit',
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              cursor: 'pointer',
              '&:hover': { color: '#9F1239' },
            }}
          >
            샘플 문구 보기
          </Box>
        </Stack>
        <FormField
          label=""
          required
          multiline
          rows={9}
          placeholder={'저희 두 사람의 작은 만남이\n사랑의 결실을 이루어\n소중한 결혼식을 올리게 되었습니다.'}
          value={wedding.greeting || ''}
          onChange={onContentChange}
          error={error}
          sx={inputSx}
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', minWidth: 48, pt: 0.8 }}>
          사진
        </Typography>
        <Box
          component="label"
          htmlFor="greeting-photo-upload"
          sx={{
            position: 'relative',
            width: 116,
            height: 116,
            borderRadius: `${radii.md}px`,
            border: wedding.greetingImage
              ? '1px solid rgba(0,0,0,0.08)'
              : '1px dashed rgba(0,0,0,0.34)',
            background: '#F4F4F4',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {wedding.greetingImage ? (
            <>
              <Box
                component="img"
                src={wedding.greetingImage}
                alt="인사말 사진"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault()
                  onPatchWedding({ greetingImage: '' })
                }}
                aria-label="인사말 사진 삭제"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 22,
                  height: 22,
                  background: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  '&:hover': { background: 'rgba(0,0,0,0.75)' },
                }}
              >
                <Box component="span" sx={{ fontSize: 12, lineHeight: 1 }}>×</Box>
              </IconButton>
            </>
          ) : uploadingKey === 'greetingImage' ? (
            <CircularProgress size={22} />
          ) : (
            <AddRoundedIcon sx={{ fontSize: 30, color: 'rgba(0,0,0,0.5)' }} />
          )}
          <input
            id="greeting-photo-upload"
            hidden
            accept="image/*"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (file) uploadSingle('greetingImage', file)
            }}
          />
        </Box>
      </Stack>
      <NameDisplayOptions wedding={wedding} onPatchWedding={onPatchWedding} />
      <GreetingSamplesDialog
        open={open}
        onClose={() => setOpen(false)}
        currentText={wedding.greeting || ''}
        onApply={(text) => {
          onApplySample(text)
          setOpen(false)
        }}
      />
    </Stack>
  )
}

function NameDisplayOptions({ wedding, onPatchWedding }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', minWidth: 48, pt: 0.4 }}>
        성함 표기
      </Typography>
      <Stack spacing={1}>
        <SquareCheck
          checked={wedding.greetingShowNames !== false}
          onChange={(v) => onPatchWedding({ greetingShowNames: v })}
          label="인사말 하단에 신랑신부&혼주 성함 표시"
        />
        <SquareCheck
          checked={wedding.greetingAlignItems !== false}
          onChange={(v) => onPatchWedding({ greetingAlignItems: v })}
          label="각 항목 정렬"
        />
        <SquareCheck
          checked={!!wedding.greetingFreeNames}
          onChange={(v) => onPatchWedding({ greetingFreeNames: v })}
          label="성함 자유 입력"
        />
      </Stack>
    </Stack>
  )
}

function GreetingSamplesDialog({ open, onClose, currentText, onApply }) {
  const initialIndex = (() => {
    const idx = GREETING_SAMPLES.findIndex((s) => s.trim() === (currentText || '').trim())
    return idx >= 0 ? idx : 0
  })()
  const [picked, setPicked] = useState(initialIndex)
  useEffect(() => {
    if (open) {
      const idx = GREETING_SAMPLES.findIndex((s) => s.trim() === (currentText || '').trim())
      setPicked(idx >= 0 ? idx : 0)
    }
  }, [open, currentText])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: '20px', background: '#fff' } }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 800, fontSize: 18, pt: 3, pb: 1 }}>
        인사말 샘플
      </DialogTitle>
      <Typography sx={{ textAlign: 'center', fontSize: 13.5, color: 'rgba(0,0,0,0.65)', px: 3, pb: 1.5, lineHeight: 1.55 }}>
        원하는 항목 선택 후 &lsquo;샘플 적용하기&rsquo; 버튼 클릭 시
        <br />
        샘플 인사말 내용이 적용됩니다.
      </Typography>
      <DialogContent sx={{ px: 2, pb: 1 }}>
        <Stack spacing={1.5}>
          {GREETING_SAMPLES.map((text, idx) => {
            const selected = picked === idx
            return (
              <Box
                key={idx}
                component="button"
                type="button"
                onClick={() => setPicked(idx)}
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  background: selected ? '#EEF2FF' : '#FAFAFA',
                  border: selected ? '2px solid #3F7BFE' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 2,
                  fontSize: 13.5,
                  fontFamily: 'inherit',
                  color: 'rgba(0,0,0,0.72)',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.75,
                  cursor: 'pointer',
                  transition: 'background 0.18s ease, border 0.18s ease',
                  '&:hover': { background: selected ? '#EEF2FF' : '#F4F4F4' },
                }}
              >
                {selected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#3F7BFE',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </Box>
                )}
                {text}
              </Box>
            )
          })}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, md: 3 }, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 999,
            py: 1.4,
            color: '#2F2A24',
            borderColor: 'rgba(0,0,0,0.12)',
            fontWeight: 700,
            '&:hover': { borderColor: 'rgba(0,0,0,0.3)', background: 'transparent' },
          }}
        >
          닫기
        </Button>
        <Button
          onClick={() => onApply(GREETING_SAMPLES[picked])}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 999,
            py: 1.4,
            fontWeight: 800,
            background: palette.ctaGradient,
            color: '#fff',
            boxShadow: '0 8px 18px rgba(225, 29, 72, 0.18)',
            '&:hover': {
              background: palette.ctaGradient,
              boxShadow: '0 10px 24px rgba(225, 29, 72, 0.24)',
              opacity: 0.96,
            },
          }}
        >
          샘플 적용하기
        </Button>
      </DialogActions>
    </Dialog>
  )
}
