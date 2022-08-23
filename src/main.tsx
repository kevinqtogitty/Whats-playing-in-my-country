import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import App from './pages/App'
import LoginPage from './pages/Login'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
