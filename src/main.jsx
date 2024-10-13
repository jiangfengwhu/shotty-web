import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initFabric } from './fabric/index.js'
import { initJsBridge } from './bridge/index.js'

initJsBridge();
initFabric();
createRoot(document.getElementById('root')).render(
  <App />
)
