import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { claims as initialClaims, Claim } from "@/lib/mockData";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
type ClaimState = {
  claims: Claim[];
};
type ClaimActions = {
  getClaimById: (id: string) => Claim | undefined;
  addClaim: (claim: Omit<Claim, "id" | "dateSubmitted" | "statusHistory" | "communicationLog" | "documents"> & { claimDetails: string }) => void;
  updateClaim: (claim: Claim) => void;
  deleteClaim: (id: string) => void;
};
export const useClaimStore = create<ClaimState & ClaimActions>()(
  immer((set, get) => ({
    claims: initialClaims,
    getClaimById: (id) => {
      return get().claims.find((c) => c.id === id);
    },
    addClaim: (claim) => {
      const newClaim: Claim = {
        id: `CLM-2024-${uuidv4().slice(0, 4)}`,
        ...claim,
        dateSubmitted: format(new Date(), "yyyy-MM-dd"),
        documents: [],
        statusHistory: [
          {
            status: claim.status,
            date: format(new Date(), "yyyy-MM-dd"),
            notes: "Claim submitted.",
          },
        ],
        communicationLog: [],
      };
      set((state) => {
        state.claims.unshift(newClaim);
      });
    },
    updateClaim: (updatedClaim) => {
      set((state) => {
        const index = state.claims.findIndex((c) => c.id === updatedClaim.id);
        if (index !== -1) {
          state.claims[index] = updatedClaim;
        }
      });
    },
    deleteClaim: (id) => {
      set((state) => {
        state.claims = state.claims.filter((c) => c.id !== id);
      });
    },
  }))
);