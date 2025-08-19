import React, { useState } from 'react';
import { Calendar, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { dashboardMetrics, audits, risks, findings, actions } from '../data/mockData';
import NewAuditForm from './NewAuditForm';

const Dashboard = () => {
  const { t } = useLanguage();
  const [showNewAuditForm, setShowNewAuditForm] = useState(false);

  const handleNewAudit = () => {
    setShowNewAuditForm(true);
  };

  const handleCloseForm = () => {
    setShowNewAuditForm(false);
  };

  const handleSubmitAudit = (auditData) => {
    console.log('New audit created:', auditData);
    // Here you would typically send the data to your backend
    setShowNewAuditForm(false);
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TabButton = ({ label, isActive, onClick, count }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors relative ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
      {count > 0 && (
        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
          isActive ? 'bg-blue-500' : 'bg-gray-200 text-gray-600'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('auditorDashboard')}</h1>
          <p className="text-gray-600">{t('overviewOfAuditOperations')}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            {t('scheduleMeetingBtn')}
          </Button>
          <Button onClick={handleNewAudit}>
            <FileText className="h-4 w-4 mr-2" />
            {t('newAuditBtn')}
          </Button>
        </div>
      </div>

      {/* Basic Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span>{t('basicInformation')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">{t('recentAuditTime')}:</span>
                <span className="ml-2 font-medium">2024-01-15</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{t('auditNumber')}:</span>
                <span className="ml-2 font-medium text-blue-600">AUD-2024-001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{t('primaryAuditor')}:</span>
                <span className="ml-2 font-medium">Sarah Al-Mahmoud</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">{t('departmentCode')}:</span>
                <span className="ml-2 font-medium">AUD001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{t('businessUser')}:</span>
                <span className="ml-2 font-medium">Audit Department</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{t('auditStatus')}:</span>
                <span className="ml-2 font-medium">{t('active')}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">{t('auditCategory')}:</span>
                <span className="ml-2 font-medium">Financial Controls</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{t('departmentLabel')}:</span>
                <span className="ml-2 font-medium">--</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        <TabButton label={t('followUpRecord')} isActive={false} count={0} />
        <TabButton label={t('auditRecord')} isActive={true} count={7} />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <MetricCard
          title={t('activeAudits')}
          value={dashboardMetrics.activeAudits}
          subtitle="Currently in progress"
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title={t('totalAuditValue')}
          value={`$${dashboardMetrics.totalAuditValue.toLocaleString()}`}
          subtitle="Total audit coverage"
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title={t('auditsThisMonth')}
          value={dashboardMetrics.auditsThisMonth}
          subtitle="Completed this month"
          icon={CheckCircle}
          color="blue"
        />
        <MetricCard
          title={t('avgCompletionDays')}
          value={dashboardMetrics.avgCompletionDays}
          subtitle="Average completion time"
          icon={Calendar}
          color="orange"
        />
        <MetricCard
          title={t('complianceRate')}
          value={`${dashboardMetrics.complianceRate}%`}
          subtitle="Overall compliance"
          icon={AlertTriangle}
          color="green"
        />
      </div>

      {/* Tab Content */}
      <div className="flex space-x-2 mb-4">
        <TabButton label={t('auditsList')} isActive={true} count={audits.length} />
        <TabButton label={t('findingsList')} isActive={false} count={findings.length} />
        <TabButton label={t('actionsList')} isActive={false} count={actions.length} />
        <TabButton label={t('risksList')} isActive={false} count={risks.length} />
        <TabButton label={t('complianceList')} isActive={false} count={3} />
        <TabButton label={t('reportsList')} isActive={true} count={5} />
      </div>

      {/* Audits Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('auditNumber')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('documentNumber')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('auditor')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('department')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {audits.slice(0, 3).map((audit) => (
                  <tr key={audit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 font-medium">{audit.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audit.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        audit.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audit.auditor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audit.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Button variant="outline" size="sm">
                        {t('viewBtn')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Footer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-yellow-800">{t('total')}</span>
          <div className="flex space-x-6 text-yellow-700">
            <span>{t('activeAudits')}: {dashboardMetrics.activeAudits}</span>
            <span>{t('totalAuditValue')}: ${dashboardMetrics.totalAuditValue.toLocaleString()}</span>
            <span>{t('complianceRate')}: {dashboardMetrics.complianceRate}%</span>
          </div>
        </div>
      </div>

      {/* New Audit Form Modal */}
      <NewAuditForm
        isOpen={showNewAuditForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmitAudit}
      />
    </div>
  );
};

export default Dashboard;

