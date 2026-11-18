import { useState } from "react";
import { Outlet } from "react-router-dom";
import ServiceProviderSiderbar from "../components/common/ServiceProviderSiderbar";
import ServiceProviderBottomNav from "../components/common/ServiceProviderBottomNav";

const ServiceProviderLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <ServiceProviderSiderbar
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
        />

        <main className="min-w-0 flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>

      <ServiceProviderBottomNav />
    </div>
  );
};

export default ServiceProviderLayout;
