import React, { useState } from 'react';
import { Building2, FileText, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

function DataRequestSystem() {
  const [activeTab, setActiveTab] = useState('submission');
  const [trackingId, setTrackingId] = useState('');
  const [formData, setFormData] = useState({
    datasetName: '',
    dataType: '',
    classification: 'non-classified',
    purpose: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, dataType: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prevData) => ({ ...prevData, classification: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    // For this demo, we'll just simulate a tracking ID.
    const newTrackingId = Math.floor(Math.random() * 100000) + 10000;
    setTrackingId(`#${newTrackingId}`);
    setActiveTab('success');
    console.log('Form Data Submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      datasetName: '',
      dataType: '',
      classification: 'non-classified',
      purpose: '',
    });
    setTrackingId('');
    setActiveTab('submission');
  };

  const handleTrackRequest = (e) => {
    e.preventDefault();
    // In a real application, this would fetch data from a backend based on trackingId
    setActiveTab('tracking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-green-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Data Request System
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A system to streamline and digitize the process of dataset requests, 
            including online submission, multi-department routing, and request tracking.
          </p>
        </div>

        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          {activeTab === 'submission' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Request a Dataset</h2>
              <div>
                <Label htmlFor="datasetName">Dataset Name</Label>
                <Input type="text" id="datasetName" placeholder="e.g., Population Estimates 2023" value={formData.datasetName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="dataType">Data Type</Label>
                <Select onValueChange={handleSelectChange} value={formData.dataType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="population">Population</SelectItem>
                    <SelectItem value="trade">Trade</SelectItem>
                    <SelectItem value="economic">Economic</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Classification</Label>
                <RadioGroup onValueChange={handleRadioChange} value={formData.classification} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-classified" id="non-classified" />
                    <Label htmlFor="non-classified">Non-Classified</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classified" id="classified" />
                    <Label htmlFor="classified">Classified</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="purpose">Purpose of Use</Label>
                <Textarea id="purpose" placeholder="Describe the purpose of your request" value={formData.purpose} onChange={handleInputChange} required />
              </div>
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          )}

          {activeTab === 'success' && (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Request Submitted Successfully!</h2>
              <p className="text-lg text-gray-700">
                Your request has been submitted. Tracking ID: <span className="font-bold text-blue-600">{trackingId}</span>
              </p>
              <p className="text-gray-600">Please keep this ID to track your request status.</p>
              <Button onClick={() => setActiveTab('tracking-input')}>Track Another Request</Button>
            </div>
          )}

          {activeTab === 'tracking-input' && (
            <form onSubmit={handleTrackRequest} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Track Your Request</h2>
              <div>
                <Label htmlFor="trackId">Enter Tracking ID</Label>
                <Input type="text" id="trackId" placeholder="e.g., #12345" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} required />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Track Request</Button>
              </div>
            </form>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">My Dataset Requests</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Request Details for {trackingId}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Dataset Name:</strong> {formData.datasetName || 'Population Estimates 2020-25'}</p>
                  <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Approved</span></p>
                  <Button className="mt-4"><FileText className="mr-2 h-4 w-4" /> Download Dataset</Button>
                </CardContent>
              </Card>
              <Button onClick={() => setActiveTab('submission')}>Submit New Request</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataRequestSystem;


