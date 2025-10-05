import {
  ShieldCheck,
  FileText,
  Activity,
  BarChart,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
export interface Policy {
  id: string;
  holder: string;
  policyholderAddress: string;
  type: "Auto Insurance" | "Home Insurance" | "Health Insurance" | "Travel Insurance" | "Commercial Property";
  status: "Active" | "Pending" | "Expired" | "Cancelled";
  premium: number;
  coverageDetails: number;
  deductible: number;
  startDate: string;
  endDate: string;
  premiumHistory: {
    date: string;
    amount: number;
    status: "Paid" | "Pending";
  }[];
}
export interface Claim {
  id: string;
  policyId: string;
  claimant: string;
  type: string;
  status: "Approved" | "Pending" | "Processing" | "Denied";
  amount: number;
  dateSubmitted: string;
  claimDetails: string;
  documents: { name: string; url: string }[];
  statusHistory: { status: string; date: string; notes: string }[];
  communicationLog: { date: string; from: string; message: string }[];
}
export interface UnderwritingApplication {
  id: string;
  applicantName: string;
  policyType: Policy['type'];
  submittedDate: string;
  aiRiskScore: number; // 0-100
  status: 'New' | 'In Review' | 'More Info Required' | 'Approved' | 'Declined';
  underwriter?: string;
}
export interface ComplianceDocument {
  id: string;
  name: string;
  category: 'Regulatory Filings' | 'Internal Policies' | 'Audit Reports' | 'Training Materials';
  version: string;
  lastUpdated: string;
  status: 'Active' | 'Archived' | 'Draft';
}
export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}
export const user = {
  name: "Admin User",
  email: "admin@aegis.ai",
  avatar: "/placeholder-user.jpg",
};
export const kpiData = [
  {
    title: "Policies Issued (Q2)",
    value: "1,204",
    change: "+12.5%",
    changeType: "increase" as "increase" | "decrease",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    title: "Pending Claims",
    value: "82",
    change: "+5.1%",
    changeType: "increase" as "increase" | "decrease",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  {
    title: "Total Premiums",
    value: "$2.3M",
    change: "+8.2%",
    changeType: "increase" as "increase" | "decrease",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Customer Satisfaction",
    value: "96%",
    change: "-0.5%",
    changeType: "decrease" as "increase" | "decrease",
    icon: Users,
    color: "text-purple-500",
  },
];
export const policyChartData = [
  { name: "Jan", policies: 400, premiums: 240000 },
  { name: "Feb", policies: 300, premiums: 139800 },
  { name: "Mar", policies: 500, premiums: 980000 },
  { name: "Apr", policies: 478, premiums: 390800 },
  { name: "May", policies: 610, premiums: 480000 },
  { name: "Jun", policies: 580, premiums: 380000 },
];
export const claimsChartData = [
  { name: "Auto", value: 400 },
  { name: "Home", value: 300 },
  { name: "Health", value: 200 },
  { name: "Travel", value: 278 },
];
export const policies: Policy[] = [
  {
    id: "POL-2024-001",
    holder: "John Doe",
    policyholderAddress: "123 Maple Street, Springfield, USA",
    type: "Auto Insurance",
    status: "Active",
    premium: 1200,
    coverageDetails: 50000,
    deductible: 500,
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    premiumHistory: [
      { date: "2024-01-15", amount: 1200, status: "Paid" },
    ],
  },
  {
    id: "POL-2024-002",
    holder: "Jane Smith",
    policyholderAddress: "456 Oak Avenue, Metropolis, USA",
    type: "Home Insurance",
    status: "Active",
    premium: 2500,
    coverageDetails: 300000,
    deductible: 1000,
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    premiumHistory: [
      { date: "2024-02-01", amount: 2500, status: "Paid" },
    ],
  },
  {
    id: "POL-2024-003",
    holder: "Acme Corp",
    policyholderAddress: "789 Industrial Park, Gotham, USA",
    type: "Commercial Property",
    status: "Expired",
    premium: 15000,
    coverageDetails: 2000000,
    deductible: 10000,
    startDate: "2023-03-10",
    endDate: "2024-03-09",
    premiumHistory: [
      { date: "2023-03-10", amount: 15000, status: "Paid" },
    ],
  },
  {
    id: "POL-2024-004",
    holder: "Emily White",
    policyholderAddress: "101 Pine Lane, Star City, USA",
    type: "Travel Insurance",
    status: "Pending",
    premium: 350,
    coverageDetails: 10000,
    deductible: 250,
    startDate: "2024-06-20",
    endDate: "2024-07-20",
    premiumHistory: [
      { date: "2024-06-15", amount: 350, status: "Pending" },
    ],
  },
  {
    id: "POL-2024-005",
    holder: "Michael Brown",
    policyholderAddress: "212 Birch Road, Central City, USA",
    type: "Health Insurance",
    status: "Active",
    premium: 4800,
    coverageDetails: 100000,
    deductible: 2000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    premiumHistory: [
      { date: "2024-01-01", amount: 400, status: "Paid" },
      { date: "2024-02-01", amount: 400, status: "Paid" },
      { date: "2024-03-01", amount: 400, status: "Paid" },
    ],
  },
  {
    id: "POL-2024-006",
    holder: "Sarah Green",
    policyholderAddress: "333 Cedar Blvd, Coast City, USA",
    type: "Auto Insurance",
    status: "Cancelled",
    premium: 950,
    coverageDetails: 40000,
    deductible: 500,
    startDate: "2024-04-05",
    endDate: "2025-04-04",
    premiumHistory: [
      { date: "2024-04-05", amount: 950, status: "Paid" },
    ],
  },
];
export const claims: Claim[] = [
  {
    id: "CLM-2024-001",
    policyId: "POL-2024-001",
    claimant: "John Doe",
    type: "Auto - Collision",
    status: "Approved",
    amount: 5400,
    dateSubmitted: "2024-05-20",
    claimDetails: "Collision with another vehicle on I-95. Front bumper and headlight damage.",
    documents: [{ name: "Police_Report.pdf", url: "#" }, { name: "Damage_Photos.zip", url: "#" }],
    statusHistory: [
      { status: "Submitted", date: "2024-05-20", notes: "Claim submitted online." },
      { status: "Processing", date: "2024-05-21", notes: "AI verification complete. Adjuster assigned." },
      { status: "Approved", date: "2024-05-25", notes: "Claim approved. Payment issued." },
    ],
    communicationLog: [
      { date: "2024-05-22", from: "AI Assistant", message: "We have received your documents. An adjuster will contact you within 24 hours." },
    ],
  },
  {
    id: "CLM-2024-002",
    policyId: "POL-2024-002",
    claimant: "Jane Smith",
    type: "Home - Water Damage",
    status: "Pending",
    amount: 12500,
    dateSubmitted: "2024-06-10",
    claimDetails: "Burst pipe in the basement caused significant water damage to flooring and walls.",
    documents: [{ name: "Plumber_Invoice.pdf", url: "#" }, { name: "Damage_Photos.zip", url: "#" }],
    statusHistory: [
      { status: "Submitted", date: "2024-06-10", notes: "Claim submitted via mobile app." },
      { status: "Pending", date: "2024-06-11", notes: "Awaiting contractor estimate." },
    ],
    communicationLog: [
      { date: "2024-06-11", from: "Support Agent", message: "Please upload the estimate from your contractor to proceed." },
    ],
  },
  {
    id: "CLM-2024-003",
    policyId: "POL-2024-005",
    claimant: "Michael Brown",
    type: "Health - Hospitalization",
    status: "Processing",
    amount: 8900,
    dateSubmitted: "2024-06-05",
    claimDetails: "Emergency appendectomy surgery and 2-day hospital stay.",
    documents: [{ name: "Hospital_Bill.pdf", url: "#" }],
    statusHistory: [
      { status: "Submitted", date: "2024-06-05", notes: "Claim submitted." },
      { status: "Processing", date: "2024-06-06", notes: "Verifying coverage with provider." },
    ],
    communicationLog: [],
  },
  {
    id: "CLM-2024-004",
    policyId: "POL-2024-001",
    claimant: "John Doe",
    type: "Auto - Windshield",
    status: "Denied",
    amount: 300,
    dateSubmitted: "2024-06-01",
    claimDetails: "Crack in windshield from a rock on the highway.",
    documents: [],
    statusHistory: [
      { status: "Submitted", date: "2024-06-01", notes: "Claim submitted." },
      { status: "Denied", date: "2024-06-02", notes: "Coverage does not include glass repair." },
    ],
    communicationLog: [],
  },
  {
    id: "CLM-2024-005",
    policyId: "POL-2024-003",
    claimant: "Acme Corp",
    type: "Commercial - Fire",
    status: "Approved",
    amount: 250000,
    dateSubmitted: "2024-02-15",
    claimDetails: "Small fire in warehouse section B. Damage to inventory and structure.",
    documents: [{ name: "Fire_Dept_Report.pdf", url: "#" }],
    statusHistory: [
      { status: "Submitted", date: "2024-02-15", notes: "Claim submitted." },
      { status: "Processing", date: "2024-02-18", notes: "On-site inspection completed." },
      { status: "Approved", date: "2024-03-01", notes: "Claim approved." },
    ],
    communicationLog: [],
  },
];
export const underwritingApplications: UnderwritingApplication[] = [
  { id: 'APP-001', applicantName: 'Robert Johnson', policyType: 'Home Insurance', submittedDate: '2024-06-28', aiRiskScore: 25, status: 'New', underwriter: 'Unassigned' },
  { id: 'APP-002', applicantName: 'Patricia Williams', policyType: 'Auto Insurance', submittedDate: '2024-06-27', aiRiskScore: 45, status: 'In Review', underwriter: 'Alice' },
  { id: 'APP-003', applicantName: 'Linda Davis', policyType: 'Commercial Property', submittedDate: '2024-06-26', aiRiskScore: 85, status: 'More Info Required', underwriter: 'Bob' },
  { id: 'APP-004', applicantName: 'James Miller', policyType: 'Health Insurance', submittedDate: '2024-06-25', aiRiskScore: 15, status: 'Approved', underwriter: 'Alice' },
  { id: 'APP-005', applicantName: 'Barbara Wilson', policyType: 'Auto Insurance', submittedDate: '2024-06-24', aiRiskScore: 92, status: 'Declined', underwriter: 'System' },
  { id: 'APP-006', applicantName: 'David Moore', policyType: 'Home Insurance', submittedDate: '2024-06-28', aiRiskScore: 30, status: 'New', underwriter: 'Unassigned' },
  { id: 'APP-007', applicantName: 'Jennifer Taylor', policyType: 'Travel Insurance', submittedDate: '2024-06-27', aiRiskScore: 10, status: 'In Review', underwriter: 'Bob' },
  { id: 'APP-008', applicantName: 'Charles Anderson', policyType: 'Auto Insurance', submittedDate: '2024-06-26', aiRiskScore: 60, status: 'In Review', underwriter: 'Alice' },
];
export const complianceDocuments: ComplianceDocument[] = [
  { id: 'DOC-001', name: 'IFRS 17 Implementation Guide', category: 'Regulatory Filings', version: 'v2.1', lastUpdated: '2024-06-15', status: 'Active' },
  { id: 'DOC-002', name: 'Data Privacy Policy', category: 'Internal Policies', version: 'v3.0', lastUpdated: '2024-05-20', status: 'Active' },
  { id: 'DOC-003', name: 'Q1 2024 Financial Audit', category: 'Audit Reports', version: 'v1.0', lastUpdated: '2024-04-30', status: 'Archived' },
  { id: 'DOC-004', name: 'Anti-Money Laundering (AML) Procedures', category: 'Internal Policies', version: 'v2.5', lastUpdated: '2024-06-01', status: 'Active' },
  { id: 'DOC-005', name: 'Cybersecurity Training Module', category: 'Training Materials', version: 'v1.2', lastUpdated: '2024-03-10', status: 'Active' },
  { id: 'DOC-006', name: 'Annual Report 2023', category: 'Regulatory Filings', version: 'v1.0', lastUpdated: '2024-02-28', status: 'Archived' },
];
export const auditTrailEvents: AuditEvent[] = [
  { id: 'EVT-001', timestamp: '2024-06-28 10:15:23', user: 'admin@aegis.ai', action: 'LOGIN_SUCCESS', details: 'User logged in successfully.', ipAddress: '192.168.1.1' },
  { id: 'EVT-002', timestamp: '2024-06-28 10:16:05', user: 'admin@aegis.ai', action: 'POLICY_VIEW', details: 'Viewed policy POL-2024-001.', ipAddress: '192.168.1.1' },
  { id: 'EVT-003', timestamp: '2024-06-28 10:20:41', user: 'alice@aegis.ai', action: 'CLAIM_STATUS_UPDATE', details: 'Updated claim CLM-2024-003 status to Processing.', ipAddress: '192.168.1.5' },
  { id: 'EVT-004', timestamp: '2024-06-28 10:25:11', user: 'system', action: 'AI_RISK_ASSESSMENT', details: 'Completed risk assessment for application APP-006.', ipAddress: 'N/A' },
  { id: 'EVT-005', timestamp: '2024-06-28 10:30:00', user: 'bob@aegis.ai', action: 'DOCUMENT_UPLOAD', details: 'Uploaded document "Contractor_Estimate.pdf" to claim CLM-2024-002.', ipAddress: '192.168.1.8' },
  { id: 'EVT-006', timestamp: '2024-06-28 10:32:50', user: 'admin@aegis.ai', action: 'LOGOUT', details: 'User logged out.', ipAddress: '192.168.1.1' },
];