
import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import api from "../../services/api";

type PropertyStatsData = {
  totalProperties: number;
  verifiedProperties: number;
  pendingProperties: number;
  rejectedProperties: number;
};

type PropertyStatsResponse = {
  success: boolean;
  stats: PropertyStatsData;
};

const PropertyStats = () => {
  const [stats, setStats] = useState<PropertyStatsData>({
    totalProperties: 0,
    verifiedProperties: 0,
    pendingProperties: 0,
    rejectedProperties: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<PropertyStatsResponse>(
          "/api/admin/properties/stats"
        );

        setStats(response.data.stats);
      } catch (error: unknown) {
        console.error("Failed to fetch property stats:", error);

        setError("Unable to load property statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyStats();
  }, []);

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      description: "All platform listings",
      icon: Building2,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Verified Properties",
      value: stats.verifiedProperties,
      description: "Approved listings",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Review",
      value: stats.pendingProperties,
      description: "Awaiting verification",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Rejected Properties",
      value: stats.rejectedProperties,
      description: "Listings declined",
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  {loading
                    ? "—"
                    : error
                      ? "—"
                      : stat.value.toLocaleString("en-NG")}
                </h2>
              </div>

              <div className={`rounded-lg p-3 ${stat.iconStyle}`}>
                <Icon size={21} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              {loading
                ? "Loading statistics..."
                : error
                  ? error
                  : stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyStats;
