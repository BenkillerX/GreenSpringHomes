import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import PropertyStats from "./PropertyStats";
import api from "../../services/api";

type VerificationFilter = "all" | "pending" | "verified" | "rejected";
type ListingFilter = "all" | "rent" | "sale";

type PropertyOwner = {
  _id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
};

type PropertyLocation = {
  state?: string;
  city?: string;
  area?: string;
  address?: string;
};

type Property = {
  _id: string;
  title: string;
  propertyType: string;
  listingType: "rent" | "sale";
  price: number;
  owner: PropertyOwner | string;
  location: PropertyLocation | string;
  images?: {
  url: string;
  publicId: string;
}[];
  verificationStatus: VerificationFilter;
  status?: string;
  createdAt: string;
};

type PropertiesResponse = {
  success: boolean;
  count: number;
  properties: Property[];
};

const PAGE_SIZE = 10;

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>("all");
  const [listingFilter, setListingFilter] =
    useState<ListingFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newestFirst, setNewestFirst] = useState(true);

  // Fetch properties
const fetchProperties = async (showLoader = true) => {
  try {
    if (showLoader) {
      setLoading(true);
    }

    setError(null);

    const response = await api.get<PropertiesResponse>(
      "/api/properties/all"
    );

    if (!response.data.success) {
      throw new Error("Failed to retrieve properties");
    }

    setProperties(response.data.properties);
  } catch (error: unknown) {
    console.error("Fetch properties error:", error);

    setError("Unable to retrieve property listings. Please try again.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  let ignore = false;

  const loadProperties = async () => {
    try {
      const response = await api.get<PropertiesResponse>(
        "/api/admin/properties/all"
      );

      if (!response.data.success) {
        throw new Error("Failed to retrieve properties");
      }

      if (!ignore) {
        setProperties(response.data.properties);
      }
    } catch (error: unknown) {
      console.error("Fetch properties error:", error);

      if (!ignore) {
        setError("Unable to retrieve property listings. Please try again.");
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  };

  void loadProperties();

  return () => {
    ignore = true;
  };
}, []);


  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format property owner
  const getOwnerName = (owner: PropertyOwner | string) => {
    if (typeof owner === "string") return "Unknown owner";

    const name = `${owner.firstname ?? ""} ${owner.lastname ?? ""}`.trim();

    return name || owner.email || "Unknown owner";
  };

  // Format property location
  const getLocation = (location: PropertyLocation | string) => {
    if (typeof location === "string") return location || "Location unavailable";

    return [
      location.area,
      location.city,
      location.state,
    ]
      .filter(Boolean)
      .join(", ") || location.address || "Location unavailable";
  };

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return properties
      .filter((property) => {
        const ownerName = getOwnerName(property.owner);
        const ownerEmail =
          typeof property.owner === "string"
            ? ""
            : property.owner.email ?? "";

        const location = getLocation(property.location);

        const matchesSearch =
          !normalizedSearch ||
          property.title.toLowerCase().includes(normalizedSearch) ||
          ownerName.toLowerCase().includes(normalizedSearch) ||
          ownerEmail.toLowerCase().includes(normalizedSearch) ||
          location.toLowerCase().includes(normalizedSearch);

        const matchesVerification =
          verificationFilter === "all" ||
          property.verificationStatus === verificationFilter;

        const matchesListing =
          listingFilter === "all" ||
          property.listingType === listingFilter;

        return (
          matchesSearch &&
          matchesVerification &&
          matchesListing
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return newestFirst ? dateB - dateA : dateA - dateB;
      });
  }, [
    properties,
    search,
    verificationFilter,
    listingFilter,
    newestFirst,
  ]);

  // Pagination
  const totalProperties = filteredProperties.length;
  const totalPages = Math.ceil(totalProperties / PAGE_SIZE);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const startIndex =
    totalProperties === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const endIndex = Math.min(
    currentPage * PAGE_SIZE,
    totalProperties
  );

  // Reset page when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setVerificationFilter("all");
    setListingFilter("all");
    setCurrentPage(1);
  };

  // Verification styles
  const verificationStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    verified: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  const statusStyles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700",
    inactive: "bg-gray-100 text-gray-600",
    published: "bg-emerald-50 text-emerald-700",
    draft: "bg-gray-100 text-gray-600",
    suspended: "bg-red-50 text-red-700",
  };

  return (
    <div className="w-full space-y-7 pb-10">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Property Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage, review and monitor all property listings on GreenSpringHomes.
          </p>
        </div>

        <button
          onClick={() => void fetchProperties()}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <PropertyStats />

      {/* Property listings */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Table heading */}
        <div className="border-b border-gray-200 p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Properties
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage property listings across the platform.
              </p>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <SlidersHorizontal size={16} />
              Reset Filters
            </button>
          </div>

          {/* Search and filters */}
          <div className="mt-5 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by property title, owner or location..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <select
              value={verificationFilter}
              onChange={(e) => {
                setVerificationFilter(e.target.value as VerificationFilter);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-green-600"
            >
              <option value="all">All verification statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={listingFilter}
              onChange={(e) => {
                setListingFilter(e.target.value as ListingFilter);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-green-600"
            >
              <option value="all">All listing types</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-left">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Property
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Owner
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Property Type
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Verification
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <button
                    onClick={() => setNewestFirst((previous) => !previous)}
                    className="flex items-center gap-1 transition hover:text-gray-900"
                  >
                    Date Added
                    <ArrowUpDown size={13} />
                  </button>
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-20 text-center">
                    <RefreshCw
                      size={25}
                      className="mx-auto animate-spin text-green-700"
                    />
                    <p className="mt-3 text-sm text-gray-500">
                      Loading property listings...
                    </p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="px-5 py-20 text-center">
                    <p className="text-sm font-medium text-red-600">
                      {error}
                    </p>
                    <button
                      onClick={() => void fetchProperties()}
                      className="mt-3 text-sm font-medium text-green-700 hover:underline"
                    >
                      Try again
                    </button>
                  </td>
                </tr>
              ) : paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-20 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <Building2 size={26} className="text-gray-400" />
                      </div>

                      <h3 className="mt-4 text-base font-semibold text-gray-800">
                        {properties.length === 0
                          ? "No properties yet"
                          : "No matching properties"}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {properties.length === 0
                          ? "Property listings will appear here once owners start listing their properties."
                          : "Try changing your search or filters to find what you're looking for."}
                      </p>

                      {properties.length > 0 && (
                        <button
                          onClick={resetFilters}
                          className="mt-4 text-sm font-medium text-green-700 hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property) => {
                  const verification =
                    property.verificationStatus?.toLowerCase() ?? "unknown";

                  const status = property.status?.toLowerCase() ?? "unknown";

                  const verificationClass =
                    verificationStyles[verification] ??
                    "bg-gray-100 text-gray-600";

                  const statusClass =
                    statusStyles[status] ??
                    "bg-gray-100 text-gray-600";

                  return (
                    <tr
                      key={property._id}
                      className="transition hover:bg-gray-50/70"
                    >
                      {/* Property */}
                      <td className="px-5 py-4">
                        <div className="flex min-w-60 items-center gap-3">
                                                    
                          {property.images?.[0]?.url ? (
                            <img
                              src={property.images[0].url}
                              alt={property.title}
                              loading="lazy"
                              className="h-12 w-14 rounded-lg border border-gray-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-gray-100">
                              <Building2 size={21} className="text-gray-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="max-w-48 truncate text-sm font-semibold text-gray-800">
                              {property.title}
                            </p>
                            <p className="mt-1 max-w-48 truncate text-xs text-gray-500">
                              {getLocation(property.location)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {getOwnerName(property.owner)}
                          </p>
                          {typeof property.owner !== "string" && (
                            <p className="mt-1 text-xs text-gray-400">
                              {property.owner.email}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Property Type */}
                      <td className="px-5 py-4">
                        <span className="text-sm capitalize text-gray-600">
                          {property.propertyType}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-800">
                            {formatPrice(property.price)}
                          </p>
                          <p className="mt-1 text-xs capitalize text-gray-400">
                            For {property.listingType}
                          </p>
                        </div>
                      </td>

                      {/* Verification */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${verificationClass}`}
                        >
                          {verification}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClass}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Date Added */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {new Date(property.createdAt).toLocaleDateString(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-xs text-gray-400">
                          —
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {startIndex}
            </span>
            {" "}to{" "}
            <span className="font-medium text-gray-800">
              {endIndex}
            </span>
            {" "}of{" "}
            <span className="font-medium text-gray-800">
              {totalProperties.toLocaleString("en-NG")}
            </span>
            {" "}properties
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1 || loading}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="rounded-lg bg-green-700 px-3.5 py-2 text-sm font-medium text-white">
              {currentPage}
            </span>

            <button
              disabled={
                currentPage >= totalPages || loading || totalPages === 0
              }
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagement;
