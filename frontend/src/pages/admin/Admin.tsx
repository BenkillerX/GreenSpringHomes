import { Activity, } from "lucide-react";
import AdminStats from "./AdminStats";
import RecentProperties from "./RecentProperties";
import QuickActions from "./QuickActions";
import RecentUsers from "./RecentUsers";
import VerificationSummary from "./VerificationSummary";


const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-green-700">
              GreenSpringHomes / Administration
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back. Here's what's happening on GreenSpringHomes.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
            <Activity size={17} className="text-green-700" />
            Platform Overview
          </div>
        </div>

        {/* Statistics */}
       <AdminStats/>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent Properties */}
         <RecentProperties/>

          {/* Quick Actions */}
          <QuickActions/>
        </div>

        {/* Recent Users and Verification Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Recent Users */}
          <RecentUsers/>

          {/* Verification Summary */}
         <VerificationSummary/>
        </div>

        <footer className="border-t border-gray-200 py-5 text-center text-xs text-gray-400">
          GreenSpringHomes Administration Panel
        </footer>
      </div>
    </div>
  );
};

export default Admin;