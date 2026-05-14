import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FloatingPetals from '../components/FloatingPetals.jsx'
import HeroSection from '../sections/HeroSection.jsx'
import StatsSection from '../sections/StatsSection.jsx'
import FreePreviewSection from '../sections/FreePreviewSection.jsx'
import UnlimitedEditsSection from '../sections/UnlimitedEditsSection.jsx'
import DesignsSection from '../sections/DesignsSection.jsx'
import FaqSection from '../sections/FaqSection.jsx'
import CtaSection from '../sections/CtaSection.jsx'

export default function LandingPage() {
  const location = useLocation()

  // 외부에서 /#faq 등 hash로 진입했을 때 해당 섹션으로 부드럽게 스크롤
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    // 페이지 mount + Reveal IntersectionObserver 안정화 후 스크롤
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => clearTimeout(t)
  }, [location.hash])

  return (
    <>
      <FloatingPetals />
      <HeroSection />
      <StatsSection />
      <FreePreviewSection />
      <UnlimitedEditsSection />
      <DesignsSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
