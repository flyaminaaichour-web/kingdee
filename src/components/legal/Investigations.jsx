import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Building,
  Calendar,
  FileText,
  Send,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { investigations } from '../../data/legal/mockData';

const Investigations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestigation, setSelectedInvestigation] = useState(null);

  const filteredInvestigations = investigations.filter(investigation =>
    investigation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investigation.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investigation.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPhaseNumber = (phase) => {
    const phaseMap = {
      'Phase 1: Referral': 1,
      'Phase 2: Notification': 2,
      'Phase 3: Minutes': 3,
      'Phase 4: Work Suspension': 4,
      'Phase 5: HR Actions': 5
    };
    return phaseMap[phase] || 1;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const InvestigationWorkflow = ({ investigation }) => {
    const phases = [
      { id: 1, name: 'Referral Request', icon: FileText },
      { id: 2, name: 'Notification', icon: Send },
      { id: 3, name: 'Minutes', icon: Edit },
      { id: 4, name: 'Work Suspension', icon: AlertTriangle },
      { id: 5, name: 'HR Actions', icon: CheckCircle }
    ];

    const currentPhase = getPhaseNumber(investigation.phase);

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Investigation Workflow</h4>
        <div className="flex items-center justify-between">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = phase.id === currentPhase;
            const isCompleted = phase.id < currentPhase;
            
            return (
              <div key={phase.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive ? 'border-blue-600 bg-blue-600 text-white' :
                  isCompleted ? 'border-green-600 bg-green-600 text-white' :
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="ml-2 hidden md:block">
                  <p className={`text-xs font-medium ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-400'
                  }`}>
                    Phase {phase.id}
                  </p>
                  <p className={`text-xs ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-400'
                  }`}>
                    {phase.name}
                  </p>
                </div>
                {index < phases.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    phase.id < currentPhase ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const InvestigationDetailModal = ({ investigation, onClose }) => {
    if (!investigation) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Investigation Details</h2>
              <Button variant="ghost" onClick={onClose}>×</Button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Investigation Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="font-medium">{investigation.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee:</span>
                    <span className="font-medium">{investigation.employee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{investigation.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{investigation.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned To:</span>
                    <span className="font-medium">{investigation.assignedTo}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Priority:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(investigation.priority)}`}>
                      {investigation.priority}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Phase:</span>
                    <span className="font-medium">{investigation.phase}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investigation.status)}`}>
                      {investigation.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workflow */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <InvestigationWorkflow investigation={investigation} />
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="flex-col h-16 space-y-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-xs">Send Email</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-16 space-y-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs">Send SMS</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-16 space-y-1">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs">Generate Form</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-16 space-y-1">
                    <Edit className="h-4 w-4" />
                    <span className="text-xs">Add Minutes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Update Investigation
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investigations</h1>
          <p className="text-gray-600 mt-1">Track and manage employee investigations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Investigation
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search investigations by title, employee, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Investigations List */}
      <div className="grid gap-4">
        {filteredInvestigations.map((investigation) => (
          <Card key={investigation.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{investigation.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investigation.status)}`}>
                      {investigation.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(investigation.priority)}`}>
                      {investigation.priority}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedInvestigation(investigation)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Employee</p>
                    <p className="text-sm font-medium">{investigation.employee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium">{investigation.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium">{investigation.startDate}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Current Phase</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(getPhaseNumber(investigation.phase) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{investigation.phase}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Assigned to: {investigation.assignedTo}</span>
                <span>Started: {investigation.startDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvestigations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No investigations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or start a new investigation.</p>
          </CardContent>
        </Card>
      )}

      {/* Investigation Detail Modal */}
      {selectedInvestigation && (
        <InvestigationDetailModal 
          investigation={selectedInvestigation} 
          onClose={() => setSelectedInvestigation(null)} 
        />
      )}
    </div>
  );
};

export default Investigations;

