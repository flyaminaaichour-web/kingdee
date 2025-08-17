import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { FileText, Scale, Building2, ArrowRight } from 'lucide-react'

function HomePage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Kingdee Qatar Demo projects
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Projects - Front End of Kingdee Project Proposals for Clients for Demonstration purpose. Please be aware that some of the features are disabled.
          </p>
        </div>

        {/* Project Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Auditor FrontEnd Card */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                hoveredCard === 'auditor' ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredCard('auditor')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Auditor FrontEnd
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Comprehensive audit management system with advanced reporting capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Dashboard & Analytics
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Audit Management & Tracking
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Risk Assessment & Compliance
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    PDF Report Generation
                  </div>
                </div>
                <div className="pt-4">
                  <Link to="/auditor">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Access Auditor System
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Legal Case Management Card */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                hoveredCard === 'legal' ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredCard('legal')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Scale className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Legal Case Management
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Complete legal affairs management system with Arabic language support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Case Tracking & Management
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Legal Investigations
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Document Management
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Arabic Language Support
                  </div>
                </div>
                <div className="pt-4">
                  <Link to="/legal">
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Access Legal System
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Data Request System Card */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                hoveredCard === 'data-request' ? 'border-green-500 shadow-lg scale-105' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredCard('data-request')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Data Request System
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Streamline and digitize the process of dataset requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Online Submission Form
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Multi-department Routing
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Request Tracking Interface
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    NDA Upload Workflow
                  </div>
                </div>
                <div className="pt-4">
                  <Link to="/data-request">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Access Data Request System
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-500 text-sm">
              © 2024 Kingdee Qatar. All rights reserved. | Enterprise Business Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


