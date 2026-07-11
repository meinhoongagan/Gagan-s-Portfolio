import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

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
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
