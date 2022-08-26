import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './pages/App'

import { initializeApp } from 'firebase/app'
import { config } from './firebase'

initializeApp(config.firebase)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
