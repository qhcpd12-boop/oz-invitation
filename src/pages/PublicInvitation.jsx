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
import { palette } from "../theme/index.js";
import { isFirebaseConfigured } from "../lib/firebase.js";
import {
  findLocalPublishedBySlug,
  findPublishedBySlug,
} from "../lib/invitations/invitationsService.js";
import { PreviewGuideBody } from "./create/StepDetails.jsx";

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
        const localInvitation = findLocalPublishedBySlug(slug);
        if (localInvitation) setData(localInvitation);
        else setNotFound(true);
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
    const gallery = Array.isArray(data.gallery) ? data.gallery : [];
    return {
      ...(data.wedding || {}),
      coverImage: data.coverImage || data.wedding?.coverImage || gallery[0] || "",
      gallery,
      themeOptions: data.themeOptions || data.wedding?.themeOptions || null,
    };
  }, [data]);

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
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "#ECECEC",
        pb: 11,
        py: { xs: 0, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: "auto",
          minHeight: "100vh",
          background: "#FBFAF8",
          borderRadius: { xs: 0, sm: 2 },
          overflow: "hidden",
          boxShadow: { xs: "none", sm: "0 1px 0 rgba(0,0,0,0.02)" },
          border: { xs: "none", sm: "1px solid rgba(0,0,0,0.06)" },
        }}
      >
        <PreviewGuideBody data={renderData} />
      </Box>
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
