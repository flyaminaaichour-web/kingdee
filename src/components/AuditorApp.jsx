import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './Dashboard'
import Audits from './Audits'
import RiskAssessment from './RiskAssessment'
import Compliance from './Compliance'
import Reports from './Reports'
import Documents from './Documents'
import Calendar from './Calendar'
import Settings from './Settings'
import Findings from './Findings'
import Actions from './Actions'

function AuditorApp() {
  return (
    <Routes>
      <Route path="/" element={<Layout currentPage="dashboard"><Dashboard /></Layout>} />
      <Route path="/dashboard" element={<Layout currentPage="dashboard"><Dashboard /></Layout>} />
      <Route path="/audits" element={<Layout currentPage="audits"><Audits /></Layout>} />
      <Route path="/riskAssessment" element={<Layout currentPage="riskAssessment"><RiskAssessment /></Layout>} />
      <Route path="/compliance" element={<Layout currentPage="compliance"><Compliance /></Layout>} />
      <Route path="/reports" element={<Layout currentPage="reports"><Reports /></Layout>} />
      <Route path="/documents" element={<Layout currentPage="documents"><Documents /></Layout>} />
      <Route path="/calendar" element={<Layout currentPage="calendar"><Calendar /></Layout>} />
      <Route path="/settings" element={<Layout currentPage="settings"><Settings /></Layout>} />
      <Route path="/findings" element={<Layout currentPage="findings"><Findings /></Layout>} />
      <Route path="/actions" element={<Layout currentPage="actions"><Actions /></Layout>} />
      <Route path="*" element={<Navigate to="/auditor" replace />} />
    </Routes>
  )
}

export default AuditorApp

