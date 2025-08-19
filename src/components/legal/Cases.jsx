import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  DollarSign,
  FileText,
  Eye,
  Edit,
  ChevronDown,
  Scale,
  PlusCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cases as importedCases } from '../../data/legal/mockData';

// Fallback cases data
const mockCasesData = [
  {
    id: 'C001',
    caseNumber: '2024/001',
    personalNumber: 'P123456',
    year: 2024,
    type: 'Preliminary',
    department: 'Civil Service Bureau',
    plaintiff: 'Government Entity',
    defendant: 'John Doe',
    status: 'Under Study',
    amount: 50000,
    assignedEmployee: 'Ahmed Al-Rashid',
    lastUpdate: '2024-01-15',
    summary: 'Contract dispute regarding IT services delivery and payment terms.'
  },
  {
    id: 'C002',
    caseNumber: '2024/002',
    personalNumber: 'P789012',
    year: 2024,
    type: 'Appeal',
    department: 'Government Development',
    plaintiff: 'Ministry of Justice',
    defendant: 'ABC Company',
    status: 'Win',
    amount: 75000,
    assignedEmployee: 'Fatima Al-Zahra',
    lastUpdate: '2024-01-10',
    summary: 'Employment termination dispute with compensation claims.'
  },
  {
    id: 'C003',
    caseNumber: '2024/003',
    personalNumber: 'P345678',
    year: 2024,
    type: 'Enforcement',
    department: 'Civil Service Bureau',
    plaintiff: 'State Treasury',
    defendant: 'XYZ Corporation',
    status: 'Loss',
    amount: 120000,
    assignedEmployee: 'Mohammed Al-Mansouri',
    lastUpdate: '2024-01-08',
    summary: 'Breach of contract for construction project delays.'
  }
];

// Use imported cases if available, otherwise use fallback
const initialCases = importedCases && Array.isArray(importedCases) ? importedCases : mockCasesData;

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [cases, setCases] = useState(initialCases);
  const [newCaseData, setNewCaseData] = useState({
    caseNumber: '',
    personalNumber: '',
    status: 'Under Study',
    plaintiff: '',
    defendant: '',
    amount: 0,
    assignedEmployee: '',
    department: '',
    lastUpdate: new Date().toISOString().split('T')[0],
    summary: '',
  });

  // Ensure IDs are numbers for Math.max to work correctly
  useEffect(() => {
    try {
      setCases(prevCases => {
        if (!Array.isArray(prevCases)) {
          console.warn('Cases is not an array, using fallback data');
          return mockCasesData;
        }
        return prevCases.map(caseItem => ({
          ...caseItem,
          id: typeof caseItem.id === 'string' ? parseInt(caseItem.id.replace('C', '')) : caseItem.id
        }));
      });
    } catch (error) {
      console.error('Error processing cases data:', error);
      setCases(mockCasesData);
    }
  }, []);

  const handleNewCaseChange = (e) => {
    const { id, value } = e.target;
    setNewCaseData(prevData => ({
      ...prevData,
      [id]: id === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleNewCaseSubmit = () => {
    const newId = cases.length > 0 ? Math.max(...cases.map(c => c.id)) + 1 : 1;
    setCases(prevCases => [
      ...prevCases,
      {
        id: newId,
        ...newCaseData,
      },
    ]);
    setNewCaseData({
      caseNumber: '',
      personalNumber: '',
      status: 'Under Study',
      plaintiff: '',
      defendant: '',
      amount: 0,
      assignedEmployee: '',
      department: '',
      lastUpdate: new Date().toISOString().split('T')[0],
      summary: '',
    });
    setIsNewCaseModalOpen(false);
  };

  // Calculate summary metrics
  const totalCases = cases.length;
  const totalValue = cases.reduce((sum, case_) => sum + case_.amount, 0);
  const winCases = cases.filter(case_ => case_.status === 'Win').length;
  const lossCases = cases.filter(case_ => case_.status === 'Loss').length;
  const underStudyCases = cases.filter(case_ => case_.status === 'Under Study').length;

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.plaintiff.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.defendant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Cases Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all legal cases and proceedings</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Dialog open={isNewCaseModalOpen} onOpenChange={setIsNewCaseModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Scale className="h-4 w-4 mr-2" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>Fill in the details for the new legal case.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="caseNumber" className="text-right">Case Number</label>
                  <Input id="caseNumber" value={newCaseData.caseNumber} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="personalNumber" className="text-right">Personal Number</label>
                  <Input id="personalNumber" value={newCaseData.personalNumber} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">Status</label>
                  <Select value={newCaseData.status} onValueChange={(value) => setNewCaseData(prevData => ({ ...prevData, status: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Win">Win</SelectItem>
                      <SelectItem value="Loss">Loss</SelectItem>
                      <SelectItem value="Under Study">Under Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="plaintiff" className="text-right">Plaintiff</label>
                  <Input id="plaintiff" value={newCaseData.plaintiff} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="defendant" className="text-right">Defendant</label>
                  <Input id="defendant" value={newCaseData.defendant} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="amount" className="text-right">Amount</label>
                  <Input id="amount" type="number" value={newCaseData.amount} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="assignedEmployee" className="text-right">Assigned Employee</label>
                  <Input id="assignedEmployee" value={newCaseData.assignedEmployee} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="department" className="text-right">Department</label>
                  <Input id="department" value={newCaseData.department} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="summary" className="text-right">Summary</label>
                  <Input id="summary" value={newCaseData.summary} onChange={handleNewCaseChange} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleNewCaseSubmit}>Create Case</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <span className="font-medium">{cases.length > 0 ? cases[cases.length - 1].lastUpdate : '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recent Case Amount:</span>
                <span className="font-medium">${cases.length > 0 ? cases[cases.length - 1].amount.toLocaleString() : '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Case Number:</span>
                <span className="font-medium text-blue-600">{cases.length > 0 ? cases[cases.length - 1].caseNumber : '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Contact Address:</span>
                <span className="font-medium">--</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Code:</span>
                <span className="font-medium">LAW001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Business User:</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Contact:</span>
                <span className="font-medium">--</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Stratification:</span>
                <span className="font-medium">High Priority</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Category:</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Label:</span>
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
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalCases}</div>
              <div className="text-sm text-gray-600">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Case Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{winCases}</div>
              <div className="text-sm text-gray-600">Cases Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{lossCases}</div>
              <div className="text-sm text-gray-600">Cases Lost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{underStudyCases}</div>
              <div className="text-sm text-gray-600">Under Study</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center space-x-4 bg-white p-4 border border-gray-200 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search cases by number, parties, or summary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Under Study">Under Study</option>
          </select>
        </div>
      </div>

      {/* Cases Table - Kingdee Style */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <div className="flex space-x-0">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium border-r border-gray-200">
              Cases List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Case Order List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Case Issue List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Case Return List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50 border-r border-gray-200">
              Prepayment Receipt List
            </button>
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-50">
              Receipt List
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
            {filteredCases.map((case_) => (
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
                <div className="col-span-1 flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedCase(case_)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* No Data State */}
          {filteredCases.length === 0 && (
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
            <span>Total Cases: {filteredCases.length}</span>
            <span>Total Value: ${filteredCases.reduce((sum, case_) => sum + case_.amount, 0).toLocaleString()}</span>
            <span>Win Rate: {filteredCases.length > 0 ? Math.round((filteredCases.filter(c => c.status === 'Win').length / filteredCases.length) * 100) : 0}%</span>
          </div>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Case Details</h2>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Case Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Case Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Case Number:</span>
                      <span className="font-medium">{selectedCase.caseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Personal Number:</span>
                      <span className="font-medium">{selectedCase.personalNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedCase.status === 'Win' ? 'bg-green-100 text-green-800' :
                        selectedCase.status === 'Loss' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {selectedCase.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${selectedCase.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Assignment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assigned Employee:</span>
                      <span className="font-medium">{selectedCase.assignedEmployee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedCase.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="font-medium">{selectedCase.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Parties */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Parties Involved</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Plaintiff</h4>
                    <p className="text-gray-600">{selectedCase.plaintiff}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Defendant</h4>
                    <p className="text-gray-600">{selectedCase.defendant}</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Case Summary</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedCase.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cases;


