import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  AlertTriangle, 
  Shield, 
  Search, 
  CheckSquare, 
  BarChart3, 
  FileText, 
  Calendar, 
  Settings,
  Menu,
  X,
  Bell,
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { userProfile } from '../data/mockData';

const iconMap = {
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  Shield,
  Search,
  CheckSquare,
  BarChart3,
  FileText,
  Calendar,
  Settings
};

import { useNavigate } from 'react-router-dom';

const Layout = ({ children, currentPage = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/auditor/${id}`);
    setSidebarOpen(false); // Close sidebar on navigation
  };

  const getNavigationItems = () => [
    {
      id: 'dashboard',
      label: t('dashboard'),
      icon: 'LayoutDashboard'
    },
    {
      id: 'audits',
      label: t('audits'),
      icon: 'ClipboardCheck'
    },
    {
      id: 'riskAssessment',
      label: t('riskAssessment'),
      icon: 'AlertTriangle'
    },
    {
      id: 'compliance',
      label: t('compliance'),
      icon: 'Shield'
    },
    {
      id: 'findings',
      label: t('findings'),
      icon: 'Search'
    },
    {
      id: 'actions',
      label: t('actions'),
      icon: 'CheckSquare'
    },
    {
      id: 'reports',
      label: t('reports'),
      icon: 'BarChart3'
    },
    {
      id: 'documents',
      label: t('documents'),
      icon: 'FileText'
    },
    {
      id: 'calendar',
      label: t('calendar'),
      icon: 'Calendar'
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: 'Settings'
    }
  ];

  const NavItem = ({ item, isActive = false }) => {
    const Icon = iconMap[item.icon];

    return (
      <div
        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => handleNavigate(item.id)}
      >
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="h-5 w-5" />}
          <span className="font-medium">{item.label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Auditor Management System</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search audits, risks, findings..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span>
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="p-4 space-y-2">
            {getNavigationItems().map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                isActive={currentPage === item.id}
              />
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

