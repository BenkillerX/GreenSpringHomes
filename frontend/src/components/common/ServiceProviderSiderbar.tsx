import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { FiHome, FiBriefcase, FiBell, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, } from "react-icons/fi";

type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
};

const SidebarLink = ({
  icon,
  label,
  to,
  collapsed,
}: SidebarLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      w-full flex items-center rounded-xl transition
      ${collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"}
      ${
        isActive
          ? "bg-green-50 text-green-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
      }
    `}
  >
    <span className="text-lg shrink-0">{icon}</span>

    {!collapsed && (
      <span className="text-sm font-medium">
        {label}
      </span>
    )}
  </NavLink>
);

const ServiceProviderSiderbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const userInitial =
    currentUser?.firstname?.charAt(0).toUpperCase() || "?";

  return (
    <aside
      className={`
        hidden md:flex
        h-screen
        flex-col
        bg-white
        border-r border-gray-200
        transition-all duration-300
        shrink-0
        sticky top-0
        ${isCollapsed ? "w-20" : "w-65"}
      `}
    >
      {/* Logo */}
      <div
        className={`
          h-20
          flex items-center
          border-b border-gray-100
          ${isCollapsed ? "justify-center" : "px-6"}
        `}
      >
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-green-600">
            Green<span className="text-green-500">SpringHomes</span>
          </h1>
        ) : (
          <span className="text-xl font-bold text-green-600">
            GSH
          </span>
        )}
      </div>

      {/* Profile */}
      <div
        className={`
          p-5
          border-b border-gray-100
          ${isCollapsed ? "flex justify-center" : ""}
        `}
      >
        <div
          className={`
            flex items-center
            ${isCollapsed ? "justify-center" : "gap-3"}
          `}
        >
          {/* User Initial */}
          <div
            className="
              w-11 h-11
              rounded-full
              bg-green-100
              text-green-600
              flex items-center
              justify-center
              font-semibold
              text-lg
              shrink-0
            "
          >
            {userInitial}
          </div>

          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-gray-800 truncate">
                {currentUser?.firstname} {currentUser?.lastname}
              </h2>

              <p className="text-xs text-gray-500">
                Service Provider
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

        <SidebarLink
          icon={<FiHome />}
          label="Home"
          to="/service-provider/"
          collapsed={isCollapsed}
        />

        <SidebarLink
          icon={<FiBriefcase />}
          label="My Services"
          to="/service-provider/services"
          collapsed={isCollapsed}
        />
        <SidebarLink
          icon={<FiBell />}
          label="Notifications"
          to="/service-provider/notifications"
          collapsed={isCollapsed}
        />

        <SidebarLink
          icon={<FiSettings />}
          label="Settings"
          to="/service-provider/settings"
          collapsed={isCollapsed}
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className={`
            w-full
            flex items-center
            rounded-xl
            text-gray-600
            hover:bg-red-50
            hover:text-red-500
            transition
            ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"}
          `}
        >
          <FiLogOut className="text-lg shrink-0" />

          {!isCollapsed && (
            <span className="text-sm font-medium" onClick={handleLogout}>
              Logout
            </span>
          )}
        </button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="
          absolute
          top-24
          -right-3
          w-7 h-7
          rounded-full
          bg-white
          border border-gray-200
          shadow-sm
          flex items-center justify-center
          text-gray-500
          hover:text-green-600
          transition
        "
      >
        {isCollapsed ? (
          <FiChevronRight />
        ) : (
          <FiChevronLeft />
        )}
      </button>
    </aside>
  );
};

export default ServiceProviderSiderbar;