import React from 'react';

const CasesSimple = () => {
  const cases = [
    {
      id: 'C001',
      caseNumber: '2024/001',
      personalNumber: 'P123456',
      department: 'Civil Service Bureau',
      plaintiff: 'Government Entity',
      defendant: 'John Doe',
      status: 'Under Study',
      amount: 50000,
      assignedEmployee: 'Ahmed Al-Rashid',
      lastUpdate: '2024-01-15'
    },
    {
      id: 'C002',
      caseNumber: '2024/002',
      personalNumber: 'P789012',
      department: 'Government Development',
      plaintiff: 'Ministry of Justice',
      defendant: 'ABC Company',
      status: 'Win',
      amount: 75000,
      assignedEmployee: 'Fatima Al-Zahra',
      lastUpdate: '2024-01-10'
    },
    {
      id: 'C003',
      caseNumber: '2024/003',
      personalNumber: 'P345678',
      department: 'Civil Service Bureau',
      plaintiff: 'State Treasury',
      defendant: 'XYZ Corporation',
      status: 'Loss',
      amount: 120000,
      assignedEmployee: 'Mohammed Al-Mansouri',
      lastUpdate: '2024-01-08'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Legal Cases</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Cases List</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parties
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {caseItem.caseNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {caseItem.personalNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      caseItem.status === 'Under Study' ? 'bg-yellow-100 text-yellow-800' :
                      caseItem.status === 'Win' ? 'bg-green-100 text-green-800' :
                      caseItem.status === 'Loss' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {caseItem.plaintiff} vs {caseItem.defendant}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${caseItem.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {caseItem.assignedEmployee}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {caseItem.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CasesSimple;

