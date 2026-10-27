import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";
import { FiLogOut, FiChevronLeft, FiChevronRight, FiHome, FiHeart, FiSettings, } from "react-icons/fi";

import toast from "react-hot-toast";
const TenantSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  
    const userInitial = currentUser?.firstname?.charAt(0).toUpperCase() || "?";
    
 
const handleLogout = () => {
  try {
    setIsLoggingOut(true);

    logout();

    setShowLogoutModal(false);

    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Unable to log out. Please try again.");
  } finally {
    setIsLoggingOut(false);
  }
};


  return (
    <>
      <aside
      className={`hidden md:flex h-screen flex-col  bg-white border-r border-gray-200 transition-all duration-300 shrink-0
        ${isCollapsed ? "w-25" : "w-64"}
      `}
    >
      {/* Header */}
      <div
        className={`
          flex items-center
          p-5
          border-b border-gray-100
          ${isCollapsed ? "justify-center" : "justify-between"}
        `}
      >
       {/* Logo */}
     <div
      className={`flex items-center ${
        isCollapsed ? "justify-center" : "gap-2"
      }`}
    >
        <img
          src="/images/Quick4.jpg"
          alt="QuickStay"
          className="w-10 h-10 rounded-lg object-cover shrink-0 "
        />

        {!isCollapsed && (
          <h1 className="font-semibold text-gray-800 whitespace-nowrap">
            Green
            <span className="text-green-500">SpringHome</span>
          </h1>
        )}
      </div>

        {/* Collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Profile */}
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
        flex items-center justify-center
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
          {currentUser?.role === "tenant"
            ? "Tenant"
            : currentUser?.role}
        </p>
      </div>
    )}

    {!isCollapsed && (
      <button className="ml-auto p-1 text-gray-400 hover:text-gray-700">
        <FiChevronRight />
      </button>
    )}
  </div>
</div>

      {/* Navigation */}
     <nav className="flex-1 p-4 space-y-2">
  <SidebarLink
    icon={<FiHome />}
    label="Home"
    to="/tenant/"
    collapsed={isCollapsed}
  />

  <SidebarLink
    icon={<FiHeart />}
    label="Saved"
    to="/tenant/saved-properties"
    collapsed={isCollapsed}
  />


  <SidebarLink
    icon={<FiSettings />}
    label="Settings"
    to="/tenant/settings"
    collapsed={isCollapsed}
  />
</nav>

      
{/* Logout */}
<div className="p-4 border-t border-gray-100">
  <button
    type="button"
    onClick={() => setShowLogoutModal(true)}
    className={`
      w-full flex items-center rounded-xl
      text-gray-600 hover:bg-red-50 hover:text-red-500
      transition
      ${
        isCollapsed
          ? "justify-center p-3"
          : "gap-3 px-4 py-3"
      }
    `}
  >
    <FiLogOut className="text-lg shrink-0" />

    {!isCollapsed && (
      <span className="text-sm font-medium">
        Logout
      </span>
    )}
  </button>
</div>

    </aside>

    
{/* Logout Confirmation Modal */}
{showLogoutModal && (
  <div
    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
    onClick={() => {
      if (!isLoggingOut) setShowLogoutModal(false);
    }}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tenant-logout-title"
      className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <FiLogOut size={26} />
      </div>

      {/* Heading */}
      <h2
        id="tenant-logout-title"
        className="text-xl font-bold text-gray-900"
      >
        Confirm Logout
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-gray-500">
        Are you sure you want to log out of your
        GreenSpringHomes account? You'll need to sign in
        again to access your dashboard and saved properties.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={isLoggingOut}
          onClick={() => setShowLogoutModal(false)}
          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiLogOut size={17} />
          {isLoggingOut ? "Logging out..." : "Yes, Log Out"}
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

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
}: SidebarLinkProps) => {

  return (
   <NavLink
  to={to}
  end
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
      <span className="text-lg shrink-0">
        {icon}
      </span>

      {!collapsed && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default TenantSidebar;