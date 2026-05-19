import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{

        duration: 3000,

        style: {
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px'
        },

      }}
    />
  </StrictMode>,
)
