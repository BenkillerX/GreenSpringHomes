
import { useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/useAuth";

const TenantHeader = () => {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  const pageInfo: Record<string, { title: string;}> = {
    "/tenant/": {
      title: "",
    },
    "/tenant/saved-properties": {
      title: "Saved Properties",
    },
    "/tenant/settings": {
      title: "Account Settings",
    },
  };

  const currentPage = pageInfo[pathname] ?? {
    title: "Property Details",
    description: "Explore the details of your next home.",
  };

  const initials =
    `${currentUser?.firstname?.charAt(0) ?? ""}${currentUser?.lastname?.charAt(0) ?? ""}`
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium ">
            Green<span className="text-green-600"> Spring</span>Homes
          </p>

          <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
            {currentPage.title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-3">

          <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
              {initials}
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-36 truncate text-sm font-semibold text-gray-800">
                {currentUser?.firstname ?? "Tenant"}{" "}
                {currentUser?.lastname ?? ""}
              </p>

              <p className="text-xs text-gray-500">Tenant account</p>
            </div>

            <FiUser className="hidden text-gray-400 lg:block" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TenantHeader;
