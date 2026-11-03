
import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface VerificationData {
  pending: number;
  verified: number;
  rejected: number;
  total: number;
}

const VerificationSummary = () => {
  const [summary, setSummary] = useState<VerificationData>({
    pending: 0,
    verified: 0,
    rejected: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVerificationSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<{
          success: boolean;
          summary: VerificationData;
        }>("/api/admin/verification/summary");

        setSummary(response.data.summary);
      } catch (error: unknown) {
        console.error("Failed to fetch verification summary:", error);
        setError("Unable to load verification statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationSummary();
  }, []);

  const verificationStats = [
    {
      title: "Awaiting Review",
      description: "Properties pending approval",
      value: summary.pending,
      icon: Clock,
      iconStyle: "bg-amber-50 text-amber-700",
    },
    {
      title: "Approved",
      description: "Verified property listings",
      value: summary.verified,
      icon: CheckCircle2,
      iconStyle: "bg-green-50 text-green-700",
    },
    {
      title: "Rejected",
      description: "Listings that need attention",
      value: summary.rejected,
      icon: AlertCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-bold text-gray-900">
        Verification Overview
      </h2>

      <p className="mt-1 text-xs text-gray-500">
        Property verification activity
      </p>

      {loading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Loading verification statistics...
        </div>
      ) : error ? (
        <div className="py-12 text-center text-sm text-red-500">
          {error}
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {verificationStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconStyle}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {stat.title}
                    </p>

                    <p className="text-xs text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </div>

                <span className="text-xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <Link
        to="/admin/property-verification"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
      >
        Review Properties
        <ArrowUpRight size={16} />
      </Link>
    </section>
  );
};

export default VerificationSummary;
