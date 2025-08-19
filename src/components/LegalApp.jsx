import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './legal/Layout'
import Dashboard from './legal/Dashboard'
import CasesSimple from './legal/CasesSimple'
import Investigations from './legal/Investigations'
import Contracts from './legal/Contracts'
import DisciplinaryCommittee from './legal/DisciplinaryCommittee'
import Archives from './legal/Archives'
import ArchiveDetail from './legal/ArchiveDetail'
import Reports from './legal/Reports'
import Settings from './legal/Settings'

function LegalApp() {
  return (
    <Routes>
      <Route path="/" element={<Layout currentPage="dashboard"><Dashboard /></Layout>} />
      <Route path="/dashboard" element={<Layout currentPage="dashboard"><Dashboard /></Layout>} />
      <Route path="/cases" element={<Layout currentPage="cases"><CasesSimple /></Layout>} />
      <Route path="/investigations" element={<Layout currentPage="investigations"><Investigations /></Layout>} />
      <Route path="/contracts" element={<Layout currentPage="contracts"><Contracts /></Layout>} />
      <Route path="/disciplinary-committee" element={<Layout currentPage="disciplinary-committee"><DisciplinaryCommittee /></Layout>} />
      <Route path="/archives" element={<Layout currentPage="archives"><Archives /></Layout>} />
      <Route path="/archives/:archiveType" element={<Layout currentPage="archives"><ArchiveDetail /></Layout>} />
      <Route path="/reports" element={<Layout currentPage="reports"><Reports /></Layout>} />
      <Route path="/settings" element={<Layout currentPage="settings"><Settings /></Layout>} />
      <Route path="*" element={<Navigate to="/legal" replace />} />
    </Routes>
  )
}

export default LegalApp

