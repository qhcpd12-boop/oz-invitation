import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PillButton from "../components/PillButton.jsx";
import TemplateRenderer from "../components/TemplateRenderer.jsx";
import { palette } from "../theme/index.js";
import { isFirebaseConfigured } from "../lib/firebase.js";
import { findPublishedBySlug } from "../lib/invitations/invitationsService.js";

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
  const [copied, setCopied] = useState(false);

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

  const publicUrl = typeof window !== "undefined" ? window.location.href : "";
  const renderData = useMemo(() => {
    if (!data) return {};
    return {
      ...(data.wedding || {}),
      gallery: Array.isArray(data.gallery) ? data.gallery : [],
    };
  }, [data]);

  const templateId = data?.templateId || "luxury-noir";

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

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {}
  };

  const onShare = async () => {
    if (!navigator.share) return onCopy();
    try {
      await navigator.share({
        title: `${renderData.groom || "신랑"} & ${renderData.bride || "신부"} 결혼식 초대장`,
        text: "모바일 청첩장을 공유합니다.",
        url: publicUrl,
      });
    } catch {}
  };

  return (
    <Box sx={{ position: "relative", background: palette.bgDark }}>
      <TemplateRenderer templateId={templateId} data={renderData} />
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          bottom: 18,
          transform: "translateX(-50%)",
          zIndex: 12,
          width: "min(92vw, 420px)",
          display: "flex",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <PillButton fullWidth size="small" variant="outline" onClick={onShare}>
          공유하기
        </PillButton>
        <PillButton fullWidth size="small" onClick={onCopy}>
          {copied ? "복사됨" : "링크 복사"}
        </PillButton>
      </Box>
    </Box>
  );
}
