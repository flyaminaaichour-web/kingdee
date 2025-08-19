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
          <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-gray-600">Track and manage compliance requirements</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Dialog open={isNewComplianceModalOpen} onOpenChange={setIsNewComplianceModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                New Compliance
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
                  <Select value={newComplianceData.status} onValueChange={(value) => setNewComplianceData(prevData => ({ ...prevData, status: value }))}>
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

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Compliance"
          value={totalCompliance}
          subtitle="Requirements"
          icon={Shield}
          color="blue"
        />
        <MetricCard
          title="Compliant"
          value={compliantCount}
          subtitle={`${Math.round((compliantCount / totalCompliance) * 100)}% of total`}
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title="In Progress"
          value={inProgressCount}
          subtitle={`${Math.round((inProgressCount / totalCompliance) * 100)}% of total`}
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Gaps Found"
          value={gapCount}
          subtitle={`${Math.round((gapCount / totalCompliance) * 100)}% of total`}
          icon={AlertTriangle}
          color="red"
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
                  placeholder="Search compliance requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="gapfound">Gap Found</SelectItem>
              </SelectContent>
            </Select>
            <Select value={standardFilter} onValueChange={setStandardFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by standard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Standards</SelectItem>
                <SelectItem value="iso27001">ISO 27001</SelectItem>
                <SelectItem value="sox">SOX</SelectItem>
                <SelectItem value="gdpr">GDPR</SelectItem>
                <SelectItem value="hipaa">HIPAA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Requirements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>
            Manage and track all compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCompliance.map((compliance) => (
              <div key={compliance.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{compliance.name}</h3>
                      <Badge className={`${
                        compliance.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                        compliance.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {compliance.status}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {compliance.requirementId} • {compliance.standard} • Due: {compliance.nextReview}
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <span>Score: {compliance.score}%</span>
                      <span>Responsible: {compliance.responsible}</span>
                      <span className={`${
                        compliance.daysRemaining <= 30 ? 'text-red-600' :
                        compliance.daysRemaining <= 60 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {compliance.daysRemaining} days remaining
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={compliance.score} className="w-20" />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <ComplianceDetailModal compliance={compliance} />
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;

