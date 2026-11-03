
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface RecentProperty {
  _id: string;
  title: string;
  price: number;
  listingType: "rent" | "sale";
  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };
  verificationStatus: "pending" | "verified" | "rejected";
  owner: {
    firstname: string;
    lastname: string;
  } | null;
  createdAt: string;
}

const RecentProperties = () => {
  const [properties, setProperties] = useState<RecentProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<{
          success: boolean;
          properties: RecentProperty[];
        }>("/api/admin/properties/recent");

        setProperties(response.data.properties);
      } catch (error: unknown) {
        console.error("Failed to fetch recent properties:", error);
        setError("Unable to load recent properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProperties();
  }, []);

  const formatPrice = (price: number, listingType: string) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

    return listingType === "rent"
      ? `${formatted}/year`
      : formatted;
  };

  const statusStyles = {
    verified: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white xl:col-span-2">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
        <div>
          <h2 className="font-bold text-gray-900">
            Recent Properties
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Recently submitted property listings
          </p>
        </div>

        <Link
          to="/admin/properties"
          className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
        >
          View all <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-162.5 text-left">

          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4">Property</th>
              <th className="px-5 py-4">Owner</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {loading ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-gray-400">
                  Loading recent properties...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-red-500">
                  {error}
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-gray-400">
                  No properties have been submitted yet.
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr
                  key={property._id}
                  className="transition-colors hover:bg-gray-50"
                >

                  {/* Property */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {property.title}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={12} />
                      {property.location.area}, {property.location.city}
                    </p>
                  </td>

                  {/* Owner */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {property.owner
                      ? `${property.owner.firstname} ${property.owner.lastname}`
                      : "Unknown owner"}
                  </td>

                  {/* Price */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-700">
                    {formatPrice(property.price, property.listingType)}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[property.verificationStatus]
                      }`}
                    >
                      {property.verificationStatus.charAt(0).toUpperCase() +
                        property.verificationStatus.slice(1)}
                    </span>
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentProperties;
