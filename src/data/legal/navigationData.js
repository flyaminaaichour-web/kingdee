// Navigation items with translation keys
export const getNavigationItems = (t) => [
  {
    id: 'dashboard',
    label: t('dashboard'),
    icon: 'LayoutDashboard'
  },
  {
    id: 'cases',
    label: t('cases'),
    icon: 'Scale'
  },
  {
    id: 'investigations',
    label: t('investigations'),
    icon: 'Search'
  },
  {
    id: 'disciplinary',
    label: 'Disciplinary Committee',
    icon: 'Shield'
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: 'FileText'
  },
  {
    id: 'archives',
    label: 'Archives',
    icon: 'Archive',
    subItems: [
      { id: 'meetings', label: 'Meeting Minutes' },
      { id: 'agreements', label: 'Agreements' },
      { id: 'legislative', label: 'Legislative Opinions' },
      { id: 'opinions', label: 'Legal Opinions' },
      { id: 'settlements', label: 'Settlements' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings'
  }
];

