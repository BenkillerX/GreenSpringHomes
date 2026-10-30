import { NavLink } from "react-router-dom";
import { FiHome, FiPlusCircle, FiBriefcase, FiSettings, } from "react-icons/fi";
const OwnerBottomNav = () => {
  const navItems = [
    {
      label: "Home",
      icon: FiHome,
      to: "/owner/",
      end: true,
    },
    {
      label: "Add",
      icon: FiPlusCircle,
      to: "/owner/properties/add",
      end: true,
    },
    {
      label: "My Properties",
      icon: FiBriefcase,
      to: "/owner/properties",
      end: true,
    },
    {
      label: "Settings",
      icon: FiSettings,
      to: "/owner/settings",
      end: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? "text-green-600"
                    : "text-gray-500 hover:text-green-600"
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
                    className={`text-xs ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.label}
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

export default OwnerBottomNav;