
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface RecentUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "tenant" | "propertyOwner" | "serviceProvider" | "admin";
  createdAt: string;
}

const RecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<{
          success: boolean;
          users: RecentUser[];
        }>("/api/admin/users/recent");

        setRecentUsers(response.data.users);
      } catch (error: unknown) {
        console.error("Failed to fetch recent users:", error);
        setError("Unable to load recent registrations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUsers();
  }, []);

  const getRoleName = (role: RecentUser["role"]) => {
    const roles: Record<RecentUser["role"], string> = {
      tenant: "Tenant",
      propertyOwner: "Property Owner",
      serviceProvider: "Service Provider",
      admin: "Administrator",
    };

    return roles[role];
  };

  const formatRegistrationDate = (date: string) => {
    const registrationDate = new Date(date);
    const now = new Date();

    const isToday =
      registrationDate.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      registrationDate.toDateString() === yesterday.toDateString();

    const time = new Intl.DateTimeFormat("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(registrationDate);

    if (isToday) return `Today, ${time}`;
    if (isYesterday) return `Yesterday, ${time}`;

    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(registrationDate);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">
            Recent Registrations
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Latest users on GreenSpringHomes
          </p>
        </div>

        <Link
          to="/admin/users"
          className="text-xs font-semibold text-green-700 hover:text-green-800"
        >
          View all
        </Link>
      </div>

      {/* Users */}
      <div className="mt-5 divide-y divide-gray-100">

        {loading ? (
          <p className="py-8 text-center text-sm text-gray-400">
            Loading recent registrations...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-500">
            {error}
          </p>
        ) : recentUsers.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No users have registered yet.
          </p>
        ) : (
          recentUsers.map((user) => {
            const initials =
              `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();

            return (
              <div
                key={user._id}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-700">
                  {initials}
                </div>

                {/* User Information */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user.firstname} {user.lastname}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>

                {/* Role and Date */}
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-700">
                    {getRoleName(user.role)}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    {formatRegistrationDate(user.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}

      </div>
    </section>
  );
};

export default RecentUsers;
