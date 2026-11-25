import { useEffect, useMemo, useState } from "react";
import { FiEye, FiPlus, FiArrowRight, FiHome, FiDroplet, FiMapPin, FiEdit2, FiTrash2, FiAlertTriangle, FiCheckCircle, FiClock, } from "react-icons/fi";
import { MdBed } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/useAuth";
import api from "../../services/api";
import CompleteContactBanner from "./CompleteContactBanner";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export interface Property {
  _id: string;
  owner:
    | string
    | {
        _id: string;
        firstname: string;
        lastname: string;
        phoneNumber?: string | null;
        whatsappNumber?: string | null;
      };

  title: string;
  description: string;

  propertyType: string;
  listingType: string;

  price: number;
  bedrooms: number;
  bathrooms: number;

  images: {
    url: string;
    publicId: string;
  }[];

  status: string;
  verificationStatus: string;

  views: number;

  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };

  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  priority: number;
  video?: {
    url: string;
    publicId: string;
  } | null;
}

const PREVIEW_COUNT = 3;

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

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
  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}
    >
      {icon}
    </div>
    <p className="mt-3 text-2xl font-bold text-gray-900">
      {value.toLocaleString()}
    </p>
    <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
  </div>
);

const CardSkeleton = () => (
  <div className="flex animate-pulse gap-4 rounded-2xl border border-gray-100 p-3 sm:p-4">
    <div className="h-28 w-28 shrink-0 rounded-xl bg-gray-100 sm:h-32 sm:w-40" />
    <div className="flex-1 space-y-3 py-1">
      <div className="h-5 w-3/4 rounded bg-gray-100" />
      <div className="h-4 w-1/2 rounded bg-gray-100" />
      <div className="h-5 w-1/3 rounded bg-gray-100" />
    </div>
  </div>
);

/* ---------- Page ---------- */

const OwnerHome = () => {
  const { currentUser } = useAuth();
  const firstName = currentUser?.firstname || "there";

  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesCount, setPropertiesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [toDelete, setToDelete] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getUserProperties = async () => {
      try {
        const response = await api.get("/api/properties/");
        const list: Property[] = response.data.properties;
        setProperties(list);
        setPropertiesCount(response.data.count);
      } catch (error) {
        console.error("FETCH PROPERTIES ERROR:", error);
        toast.error("Couldn't load your properties. Try again.");
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

  const stats = useMemo(
    () => ({
      active: properties.filter((p) => p.status === "active").length,
      views: properties.reduce((sum, p) => sum + (p.views ?? 0), 0),
      pending: properties.filter((p) => p.verificationStatus !== "approved")
        .length,
    }),
    [properties]
  );

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
      toast.error("Couldn't delete this property. Try again.", {
        id: toastId,
      });
    } finally {
      setDeleting(false);
    }
  }

  const preview = properties.slice(0, PREVIEW_COUNT);

  return (
    <div className="min-h-screen bg-gray-50 pb-28 sm:pb-10">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <CompleteContactBanner />

        {/* Header */}
        <header className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {getGreeting()}, {firstName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your properties and connect with potential tenants.
            </p>
          </div>

          <Link
            to="/owner/properties/add"
            className="hidden shrink-0 items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98] sm:inline-flex"
          >
            <FiPlus size={18} />
            Add property
          </Link>
        </header>

        {/* Overview */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4">
          <StatCard
            icon={<FiHome size={20} />}
            label="Total properties"
            value={propertiesCount}
            tone="bg-green-50 text-green-600"
          />
          <StatCard
            icon={<FiCheckCircle size={20} />}
            label="Active listings"
            value={stats.active}
            tone="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            icon={<FiClock size={20} />}
            label="Awaiting verification"
            value={stats.pending}
            tone="bg-amber-50 text-amber-600"
          />
        </section>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* My properties */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 p-4 sm:p-5">
              <div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  My properties
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  Your latest listings
                </p>
              </div>

              <Link
                to="/owner/properties"
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
              >
                View all
                <FiArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
              {loading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : properties.length === 0 ? (
                <div className="flex flex-col items-center px-4 py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    <FiHome size={28} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    No properties yet
                  </h3>
                  <p className="mt-1 max-w-xs text-sm leading-6 text-gray-500">
                    List your first property so people can find it on
                    GreenSpringHomes.
                  </p>
                  <Link
                    to="/owner/properties/add"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
                  >
                    <FiPlus size={18} />
                    Add your first property
                  </Link>
                </div>
              ) : (
                <>
                  {preview.map((property) => {
                    const isActive = property.status === "active";
                    const approved = property.verificationStatus === "approved";

                    return (
                      <article
                        key={property._id}
                        className="overflow-hidden rounded-2xl border border-gray-100 transition hover:shadow-md"
                      >
                        <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                          {/* Thumbnail */}
                          <Link
                            to={`/owner/properties/${property._id}`}
                            className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-44"
                          >
                            <img
                              src={
                                property.images?.[0]?.url ||
                                "/placeholder-property.jpg"
                              }
                              alt={property.title}
                              loading="lazy"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/placeholder-property.jpg";
                              }}
                            />
                            <span
                              className={`absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize backdrop-blur sm:left-2 sm:top-2 sm:text-xs ${
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
                          </Link>

                          {/* Details */}
                          <div className="flex min-w-0 flex-1 flex-col">
                            <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
                              {property.title}
                            </h3>

                            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 sm:text-sm">
                              <FiMapPin
                                size={13}
                                className="shrink-0 text-green-600"
                              />
                              <span className="truncate">
                                {[
                                  property.location?.area,
                                  property.location?.city,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </p>

                            <p className="mt-2 text-base font-bold text-gray-900 sm:text-lg">
                              ₦{property.price.toLocaleString()}
                              <span className="ml-1 text-xs font-medium capitalize text-gray-500">
                                / {property.listingType}
                              </span>
                            </p>

                            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-gray-600">
                              <span className="inline-flex items-center gap-1">
                                <MdBed size={15} className="text-green-600" />
                                {property.bedrooms}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <FiDroplet size={13} className="text-green-600" />
                                {property.bathrooms}
                              </span>
                              <span className="inline-flex items-center gap-1 capitalize">
                                <FiHome size={13} className="text-green-600" />
                                {property.propertyType}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer: stats + actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/60 px-3 py-3 sm:px-4">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
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

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/owner/properties/${property._id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                            >
                              <FiEye size={14} />
                              View
                            </Link>
                            <Link
                              to={`/owner/properties/edit/${property._id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100 active:scale-[0.98]"
                            >
                              <FiEdit2 size={14} />
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => setToDelete(property)}
                              aria-label={`Delete ${property.title}`}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition hover:bg-red-50 active:scale-95"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  {properties.length > PREVIEW_COUNT && (
                    <Link
                      to="/owner/properties"
                      className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-green-200 py-3 text-sm font-medium text-green-700 transition hover:bg-green-50"
                    >
                      See all {propertiesCount} properties
                      <FiArrowRight size={16} />
                    </Link>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Quick actions */}
          <QuickActions />
        </div>

        {/* Recent activity */}
        <RecentActivity />
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

      {/* Delete confirmation: bottom sheet on mobile, dialog on desktop */}
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

            <h2
              id="delete-title"
              className="text-lg font-semibold text-gray-900"
            >
              Delete this property?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              <span className="font-medium text-gray-700">
                {toDelete.title}
              </span>{" "}
              will be removed from GreenSpringHomes. This can't be undone.
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

export default OwnerHome;