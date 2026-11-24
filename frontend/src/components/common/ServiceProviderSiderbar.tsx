import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiBriefcase, FiBell, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, FiHeadphones, } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/useAuth";

type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
};

type ServiceProviderSidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

const ServiceProviderSidebar = ({
  isCollapsed,
  onToggle,
}: ServiceProviderSidebarProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const userInitial =
    currentUser?.firstname?.charAt(0).toUpperCase() || "?";

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      logout();
      setShowLogoutModal(false);
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      console.error("Logout failed:", error);
      toast.error("Unable to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <aside
  className={`relative hidden h-screen shrink-0 flex-col overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 md:flex ${
    isCollapsed ? "w-20" : "w-65"
  }`}
>
        {/* Header */}
        <div
          className={`relative flex min-h-20 shrink-0 items-center border-b border-gray-100 p-4 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div
            className={`flex min-w-0 items-center ${
              isCollapsed ? "justify-center" : "gap-2"
            }`}
          >
            <img
              src="/GreenSpringLogo.jpeg"
              alt="GreenSpringHomes"
              className="h-10 w-10 shrink-0 rounded-lg object-cover"
            />

            {!isCollapsed && (
              <h1 className="whitespace-nowrap font-semibold text-gray-800">
                Green<span className="text-green-500">Spring</span>Home
              </h1>
            )}
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 ${
              isCollapsed ? "absolute right-1 top-5" : ""
            }`}
          >
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Profile */}
        <div
          className={`shrink-0 border-b border-gray-100 p-4 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <div
            className={`flex min-w-0 items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-600">
              {userInitial}
            </div>

            {!isCollapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-semibold text-gray-800">
                    {currentUser?.firstname} {currentUser?.lastname}
                  </h2>

                  <p className="text-xs text-gray-500">
                    Service Provider
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/service-provider/settings")}
                  aria-label="Open account settings"
                  className="shrink-0 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <FiChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Service provider navigation"
          className="flex-1 space-y-2 overflow-y-auto p-4"
        >
          <SidebarLink
            icon={<FiHome />}
            label="Home"
            to="/service-provider/"
            collapsed={isCollapsed}
          />

          <SidebarLink
            icon={<FiBriefcase />}
            label="My Service"
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
                  icon={<FiHeadphones />}
                  label="Help & Support"
                  to="/tenant/support"
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
        <div className="shrink-0 border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className={`flex w-full items-center rounded-xl text-gray-600 transition hover:bg-red-50 hover:text-red-500 ${
              isCollapsed
                ? "justify-center p-3"
                : "gap-3 px-4 py-3"
            }`}
          >
            <FiLogOut className="shrink-0 text-lg" />

            {!isCollapsed && (
              <span className="text-sm font-medium">Logout</span>
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
            aria-labelledby="service-provider-logout-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiLogOut size={26} />
            </div>

            <h2
              id="service-provider-logout-title"
              className="text-xl font-bold text-gray-900"
            >
              Confirm Logout
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to log out of your
              GreenSpringHomes account? You'll need to sign in
              again to access your service provider dashboard.
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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

const SidebarLink = ({
  icon,
  label,
  to,
  collapsed,
}: SidebarLinkProps) => (
  <NavLink
    to={to}
    end={to === "/service-provider/"}
    title={collapsed ? label : undefined}
    aria-label={collapsed ? label : undefined}
    className={({ isActive }) =>
      `flex w-full items-center rounded-xl transition ${
        collapsed
          ? "justify-center px-0 py-3"
          : "gap-3 px-4 py-3"
      } ${
        isActive
          ? "bg-green-50 text-green-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
      }`
    }
  >
    <span className="flex w-5 shrink-0 items-center justify-center text-lg">
      {icon}
    </span>

    {!collapsed && (
      <span className="text-sm font-medium">{label}</span>
    )}
  </NavLink>
);

export default ServiceProviderSidebar;
