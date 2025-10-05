import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { underwritingApplications as initialApplications, UnderwritingApplication } from "@/lib/mockData";
type UnderwritingState = {
  applications: UnderwritingApplication[];
  statuses: ('New' | 'In Review' | 'More Info Required' | 'Approved' | 'Declined')[];
};
type UnderwritingActions = {
  updateApplicationStatus: (id: string, newStatus: UnderwritingApplication['status']) => void;
};
export const useUnderwritingStore = create<UnderwritingState & UnderwritingActions>()(
  immer((set) => ({
    applications: initialApplications,
    statuses: ['New', 'In Review', 'More Info Required', 'Approved', 'Declined'],
    updateApplicationStatus: (id, newStatus) => {
      set((state) => {
        const application = state.applications.find((app) => app.id === id);
        if (application) {
          application.status = newStatus;
        }
      });
    },
  }))
);