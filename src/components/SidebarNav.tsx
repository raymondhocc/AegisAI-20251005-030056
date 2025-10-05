import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  ClipboardCheck,
  BarChart2,
  Settings,
  Gavel,
  Shield,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Claims", href: "/claims", icon: ClipboardCheck },
  { name: "Underwriting", href: "/underwriting", icon: ShieldCheck },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Compliance", href: "/compliance", icon: Gavel },
  { name: "Settings", href: "/settings", icon: Settings },
];
interface SidebarNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
export default function SidebarNav({ sidebarOpen, setSidebarOpen }: SidebarNavProps) {
  const location = useLocation();
  const navContent = (
    <>
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
        <Shield className="h-8 w-8 text-blue-500" />
        <h1 className="ml-2 text-2xl font-bold font-display text-slate-800 dark:text-white">
          Aegis AI
        </h1>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150",
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              )
            }
            end={item.href === "/"}
          >
            <item.icon
              className={cn(
                "mr-3 flex-shrink-0 h-5 w-5",
              )}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 flex z-40 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-50 dark:bg-slate-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </Button>
          </div>
          {navContent}
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-200 dark:lg:border-slate-700 lg:bg-slate-50 dark:lg:bg-slate-800">
        {navContent}
      </div>
    </>
  );
}