import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEye, FiHome, FiDroplet, FiMapPin, FiEdit2, FiTrash2, FiX, FiAlertTriangle, FiCheckCircle, FiClock, } from "react-icons/fi";
import { MdBed } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import type { Property } from "./OwnerHome";

type StatusFilter = "all" | "active" | "inactive";

const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

/* ---------- Small pieces ---------- */

const StatCard = ({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: string;
}) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="truncate text-xs font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold leading-tight text-gray-900">{value}</p>
    </div>
  </div>
);

const PropertySkeleton = () => (
  <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white md:flex-row">
    <div className="h-48 w-full bg-gray-100 md:h-auto md:w-60" />
    <div className="flex-1 space-y-3 p-5">
      <div className="h-5 w-2/3 rounded bg-gray-100" />
      <div className="h-4 w-1/3 rounded bg-gray-100" />
      <div className="h-6 w-1/4 rounded bg-gray-100" />
      <div className="h-4 w-1/2 rounded bg-gray-100" />
      <div className="h-10 w-full rounded-xl bg-gray-100" />
    </div>
  </div>
);

/* ---------- Page ---------- */

const OwnerProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesCount, setPropertiesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");

  const [toDelete, setToDelete] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getUserProperties = async () => {
      try {
        const response = await api.get("/api/properties/");
        setProperties(response.data.properties);
        setPropertiesCount(response.data.count);
      } catch (error) {
        console.error(error);
        toast.error("Couldn't load your properties. Pull to refresh or try again.");
      } finally {
        setLoading(false);
      }
    };

    getUserProperties();
  }, []);

  // Lock page scroll while the delete sheet is open
  useEffect(() => {
    document.body.style.overflow = toDelete ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [toDelete]);

  const activeCount = useMemo(
    () => properties.filter((p) => p.status === "active").length,
    [properties]
  );
  const inactiveCount = properties.length - activeCount;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter((p) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" ? p.status === "active" : p.status !== "active");

      const haystack = [
        p.title,
        p.location?.area,
        p.location?.city,
        p.location?.state,
        p.propertyType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [properties, query, filter]);

  async function confirmDelete() {
    if (!toDelete) return;
    const id = toDelete._id;
    setDeleting(true);
    const toastId = toast.loading("Deleting property...");

    try {
      await api.delete(`/api/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      setPropertiesCount((prev) => Math.max(prev - 1, 0));
      toast.success("Property deleted", { id: toastId });
      setToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete this property. Try again.", { id: toastId });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28 sm:pb-10">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              My Properties
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage everything you've listed on QuickStay.
            </p>
          </div>

          <Link
            to="/owner/properties/add"
            className="hidden items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98] sm:inline-flex"
          >
            <FiPlus size={18} />
            Add property
          </Link>
        </header>

        {/* Stats */}
        <section className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard
            icon={<FiHome size={19} />}
            label="Total"
            value={propertiesCount}
            tone="bg-green-50 text-green-600"
          />
          <StatCard
            icon={<FiCheckCircle size={19} />}
            label="Active"
            value={activeCount}
            tone="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            icon={<FiClock size={19} />}
            label="Inactive"
            value={inactiveCount}
            tone="bg-gray-100 text-gray-500"
          />
        </section>

        {/* Search + filters (sticky on mobile) */}
        <div className="sticky top-0 z-20 -mx-4 mb-5 space-y-3 bg-gray-50/90 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:flex sm:items-center sm:gap-3 sm:space-y-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div className="relative flex-1">
            <FiSearch
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or location"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-base outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => {
              const selected = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={selected}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selected
                      ? "border-green-600 bg-green-600 text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            <PropertySkeleton />
            <PropertySkeleton />
          </div>
        ) : properties.length === 0 ? (
          /* Empty: no listings at all */
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-green-200 bg-white px-6 py-16 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600">
              <FiHome size={34} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              No properties yet
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              List your first property so people searching on QuickStay can
              find it.
            </p>
            <Link
              to="/owner/properties/add"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
            >
              <FiPlus size={18} />
              Add your first property
            </Link>
          </div>
        ) : visible.length === 0 ? (
          /* Empty: nothing matches search/filter */
          <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <FiSearch size={24} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              No matching properties
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Try a different search or clear the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-5 rounded-xl border border-green-200 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
            >
              Reset search
            </button>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm text-gray-500">
              Showing {visible.length} of {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"}
            </p>

            <ul className="space-y-4">
              {visible.map((property) => {
                const isActive = property.status === "active";
                const approved = property.verificationStatus === "approved";

                return (
                  <li
                    key={property._id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md md:flex-row"
                  >
                    {/* Image */}
                    <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-60 md:h-auto md:w-60 lg:w-64">
                      <img
                        src={
                          property.images?.[0]?.url ||
                          "/placeholder-property.jpg"
                        }
                        alt={property.title}
                        loading="lazy"
                        className="block h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-property.jpg";
                        }}
                      />

                      <span
                        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize backdrop-blur ${
                          isActive
                            ? "bg-green-600/90 text-white"
                            : "bg-white/90 text-gray-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive ? "bg-white" : "bg-gray-400"
                          }`}
                        />
                        {property.status}
                      </span>

                      <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-900 shadow-sm md:hidden">
                        ₦{property.price.toLocaleString()}
                        <span className="ml-1 text-xs font-medium capitalize text-gray-500">
                          / {property.listingType}
                        </span>
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
                            {property.title}
                          </h3>
                          <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-500">
                            <FiMapPin
                              size={14}
                              className="mt-0.5 shrink-0 text-green-600"
                            />
                            <span className="line-clamp-1">
                              {[
                                property.location?.area,
                                property.location?.city,
                                property.location?.state,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </p>
                        </div>

                        {/* Price (desktop) */}
                        <div className="hidden shrink-0 text-right md:block">
                          <p className="text-xl font-bold text-gray-900">
                            ₦{property.price.toLocaleString()}
                          </p>
                          <p className="text-xs capitalize text-gray-500">
                            For {property.listingType}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-2.5 py-1.5">
                          <MdBed size={17} className="text-green-600" />
                          {property.bedrooms} Bed
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-2.5 py-1.5">
                          <FiDroplet size={15} className="text-green-600" />
                          {property.bathrooms} Bath
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-2.5 py-1.5 capitalize">
                          <FiHome size={15} className="text-green-600" />
                          {property.propertyType}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <FiEye size={14} className="text-green-600" />
                          {property.views} views
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 font-medium capitalize ${
                            approved ? "text-green-700" : "text-amber-600"
                          }`}
                        >
                          {approved ? (
                            <FiCheckCircle size={14} />
                          ) : (
                            <FiClock size={14} />
                          )}
                          {property.verificationStatus}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 grid grid-cols-3 gap-2 md:mt-auto md:flex md:justify-end md:pt-4">
                        <Link
                          to={`/owner/properties/${property._id}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                        >
                          <FiEye size={15} />
                          View
                        </Link>
                        <Link
                          to={`/owner/properties/edit/${property._id}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-100 active:scale-[0.98]"
                        >
                          <FiEdit2 size={15} />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setToDelete(property)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 active:scale-[0.98]"
                        >
                          <FiTrash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      {/* Floating add button (mobile) */}
      <Link
        to="/owner/properties/add"
        aria-label="Add property"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-green-600/30 transition active:scale-95 sm:hidden"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <FiPlus size={20} />
        Add property
      </Link>

      {/* Delete confirmation: bottom sheet on mobile, centered dialog on desktop */}
      {toDelete && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/50 sm:items-center sm:p-4"
          onClick={() => !deleting && setToDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-200 sm:hidden" />

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <FiAlertTriangle size={22} />
            </div>

            <h2 id="delete-title" className="text-lg font-semibold text-gray-900">
              Delete this property?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              <span className="font-medium text-gray-700">
                {toDelete.title}
              </span>{" "}
              will be removed from QuickStay. This can't be undone.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setToDelete(null)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Keep it
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProperties;