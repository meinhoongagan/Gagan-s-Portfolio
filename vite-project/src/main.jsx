import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { SmoothScrollProvider } from './lib/SmoothScroll.jsx'

const crashFallback = (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
    <div>
      <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Something broke.</p>
      <p style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>Check the console for details.</p>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={crashFallback}>
      {/* reducedMotion="user" makes every <motion.*> element in the tree
          respect prefers-reduced-motion automatically (disables
          transform/layout animation, keeps simple opacity fades) — without
          this, Framer Motion's default is "never" and ignores the OS
          setting entirely for animations not wrapped in our custom
          reduced-motion-aware primitives. */}
      <MotionConfig reducedMotion="user">
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
)
