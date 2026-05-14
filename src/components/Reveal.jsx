import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

/**
 * 스크롤 진입 시 한 번 페이드 + 슬라이드업.
 * - IntersectionObserver 기반, 화면에 12% 보이면 트리거
 * - prefers-reduced-motion 사용자에게는 즉시 보임
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 700,
  as,
  sx,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      component={as}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
