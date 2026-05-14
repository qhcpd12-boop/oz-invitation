import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import App from './App.jsx'
import { theme } from './theme/index.js'

// Agentation: 개발 모드에서만 주석 토룸바 로드 (프로덕션 번들에서 자동 제외)
const Agentation = import.meta.env.DEV
  ? React.lazy(() =>
      import('agentation').then((m) => ({ default: m.Agentation })),
    )
  : null

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
        {Agentation && (
          <Suspense fallback={null}>
            <Agentation />
          </Suspense>
        )}
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
