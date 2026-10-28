import { useState } from "react";
import { Outlet } from "react-router-dom";
import TenantSidebar from "../components/common/TenantSidebar";
import TenantBottomNav from "../components/common/TenantBottomNav";
import TenantHeader from "../components/common/TenantHeader";
const TenantLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden md:block transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <TenantSidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((previous) => !previous)}
        />
      </aside>

      <div
        className={`min-h-screen min-w-0 transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <TenantHeader />

        <main className="min-w-0 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      <TenantBottomNav />
    </div>
  );
};

export default TenantLayout;
