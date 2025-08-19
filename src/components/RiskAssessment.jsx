import React, { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { risks } from '../data/mockData';

const RiskAssessment = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState(null);

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || risk.level.toLowerCase() === levelFilter;
    return matchesSearch && matchesLevel;
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

  const RiskDetailModal = ({ risk, onClose }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{t('riskDetails')}</DialogTitle>
        <DialogDescription>
          {risk?.title}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('riskInformation')}</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">{t('riskTitle')}:</span> <span className="font-medium">{risk?.title}</span></div>
              <div><span className="text-gray-500">{t('category')}:</span> <span className="font-medium">{risk?.category}</span></div>
              <div><span className="text-gray-500">{t('riskLevel')}:</span> 
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  risk?.level === 'Critical' ? 'bg-red-100 text-red-800' :
                  risk?.level === 'High' ? 'bg-orange-100 text-orange-800' :
                  risk?.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {risk?.level}
                </span>
              </div>
              <div><span className="text-gray-500">{t('currentStatus')}:</span> <span className="font-medium">{risk?.status}</span></div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('riskMatrix')}</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">{t('impact')}:</span> <span className="font-medium">{risk?.impact}</span></div>
              <div><span className="text-gray-500">{t('likelihood')}:</span> <span className="font-medium">{risk?.likelihood}</span></div>
              <div><span className="text-gray-500">{t('riskOwner')}:</span> <span className="font-medium">{risk?.owner}</span></div>
              <div><span className="text-gray-500">{t('lastAssessment')}:</span> <span className="font-medium">{risk?.lastAssessment}</span></div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">{t('mitigationPlan')}</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{risk?.mitigation}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">{t('availableActions')}</h4>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              {t('updateRisk')}
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
          <h1 className="text-2xl font-bold text-gray-900">{t('riskAssessmentModule')}</h1>
          <p className="text-gray-600">{t('manageRisks')}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('exportPdfBtn')}
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            {t('newRiskBtn')}
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
                <span className="text-sm text-gray-500">Recent Risk Assessment:</span>
                <span className="ml-2 font-medium">2024-01-15</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Risk ID:</span>
                <span className="ml-2 font-medium text-blue-600">RSK-001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Risk Owner:</span>
                <span className="ml-2 font-medium">IT Security Team</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Department Code:</span>
                <span className="ml-2 font-medium">RSK001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Business User:</span>
                <span className="ml-2 font-medium">Risk Management</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Risk Status:</span>
                <span className="ml-2 font-medium">{t('active')}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Risk Category:</span>
                <span className="ml-2 font-medium">Information Security</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Department Label:</span>
                <span className="ml-2 font-medium">--</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Risks"
          value={risks.length}
          subtitle="All identified risks"
          icon={AlertTriangle}
          color="orange"
        />
        <MetricCard
          title="Critical Risks"
          value={risks.filter(r => r.level === 'Critical').length}
          subtitle="Require immediate attention"
          icon={AlertTriangle}
          color="red"
        />
        <MetricCard
          title="High Risks"
          value={risks.filter(r => r.level === 'High').length}
          subtitle="High priority risks"
          icon={TrendingUp}
          color="orange"
        />
        <MetricCard
          title="Mitigated Risks"
          value={risks.filter(r => r.status === 'Mitigated').length}
          subtitle="Successfully mitigated"
          icon={Shield}
          color="green"
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
                  placeholder={t('searchRisks')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">{t('critical')}</SelectItem>
                <SelectItem value="high">{t('high')}</SelectItem>
                <SelectItem value="medium">{t('medium')}</SelectItem>
                <SelectItem value="low">{t('low')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Risks Table */}
      <Card>
        <CardContent className="p-0">
          {filteredRisks.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noRisksFound')}</h3>
              <p className="text-gray-500">{t('tryAdjusting')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('riskTitle')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('riskLevel')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('impact')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('likelihood')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('riskOwner')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRisks.map((risk) => (
                    <tr key={risk.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-blue-600 font-medium">{risk.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                          <div className="text-sm text-gray-500">{risk.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          risk.level === 'Critical' ? 'bg-red-100 text-red-800' :
                          risk.level === 'High' ? 'bg-orange-100 text-orange-800' :
                          risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {risk.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {risk.impact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {risk.likelihood}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {risk.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedRisk(risk)}
                            >
                              {t('viewBtn')}
                            </Button>
                          </DialogTrigger>
                          <RiskDetailModal risk={selectedRisk} />
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
            <span>Total Risks: {risks.length}</span>
            <span>Critical: {risks.filter(r => r.level === 'Critical').length}</span>
            <span>Mitigated: {risks.filter(r => r.status === 'Mitigated').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;

