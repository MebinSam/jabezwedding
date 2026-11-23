import React from 'react'
import { createRoot } from 'react-dom/client'
import photo from './assets/couple.jpg'
import './index.css'
import App from './App.jsx'

document.documentElement.style.setProperty('--photo', `url(${photo})`)
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
