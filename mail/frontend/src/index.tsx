import { createRoot } from 'react-dom/client'
import { App } from './App'

let app = document.getElementById('app')
if (!app) {
    document.body.append(app = document.createElement('div'))
}

createRoot(app).render(<App />)

process.env.NODE_ENV === 'development' && new EventSource('/esbuild').addEventListener('change', () => location.reload())
