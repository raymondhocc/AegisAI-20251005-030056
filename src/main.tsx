import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import "@/index.css";
import { LoginPage } from "@/pages/LoginPage";
import Layout from "@/components/Layout";
import DashboardPage from "@/pages/DashboardPage";
import PoliciesPage from "@/pages/PoliciesPage";
import PolicyDetailPage from "@/pages/PolicyDetailPage";
import ClaimsPage from "@/pages/ClaimsPage";
import ClaimDetailPage from "@/pages/ClaimDetailPage";
import UnderwritingPage from "@/pages/UnderwritingPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import CompliancePage from "@/pages/CompliancePage";
import SettingsPage from "@/pages/SettingsPage";
import { Toaster } from "@/components/ui/sonner";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "policies", element: <PoliciesPage /> },
      { path: "policies/:policyId", element: <PolicyDetailPage /> },
      { path: "claims", element: <ClaimsPage /> },
      { path: "claims/:claimId", element: <ClaimDetailPage /> },
      { path: "underwriting", element: <UnderwritingPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "compliance", element: <CompliancePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
// Do not touch this code
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster />
    </ErrorBoundary>
  </StrictMode>
);