import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Upload,
  FileText,
  History,
  User,
  Clock,
  Laptop,
} from "lucide-react";
import { complianceDocuments, auditTrailEvents } from "@/lib/mockData";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineBody,
} from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
export default function CompliancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredDocuments = complianceDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Archived": return "secondary";
      case "Draft": return "outline";
      default: return "secondary";
    }
  };
  const getActionIcon = (action: string) => {
    if (action.includes("LOGIN")) return <User className="h-4 w-4" />;
    if (action.includes("POLICY") || action.includes("CLAIM") || action.includes("DOCUMENT")) return <FileText className="h-4 w-4" />;
    if (action.includes("AI")) return <Laptop className="h-4 w-4" />;
    return <History className="h-4 w-4" />;
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Center</CardTitle>
          <CardDescription>
            Manage regulatory documents and monitor system audit trails.
          </CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documents">Document Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Compliance Documents</CardTitle>
                <CardDescription>
                  Search, view, and manage all compliance-related documents.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-64"
                  />
                </div>
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{doc.version}</TableCell>
                        <TableCell>{doc.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(doc.status)}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Trail</CardTitle>
              <CardDescription>
                A chronological log of system activities and user actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                {auditTrailEvents.map((event, index) => (
                  <TimelineItem key={event.id}>
                    {index < auditTrailEvents.length - 1 && <TimelineConnector />}
                    <TimelineHeader>
                      <TimelineIcon className="bg-slate-200 dark:bg-slate-700">
                        {getActionIcon(event.action)}
                      </TimelineIcon>
                      <TimelineTitle>{event.action.replace(/_/g, ' ')}</TimelineTitle>
                      <span className="text-sm text-muted-foreground ml-auto flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {event.timestamp}
                      </span>
                    </TimelineHeader>
                    <TimelineBody>
                      <p>{event.details}</p>
                      <p className="text-xs text-slate-500 mt-1">User: {event.user} | IP: {event.ipAddress}</p>
                    </TimelineBody>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}