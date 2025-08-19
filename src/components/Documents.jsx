
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Compliance Report Q1 2024', type: 'PDF', date: '2024-03-15' },
    { id: 2, name: 'Annual Compliance Checklist', type: 'DOCX', date: '2024-01-20' },
    { id: 3, name: 'GDPR Compliance Audit', type: 'PDF', date: '2023-11-01' },
    { id: 4, name: 'ISO 27001 Certification', type: 'PDF', date: '2023-09-28' },
  ]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading file: ${selectedFile.name}`);
      // In a real application, you would send this file to a backend server
      // For now, we'll just clear the selected file
      setSelectedFile(null);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Compliance Documents</h2>

      {/* File Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Upload New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input type="file" onChange={handleFileChange} className="flex-grow" />
            <Button onClick={handleUpload} disabled={!selectedFile}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
          {selectedFile && <p className="mt-2 text-sm text-gray-500">Selected file: {selectedFile.name}</p>}
        </CardContent>
      </Card>

      {/* Document List Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Existing Compliance Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="text-gray-500">No documents found.</p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
                  <div className="flex items-center">
                    <FileText className="mr-3 h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-lg">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type} - {doc.date}</p>
                    </div>
                  </div>
                  <Button variant="outline">View</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;


