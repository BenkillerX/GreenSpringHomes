import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
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
  isFeatured: boolean;
  priority: number;
  verificationStatus: "pending" | "verified" | "rejected";
}

type Filter = "all" | "rent" | "sale";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "For rent", value: "rent" },
  { label: "For sale", value: "sale" },
];

const VerifiedHomes = () => {
  const [verifiedHomes, setVerifiedHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    let isMounted = true;

    const getVerifiedHomes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/properties/all");
        const properties: Property[] = response.data.properties ?? [];

        const prioritizedProperties = properties
          .filter(
            (property) =>
              property.status === "active" &&
              property.verificationStatus === "verified"
          )
          .sort((a, b) => {
            if (a.isFeatured !== b.isFeatured) {
              return Number(b.isFeatured) - Number(a.isFeatured);
            }
            return (b.priority ?? 0) - (a.priority ?? 0);
          });

        if (isMounted) {
          setVerifiedHomes(prioritizedProperties.slice(0, 6));
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

  const visibleHomes = useMemo(
    () =>
      filter === "all"
        ? verifiedHomes
        : verifiedHomes.filter((home) => home.listingType === filter),
    [verifiedHomes, filter]
  );

  return (
    <section className="mx-auto mb-30 min-h-60 w-[90%] max-w-7xl sm:w-[85%]">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <MdVerified size={14} />
            Reviewed before publishing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Verified homes
          </h2>
          <p className="mt-2 max-w-md text-sm text-gray-500 sm:text-base">
            Every listing is checked by our team, so you can browse with
            confidence.
          </p>
        </div>

        <Link
          to="/explore"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:self-auto"
        >
          View all
          <FiArrowRight className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Filter pills */}
      {!loading && !error && verifiedHomes.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === value
                  ? "bg-gray-900 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-3xl border border-gray-100 bg-white p-2"
            >
              <div className="aspect-4/3 rounded-2xl bg-gray-200" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 rounded-full bg-gray-200" />
                <div className="h-4 w-1/2 rounded-full bg-gray-200" />
                <div className="h-4 w-1/3 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty (nothing verified yet) */}
      {!loading && !error && verifiedHomes.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            No verified homes yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Verified properties will appear here once they are approved.
          </p>
        </div>
      )}

      {/* Empty (filter has no match) */}
      {!loading &&
        !error &&
        verifiedHomes.length > 0 &&
        visibleHomes.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
            <p className="text-sm text-gray-500">
              No {filter === "rent" ? "rental" : "sale"} listings right now.
            </p>
          </div>
        )}

      {/* Cards */}
      {!loading && !error && visibleHomes.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleHomes.map((home) => {
            const imageUrl = home.images?.[0]?.url || Quick3;
            const place = [
              home.location?.area,
              home.location?.city,
              home.location?.state,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <Link
                key={home._id}
                to="/login"
                className="group rounded-3xl border border-gray-100 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={imageUrl}
                    alt={home.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = Quick3;
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                      <MdVerified size={14} className="text-emerald-600" />
                      Verified
                    </span>
                    {home.isFeatured && (
                      <span className="rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Price pill */}
                  <div className="absolute bottom-3 left-3 rounded-xl bg-white/20 px-3 py-1.5 text-white backdrop-blur-md">
                    <span className="text-lg font-bold">
                      ₦{formatPrice(home.price)}
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
                    For {home.listingType}
                  </span>
                </div>

                {/* Body */}
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
                      {home.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
                      <FiMapPin size={14} className="shrink-0" />
                      <span className="line-clamp-1">{place}</span>
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                      {home.propertyType}
                    </span>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                    <FiArrowUpRight size={18} />
                  </span>
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