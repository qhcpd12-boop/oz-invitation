import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import RequireAuth from "./lib/auth/RequireAuth.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import StyleGuide from "./pages/StyleGuide.jsx";
import CreateLayout from "./pages/create/CreateLayout.jsx";
import StepDesign from "./pages/create/StepDesign.jsx";
import StepDetails from "./pages/create/StepDetails.jsx";
import StepCheckout from "./pages/create/StepCheckout.jsx";
import StepComplete from "./pages/create/StepComplete.jsx";
import PublicInvitation from "./pages/PublicInvitation.jsx";
import ExampleLuxuryNoir from "./pages/examples/ExampleLuxuryNoir.jsx";
import ExampleGardenBloom from "./pages/examples/ExampleGardenBloom.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      {/* 셸이 적용되는 라우트 */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dev/_styleguide" element={<StyleGuide />} />

        <Route
          path="/create"
          element={
            // <RequireAuth>
            <CreateLayout />
            // </RequireAuth>
          }
        >
          <Route index element={<Navigate to="design" replace />} />
          <Route path="design" element={<StepDesign />} />
          <Route path="details" element={<StepDetails />} />
          <Route path="checkout" element={<StepCheckout />} />
          <Route path="complete" element={<StepComplete />} />
        </Route>
      </Route>

      {/* 셸 미적용 — 모바일 청첩장 공개 뷰 */}
      <Route path="/i/:slug" element={<PublicInvitation />} />

      {/* 청첩장 예시(정적 데모) — App.tsx 없음, 라우트는 App.jsx */}
      <Route path="/examples/luxury-noir" element={<ExampleLuxuryNoir />} />
      <Route path="/examples/garden-bloom" element={<ExampleGardenBloom />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
