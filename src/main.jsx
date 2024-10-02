import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initFabric } from './fabric/index.js'

initFabric();
createRoot(document.getElementById('root')).render(
  <App />
)
