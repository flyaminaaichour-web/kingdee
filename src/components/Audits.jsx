import React, { useState } from 'react';
import { Search, Filter, FileText, Calendar, TrendingUp, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { audits, dashboardMetrics } from '../data/mockData';
import NewAuditForm from './NewAuditForm';

const Audits = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [auditsList, setAuditsList] = useState(audits);
  const [isNewAuditFormOpen, setIsNewAuditFormOpen] = useState(false);

  const handleNewAudit = (newAudit) => {
    setAuditsList(prev => [newAudit, ...prev]);
  };

  const filteredAudits = auditsList.filter(audit => {
    const matchesSearch = audit.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.assignedAuditor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const AuditDetailModal = ({ audit, onClose }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{t('auditDetails')}</DialogTitle>
        <DialogDescription>
          {audit?.title}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('basicInformation')}</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">{t('auditNumber')}:</span> <span className="font-medium">{audit?.id}</span></div>
              <div><span className="text-gray-500">{t('auditType')}:</span> <span className="font-medium">{audit?.type}</span></div>
              <div><span className="text-gray-500">{t('auditScope')}:</span> <span className="font-medium">{audit?.scope}</span></div>
              <div><span className="text-gray-500">{t('status')}:</span> 
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  audit?.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  audit?.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {audit?.status}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('auditInformation')}</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">{t('auditor')}:</span> <span className="font-medium">{audit?.auditor}</span></div>
              <div><span className="text-gray-500">{t('startDate')}:</span> <span className="font-medium">{audit?.startDate}</span></div>
              <div><span className="text-gray-500">{t('endDate')}:</span> <span className="font-medium">{audit?.endDate}</span></div>
              <div><span className="text-gray-500">{t('department')}:</span> <span className="font-medium">{audit?.department}</span></div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">{t('progressTracking')}</h4>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${audit?.progress || 0}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{audit?.progress || 0}% {t('completed')}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">{t('availableActions')}</h4>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              {t('updateAudit')}
            </Button>
            <Button size="sm" variant="outline">
              {t('generateReportBtn')}
            </Button>
            <Button size="sm" variant="outline">
              {t('sendNotificationBtn')}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('auditManagement')}</h1>
          <p className="text-gray-600">{t('manageAudits')}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            {t('exportPdfBtn')}
          </Button>
          <Button onClick={() => setIsNewAuditFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
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

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title={t('totalAudits')}
          value={audits.length}
          subtitle="All audit records"
          icon={FileText}
          color="blue"
        />
        <MetricCard
          title={t('completedAudits')}
          value={audits.filter(a => a.status === 'Completed').length}
          subtitle="Successfully completed"
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title={t('pendingAudits')}
          value={audits.filter(a => a.status === 'Pending').length}
          subtitle="Awaiting start"
          icon={Clock}
          color="orange"
        />
        <MetricCard
          title={t('inProgress')}
          value={audits.filter(a => a.status === 'In Progress').length}
          subtitle="Currently active"
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('searchAudits')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('allStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allStatus')}</SelectItem>
                <SelectItem value="completed">{t('completed')}</SelectItem>
                <SelectItem value="in progress">{t('inProgress')}</SelectItem>
                <SelectItem value="pending">{t('pending')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audits Table */}
      <Card>
        <CardContent className="p-0">
          {filteredAudits.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noDataFound')}</h3>
              <p className="text-gray-500">{t('tryAdjusting')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('auditNumber')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('title')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('auditor')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('startDate')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('progress')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAudits.map((audit) => (
                    <tr key={audit.id || audit.auditNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-blue-600 font-medium">{audit.id || audit.auditNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{audit.title || audit.auditTitle}</div>
                          <div className="text-sm text-gray-500">{audit.scope || audit.auditScope}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          audit.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          audit.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {audit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.auditor || audit.assignedAuditor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${audit.progress || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{audit.progress || 0}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedAudit(audit)}
                            >
                              {t('viewBtn')}
                            </Button>
                          </DialogTrigger>
                          <AuditDetailModal audit={selectedAudit} />
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Footer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-yellow-800">{t('total')}</span>
          <div className="flex space-x-6 text-yellow-700">
            <span>{t('totalAudits')}: {auditsList.length}</span>
            <span>{t('completedAudits')}: {auditsList.filter(a => a.status === 'Completed').length}</span>
            <span>{t('completionRate')}: {Math.round((auditsList.filter(a => a.status === 'Completed').length / auditsList.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* New Audit Form Modal */}
      <NewAuditForm
        isOpen={isNewAuditFormOpen}
        onClose={() => setIsNewAuditFormOpen(false)}
        onSubmit={handleNewAudit}
      />
    </div>
  );
};

export default Audits;

