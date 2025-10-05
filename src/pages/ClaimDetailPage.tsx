import { useParams, Link } from "react-router-dom";
import { useClaimStore } from "@/lib/claimStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  User,
  DollarSign,
  Calendar,
  FileDown,
  MessageSquare,
  History,
  CheckCircle,
  Clock,
  XCircle,
  Loader,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineBody,
} from "@/components/ui/timeline";
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Approved": return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300";
    case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300";
    case "Processing": return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300";
    case "Denied": return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300";
    default: return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-300";
  }
};
const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved": return <CheckCircle className="h-4 w-4" />;
    case "Pending": return <Clock className="h-4 w-4" />;
    case "Processing": return <Loader className="h-4 w-4 animate-spin" />;
    case "Denied": return <XCircle className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};
export default function ClaimDetailPage() {
  const { claimId } = useParams<{ claimId: string }>();
  const { getClaimById } = useClaimStore();
  const claim = getClaimById(claimId || "");
  if (!claim) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Claim not found</h2>
        <p className="text-slate-500">The claim you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link to="/claims"><ArrowLeft className="mr-2 h-4 w-4" /> Go back to Claims</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/claims"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Claims</Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button onClick={() => alert("Edit functionality not yet implemented.")}><Edit className="mr-2 h-4 w-4" /> Edit Claim</Button>
          <Button variant="destructive" onClick={() => alert("Delete functionality not yet implemented.")}><Trash2 className="mr-2 h-4 w-4" /> Delete Claim</Button>
        </div>
      </div>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Claim Details
            </CardTitle>
            <CardDescription>Claim ID: {claim.id} | Policy ID: <Link to={`/policies/${claim.policyId}`} className="text-blue-600 hover:underline">{claim.policyId}</Link></CardDescription>
          </div>
          <Badge className={cn("text-base px-4 py-1", getStatusBadgeClass(claim.status))}>
            {claim.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3"><User className="h-5 w-5 text-slate-500" /><strong>Claimant:</strong><span>{claim.claimant}</span></div>
            <div className="flex items-center gap-3"><DollarSign className="h-5 w-5 text-slate-500" /><strong>Amount:</strong><span>${claim.amount.toLocaleString()}</span></div>
            <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-slate-500" /><strong>Date Submitted:</strong><span>{claim.dateSubmitted}</span></div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-2">Claim Description</h3>
            <p className="text-slate-600 dark:text-slate-300">{claim.claimDetails}</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Status History</CardTitle></CardHeader>
          <CardContent>
            <Timeline>
              {claim.statusHistory.map((item, index) => (
                <TimelineItem key={index}>
                  {index < claim.statusHistory.length - 1 && <TimelineConnector />}
                  <TimelineHeader>
                    <TimelineIcon className={cn(getStatusBadgeClass(item.status))}>
                      {getStatusIcon(item.status)}
                    </TimelineIcon>
                    <TimelineTitle>{item.status}</TimelineTitle>
                    <span className="text-sm text-muted-foreground ml-auto">{item.date}</span>
                  </TimelineHeader>
                  <TimelineBody>{item.notes}</TimelineBody>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2"><FileDown className="h-5 w-5" /> Submitted Documents</CardTitle>
              <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {claim.documents.length > 0 ? claim.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-slate-500" /><span>{doc.name}</span></div>
                  <Button variant="ghost" size="icon" className="hover:text-blue-600"><FileDown className="h-5 w-5" /></Button>
                </div>
              )) : <p className="text-slate-500 text-center py-4">No documents submitted.</p>}
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Communication Log</CardTitle></CardHeader>
            <CardContent>
              {claim.communicationLog.length > 0 ? claim.communicationLog.map((log, index) => (
                <div key={index} className="text-sm mb-2">
                  <p><span className="font-semibold">{log.from}</span> <span className="text-slate-500">({log.date}):</span></p>
                  <p className="pl-4 text-slate-600 dark:text-slate-300 italic">"{log.message}"</p>
                </div>
              )) : <p className="text-slate-500 text-center py-4">No communications logged.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}