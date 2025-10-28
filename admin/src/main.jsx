import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
import ServiceContextProvider from './context/ServiceContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <ServiceContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ServiceContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
