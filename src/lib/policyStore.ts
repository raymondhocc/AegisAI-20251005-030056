import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { policies as initialPolicies, Policy } from "@/lib/mockData";
import { v4 as uuidv4 } from "uuid";
type PolicyState = {
  policies: Policy[];
};
type PolicyActions = {
  getPolicyById: (id: string) => Policy | undefined;
  addPolicy: (policy: Omit<Policy, "id">) => void;
  updatePolicy: (policy: Policy) => void;
  deletePolicy: (id: string) => void;
};
export const usePolicyStore = create<PolicyState & PolicyActions>()(
  immer((set, get) => ({
    policies: initialPolicies,
    getPolicyById: (id) => {
      return get().policies.find((p) => p.id === id);
    },
    addPolicy: (policy) => {
      set((state) => {
        state.policies.unshift({ id: `POL-2024-${uuidv4().slice(0, 4)}`, ...policy });
      });
    },
    updatePolicy: (updatedPolicy) => {
      set((state) => {
        const index = state.policies.findIndex((p) => p.id === updatedPolicy.id);
        if (index !== -1) {
          state.policies[index] = updatedPolicy;
        }
      });
    },
    deletePolicy: (id) => {
      set((state) => {
        state.policies = state.policies.filter((p) => p.id !== id);
      });
    },
  }))
);