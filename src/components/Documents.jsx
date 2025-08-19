import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 'doc-001',
      name: 'Q1 2024 Audit Report.pdf',
      type: 'PDF',
      size: '2.5 MB',
      uploadedBy: 'Sarah Al-Mahmoud',
      uploadDate: '2024-04-15',
    },
    {
      id: 'doc-002',
      name: 'IT Security Policy.docx',
      type: 'DOCX',
      size: '1.2 MB',
      uploadedBy: 'Ahmed Al-Rashid',
      uploadDate: '2024-03-20',
    },
    {
      id: 'doc-003',
      name: 'Compliance Checklist.xlsx',
      type: 'XLSX',
      size: '0.8 MB',
      uploadedBy: 'Fatima Al-Zahra',
      uploadDate: '2024-02-10',
    },
    {
      id: 'doc-004',
      name: 'Risk Assessment Guidelines.pdf',
      type: 'PDF',
      size: '3.1 MB',
      uploadedBy: 'Mohammed Al-Mansouri',
      uploadDate: '2024-01-05',
    },
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDocument = {
        id: `doc-${(documents.length + 1).toString().padStart(3, '0')}`,
        name: file.name,
        type: file.name.split('.').pop().toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedBy: 'Current User',
        uploadDate: new Date().toISOString().slice(0, 10),
      };
      setDocuments((prevDocs) => [...prevDocs, newDocument]);
      console.log('File uploaded:', file.name);
    }
  };

  const handleDownload = (docId) => {
    console.log(`Downloading document ${docId}`);
    // Dummy download logic
    alert(`Simulating download for document ID: ${docId}`);
  };

  const handleDelete = (docId) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
    console.log(`Deleting document ${docId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Document Management</h1>
          <p className="text-gray-600 mt-1">Manage all audit-related documents and files</p>
        </div>
        <div className="flex space-x-3">
          <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
        </div>
      </div>

      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-lg font-medium text-gray-900">Document List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search documents..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.id)} className="text-blue-600 hover:text-blue-900">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-900 ml-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;


