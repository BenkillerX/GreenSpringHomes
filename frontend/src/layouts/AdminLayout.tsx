import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/common/AdminSideBar";
import AdminBottomNav from "../components/common/AdminBottomNav";
import { useAuth } from "../context/useAuth";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSideBar onLogout={logout} />

      <main className="min-w-0 pb-16 md:ml-67.5 md:pb-0">
        <Outlet />
      </main>

      <AdminBottomNav />
    </div>
  );
};

export default AdminLayout;