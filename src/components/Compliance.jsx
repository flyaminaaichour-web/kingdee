
import React, { useState } from 'react';
import { Search, Filter, Shield, AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Calendar, Eye, Upload, Link, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '../contexts/LanguageContext';
import { extendedCompliance as initialExtendedCompliance } from '../data/complianceData';

const Compliance = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [standardFilter, setStandardFilter] = useState('all');
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isNewComplianceModalOpen, setIsNewComplianceModalOpen] = useState(false);
  const [extendedCompliance, setExtendedCompliance] = useState(initialExtendedCompliance);
  const [newComplianceData, setNewComplianceData] = useState({
    requirementId: '',
    name: '',
    standard: '',
    status: 'Compliant',
    lastAssessment: '',
    nextReview: '',
    responsible: '',
    description: '',
  });

  const handleNewComplianceChange = (e) => {
    const { id, value } = e.target;
    setNewComplianceData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleNewComplianceSubmit = () => {
    const newId = `CMP-${String(extendedCompliance.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const nextReviewDate = new Date(newComplianceData.nextReview);
    const diffTime = Math.abs(nextReviewDate - new Date());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    setExtendedCompliance(prevCompliance => [
      ...prevCompliance,
      {
        id: newId,
        ...newComplianceData,
        lastAssessment: today,
        score: 0, // Default score for new compliance
        evidence: [],
        linkedAudits: [],
        linkedRisks: [],
        dueDate: newComplianceData.nextReview,
        daysRemaining: diffDays,
      },
    ]);
    setNewComplianceData({
      requirementId: '',
      name: '',
      standard: '',
      status: 'Compliant',
      lastAssessment: '',
      nextReview: '',
      responsible: '',
      description: '',
    });
    setIsNewComplianceModalOpen(false);
  };

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
  const overallScore = totalCompliance > 0 ? Math.round(extendedCompliance.reduce((sum, item) => sum + item.score, 0) / totalCompliance) : 0;

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
            <p className={`text-xs text-gray-500`}>{subtitle}</p>
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
          <Dialog open={isNewComplianceModalOpen} onOpenChange={setIsNewComplianceModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                {t('newComplianceBtn')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Compliance</DialogTitle>
                <DialogDescription>Fill in the details for the new compliance requirement.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="requirementId" className="text-right">Requirement ID</label>
                  <Input id="requirementId" value={newComplianceData.requirementId} onChange={handleNewComplianceChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">Name</label>
                  <Input id="name" value={newComplianceData.name} onChange={handleNewComplianceChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="standard" className="text-right">Standard</label>
                  <Input id="standard" value={newComplianceData.standard} onChange={handleNewComplianceChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">Status</label>
                  <Select id="status" value={newComplianceData.status} onValueChange={(value) => setNewComplianceData(prevData => ({ ...prevData, status: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compliant">Compliant</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Gap Found">Gap Found</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="nextReview" className="text-right">Next Review Date</label>
                  <Input id="nextReview" type="date" value={newComplianceData.nextReview} onChange={handleNewComplianceChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="responsible" className="text-right">Responsible</label>
                  <Input id="responsible" value={newComplianceData.responsible} onChange={handleNewComplianceChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right">Description</label>
                  <Input id="description" value={newComplianceData.description} onChange={handleNewComplianceChange} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleNewComplianceSubmit}>Create Compliance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900">
                  {overallScore}%
                </div>
              </div>
              <p className="text-gray-600">Overall Compliance Score</p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Requirements"
            value={totalCompliance}
            subtitle="All tracked compliance items"
            icon={Shield}
            color="blue"
          />
          <MetricCard
            title="Compliant"
            value={compliantCount}
            subtitle="Requirements met"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="In Progress"
            value={inProgressCount}
            subtitle="Currently being addressed"
            icon={Clock}
            color="yellow"
          />
          <MetricCard
            title="Gap Found"
            value={gapCount}
            subtitle="Non-compliant items"
            icon={AlertTriangle}
            color="red"
          />
          <MetricCard
            title="Upcoming Reviews"
            value={upcomingDeadlines.length}
            subtitle="Within next 30 days"
            icon={Calendar}
            color="purple"
          />
          <MetricCard
            title="Average Score"
            value={`${overallScore}%`}
            subtitle="Across all requirements"
            icon={TrendingUp}
            color="teal"
          />
        </div>
      </div>

      {/* B. Compliance List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('complianceRequirements')}</span>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('searchCompliance')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="gapfound">Gap Found</SelectItem>
                </SelectContent>
              </Select>
              <Select value={standardFilter} onValueChange={setStandardFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Standards</SelectItem>
                  <SelectItem value="iso27001">ISO 27001</SelectItem>
                  <SelectItem value="iiastandards">IIA Standards</SelectItem>
                  <SelectItem value="soxcompliance">SOX Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCompliance.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noComplianceFound')}</h3>
              <p className="text-gray-500">{t('tryAdjustingFilters')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCompliance.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.requirementId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.standard}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${
                          item.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.score}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nextReview}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${
                          item.daysRemaining <= 30 ? 'text-red-600' :
                          item.daysRemaining <= 60 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {item.daysRemaining} days
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                          {selectedCompliance && <ComplianceDetailModal compliance={selectedCompliance} />}
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

      {/* C. Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-purple-600" />
            <span>Upcoming Compliance Deadlines</span>
          </CardTitle>
          <CardDescription>Compliance requirements with upcoming review dates.</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingDeadlines.length === 0 ? (
            <p className="text-gray-500">No upcoming deadlines in the next 30 days.</p>
          ) : (
            <div className="space-y-4">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{item.name} ({item.standard})</p>
                    <p className="text-sm text-gray-600">Responsible: {item.responsible}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Due: {item.nextReview}</p>
                    <p className="text-xs text-red-600">{item.daysRemaining} days left</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;


