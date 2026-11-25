import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit2, FiTrash2, FiMapPin, FiEye, FiCalendar, FiHome, FiCheckCircle, FiClock, FiImage, FiDroplet, FiChevronLeft, FiChevronRight, FiAlertTriangle, FiNavigation, FiXCircle, } from "react-icons/fi";
import { MdBed } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Property {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  images: {
    url: string;
    publicId: string;
  }[];
  status: string;
  verificationStatus: string;
  views?: number;
  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
  video?: {
    url: string;
    publicId: string;
  } | null;
}

const DESCRIPTION_LIMIT = 280;

const formatDate = (date: string) => {
  if (!date) return "Not available";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not available";
  return parsed.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const DetailsSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-gray-50 px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 h-5 w-28 rounded bg-gray-200" />
      <div className="aspect-4/3 w-full rounded-3xl bg-gray-200 sm:aspect-video" />
      <div className="mt-5 space-y-3">
        <div className="h-6 w-24 rounded-full bg-gray-200" />
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="col-span-2 h-24 rounded-2xl bg-gray-200" />
        <div className="h-24 rounded-2xl bg-gray-200" />
        <div className="h-24 rounded-2xl bg-gray-200" />
      </div>
    </div>
  </div>
);

/* ---------- Page ---------- */

const OwnerPropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error("Property ID is missing");
      navigate("/owner/properties");
      return;
    }

    let cancelled = false;

    const fetchProperty = async () => {
      try {
        const response = await api.get(`/api/properties/${id}`);
        const data: Property = response.data.property ?? response.data;

        if (!cancelled) {
          setProperty(data);
        }
      } catch (error: unknown) {
        if (cancelled) return;

        console.error("Failed to fetch property details:", error);

        const message = isAxiosError(error)
          ? error.response?.data?.message
          : undefined;

        toast.error(message || "Failed to load property details");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchProperty();

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  // Lock page scroll while the delete sheet is open
  useEffect(() => {
    document.body.style.overflow = confirmOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmOpen]);

  const handleDelete = async () => {
    if (!property || deleting) return;

    setDeleting(true);
    const toastId = toast.loading("Deleting property...");

    try {
      await api.delete(`/api/properties/${property._id}`);

      toast.success("Property deleted", { id: toastId });
      navigate("/owner/properties");
    } catch (error: unknown) {
      console.error("Failed to delete property:", error);

      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || "Couldn't delete this property. Try again.", {
        id: toastId,
      });
      setDeleting(false);
    }
  };

  if (loading) return <DetailsSkeleton />;

  if (!property) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600">
          <FiHome size={34} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-gray-900">
          Property not found
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          This property may have been removed, or the link is wrong.
        </p>

        <Link
          to="/owner/properties"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
        >
          <FiArrowLeft size={16} />
          Back to my properties
        </Link>
      </div>
    );
  }

  const images = property.images ?? [];
  const isActive = property.status === "active";
  const verification = property.verificationStatus;
  const price = `₦${Number(property.price).toLocaleString("en-NG")}`;
  const locationText = [
    property.location?.area,
    property.location?.city,
    property.location?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const mapsQuery = encodeURIComponent(
    [property.location?.address, locationText].filter(Boolean).join(", ")
  );

  const description = property.description || "No description provided.";
  const isLongDescription = description.length > DESCRIPTION_LIMIT;
  const shownDescription =
    isLongDescription && !showFullDescription
      ? `${description.slice(0, DESCRIPTION_LIMIT).trimEnd()}...`
      : description;

  const goTo = (index: number) => {
    if (images.length === 0) return;
    setActiveImage((index + images.length) % images.length);
  };

  const handleTouchEnd = (endX: number) => {
    if (touchStartX === null) return;
    const delta = endX - touchStartX;
    if (Math.abs(delta) > 50) goTo(activeImage + (delta < 0 ? 1 : -1));
    setTouchStartX(null);
  };

  const verificationStyle =
    verification === "approved"
      ? "bg-green-100 text-green-700"
      : verification === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-amber-100 text-amber-700";

  const VerificationIcon =
    verification === "approved"
      ? FiCheckCircle
      : verification === "rejected"
        ? FiXCircle
        : FiClock;

  return (
    <div className="min-h-screen bg-gray-50 pb-28 lg:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <Link
            to="/owner/properties"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-2 pl-3 pr-4 text-sm font-medium text-gray-700 shadow-sm transition hover:text-green-700 active:scale-[0.98]"
          >
            <FiArrowLeft size={16} />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to my properties</span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to={`/owner/properties/edit/${property._id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98]"
            >
              <FiEdit2 size={16} />
              Edit property
            </Link>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiTrash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Gallery */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          {images.length > 0 ? (
            <>
              <div
                className="group relative aspect-4/3 w-full touch-pan-y select-none bg-gray-100 sm:aspect-video"
                onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
              >
                <img
                  src={images[activeImage]?.url || images[0].url}
                  alt={`${property.title} - photo ${activeImage + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />

                {/* Gradient for legibility of overlays */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/30 to-transparent" />

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
                  {property.status || "Unknown"}
                </span>

                {images.length > 1 && (
                  <>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {activeImage + 1} / {images.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => goTo(activeImage - 1)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition hover:bg-white sm:flex"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(activeImage + 1)}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition hover:bg-white sm:flex"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3 scrollbar-none sm:gap-3 sm:p-4 [&::-webkit-scrollbar]:hidden">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image.publicId || image.url}
                      onClick={() => setActiveImage(index)}
                      aria-label={`View photo ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28 ${
                        activeImage === index
                          ? "border-green-600"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex aspect-video min-h-52 w-full flex-col items-center justify-center bg-gray-100 text-gray-400">
              <FiImage size={40} />
              <p className="mt-3 text-sm">No photos uploaded yet</p>
              <Link
                to={`/owner/properties/edit/${property._id}`}
                className="mt-3 text-sm font-medium text-green-700 hover:underline"
              >
                Add photos
              </Link>
            </div>
          )}

          {/* Video */}
          {property.video?.url && (
            <div className="border-t border-gray-100 p-4 sm:p-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Property video
              </h2>
              <p className="mb-4 mt-1 text-sm text-gray-500">
                Walkthrough of the property.
              </p>

              <video
                controls
                playsInline
                preload="metadata"
                className="max-h-125 w-full rounded-2xl bg-black"
              >
                <source src={property.video.url} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          )}
        </section>

        {/* Title block */}
        <div className="mt-5 sm:mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${verificationStyle}`}
            >
              <VerificationIcon size={13} />
              {verification || "Unverified"}
            </span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
              For {property.listingType}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {property.title}
          </h1>

          <p className="mt-2 flex items-start gap-2 text-sm text-gray-500">
            <FiMapPin className="mt-0.5 shrink-0 text-green-600" />
            {locationText || "Location not provided"}
          </p>
        </div>

        {/* Price + stats */}
        <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
          <div className="col-span-2 rounded-2xl bg-green-600 p-5 text-white shadow-sm shadow-green-600/20 sm:col-span-1">
            <p className="text-sm text-green-100">Listed price</p>
            <p className="mt-1 text-2xl font-bold sm:text-3xl">{price}</p>
            <p className="mt-1 text-sm capitalize text-green-100">
              For {property.listingType}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiEye size={18} />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">
              {property.views ?? 0}
            </p>
            <p className="text-xs text-gray-500">Total views</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiCalendar size={18} />
            </div>
            <p className="mt-3 text-base font-bold text-gray-900 sm:text-lg">
              {formatDate(property.createdAt)}
            </p>
            <p className="text-xs text-gray-500">
              Listed · Updated {formatDate(property.updatedAt)}
            </p>
          </div>
        </section>

        {/* Details */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900">Features</h2>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-green-50 p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left">
                <FiHome size={22} className="shrink-0 text-green-700" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="truncate text-sm font-semibold capitalize text-gray-800">
                    {property.propertyType}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-green-50 p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left">
                <MdBed size={24} className="shrink-0 text-green-700" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Bedrooms</p>
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {property.bedrooms ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-green-50 p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left">
                <FiDroplet size={22} className="shrink-0 text-green-700" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Bathrooms</p>
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {property.bathrooms ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-gray-100" />

            <h2 className="text-lg font-bold text-gray-900">Description</h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
              {shownDescription}
            </p>

            {isLongDescription && (
              <button
                type="button"
                onClick={() => setShowFullDescription((v) => !v)}
                className="mt-2 text-sm font-semibold text-green-700 hover:underline"
              >
                {showFullDescription ? "Show less" : "Read more"}
              </button>
            )}
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <FiMapPin size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Location</h2>
            </div>

            <p className="mt-4 text-sm font-medium leading-6 text-gray-800">
              {property.location?.address || "Address not provided"}
            </p>

            {locationText && (
              <p className="mt-1 text-sm leading-6 text-gray-500">
                {locationText}
              </p>
            )}

            {mapsQuery && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 active:scale-[0.98]"
              >
                <FiNavigation size={15} />
                Open in Maps
              </a>
            )}

            <div className="mt-5 border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-500">Listing reference</p>
              <p className="mt-1 break-all font-mono text-xs text-gray-700">
                {property._id}
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky action bar (mobile + tablet) */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-100 bg-white/95 px-4 pt-3 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold leading-tight text-gray-900">
              {price}
            </p>
            <p className="text-xs capitalize text-gray-500">
              For {property.listingType}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            disabled={deleting}
            aria-label="Delete property"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 active:scale-95 disabled:opacity-60"
          >
            <FiTrash2 size={18} />
          </button>

          <Link
            to={`/owner/properties/edit/${property._id}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98]"
          >
            <FiEdit2 size={16} />
            Edit
          </Link>
        </div>
      </div>

      {/* Delete confirmation: bottom sheet on mobile, dialog on desktop */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/50 sm:items-center sm:p-4"
          onClick={() => !deleting && setConfirmOpen(false)}
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
                {property.title}
              </span>{" "}
              will be removed from GreenSpringHomes. This can't be undone.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Keep it
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
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

export default OwnerPropertyDetails;