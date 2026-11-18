import { NavLink } from "react-router-dom";
import { FiHome, FiBriefcase, FiBell, FiSettings, } from "react-icons/fi";

const ServiceProviderBottomNav = () => {
  return (
    <nav
      className=" fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-gray-200 px-2 py-2 md:hidden "
    >
      <NavLink
        to="/service-provider/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-2 text-xs transition ${
            isActive
              ? "text-green-600"
              : "text-gray-500"
          }`
        }
      >
        <FiHome className="text-xl" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/service-provider/services"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-2 text-xs transition ${
            isActive
              ? "text-green-600"
              : "text-gray-500"
          }`
        }
      >
        <FiBriefcase className="text-xl" />
        <span>Services</span>
      </NavLink>

      <NavLink
        to="/service-provider/notifications"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-2 text-xs transition ${
            isActive
              ? "text-green-600"
              : "text-gray-500"
          }`
        }
      >
        <FiBell className="text-xl" />
        <span>Notifications</span>
      </NavLink>

      <NavLink
        to="/service-provider/settings"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-2 text-xs transition ${
            isActive
              ? "text-green-600"
              : "text-gray-500"
          }`
        }
      >
        <FiSettings className="text-xl" />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default ServiceProviderBottomNav;
