import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { palette, fontFamily, radii, shadows } from "../theme/index.js";
import { isFirebaseConfigured } from "../lib/firebase.js";
import { findPublishedBySlug } from "../lib/invitations/invitationsService.js";
import { formatKoreanDate } from "../lib/invitations/formatWeddingDate.js";

/**
 * 공개 청첩장 (셸 미적용 · 모바일 퍼스트).
 * Firebase 미설정 시 데모 데이터로 렌더링한다.
 */
const DEMO = {
  wedding: {
    groom: "김민준",
    bride: "이서연",
    date: "2026-05-24",
    time: "14:00",
    venue: "더 그랜드 볼룸",
    address: "서울시 강남구 테헤란로 123",
    greeting:
      "두 사람이 사랑으로 만나 한 가정을 이루게 되었습니다.\n부디 오셔서 자리를 빛내 주시기 바랍니다.",
  },
};

export default function PublicInvitation() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!isFirebaseConfigured) {
        setData(DEMO);
        setLoading(false);
        return;
      }
      try {
        const inv = await findPublishedBySlug(slug);
        if (!active) return;
        if (!inv) setNotFound(true);
        else setData(inv);
      } catch (e) {
        console.error(e);
        setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#1A1A1A",
        }}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );
  }

  if (notFound || !data) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#1A1A1A",
          color: "#fff",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4">청첩장을 찾을 수 없습니다</Typography>
          <Alert severity="warning">
            발행 전이거나 잘못된 주소일 수 있어요.
          </Alert>
        </Stack>
      </Box>
    );
  }

  const w = data.wedding || {};
  const dateStr = formatKoreanDate(w.date, w.time);

  return (
    <Box sx={{ background: palette.bgDark, minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          maxWidth: 420,
          mx: "auto",
          px: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: `${radii.lg}px`,
            boxShadow: shadows.elevated,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(180deg, ${palette.pinkSoft} 0%, #fff 70%)`,
              py: 7,
              textAlign: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.4em",
                color: palette.primary,
                fontWeight: 700,
              }}
            >
              WEDDING INVITATION
            </Typography>
            <Typography
              sx={{
                fontFamily: fontFamily.serif,
                fontSize: 36,
                fontWeight: 700,
                mt: 2,
              }}
            >
              {w.groom}
            </Typography>
            <Typography
              sx={{
                color: palette.primary,
                fontFamily: fontFamily.serif,
                fontSize: 24,
                my: 1,
              }}
            >
              &
            </Typography>
            <Typography
              sx={{
                fontFamily: fontFamily.serif,
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              {w.bride}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              {dateStr}
            </Typography>
          </Box>

          {/* 📸 메인 웨딩 사진이 들어가는 영역입니다 */}
          <Box
            component="img"
            src="/photo1.jpg" /* public 폴더에 넣은 사진 이름으로 변경하세요 (예: /main-photo.jpg) */
            alt="웨딩 메인 사진"
            sx={{
              width: "100%",
              aspectRatio: "4 / 5", /* 세로로 살짝 긴 비율. 정사각형을 원하시면 "1 / 1"로 변경하세요 */
              objectFit: "cover",
              display: "block",
            }}
          />

          <CardContent sx={{ p: 4 }}>
            <Stack
              spacing={4}
              divider={<Box sx={{ height: 1, background: palette.divider }} />}
            >
              {w.greeting && (
                <Box>
                  <SectionTitle>인사말</SectionTitle>
                  <Typography
                    sx={{ whiteSpace: "pre-line", textAlign: "center", mt: 2 }}
                  >
                    {w.greeting}
                  </Typography>
                </Box>
              )}

              <Box>
                <SectionTitle>예식 안내</SectionTitle>
                <Stack spacing={1} mt={2}>
                  <Row label="일시" value={dateStr} />
                  <Row label="장소" value={w.venue} />
                  <Row label="주소" value={w.address} />
                </Stack>
              </Box>

              <Box>
                <SectionTitle>오시는 길</SectionTitle>
                <Box
                  sx={{
                    mt: 2,
                    height: 180,
                    background: palette.surface,
                    border: `1px dashed ${palette.border}`,
                    borderRadius: `${radii.md}px`,
                    display: "grid",
                    placeItems: "center",
                    color: palette.textMuted,
                  }}
                >
                  네이버 지도 (연동 예정)
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            mt: 3,
          }}
        >
          made with 오즈청첩장
        </Typography>
      </Box>
    </Box>
  );
}

function SectionTitle({ children }) {
  return (
    <Typography
      align="center"
      sx={{
        fontFamily: fontFamily.serif,
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "0.05em",
        color: palette.primary,
      }}
    >
      {children}
    </Typography>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ borderBottom: `1px solid ${palette.divider}`, pb: 1 }}
    >
      <Typography sx={{ width: 56, color: palette.textMuted }}>
        {label}
      </Typography>
      <Typography sx={{ flex: 1 }}>{value}</Typography>
    </Stack>
  );
}
