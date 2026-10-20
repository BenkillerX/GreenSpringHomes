import { Outlet } from "react-router-dom";
import TenantSidebar from "../components/common/TenantSidebar";
import TenantBottomNav from "../components/common/TenantBottomNav";

const TenantLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 md:block">
        <TenantSidebar />
      </aside>

      {/* Main Content */}
      <main className="min-h-screen min-w-0 pb-20 md:ml-64 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <TenantBottomNav />
    </div>
  );
};

export default TenantLayout;
