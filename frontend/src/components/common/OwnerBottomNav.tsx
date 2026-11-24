
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiHeadphones,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/useAuth";

const OwnerBottomNav = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

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
      label: "Properties",
      icon: FiBriefcase,
      to: "/owner/properties",
      end: true,
    },
    {
      label: "Help",
      icon: FiHeadphones,
      to: "/owner/support",
      end: false,
    },
    {
      label: "Settings",
      icon: FiSettings,
      to: "/owner/settings",
      end: true,
    },
  ];

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
      <nav
        aria-label="Property owner navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="mx-auto flex h-16 max-w-lg items-stretch justify-around px-1">
          {navItems.map(({ label, icon: Icon, to, end }) => (
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
                    size={21}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "-translate-y-0.5" : ""}
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

          {/* Logout */}
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-red-500"
            aria-label="Logout"
          >
            <FiLogOut size={21} />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </div>
      </nav>

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
            aria-labelledby="owner-bottom-logout-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiLogOut size={26} />
            </div>

            <h2
              id="owner-bottom-logout-title"
              className="text-xl font-bold text-gray-900"
            >
              Confirm Logout
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to log out of your
              GreenSpringHomes account? You'll need to sign in
              again to access your property dashboard and listings.
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

export default OwnerBottomNav;