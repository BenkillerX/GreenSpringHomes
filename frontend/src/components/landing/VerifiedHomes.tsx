import { useEffect, useState } from "react";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Quick3 from "/images/Quick3.jpg";
import api from "../../services/api";
import formatPrice from "../../utils/FormatPrice";


interface PropertyImage {
  url: string;
  publicId?: string;
}

interface Property {
  _id: string;
  title: string;
  description?: string;
  propertyType: string;
  listingType: "rent" | "sale";
  price: number;
  location: {
    state: string;
    city: string;
    area?: string;
    address?: string;
  };
  images: PropertyImage[];
  status: string;
  verificationStatus: string;
}

const VerifiedHomes = () => {
  const [verifiedHomes, setVerifiedHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getVerifiedHomes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/properties/all");

        const properties: Property[] = response.data.properties ?? [];

        const activeProperties = properties.filter(
        (property) => property.status === "active"
        );

        if (isMounted) {
        setVerifiedHomes(activeProperties.slice(0, 5));
        }
      } catch (error: unknown) {
        console.error("Failed to fetch verified homes:", error);

        if (isMounted) {
          setError("Unable to load verified homes. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void getVerifiedHomes();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mx-auto mb-30 min-h-60 w-[85%]">
      {/* Section header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Verified homes</h2>
          <p className="text-sm text-gray-500">
            Properties reviewed before publishing.
          </p>
        </div>

        <Link
          to="/properties"
          className="flex shrink-0 items-center gap-2 font-medium text-gray-900 hover:text-blue-600"
        >
          View All <FaArrowRight />
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl bg-white shadow"
            >
              <div className="h-64 bg-gray-200" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-5 w-1/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && verifiedHomes.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            No verified homes yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Verified properties will appear here once they are approved.
          </p>
        </div>
      )}

      {/* Property cards */}
      {!loading && !error && verifiedHomes.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {verifiedHomes.map((home) => {
            const imageUrl = home.images?.[0]?.url || Quick3;

            return (
              <Link
                key={home._id}
                to={`/properties/${home._id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                    src={imageUrl}
                    alt={home.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = Quick3;
                    }}
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                Available
                </span>

                  <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-3 py-1 text-xs font-medium capitalize text-white">
                    For {home.listingType}
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
                    {home.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaMapMarkerAlt className="shrink-0" />
                    <span>
                      {[home.location?.area, home.location?.city, home.location?.state]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>

                  <p className="text-sm capitalize text-gray-600">
                    {home.propertyType}
                  </p>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xl font-bold text-gray-900">
                      ₦{formatPrice(home.price)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {home.listingType === "rent"
                        ? "Rental price"
                        : "Asking price"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default VerifiedHomes;
