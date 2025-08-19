import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { LanguageProvider as LegalLanguageProvider } from './contexts/legal/LanguageContext'
import HomePage from './components/HomePage'
import AuditorApp from './components/AuditorApp'
import LegalApp from './components/LegalApp'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Auditor FrontEnd Routes */}
        <Route path="/auditor/*" element={
          <LanguageProvider>
            <AuditorApp />
          </LanguageProvider>
        } />
        
        {/* Legal Case Management Routes */}
        <Route path="/legal/*" element={
          <LegalLanguageProvider>
            <LegalApp />
          </LegalLanguageProvider>
        } />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

