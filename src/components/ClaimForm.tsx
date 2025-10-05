import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useClaimStore } from "@/lib/claimStore";
import { Claim } from "@/lib/mockData";
import { toast } from "sonner";
const claimSchema = z.object({
  policyId: z.string().min(1, { message: "Policy ID is required." }),
  claimant: z.string().min(1, { message: "Claimant name is required." }),
  type: z.string().min(1, { message: "Claim type is required." }),
  status: z.enum(["Approved", "Pending", "Processing", "Denied"]),
  amount: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() === '') return NaN;
      return Number(val);
    },
    z.number().min(0, { message: "Amount must be a positive number." })
  ),
  claimDetails: z.string().min(10, { message: "Please provide at least 10 characters of details." }),
});
type ClaimFormValues = z.infer<typeof claimSchema>;
interface ClaimFormProps {
  claim?: Claim;
  onSuccess: () => void;
}
export function ClaimForm({ claim, onSuccess }: ClaimFormProps) {
  const { addClaim, updateClaim } = useClaimStore();
  const form = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    defaultValues: claim || {
      policyId: "",
      claimant: "",
      type: "",
      amount: 0,
      claimDetails: "",
      status: "Pending",
    },
  });
  const onSubmit: SubmitHandler<ClaimFormValues> = (data) => {
    if (claim) {
      updateClaim({ ...claim, ...data });
      toast.success("Claim updated successfully!");
    } else {
      addClaim(data);
      toast.success("Claim created successfully!");
    }
    onSuccess();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="policyId" render={({ field }) => (
            <FormItem>
              <FormLabel>Policy ID</FormLabel>
              <FormControl><Input placeholder="POL-2024-001" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="claimant" render={({ field }) => (
            <FormItem>
              <FormLabel>Claimant</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Claim Type</FormLabel>
              <FormControl><Input placeholder="Auto - Collision" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="amount" render={({ field }) => (
            <FormItem>
              <FormLabel>Claim Amount ($)</FormLabel>
              <FormControl><Input type="number" placeholder="5400" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Denied">Denied</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="claimDetails" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Claim Details</FormLabel>
              <FormControl><Textarea placeholder="Provide details about the claim..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="flex justify-end">
          <Button type="submit">{claim ? "Save Changes" : "Create Claim"}</Button>
        </div>
      </form>
    </Form>
  );
}