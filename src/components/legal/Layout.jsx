import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scale, 
  Search, 
  Shield, 
  FileText, 
  Archive, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../../contexts/legal/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { userProfile } from '../../data/legal/mockData';
import { getNavigationItems } from '../../data/legal/navigationData';

const iconMap = {
  LayoutDashboard,
  Scale,
  Search,
  Shield,
  FileText,
  Archive,
  BarChart3,
  Settings
};

const Layout = ({ children, currentPage = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/legal/${id}`);
    setSidebarOpen(false); // Close sidebar on navigation
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const NavItem = ({ item, isActive = false, level = 0 }) => {
    const Icon = iconMap[item.icon];
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.id];

    const handleClick = () => {
      if (hasSubItems) {
        toggleExpanded(item.id);
      } else {
        handleNavigate(item.id);
      }
    };

    return (
      <div>
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            isActive 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          } ${level > 0 ? 'ml-4' : ''}`}
          onClick={handleClick}
        >
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="h-5 w-5" />}
            <span className="font-medium">{item.label}</span>
          </div>
          {hasSubItems && (
            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </div>
        
        {hasSubItems && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <NavItem 
                key={subItem.id} 
                item={subItem} 
                isActive={currentPage === subItem.id}
                level={level + 1}
              />
            ))}
          </div>
        )}
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
                <Scale className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Legal Affairs Management</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder={t('searchCases')}
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
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
            {getNavigationItems(t).map((item) => (
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

