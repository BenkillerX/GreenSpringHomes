
import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  Home,
  ShieldAlert,
} from "lucide-react";
import api from "../../services/api";

interface UserStatsData {
  totalUsers: number;
  totalTenants: number;
  totalOwners: number;
  suspendedUsers: number;
}

const UserStats = () => {
  const [stats, setStats] = useState<UserStatsData>({
    totalUsers: 0,
    totalTenants: 0,
    totalOwners: 0,
    suspendedUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<{
          success: boolean;
          stats: UserStatsData;
        }>("/api/admin/users/stats/main");

        setStats(response.data.stats);
      } catch (error: unknown) {
        console.error("Failed to fetch user statistics:", error);
        setError("Unable to load user statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const userStats = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Tenants",
      value: stats.totalTenants,
      icon: UserRound,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Property Owners",
      value: stats.totalOwners,
      icon: Home,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Suspended Users",
      value: stats.suspendedUsers,
      icon: ShieldAlert,
      color: "bg-red-50 text-red-600",
    },
  ];

  if (error) {
    return (
      <p className="text-sm text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {userStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {loading ? "..." : stat.value.toLocaleString()}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${stat.color}`}>
                <Icon size={23} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;
