import React, { useState } from 'react';
import { Building2, FileText, Scale, User, Mail, Phone, MapPin, Briefcase, CalendarDays, UploadCloud } from 'lucide-react';
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
    fullName: '',
    qatariId: '',
    nationality: '',
    email: '',
    mobile: '',
    poBox: '',
    employer: '',
    address: '',
    entityType: '',
    infoDescription: '',
    timePeriodFrom: '',
    timePeriodTo: '',
    preferredMethod: 'personal-delivery',
    publishPermission: 'no',
    datasetName: '',
    dataType: '',
    classification: 'non-classified',
    purpose: '',
  });
  const [ndaFile, setNdaFile] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRadioChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    setNdaFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    // For this demo, we'll just simulate a tracking ID.
    const newTrackingId = Math.floor(Math.random() * 100000) + 10000;
    setTrackingId(`#${newTrackingId}`);
    setActiveTab('success');
    console.log('Form Data Submitted:', formData);
    if (ndaFile) {
      console.log('NDA File:', ndaFile.name);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      qatariId: '',
      nationality: '',
      email: '',
      mobile: '',
      poBox: '',
      employer: '',
      address: '',
      entityType: '',
      infoDescription: '',
      timePeriodFrom: '',
      timePeriodTo: '',
      preferredMethod: 'personal-delivery',
      publishPermission: 'no',
      datasetName: '',
      dataType: '',
      classification: 'non-classified',
      purpose: '',
    });
    setTrackingId('');
    setNdaFile(null);
    setActiveTab('submission');
  };

  const handleTrackRequest = (e) => {
    e.preventDefault();
    // In a real application, this would fetch data from a backend based on trackingId
    setActiveTab('tracking');
  };

  const handleNdaUpload = (e) => {
    e.preventDefault();
    // Simulate NDA upload success
    setActiveTab('nda-success');
    console.log('NDA Uploaded:', ndaFile.name);
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
            including online submission, multi-department routing, and request
            tracking.
          </p>
        </div>

        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          {activeTab === 'submission' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input type="text" id="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input type="text" id="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="qatariId">Qatari ID No. *</Label>
                  <Input type="text" id="qatariId" placeholder="Qatari ID No." value={formData.qatariId} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="residencyType">Residency Type *</Label>
                  <Input type="text" id="residencyType" placeholder="Residency Type" value={formData.residencyType} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input type="email" id="email" placeholder="username@email.com" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile *</Label>
                  <Input type="tel" id="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="poBox">P.O. Box</Label>
                  <Input type="text" id="poBox" placeholder="P.O. Box" value={formData.poBox} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="employer">Employer</Label>
                  <Input type="text" id="employer" placeholder="Employer" value={formData.employer} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="address">National/Personal Address</Label>
                  <Input type="text" id="address" placeholder="National/Personal Address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="entityType">Type of Entity</Label>
                  <Select onValueChange={(val) => handleSelectChange('entityType', val)} value={formData.entityType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Information Requested</h2>
              <div>
                <Label htmlFor="infoDescription">A brief and clear description of the information you wish to obtain. Please be specific in describing your information as much as possible.</Label>
                <Textarea id="infoDescription" value={formData.infoDescription} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timePeriodFrom">Time period of the requested information - From</Label>
                  <Input type="date" id="timePeriodFrom" value={formData.timePeriodFrom} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="timePeriodTo">To</Label>
                  <Input type="date" id="timePeriodTo" value={formData.timePeriodTo} onChange={handleInputChange} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Preferred method of receiving information *</h2>
              <p className="text-sm text-gray-600 mb-4">The entity may impose a fee for obtaining the information that will not exceed the cost of preparing and delivering it in its final form.</p>
              <RadioGroup onValueChange={(val) => handleRadioChange('preferredMethod', val)} value={formData.preferredMethod} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal-delivery" id="personal-delivery" />
                  <Label htmlFor="personal-delivery">Personal Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="e-mail" id="e-mail" />
                  <Label htmlFor="e-mail">E-Mail</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal-mail" id="normal-mail" />
                  <Label htmlFor="normal-mail">Normal Mail</Label>
                </div>
              </RadioGroup>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Obtaining permission to publish the information *</h2>
              <RadioGroup onValueChange={(val) => handleRadioChange('publishPermission', val)} value={formData.publishPermission} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="publish-yes" />
                  <Label htmlFor="publish-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="publish-no" />
                  <Label htmlFor="publish-no">No</Label>
                </div>
              </RadioGroup>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Dataset Request Details</h2>
              <div>
                <Label htmlFor="datasetName">Dataset Name</Label>
                <Input type="text" id="datasetName" placeholder="e.g., Population Estimates 2023" value={formData.datasetName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="dataType">Data Type</Label>
                <Select onValueChange={(val) => handleSelectChange('dataType', val)} value={formData.dataType} required>
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
                <RadioGroup onValueChange={(val) => handleRadioChange('classification', val)} value={formData.classification} className="flex space-x-4">
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
              {formData.classification === 'classified' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">NDA Upload</h2>
                  <p className="text-sm text-gray-600 mb-4">Please upload your signed NDA to proceed. (PDF/DOCX only)</p>
                  <div>
                    <Label htmlFor="ndaFile">Upload NDA</Label>
                    <Input type="file" id="ndaFile" accept=".pdf,.docx" onChange={handleFileChange} required />
                  </div>
                </div>
              )}
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
              {formData.classification === 'classified' && !ndaFile && (
                <div className="space-y-4">
                  <p className="text-red-500">Please upload your NDA to complete the request.</p>
                  <Button onClick={() => setActiveTab('nda-upload')}>Upload NDA</Button>
                </div>
              )}
              <Button onClick={() => setActiveTab('tracking-input')}>Track Another Request</Button>
            </div>
          )}

          {activeTab === 'nda-upload' && (
            <form onSubmit={handleNdaUpload} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">NDA Upload</h2>
              <p className="text-sm text-gray-600 mb-4">Please upload your signed NDA to proceed. (PDF/DOCX only)</p>
              <div>
                <Label htmlFor="ndaFile">Upload NDA</Label>
                <Input type="file" id="ndaFile" accept=".pdf,.docx" onChange={handleFileChange} required />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit NDA</Button>
              </div>
            </form>
          )}

          {activeTab === 'nda-success' && (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">NDA Received!</h2>
              <p className="text-lg text-gray-700">
                Your NDA has been received. Awaiting approval.
              </p>
              <Button onClick={() => setActiveTab('tracking-input')}>Track Request Status</Button>
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


