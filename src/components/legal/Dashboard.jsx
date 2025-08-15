import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Clock, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboardStats, recentActivity, cases } from '../../data/legal/mockData';
import NewCaseForm from './NewCaseForm';

const Dashboard = () => {
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);

  const handleNewCase = () => {
    setShowNewCaseForm(true);
  };

  const handleCloseForm = () => {
    setShowNewCaseForm(false);
  };

  const handleSubmitCase = (caseData) => {
    console.log('New case created:', caseData);
    // Here you would typically send the data to your backend
    setShowNewCaseForm(false);
  };
  // Calculate additional summary metrics
  const totalCasesThisMonth = 15;
  const averageResolutionDays = 12;
  const successRate = 78.5;
  const totalInvestigationsCompleted = 8;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Win':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Loss':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Under Study':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'case':
        return <Scale className="h-4 w-4 text-blue-600" />;
      case 'investigation':
        return <Search className="h-4 w-4 text-orange-600" />;
      case 'contract':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'deadline':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Legal Affairs Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of legal operations and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button onClick={handleNewCase}>
            <FileText className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>
      </div>

      {/* Basic Information Section - Kingdee Style */}
      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
              <ChevronDown className="h-4 w-4 mr-2" />
              Basic Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Recent Case Time:</span>
                <span className="font-medium">2024-01-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recent Case Amount:</span>
                <span className="font-medium">$75,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Case Number:</span>
                <span className="font-medium text-blue-600">2024-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Contact:</span>
                <span className="font-medium">Ahmed Al-Rashid</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Department Code:</span>
                <span className="font-medium">LAD001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Business User:</span>
                <span className="font-medium">Legal Affairs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Contact:</span>
                <span className="font-medium">--</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Department Status:</span>
                <span className="font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Case Category:</span>
                <span className="font-medium">Contract Dispute</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department Label:</span>
                <span className="font-medium">--</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics Section - Kingdee Style */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 p-4">
          <div className="flex space-x-6">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">
              Follow-Up Record
            </button>
            <button className="text-gray-600 pb-2">
              Case Record
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{dashboardStats.activeCases}</div>
              <div className="text-sm text-gray-600">Active Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">2,450,000</div>
              <div className="text-sm text-gray-600">Total Case Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalCasesThisMonth}</div>
              <div className="text-sm text-gray-600">Cases This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{averageResolutionDays}</div>
              <div className="text-sm text-gray-600">Avg Resolution Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content Section - Kingdee Style */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <div className="flex space-x-0">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium border-r border-gray-200">
              Cases List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Investigation List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Contract List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Meeting Minutes
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Agreement List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50">
              Report List
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 border-b border-gray-200 pb-3 mb-4">
            <div className="col-span-2">Case Number</div>
            <div className="col-span-2">Document Number</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Parties</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-2">Assigned To</div>
            <div className="col-span-1">Department</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          {/* Table Content */}
          <div className="space-y-3">
            {cases.slice(0, 5).map((case_) => (
              <div key={case_.id} className="grid grid-cols-12 gap-4 text-sm py-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="col-span-2 font-medium text-blue-600">{case_.caseNumber}</div>
                <div className="col-span-2 text-gray-600">{case_.personalNumber}</div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.status === 'Win' ? 'bg-green-100 text-green-800' :
                    case_.status === 'Loss' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {case_.status}
                  </span>
                </div>
                <div className="col-span-2 text-gray-600">{case_.plaintiff} vs {case_.defendant}</div>
                <div className="col-span-1 font-medium">${case_.amount.toLocaleString()}</div>
                <div className="col-span-2 text-gray-600">{case_.assignedEmployee}</div>
                <div className="col-span-1 text-gray-600">{case_.department}</div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* No Data State */}
          {cases.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No data found
            </div>
          )}
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">Total</span>
          <div className="flex space-x-8 text-sm">
            <span>Active Cases: {dashboardStats.activeCases}</span>
            <span>Total Value: $2,450,000</span>
            <span>Success Rate: {successRate}%</span>
          </div>
        </div>
      </div>

      {/* New Case Form Modal */}
      <NewCaseForm
        isOpen={showNewCaseForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmitCase}
      />
    </div>
  );
};

export default Dashboard;

