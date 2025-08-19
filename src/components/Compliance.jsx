import React, { useState } from 'react';
import { Search, Filter, Shield, AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Calendar, Eye, Upload, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '../contexts/LanguageContext';
import { compliance } from '../data/mockData';

const Compliance = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [standardFilter, setStandardFilter] = useState('all');
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Extended compliance data with more detailed information
  const extendedCompliance = [
    {
      id: "CMP-001",
      requirementId: "ISO-27001-A.12.1.2",
      name: "Information Security Management",
      standard: "ISO 27001",
      status: "Compliant",
      lastAssessment: "2024-01-01",
      nextReview: "2024-07-01",
      responsible: "IT Security Team",
      score: 95,
      evidence: ["Security Policy Document", "Access Control Matrix", "Incident Response Plan"],
      linkedAudits: ["AUD-2024-001"],
      linkedRisks: ["RSK-001"],
      description: "Establish, implement, maintain and continually improve an information security management system within the context of the organization.",
      dueDate: "2024-07-01",
      daysRemaining: 168
    },
    {
      id: "CMP-002",
      requirementId: "IIA-2120",
      name: "Internal Audit Charter",
      standard: "IIA Standards",
      status: "Compliant",
      lastAssessment: "2023-12-15",
      nextReview: "2024-06-15",
      responsible: "Audit Team",
      score: 98,
      evidence: ["Audit Charter Document", "Board Approval Minutes"],
      linkedAudits: ["AUD-2024-002"],
      linkedRisks: [],
      description: "The internal audit activity must be governed by a charter that is approved by senior management and the board.",
      dueDate: "2024-06-15",
      daysRemaining: 122
    },
    {
      id: "CMP-003",
      requirementId: "SOX-404",
      name: "Financial Controls Assessment",
      standard: "SOX Compliance",
      status: "In Progress",
      lastAssessment: "2024-01-10",
      nextReview: "2024-04-10",
      responsible: "Finance Team",
      score: 78,
      evidence: ["Control Testing Results", "Management Assessment"],
      linkedAudits: ["AUD-2024-003"],
      linkedRisks: ["RSK-002"],
      description: "Management assessment of internal control over financial reporting and auditor attestation.",
      dueDate: "2024-04-10",
      daysRemaining: 56
    },
    {
      id: "CMP-004",
      requirementId: "ISO-27001-A.8.1.1",
      name: "Information Classification",
      standard: "ISO 27001",
      status: "Gap Found",
      lastAssessment: "2024-01-05",
      nextReview: "2024-03-05",
      responsible: "Data Protection Team",
      score: 65,
      evidence: ["Classification Guidelines", "Data Inventory"],
      linkedAudits: [],
      linkedRisks: ["RSK-003"],
      description: "Information shall be classified in terms of legal requirements, value, criticality and sensitivity to unauthorized disclosure or modification.",
      dueDate: "2024-03-05",
      daysRemaining: 21
    },
    {
      id: "CMP-005",
      requirementId: "IIA-1220",
      name: "Due Professional Care",
      standard: "IIA Standards",
      status: "Compliant",
      lastAssessment: "2024-01-12",
      nextReview: "2024-07-12",
      responsible: "Audit Team",
      score: 92,
      evidence: ["Professional Development Records", "Quality Assurance Reviews"],
      linkedAudits: ["AUD-2024-001"],
      linkedRisks: [],
      description: "Internal auditors must apply the care and skill expected of a reasonably prudent and competent internal auditor.",
      dueDate: "2024-07-12",
      daysRemaining: 179
    }
  ];

  const filteredCompliance = extendedCompliance.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.requirementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.standard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase().replace(' ', '') === statusFilter;
    const matchesStandard = standardFilter === 'all' || item.standard.toLowerCase().replace(' ', '') === standardFilter;
    return matchesSearch && matchesStatus && matchesStandard;
  });

  // Calculate overall compliance metrics
  const totalCompliance = extendedCompliance.length;
  const compliantCount = extendedCompliance.filter(item => item.status === 'Compliant').length;
  const inProgressCount = extendedCompliance.filter(item => item.status === 'In Progress').length;
  const gapCount = extendedCompliance.filter(item => item.status === 'Gap Found').length;
  const overallScore = Math.round(extendedCompliance.reduce((sum, item) => sum + item.score, 0) / totalCompliance);

  // Upcoming deadlines (next 30 days)
  const upcomingDeadlines = extendedCompliance
    .filter(item => item.daysRemaining <= 30)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

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

  const ComplianceDetailModal = ({ compliance, onClose }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Compliance Requirement Details</span>
        </DialogTitle>
        <DialogDescription>
          {compliance?.requirementId} - {compliance?.name}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Requirement ID:</span> <span className="font-medium">{compliance?.requirementId}</span></div>
              <div><span className="text-gray-500">Standard:</span> <span className="font-medium">{compliance?.standard}</span></div>
              <div><span className="text-gray-500">Status:</span> 
                <Badge className={`ml-2 ${
                  compliance?.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                  compliance?.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {compliance?.status}
                </Badge>
              </div>
              <div><span className="text-gray-500">Score:</span> 
                <span className="font-medium ml-2">{compliance?.score}%</span>
                <Progress value={compliance?.score} className="w-20 h-2 inline-block ml-2" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Timeline & Responsibility</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Responsible:</span> <span className="font-medium">{compliance?.responsible}</span></div>
              <div><span className="text-gray-500">Last Assessment:</span> <span className="font-medium">{compliance?.lastAssessment}</span></div>
              <div><span className="text-gray-500">Next Review:</span> <span className="font-medium">{compliance?.nextReview}</span></div>
              <div><span className="text-gray-500">Days Remaining:</span> 
                <span className={`font-medium ml-2 ${
                  compliance?.daysRemaining <= 30 ? 'text-red-600' :
                  compliance?.daysRemaining <= 60 ? 'text-orange-600' :
                  'text-green-600'
                }`}>
                  {compliance?.daysRemaining} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Requirement Description */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Requirement Description</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{compliance?.description}</p>
        </div>

        {/* Evidence */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Supporting Evidence</h4>
          <div className="grid grid-cols-2 gap-3">
            {compliance?.evidence?.map((evidence, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{evidence}</span>
                <Button size="sm" variant="ghost" className="ml-auto">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Evidence</span>
            </Button>
          </div>
        </div>

        {/* Linked Items */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Linked Audits</h4>
            {compliance?.linkedAudits?.length > 0 ? (
              <div className="space-y-2">
                {compliance.linkedAudits.map((audit, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                    <Link className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">{audit}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No linked audits</p>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Linked Risks</h4>
            {compliance?.linkedRisks?.length > 0 ? (
              <div className="space-y-2">
                {compliance.linkedRisks.map((risk, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-600 font-medium">{risk}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No linked risks</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Available Actions</h4>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Update Status
            </Button>
            <Button size="sm" variant="outline">
              Schedule Review
            </Button>
            <Button size="sm" variant="outline">
              Generate Report
            </Button>
            <Button size="sm" variant="outline">
              Create Finding
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
          <h1 className="text-2xl font-bold text-gray-900">{t('complianceManagement')}</h1>
          <p className="text-gray-600">{t('trackCompliance')}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            {t('exportPdfBtn')}
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            {t('newComplianceBtn')}
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
                <span className="text-sm text-gray-500">Recent Compliance Review:</span>
                <span className="ml-2 font-medium">2024-01-15</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Compliance ID:</span>
                <span className="ml-2 font-medium text-blue-600">CMP-001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Compliance Officer:</span>
                <span className="ml-2 font-medium">IT Security Team</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Department Code:</span>
                <span className="ml-2 font-medium">CMP001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Business User:</span>
                <span className="ml-2 font-medium">Compliance Management</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Compliance Status:</span>
                <span className="ml-2 font-medium">{t('active')}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Primary Standard:</span>
                <span className="ml-2 font-medium">ISO 27001</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Department Label:</span>
                <span className="ml-2 font-medium">--</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A. Compliance Overview Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Health Score */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Compliance Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray={`${overallScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">{overallScore}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Overall Compliance Score</p>
            </div>
          </CardContent>
        </Card>

        {/* Regulation Coverage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Regulation Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="85, 100"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">85%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">ISO 27001</p>
              </div>
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="95, 100"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">95%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">IIA Standards</p>
              </div>
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="78, 100"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">78%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">SOX</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Upcoming Deadlines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.requirementId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.dueDate}</p>
                  <p className={`text-xs ${
                    item.daysRemaining <= 7 ? 'text-red-600' :
                    item.daysRemaining <= 14 ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {item.daysRemaining} days remaining
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Controls"
          value={totalCompliance}
          subtitle="All compliance controls"
          icon={Shield}
          color="blue"
        />
        <MetricCard
          title="Compliant"
          value={compliantCount}
          subtitle="Meeting requirements"
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title="In Progress"
          value={inProgressCount}
          subtitle="Under review"
          icon={Clock}
          color="orange"
        />
        <MetricCard
          title="Gaps Found"
          value={gapCount}
          subtitle="Require attention"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      <div className="flex gap-6">
        {/* B. Compliance Register (Main Content) */}
        <div className="flex-1">
          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={t('searchCompliance')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="gapfound">Gap Found</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={standardFilter} onValueChange={setStandardFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Standards" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Standards</SelectItem>
                    <SelectItem value="iso27001">ISO 27001</SelectItem>
                    <SelectItem value="iiastandards">IIA Standards</SelectItem>
                    <SelectItem value="soxcompliance">SOX Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Register Table */}
          <Card>
            <CardContent className="p-0">
              {filteredCompliance.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noComplianceFound')}</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or add a new compliance item.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Requirement ID / Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('standard')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('responsible')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('complianceStatus')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('lastAssessment')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Linked Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCompliance.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-blue-600">{item.requirementId}</div>
                              <div className="text-sm text-gray-900">{item.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.standard}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.responsible}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Badge className={`${
                                item.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                                item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {item.status}
                              </Badge>
                              <span className="text-xs text-gray-500">{item.score}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.lastAssessment}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-1">
                              {item.linkedAudits.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {item.linkedAudits.length} Audit{item.linkedAudits.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                              {item.linkedRisks.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {item.linkedRisks.length} Risk{item.linkedRisks.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedCompliance(item)}
                                >
                                  {t('viewBtn')}
                                </Button>
                              </DialogTrigger>
                              <ComplianceDetailModal compliance={selectedCompliance} />
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
        </div>

        {/* C. Side Info Pane */}
        {sidebarOpen && (
          <div className="w-80">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Quick Insights</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSidebarOpen(false)}
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Controls</span>
                      <span className="font-medium">{totalCompliance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliant</span>
                      <span className="font-medium text-green-600">{compliantCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Open Gaps</span>
                      <span className="font-medium text-red-600">{gapCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance Rate</span>
                      <span className="font-medium">{Math.round((compliantCount / totalCompliance) * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      View All Findings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Manage Actions
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Risk Assessment
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Review
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-900">ISO 27001 review completed</p>
                        <p className="text-gray-500 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-900">SOX assessment updated</p>
                        <p className="text-gray-500 text-xs">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-900">New evidence uploaded</p>
                        <p className="text-gray-500 text-xs">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-yellow-800">{t('total')}</span>
          <div className="flex space-x-6 text-yellow-700">
            <span>Total Controls: {totalCompliance}</span>
            <span>Compliant: {compliantCount}</span>
            <span>Compliance Rate: {Math.round((compliantCount / totalCompliance) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;

