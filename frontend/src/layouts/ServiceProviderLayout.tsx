import { useState } from "react";
import { Outlet } from "react-router-dom";
import ServiceProviderSiderbar from "../components/common/ServiceProviderSiderbar";
import ServiceProviderBottomNav from "../components/common/ServiceProviderBottomNav";

const ServiceProviderLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden md:block transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <ServiceProviderSiderbar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((previous) => !previous)}
        />
      </aside>

      <div
        className={`min-h-screen min-w-0 transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >

        <main className="min-w-0 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      <ServiceProviderBottomNav />
    </div>
  );
};

export default ServiceProviderLayout;