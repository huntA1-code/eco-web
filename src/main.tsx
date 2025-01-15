import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Remove any trailing colons or slashes from the URL
const baseUrl = window.location.origin.replace(/[:\/]+$/, '');

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>
);