// Mock data for the Auditor Management System

export const userProfile = {
  name: "Sarah Al-Mahmoud",
  role: "Senior Auditor",
  email: "sarah.mahmoud@company.com",
  avatar: "/api/placeholder/32/32"
};

export const dashboardMetrics = {
  activeAudits: 12,
  totalAuditValue: 1850000,
  auditsThisMonth: 8,
  avgCompletionDays: 18,
  complianceRate: 94.2
};

export const audits = [
  {
    id: "AUD-2024-001",
    title: "Financial Controls Audit",
    type: "Internal",
    scope: "Finance Department",
    status: "In Progress",
    auditor: "Sarah Al-Mahmoud",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    department: "Finance",
    priority: "High",
    progress: 65,
    findings: 3,
    actions: 2
  },
  {
    id: "AUD-2024-002",
    title: "IT Security Assessment",
    type: "Compliance",
    scope: "IT Infrastructure",
    status: "Completed",
    auditor: "Ahmed Al-Rashid",
    startDate: "2024-01-01",
    endDate: "2024-01-30",
    department: "IT",
    priority: "Critical",
    progress: 100,
    findings: 5,
    actions: 4
  },
  {
    id: "AUD-2024-003",
    title: "Procurement Process Review",
    type: "Operational",
    scope: "Procurement Department",
    status: "Pending",
    auditor: "Fatima Al-Zahra",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    department: "Procurement",
    priority: "Medium",
    progress: 0,
    findings: 0,
    actions: 0
  },
  {
    id: "AUD-2024-004",
    title: "HR Compliance Audit",
    type: "Compliance",
    scope: "Human Resources",
    status: "In Progress",
    auditor: "Mohammed Al-Mansouri",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    department: "HR",
    priority: "Medium",
    progress: 40,
    findings: 2,
    actions: 1
  }
];

export const risks = [
  {
    id: "RSK-001",
    title: "Data Breach Risk",
    category: "Information Security",
    level: "High",
    impact: "High",
    likelihood: "Medium",
    owner: "IT Security Team",
    status: "Active",
    mitigation: "Implement multi-factor authentication",
    lastAssessment: "2024-01-10",
    nextReview: "2024-04-10"
  },
  {
    id: "RSK-002",
    title: "Financial Fraud Risk",
    category: "Financial",
    level: "Critical",
    impact: "High",
    likelihood: "Low",
    owner: "Finance Team",
    status: "Active",
    mitigation: "Enhanced approval workflows",
    lastAssessment: "2024-01-05",
    nextReview: "2024-03-05"
  },
  {
    id: "RSK-003",
    title: "Regulatory Compliance Risk",
    category: "Compliance",
    level: "Medium",
    impact: "Medium",
    likelihood: "Medium",
    owner: "Compliance Team",
    status: "Mitigated",
    mitigation: "Regular compliance training",
    lastAssessment: "2024-01-15",
    nextReview: "2024-06-15"
  }
];

export const compliance = [
  {
    id: "CMP-001",
    standard: "ISO 27001",
    requirement: "Information Security Management",
    status: "Compliant",
    lastAssessment: "2024-01-01",
    nextReview: "2024-07-01",
    responsible: "IT Security Team",
    score: 95
  },
  {
    id: "CMP-002",
    standard: "IIA Standards",
    requirement: "Internal Audit Charter",
    status: "Compliant",
    lastAssessment: "2023-12-15",
    nextReview: "2024-06-15",
    responsible: "Audit Team",
    score: 98
  },
  {
    id: "CMP-003",
    standard: "SOX Compliance",
    requirement: "Financial Controls",
    status: "Partial",
    lastAssessment: "2024-01-10",
    nextReview: "2024-04-10",
    responsible: "Finance Team",
    score: 78
  }
];

export const findings = [
  {
    id: "FND-001",
    title: "Inadequate Password Policy",
    severity: "High",
    type: "Control Deficiency",
    auditor: "Sarah Al-Mahmoud",
    dateIdentified: "2024-01-15",
    status: "Open",
    auditId: "AUD-2024-001",
    department: "IT",
    description: "Current password policy does not meet security standards"
  },
  {
    id: "FND-002",
    title: "Missing Approval Documentation",
    severity: "Medium",
    type: "Documentation",
    auditor: "Ahmed Al-Rashid",
    dateIdentified: "2024-01-12",
    status: "In Progress",
    auditId: "AUD-2024-002",
    department: "Finance",
    description: "Several transactions lack proper approval documentation"
  },
  {
    id: "FND-003",
    title: "Segregation of Duties Issue",
    severity: "Critical",
    type: "Control Deficiency",
    auditor: "Fatima Al-Zahra",
    dateIdentified: "2024-01-08",
    status: "Closed",
    auditId: "AUD-2024-003",
    department: "Procurement",
    description: "Same person initiating and approving purchase orders"
  }
];

export const actions = [
  {
    id: "ACT-001",
    title: "Implement Strong Password Policy",
    type: "Corrective",
    assignee: "IT Security Team",
    dueDate: "2024-03-01",
    status: "In Progress",
    progress: 60,
    priority: "High",
    findingId: "FND-001",
    description: "Update password policy to require complex passwords"
  },
  {
    id: "ACT-002",
    title: "Create Approval Documentation Process",
    type: "Corrective",
    assignee: "Finance Team",
    dueDate: "2024-02-15",
    status: "Completed",
    progress: 100,
    priority: "Medium",
    findingId: "FND-002",
    description: "Establish clear documentation requirements for approvals"
  },
  {
    id: "ACT-003",
    title: "Redesign Procurement Workflow",
    type: "Preventive",
    assignee: "Procurement Team",
    dueDate: "2024-04-01",
    status: "Not Started",
    progress: 0,
    priority: "Critical",
    findingId: "FND-003",
    description: "Implement proper segregation of duties in procurement"
  }
];

export const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard'
  },
  {
    id: 'audits',
    label: 'Audits',
    icon: 'ClipboardCheck'
  },
  {
    id: 'riskAssessment',
    label: 'Risk Assessment',
    icon: 'AlertTriangle'
  },
  {
    id: 'compliance',
    label: 'Compliance',
    icon: 'Shield'
  },
  {
    id: 'findings',
    label: 'Findings',
    icon: 'Search'
  },
  {
    id: 'actions',
    label: 'Actions',
    icon: 'CheckSquare'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3'
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: 'FileText'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: 'Calendar'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings'
  }
];

