
export const extendedCompliance = [
  {
    id: "CMP-001",
    requirementId: "ISO-27001-A.12.1.2",
    name: "Information Security Management",
    standard: "ISO 27001",
    status: "Compliant",
    lastAssessment: "2024-01-01",
    nextReview: "2024-07-01",
    responsible: "IT Security Team",
    score: 95,
    evidence: ["Security Policy Document", "Access Control Matrix", "Incident Response Plan"],
    linkedAudits: ["AUD-2024-001"],
    linkedRisks: ["RSK-001"],
    description: "Establish, implement, maintain and continually improve an information security management system within the context of the organization.",
    dueDate: "2024-07-01",
    daysRemaining: 168
  },
  {
    id: "CMP-002",
    requirementId: "IIA-2120",
    name: "Internal Audit Charter",
    standard: "IIA Standards",
    status: "Compliant",
    lastAssessment: "2023-12-15",
    nextReview: "2024-06-15",
    responsible: "Audit Team",
    score: 98,
    evidence: ["Audit Charter Document", "Board Approval Minutes"],
    linkedAudits: ["AUD-2024-002"],
    linkedRisks: [],
    description: "The internal audit activity must be governed by a charter that is approved by senior management and the board.",
    dueDate: "2024-06-15",
    daysRemaining: 122
  },
  {
    id: "CMP-003",
    requirementId: "SOX-404",
    name: "Financial Controls Assessment",
    standard: "SOX Compliance",
    status: "In Progress",
    lastAssessment: "2024-01-10",
    nextReview: "2024-04-10",
    responsible: "Finance Team",
    score: 78,
    evidence: ["Control Testing Results", "Management Assessment"],
    linkedAudits: ["AUD-2024-003"],
    linkedRisks: ["RSK-002"],
    description: "Management assessment of internal control over financial reporting and auditor attestation.",
    dueDate: "2024-04-10",
    daysRemaining: 56
  },
  {
    id: "CMP-004",
    requirementId: "ISO-27001-A.8.1.1",
    name: "Information Classification",
    standard: "ISO 27001",
    status: "Gap Found",
    lastAssessment: "2024-01-05",
    nextReview: "2024-03-05",
    responsible: "Data Protection Team",
    score: 65,
    evidence: ["Classification Guidelines", "Data Inventory"],
    linkedAudits: [],
    linkedRisks: ["RSK-003"],
    description: "Information shall be classified in terms of legal requirements, value, criticality and sensitivity to unauthorized disclosure or modification.",
    dueDate: "2024-03-05",
    daysRemaining: 21
  },
  {
    id: "CMP-005",
    requirementId: "IIA-1220",
    name: "Due Professional Care",
    standard: "IIA Standards",
    status: "Compliant",
    lastAssessment: "2024-01-12",
    nextReview: "2024-07-12",
    responsible: "Audit Team",
    score: 92,
    evidence: ["Professional Development Records", "Quality Assurance Reviews"],
    linkedAudits: ["AUD-2024-001"],
    linkedRisks: [],
    description: "Internal auditors must apply the care and skill expected of a reasonably prudent and competent internal auditor.",
    dueDate: "2024-07-12",
    daysRemaining: 179
  }
];

// Export the array directly


