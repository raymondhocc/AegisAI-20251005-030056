import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
const premiumData = [
  { month: 'Jan', premium: 400000 }, { month: 'Feb', premium: 300000 },
  { month: 'Mar', premium: 500000 }, { month: 'Apr', premium: 450000 },
  { month: 'May', premium: 600000 }, { month: 'Jun', premium: 550000 },
  { month: 'Jul', premium: 650000 },
];
const policyDistributionData = [
  { name: 'Auto', value: 45 }, { name: 'Home', value: 25 },
  { name: 'Health', value: 20 }, { name: 'Other', value: 10 },
];
const claimsData = [
  { status: 'Approved', count: 120 }, { status: 'Pending', count: 45 },
  { status: 'Denied', count: 15 }, { status: 'Processing', count: 30 },
];
const customerSatisfactionData = [
  { quarter: 'Q1', score: 92 }, { quarter: 'Q2', score: 94 },
  { quarter: 'Q3', score: 93 }, { quarter: 'Q4', score: 96 },
];
const COLORS = ['#2563EB', '#10B981', '#FBBF24', '#9CA3AF'];
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Reports</CardTitle>
          <CardDescription>Visualize key business metrics and trends.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Premiums Collected</CardTitle>
            <CardDescription>Total premiums collected over the last 7 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={premiumData}>
                <defs>
                  <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Area type="monotone" dataKey="premium" stroke="#2563EB" fillOpacity={1} fill="url(#colorPremium)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Policy Distribution</CardTitle>
            <CardDescription>Breakdown of active policies by type.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={policyDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                  {policyDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Claim Status Overview</CardTitle>
            <CardDescription>Current count of claims by status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={claimsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="status" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction (CSAT)</CardTitle>
            <CardDescription>Quarterly customer satisfaction scores.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerSatisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#FBBF24" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}