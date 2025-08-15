// Mock data for Legal Affairs Management System

export const dashboardStats = {
  activeCases: 45,
  pendingInvestigations: 12,
  upcomingDeadlines: 8,
  totalContracts: 156
};

export const recentActivity = [
  {
    id: 1,
    type: 'case',
    title: 'New case filed: Contract Dispute',
    timestamp: '2 hours ago',
    status: 'new'
  },
  {
    id: 2,
    type: 'investigation',
    title: 'Investigation completed: Employee Misconduct',
    timestamp: '4 hours ago',
    status: 'completed'
  },
  {
    id: 3,
    type: 'contract',
    title: 'Contract approved: IT Services Agreement',
    timestamp: '1 day ago',
    status: 'approved'
  },
  {
    id: 4,
    type: 'deadline',
    title: 'Deadline reminder: Court hearing tomorrow',
    timestamp: '1 day ago',
    status: 'urgent'
  }
];

export const cases = [
  {
    id: 'C001',
    caseNumber: '2024/001',
    personalNumber: 'P123456',
    year: 2024,
    type: 'Preliminary',
    department: 'Civil Service Bureau',
    plaintiff: 'Government Entity',
    defendant: 'John Doe',
    status: 'Under Study',
    amount: 50000,
    assignedEmployee: 'Ahmed Al-Rashid',
    lastUpdate: '2024-01-15',
    summary: 'Contract dispute regarding IT services delivery and payment terms.'
  },
  {
    id: 'C002',
    caseNumber: '2024/002',
    personalNumber: 'P789012',
    year: 2024,
    type: 'Appeal',
    department: 'Government Development',
    plaintiff: 'Ministry of Justice',
    defendant: 'ABC Company',
    status: 'Win',
    amount: 75000,
    assignedEmployee: 'Fatima Al-Zahra',
    lastUpdate: '2024-01-10',
    summary: 'Employment termination dispute with compensation claims.'
  },
  {
    id: 'C003',
    caseNumber: '2024/003',
    personalNumber: 'P345678',
    year: 2024,
    type: 'Enforcement',
    department: 'Civil Service Bureau',
    plaintiff: 'State Treasury',
    defendant: 'XYZ Corporation',
    status: 'Loss',
    amount: 120000,
    assignedEmployee: 'Mohammed Al-Mansouri',
    lastUpdate: '2024-01-08',
    summary: 'Breach of contract for construction project delays.'
  }
];

export const investigations = [
  {
    id: 'I001',
    title: 'Employee Misconduct Investigation',
    employee: 'Ali Hassan',
    department: 'Finance Department',
    phase: 'Phase 3: Minutes',
    status: 'In Progress',
    startDate: '2024-01-10',
    assignedTo: 'Legal Investigator 1',
    priority: 'High'
  },
  {
    id: 'I002',
    title: 'Procurement Irregularities',
    employee: 'Sara Ahmed',
    department: 'Procurement Office',
    phase: 'Phase 5: HR Actions',
    status: 'Completed',
    startDate: '2023-12-15',
    assignedTo: 'Legal Investigator 2',
    priority: 'Medium'
  },
  {
    id: 'I003',
    title: 'Attendance Violations',
    employee: 'Omar Khalil',
    department: 'IT Department',
    phase: 'Phase 2: Notification',
    status: 'In Progress',
    startDate: '2024-01-12',
    assignedTo: 'Legal Investigator 1',
    priority: 'Low'
  }
];

export const contracts = [
  {
    id: 'CT001',
    title: 'IT Infrastructure Upgrade',
    requestingDepartment: 'IT Department',
    contractType: 'Public Tender',
    status: 'Under Review',
    amount: 500000,
    submissionDate: '2024-01-05',
    currentPhase: 'Legal Review',
    assignedLawyer: 'Ahmed Al-Rashid'
  },
  {
    id: 'CT002',
    title: 'Office Supplies Contract',
    requestingDepartment: 'Administrative Affairs',
    contractType: 'Direct Agreement',
    status: 'Approved',
    amount: 25000,
    submissionDate: '2023-12-20',
    currentPhase: 'Completed',
    assignedLawyer: 'Fatima Al-Zahra'
  },
  {
    id: 'CT003',
    title: 'Security Services Agreement',
    requestingDepartment: 'Security Department',
    contractType: 'Limited Tender',
    status: 'Pending Approval',
    amount: 150000,
    submissionDate: '2024-01-08',
    currentPhase: 'Director Review',
    assignedLawyer: 'Mohammed Al-Mansouri'
  }
];

export const agreements = [
  {
    id: 'A001',
    title: 'Cooperation Agreement with Ministry of Education',
    type: 'Cooperation MoU',
    category: 'Local',
    entity: 'Ministry of Education',
    year: 2024,
    duration: '3 years',
    expiryDate: '2027-01-15',
    status: 'Under Application',
    department: 'Legal Affairs'
  },
  {
    id: 'A002',
    title: 'International Trade Agreement',
    type: 'Agreement',
    category: 'International',
    entity: 'European Union',
    year: 2023,
    duration: '5 years',
    expiryDate: '2028-06-30',
    status: 'Under Application',
    department: 'International Relations'
  }
];

export const meetingMinutes = [
  {
    id: 'M001',
    title: 'Legal Committee Monthly Meeting',
    committee: 'Legal Affairs Committee',
    date: '2024-01-15',
    attendees: 8,
    decisions: 5,
    followUps: 3,
    status: 'Completed'
  },
  {
    id: 'M002',
    title: 'Contract Review Board Meeting',
    committee: 'Contract Review Board',
    date: '2024-01-10',
    attendees: 6,
    decisions: 3,
    followUps: 2,
    status: 'Pending Follow-up'
  }
];

export const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/'
  },
  {
    id: 'cases',
    label: 'Cases',
    icon: 'Scale',
    path: '/cases'
  },
  {
    id: 'investigations',
    label: 'Investigations',
    icon: 'Search',
    path: '/investigations'
  },
  {
    id: 'disciplinary',
    label: 'Disciplinary Committee',
    icon: 'Shield',
    path: '/disciplinary'
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: 'FileText',
    path: '/contracts'
  },
  {
    id: 'archives',
    label: 'Archives',
    icon: 'Archive',
    path: '/archives',
    subItems: [
      { id: 'meetings', label: 'Meeting Minutes', path: '/archives/meetings' },
      { id: 'agreements', label: 'Agreements & MoUs', path: '/archives/agreements' },
      { id: 'legislative', label: 'Legislative Instruments', path: '/archives/legislative' },
      { id: 'opinions', label: 'Legal Opinions', path: '/archives/opinions' },
      { id: 'settlements', label: 'Amicable Settlements', path: '/archives/settlements' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3',
    path: '/reports'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    path: '/settings'
  }
];

export const userProfile = {
  name: 'Ahmed Al-Rashid',
  role: 'Senior Legal Advisor',
  department: 'Legal Affairs Department',
  email: 'ahmed.rashid@gov.ae',
  avatar: '/api/placeholder/32/32'
};

