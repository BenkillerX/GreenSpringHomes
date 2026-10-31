import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Building2, BadgeCheck, BriefcaseBusiness, Flag, Wallet, FileText, Bell, ChartNoAxesCombined, ShieldCheck, ClipboardList, Settings, LogOut, House, } from "lucide-react";

interface AdminSideBarProps {
  onLogout: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    title: "User Management",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Property Management",
    path: "/admin/properties",
    icon: Building2,
  },
  {
    title: "Property Verification",
    path: "/admin/property-verification",
    icon: BadgeCheck,
  },
  {
    title: "Service Providers",
    path: "/admin/service-providers",
    icon: BriefcaseBusiness,
  },
  {
    title: "Reports & Complaints",
    path: "/admin/reports",
    icon: Flag,
  },
  {
    title: "Payments & Revenue",
    path: "/admin/payments",
    icon: Wallet,
  },
  {
    title: "Content Management",
    path: "/admin/content",
    icon: FileText,
  },
  {
    title: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Roles & Permissions",
    path: "/admin/roles",
    icon: ShieldCheck,
  },
  {
    title: "Audit Logs",
    path: "/admin/audit-logs",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSideBar: React.FC<AdminSideBarProps> = ({ onLogout }) => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-67.5 flex-col border-r border-gray-200 bg-white">
      {/* Brand */}
      <div className="flex h-19 shrink-0 items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
          <House size={22} />
        </div>

        <div>
          <h1 className="text-base font-bold tracking-tight text-gray-900">
            GreenSpringHomes
          </h1>
          <p className="text-[10px] font-semibold uppercase tracking-[2px] text-green-700">
            Administration
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
          Main Menu
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-800"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.3 : 1.8}
                      className={
                        isActive
                          ? "text-green-700"
                          : "text-gray-400 group-hover:text-gray-700"
                      }
                    />

                    <span className="flex-1">{item.title}</span>

                    {isActive && (
                      <span className="h-5 w-1 rounded-full bg-green-700" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="shrink-0 border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>

        <p className="mt-3 text-center text-[10px] text-gray-400">
          GreenSpringHomes Admin Panel
        </p>
      </div>
    </aside>
  );
};

export default AdminSideBar;
