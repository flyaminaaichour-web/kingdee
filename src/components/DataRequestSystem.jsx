import React from 'react';
import { Building2 } from 'lucide-react';

function DataRequestSystem() {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            This system provides a comprehensive solution for managing data requests from external users. 
            It features an online submission form, intelligent routing based on data classification, 
            and a secure tracking interface for users to monitor their requests.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Online dataset request submission form</li>
            <li>Multi-department routing based on logic</li>
            <li>Request tracking interface for external users</li>
            <li>NDA upload workflow for classified data</li>
            <li>Dashboard and reporting tools for internal users</li>
            <li>Downloadable dataset access for non-classified requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DataRequestSystem;


