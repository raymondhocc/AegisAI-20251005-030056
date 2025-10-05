import { useParams, Link, useNavigate } from "react-router-dom";
import { usePolicyStore } from "@/lib/policyStore";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  User,
  Shield,
  DollarSign,
  Calendar,
  FileDown,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { PolicyForm } from "@/components/PolicyForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Active": return "default";
    case "Pending": return "secondary";
    case "Expired": return "outline";
    case "Cancelled": return "destructive";
    default: return "secondary";
  }
};
export default function PolicyDetailPage() {
  const { policyId } = useParams<{ policyId: string }>();
  const navigate = useNavigate();
  const { getPolicyById, deletePolicy } = usePolicyStore();
  const policy = getPolicyById(policyId || "");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  if (!policy) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Policy not found</h2>
        <p className="text-slate-500">
          The policy you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/policies">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Policies
          </Link>
        </Button>
      </div>
    );
  }
  const handleDelete = () => {
    deletePolicy(policy.id);
    navigate("/policies");
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/policies">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Policies
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Edit className="mr-2 h-4 w-4" /> Edit Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Policy</DialogTitle>
              </DialogHeader>
              <PolicyForm
                policy={policy}
                onSuccess={() => setIsEditDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Policy
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently cancel
                  policy {policy.id}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Policy Details
            </CardTitle>
            <CardDescription>Policy ID: {policy.id}</CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(policy.status)} className="text-base px-4 py-1">
            {policy.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-700 dark:text-slate-200"><User /> Policyholder Information</h3>
            <div className="pl-8 space-y-1 text-sm">
              <p><strong>Name:</strong> {policy.holder}</p>
              <p><strong>Address:</strong> {policy.policyholderAddress}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-700 dark:text-slate-200"><Shield /> Coverage Details</h3>
            <div className="pl-8 space-y-1 text-sm">
              <p><strong>Type:</strong> {policy.type}</p>
              <p><strong>Coverage:</strong> ${policy.coverageDetails.toLocaleString()}</p>
              <p><strong>Deductible:</strong> ${policy.deductible.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-700 dark:text-slate-200"><DollarSign /> Premium Information</h3>
            <div className="pl-8 space-y-1 text-sm">
              <p><strong>Total Premium:</strong> ${policy.premium.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-700 dark:text-slate-200"><Calendar /> Policy Period</h3>
            <div className="pl-8 space-y-1 text-sm">
              <p><strong>Start Date:</strong> {policy.startDate}</p>
              <p><strong>End Date:</strong> {policy.endDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Premium History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policy.premiumHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>${item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Associated Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-slate-500" />
                <span>Policy_Agreement.pdf</span>
              </div>
              <Button variant="ghost" size="icon" className="hover:text-blue-600"><FileDown className="h-5 w-5" /></Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-slate-500" />
                <span>Endorsement_01.pdf</span>
              </div>
              <Button variant="ghost" size="icon" className="hover:text-blue-600"><FileDown className="h-5 w-5" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}