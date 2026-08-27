import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './ui/App'
import './styles/global.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Could not find #root to mount the playground into.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
