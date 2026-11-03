import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  BadgeCheck,
  Wallet,
} from "lucide-react";
import api from "../../services/api";

interface Property {
  verificationStatus: string;
}

const AdminStats = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const [propertiesResponse, usersResponse] = await Promise.all([
      api.get("/api/properties/all"),
      api.get("/api/admin/users/stats"),
    ]);

        setProperties(propertiesResponse.data.properties);
        setTotalUsers(usersResponse.data.totalUsers);
      } catch (error: unknown) {
        console.error("Failed to fetch admin statistics:", error);
        setError("Unable to load platform statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const stats = [
    {
    title: "Total Users",
    value: totalUsers.toLocaleString(),
    description: "Registered platform users",
    icon: Users,
  },
    {
      title: "Total Properties",
      value: properties.length.toLocaleString(),
      description: "All listed properties",
      icon: Building2,
    },
    {
      title: "Pending Verification",
      value: properties.filter(
        (property) => property.verificationStatus === "pending"
      ).length.toLocaleString(),
      description: "Awaiting admin review",
      icon: BadgeCheck,
    },
    {
      title: "Total Revenue",
      value: "—",
      description: "Payment analytics not connected",
      icon: Wallet,
    },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">
          Platform Statistics
        </h2>

        <span className="text-xs text-gray-400">
          {loading ? "Loading..." : "Live overview"}
        </span>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Icon size={21} />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                  {loading ? "..." : stat.value}
                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdminStats;
