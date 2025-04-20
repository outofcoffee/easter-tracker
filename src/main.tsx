import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TrackerProvider } from './context/TrackerContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TrackerProvider>
      <App />
    </TrackerProvider>
  </React.StrictMode>,
)