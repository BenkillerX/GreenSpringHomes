import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Building2, ShieldCheck, Settings, } from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Properties",
    path: "/admin/properties",
    icon: Building2,
  },
  {
    name: "Verification",
    path: "/admin/property-verification",
    icon: ShieldCheck,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-400 hover:text-gray-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`text-[10px] ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default AdminBottomNav;