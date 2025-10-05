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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { usePolicyStore } from "@/lib/policyStore";
import { Policy } from "@/lib/mockData";
import { toast } from "sonner";
const policySchema = z.object({
  holder: z.string().min(1, { message: "Policyholder name is required." }),
  policyholderAddress: z.string().min(1, { message: "Address is required." }),
  type: z.enum(["Auto Insurance", "Home Insurance", "Health Insurance", "Travel Insurance", "Commercial Property"], {
    required_error: "Policy type is required.",
  }),
  status: z.enum(["Active", "Pending", "Expired", "Cancelled"], {
    required_error: "Status is required.",
  }),
  premium: z.number({ invalid_type_error: "Premium is required." }).min(0, { message: "Premium must be a positive number." }),
  coverageDetails: z.number({ invalid_type_error: "Coverage is required." }).min(0, { message: "Coverage must be a positive number." }),
  deductible: z.number({ invalid_type_error: "Deductible is required." }).min(0, { message: "Deductible must be a positive number." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date.",
  path: ["endDate"],
});
type PolicyFormValues = z.infer<typeof policySchema>;
interface PolicyFormProps {
  policy?: Policy;
  onSuccess: () => void;
}
export function PolicyForm({ policy, onSuccess }: PolicyFormProps) {
  const { addPolicy, updatePolicy } = usePolicyStore();
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: policy
      ? {
          ...policy,
          startDate: new Date(policy.startDate),
          endDate: new Date(policy.endDate),
        }
      : {
          holder: "",
          policyholderAddress: "",
          type: undefined,
          status: undefined,
          premium: 0,
          coverageDetails: 0,
          deductible: 0,
          startDate: undefined,
          endDate: undefined,
        },
  });
  const onSubmit: SubmitHandler<PolicyFormValues> = (data) => {
    const formattedData = {
      ...data,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
    };
    if (policy) {
      updatePolicy({ ...policy, ...formattedData });
      toast.success("Policy updated successfully!");
    } else {
      const newPolicyData = {
        ...formattedData,
        premiumHistory: [{ date: format(new Date(), "yyyy-MM-dd"), amount: data.premium, status: "Pending" as const }],
      };
      addPolicy(newPolicyData);
      toast.success("Policy created successfully!");
    }
    onSuccess();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="holder" render={({ field }) => (
            <FormItem>
              <FormLabel>Policyholder Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="policyholderAddress" render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a policy type" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Auto Insurance">Auto Insurance</SelectItem>
                  <SelectItem value="Home Insurance">Home Insurance</SelectItem>
                  <SelectItem value="Health Insurance">Health Insurance</SelectItem>
                  <SelectItem value="Travel Insurance">Travel Insurance</SelectItem>
                  <SelectItem value="Commercial Property">Commercial Property</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="premium" render={({ field }) => (
            <FormItem>
              <FormLabel>Premium ($)</FormLabel>
              <FormControl><Input type="number" placeholder="1200" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="coverageDetails" render={({ field }) => (
            <FormItem>
              <FormLabel>Coverage ($)</FormLabel>
              <FormControl><Input type="number" placeholder="50000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="deductible" render={({ field }) => (
            <FormItem>
              <FormLabel>Deductible ($)</FormLabel>
              <FormControl><Input type="number" placeholder="500" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="startDate" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="endDate" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="flex justify-end">
          <Button type="submit">{policy ? "Save Changes" : "Create Policy"}</Button>
        </div>
      </form>
    </Form>
  );
}