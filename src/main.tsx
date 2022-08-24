import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import App from './pages/App'
import Account from './pages/Account'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='account' element={<Account />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
