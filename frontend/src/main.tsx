import { StrictMode, lazy, Suspense } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// The admin panel is never crawled and most visitors never load it. Splitting it
// out keeps it off the critical path of every public page, which is a direct
// Core Web Vitals win.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'))

const Root = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

const container = document.getElementById('root')!

// Public routes ship prerendered HTML (see scripts/prerender.mjs) and must be
// hydrated so the existing markup is reused rather than thrown away. /admin is
// not prerendered, so it renders from scratch.
if (container.hasAttribute('data-prerendered')) {
  hydrateRoot(container, <Root />)
} else {
  createRoot(container).render(<Root />)
}
