
import { NavLink } from "react-router-dom";
import { FiHome, FiHeart, FiUser, } from "react-icons/fi";

const navItems = [
  {
    label: "Home",
    to: "/tenant/",
    icon: FiHome,
    end: true,
  },
  {
    label: "Saved",
    to: "/tenant/saved-properties",
    icon: FiHeart,
    end: false,
  },
  {
    label: "Profile",
    to: "/tenant/settings",
    icon: FiUser,
    end: false,
  },
];

const TenantBottomNav = () => {
  return (
    <nav
      aria-label="Tenant navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex h-16 max-w-lg items-stretch justify-around px-1">
        {navItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            aria-label={label}
            className={({ isActive }) =>
              `relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-green-600" />
                )}

                <Icon
                  aria-hidden="true"
                  className={`text-xl transition-transform ${
                    isActive ? "-translate-y-0.5" : ""
                  }`}
                />

                <span
                  className={`max-w-full truncate text-[10px] ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default TenantBottomNav;
