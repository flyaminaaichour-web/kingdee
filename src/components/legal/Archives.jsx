import React, { useState } from 'react';
import { Search, FileText, Scale, Gavel, BookOpen, ChevronDown, ChevronUp, PlusCircle, ScanLine, FileImage } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const mockArchiveData = {
  'meeting-minutes': [
    { id: 'MM001', title: 'Board Meeting - Jan 2024', date: '2024-01-15', author: 'Secretary', status: 'Approved', summary: 'Discussion on Q1 budget and strategic initiatives.' },
    { id: 'MM002', title: 'Legal Dept. Weekly - Jan 2024', date: '2024-01-22', author: 'Legal Assistant', status: 'Draft', summary: 'Review of ongoing cases and new legal challenges.' },
  ],
  'agreements': [
    { id: 'AG001', title: 'MOU with Ministry of Education', date: '2023-11-01', parties: 'MoE, Kingdee', status: 'Active', type: 'Bilateral', summary: 'Agreement for educational software implementation.' },
    { id: 'AG002', title: 'Vendor Contract - IT Services', date: '2024-02-10', parties: 'Kingdee, Tech Solutions Inc.', status: 'Signed', type: 'Service', summary: 'Contract for annual IT system maintenance.' },
  ],
  'legislative-opinions': [
    { id: 'LO001', title: 'Opinion on Data Privacy Law', date: '2023-09-20', author: 'Legal Counsel', status: 'Final', reference: 'Law No. 10/2023', summary: 'Interpretation of new data privacy regulations.' },
    { id: 'LO002', title: 'Opinion on Public Procurement', date: '2024-03-05', author: 'Senior Legal Advisor', status: 'Draft', reference: 'Circular 5/2024', summary: 'Guidance on recent changes in procurement policies.' },
  ],
  'legal-opinions': [
    { id: 'LGO001', title: 'Opinion on Contractual Dispute', date: '2024-01-25', author: 'External Counsel', status: 'Final', caseRef: 'Case 2024/005', summary: 'Legal advice on breach of contract claim.' },
    { id: 'LGO002', title: 'Opinion on Employment Law', date: '2023-12-10', author: 'Internal Legal Team', status: 'Final', caseRef: 'HR-2023-012', summary: 'Advice on employee termination procedures.' },
  ],
  'settlements': [
    { id: 'ST001', title: 'Amicable Settlement - Land Dispute', date: '2024-02-01', parties: 'Plaintiff, Defendant', status: 'Settled', amount: 150000, summary: 'Resolution of a long-standing land ownership dispute.' },
    { id: 'ST002', title: 'Dispute Resolution - Commercial', date: '2023-10-15', parties: 'Company A, Company B', status: 'Settled', amount: 75000, summary: 'Settlement for commercial goods delivery issue.' },
  ],
};

const ArchiveSection = ({ title, icon: Icon, data, onAddClick, onRowClick, onPaperClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="mb-6">
      <CardHeader 
        className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-lg font-medium flex items-center">
          <Icon className="h-5 w-5 mr-2 text-blue-600" /> {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onPaperClick(); }}>
            <FileImage className="h-4 w-4 mr-2" /> Paper {title}
          </Button>
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onAddClick(); }}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add New
          </Button>
          {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[0] || {}).map((key) => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick(item)}>
                    {Object.values(item).map((value, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length === 0 && (
            <p className="text-center text-gray-500 py-4">No {title.toLowerCase()} found.</p>
          )}
        </CardContent>
      )}
    </Card>
  );
};

const Archives = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStage, setOcrStage] = useState('');

  const handleAddClick = (type) => {
    setModalType(type);
    setModalData({}); // Clear previous data
    setIsModalOpen(true);
  };

  const handlePaperClick = (type) => {
    setModalType(type);
    setOcrProgress(0);
    setOcrStage('');
    setIsOcrModalOpen(true);
    simulateOcrProcess();
  };

  const simulateOcrProcess = () => {
    const stages = [
      { stage: 'Scanning document...', progress: 20 },
      { stage: 'Processing image...', progress: 40 },
      { stage: 'Extracting text with OCR...', progress: 60 },
      { stage: 'Analyzing document structure...', progress: 80 },
      { stage: 'Converting to digital format...', progress: 100 }
    ];

    stages.forEach((step, index) => {
      setTimeout(() => {
        setOcrStage(step.stage);
        setOcrProgress(step.progress);
        
        if (step.progress === 100) {
          setTimeout(() => {
            setIsOcrModalOpen(false);
            alert(`Paper ${modalType.replace('-', ' ')} successfully converted to digital format using OCR!`);
          }, 1000);
        }
      }, (index + 1) * 1500);
    });
  };

  const handleRowClick = (type, data) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    // In a real application, you would save this data to a backend
    console.log(`Saving ${modalType} data:`, modalData);
    setIsModalOpen(false);
    alert(`New ${modalType} added/updated successfully! (Check console for data)`);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'meeting-minutes':
        return (
          <form className="grid grid-cols-1 gap-4">
            <Label htmlFor="mm-title">Title</Label>
            <Input id="mm-title" value={modalData.title || ''} onChange={(e) => setModalData({ ...modalData, title: e.target.value })} />
            <Label htmlFor="mm-date">Date</Label>
            <Input id="mm-date" type="date" value={modalData.date || ''} onChange={(e) => setModalData({ ...modalData, date: e.target.value })} />
            <Label htmlFor="mm-author">Author</Label>
            <Input id="mm-author" value={modalData.author || ''} onChange={(e) => setModalData({ ...modalData, author: e.target.value })} />
            <Label htmlFor="mm-status">Status</Label>
            <Select value={modalData.status || ''} onValueChange={(value) => setModalData({ ...modalData, status: value })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="mm-summary">Summary</Label>
            <Textarea id="mm-summary" value={modalData.summary || ''} onChange={(e) => setModalData({ ...modalData, summary: e.target.value })} />
          </form>
        );
      case 'agreements':
        return (
          <form className="grid grid-cols-1 gap-4">
            <Label htmlFor="ag-title">Title</Label>
            <Input id="ag-title" value={modalData.title || ''} onChange={(e) => setModalData({ ...modalData, title: e.target.value })} />
            <Label htmlFor="ag-date">Date</Label>
            <Input id="ag-date" type="date" value={modalData.date || ''} onChange={(e) => setModalData({ ...modalData, date: e.target.value })} />
            <Label htmlFor="ag-parties">Parties</Label>
            <Input id="ag-parties" value={modalData.parties || ''} onChange={(e) => setModalData({ ...modalData, parties: e.target.value })} />
            <Label htmlFor="ag-status">Status</Label>
            <Select value={modalData.status || ''} onValueChange={(value) => setModalData({ ...modalData, status: value })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Signed">Signed</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="ag-type">Type</Label>
            <Input id="ag-type" value={modalData.type || ''} onChange={(e) => setModalData({ ...modalData, type: e.target.value })} />
            <Label htmlFor="ag-summary">Summary</Label>
            <Textarea id="ag-summary" value={modalData.summary || ''} onChange={(e) => setModalData({ ...modalData, summary: e.target.value })} />
          </form>
        );
      case 'legislative-opinions':
        return (
          <form className="grid grid-cols-1 gap-4">
            <Label htmlFor="lo-title">Title</Label>
            <Input id="lo-title" value={modalData.title || ''} onChange={(e) => setModalData({ ...modalData, title: e.target.value })} />
            <Label htmlFor="lo-date">Date</Label>
            <Input id="lo-date" type="date" value={modalData.date || ''} onChange={(e) => setModalData({ ...modalData, date: e.target.value })} />
            <Label htmlFor="lo-author">Author</Label>
            <Input id="lo-author" value={modalData.author || ''} onChange={(e) => setModalData({ ...modalData, author: e.target.value })} />
            <Label htmlFor="lo-status">Status</Label>
            <Select value={modalData.status || ''} onValueChange={(value) => setModalData({ ...modalData, status: value })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Final">Final</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="lo-reference">Reference</Label>
            <Input id="lo-reference" value={modalData.reference || ''} onChange={(e) => setModalData({ ...modalData, reference: e.target.value })} />
            <Label htmlFor="lo-summary">Summary</Label>
            <Textarea id="lo-summary" value={modalData.summary || ''} onChange={(e) => setModalData({ ...modalData, summary: e.target.value })} />
          </form>
        );
      case 'legal-opinions':
        return (
          <form className="grid grid-cols-1 gap-4">
            <Label htmlFor="lgo-title">Title</Label>
            <Input id="lgo-title" value={modalData.title || ''} onChange={(e) => setModalData({ ...modalData, title: e.target.value })} />
            <Label htmlFor="lgo-date">Date</Label>
            <Input id="lgo-date" type="date" value={modalData.date || ''} onChange={(e) => setModalData({ ...modalData, date: e.target.value })} />
            <Label htmlFor="lgo-author">Author</Label>
            <Input id="lgo-author" value={modalData.author || ''} onChange={(e) => setModalData({ ...modalData, author: e.target.value })} />
            <Label htmlFor="lgo-status">Status</Label>
            <Select value={modalData.status || ''} onValueChange={(value) => setModalData({ ...modalData, status: value })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Final">Final</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="lgo-caseRef">Case Reference</Label>
            <Input id="lgo-caseRef" value={modalData.caseRef || ''} onChange={(e) => setModalData({ ...modalData, caseRef: e.target.value })} />
            <Label htmlFor="lgo-summary">Summary</Label>
            <Textarea id="lgo-summary" value={modalData.summary || ''} onChange={(e) => setModalData({ ...modalData, summary: e.target.value })} />
          </form>
        );
      case 'settlements':
        return (
          <form className="grid grid-cols-1 gap-4">
            <Label htmlFor="st-title">Title</Label>
            <Input id="st-title" value={modalData.title || ''} onChange={(e) => setModalData({ ...modalData, title: e.target.value })} />
            <Label htmlFor="st-date">Date</Label>
            <Input id="st-date" type="date" value={modalData.date || ''} onChange={(e) => setModalData({ ...modalData, date: e.target.value })} />
            <Label htmlFor="st-parties">Parties</Label>
            <Input id="st-parties" value={modalData.parties || ''} onChange={(e) => setModalData({ ...modalData, parties: e.target.value })} />
            <Label htmlFor="st-status">Status</Label>
            <Select value={modalData.status || ''} onValueChange={(value) => setModalData({ ...modalData, status: value })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Settled">Settled</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="st-amount">Amount</Label>
            <Input id="st-amount" type="number" value={modalData.amount || ''} onChange={(e) => setModalData({ ...modalData, amount: parseFloat(e.target.value) })} />
            <Label htmlFor="st-summary">Summary</Label>
            <Textarea id="st-summary" value={modalData.summary || ''} onChange={(e) => setModalData({ ...modalData, summary: e.target.value })} />
          </form>
        );
      default:
        return <p>No form available for this archive type.</p>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Government Archiving System</h1>
      <p className="text-gray-600 mb-8">
        This system digitalizes paper records using OCR, transforming them into searchable, structured data. 
        Below are the various categories of archived documents, accessible and manageable through this interface.
      </p>

      <div className="space-y-6">
        <ArchiveSection 
          title="Meeting Minutes" 
          icon={FileText} 
          data={mockArchiveData['meeting-minutes']} 
          onAddClick={() => handleAddClick('meeting-minutes')}
          onPaperClick={() => handlePaperClick('meeting-minutes')}
          onRowClick={(data) => handleRowClick('meeting-minutes', data)}
        />
        <ArchiveSection 
          title="Agreements" 
          icon={Scale} 
          data={mockArchiveData['agreements']} 
          onAddClick={() => handleAddClick('agreements')}
          onPaperClick={() => handlePaperClick('agreements')}
          onRowClick={(data) => handleRowClick('agreements', data)}
        />
        <ArchiveSection 
          title="Legislative Opinions" 
          icon={Gavel} 
          data={mockArchiveData['legislative-opinions']} 
          onAddClick={() => handleAddClick('legislative-opinions')}
          onPaperClick={() => handlePaperClick('legislative-opinions')}
          onRowClick={(data) => handleRowClick('legislative-opinions', data)}
        />
        <ArchiveSection 
          title="Legal Opinions" 
          icon={BookOpen} 
          data={mockArchiveData['legal-opinions']} 
          onAddClick={() => handleAddClick('legal-opinions')}
          onPaperClick={() => handlePaperClick('legal-opinions')}
          onRowClick={(data) => handleRowClick('legal-opinions', data)}
        />
        <ArchiveSection 
          title="Settlements" 
          icon={Search} 
          data={mockArchiveData['settlements']} 
          onAddClick={() => handleAddClick('settlements')}
          onPaperClick={() => handlePaperClick('settlements')}
          onRowClick={(data) => handleRowClick('settlements', data)}
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalData.id ? 'Edit' : 'Add New'} {modalType.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</DialogTitle>
            <DialogDescription>
              {modalData.id ? 'Edit the details of this archived document.' : 'Fill in the details for the new archived document.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {renderModalContent()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleModalSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OCR Processing Modal */}
      <Dialog open={isOcrModalOpen} onOpenChange={setIsOcrModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ScanLine className="h-5 w-5 mr-2 text-blue-600" />
              Converting Paper Document to Digital Format
            </DialogTitle>
            <DialogDescription>
              Processing paper {modalType.replace('-', ' ')} using OCR technology...
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{ocrStage}</span>
                <span className="text-sm text-gray-500">{ocrProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${ocrProgress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                OCR is analyzing the document structure and extracting text data...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Archives;


