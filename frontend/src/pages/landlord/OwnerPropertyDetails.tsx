import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit2, FiTrash2, FiMapPin, FiEye, FiCalendar, FiHome, FiCheckCircle, FiClock, FiImage, } from "react-icons/fi";
import { MdBed } from "react-icons/md";
import { FiDroplet } from "react-icons/fi";
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
}

const OwnerPropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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

  const handleDelete = async () => {
    if (!property || deleting) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${property.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeleting(true);
    const toastId = toast.loading("Deleting property...");

    try {
      await api.delete(`/api/properties/${property._id}`);

      toast.success("Property deleted successfully", {
        id: toastId,
      });

      navigate("/owner/properties");
    } catch (error: unknown) {
      console.error("Failed to delete property:", error);

      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || "Failed to delete property", {
        id: toastId,
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
          <p className="mt-4 text-sm text-gray-500">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <FiHome size={40} className="text-gray-300" />

        <h1 className="mt-4 text-xl font-bold text-gray-900">
          Property not found
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          This property may have been removed or is no longer available.
        </p>

        <Link
          to="/owner/properties"
          className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Back to my properties
        </Link>
      </div>
    );
  }

  const images = property.images ?? [];

  const formatDate = (date: string) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/owner/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
          >
            <FiArrowLeft size={18} />
            Back to my properties
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/owner/properties/edit/${property._id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              <FiEdit2 size={16} />
              Edit property
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiTrash2 size={16} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Page heading */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                property.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {property.status || "Unknown status"}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                property.verificationStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : property.verificationStatus === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
              }`}
            >
              {property.verificationStatus === "approved" ? (
                <FiCheckCircle size={13} />
              ) : (
                <FiClock size={13} />
              )}
              {property.verificationStatus || "Unverified"}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {property.title}
          </h1>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <FiMapPin className="shrink-0" />
            {[
              property.location?.area,
              property.location?.city,
              property.location?.state,
            ]
              .filter(Boolean)
              .join(", ") || "Location not provided"}
          </p>
        </div>

        {/* Images */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {images.length > 0 ? (
            <>
              <div className="h-64 bg-gray-100 sm:h-96">
                <img
                  src={images[activeImage]?.url || images[0].url}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto p-4">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image.publicId || image.url}
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        activeImage === index
                          ? "border-green-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${property.title} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center bg-gray-100 text-gray-400">
              <FiImage size={42} />
              <p className="mt-3 text-sm">No images uploaded</p>
            </div>
          )}
        </section>

        {/* Price and statistics */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Listed price</p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              ₦{Number(property.price).toLocaleString("en-NG")}
            </p>

            <p className="mt-1 text-sm capitalize text-gray-500">
              For {property.listingType}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <FiEye size={17} />
              Total views
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {property.views ?? 0}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Property visibility
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <FiCalendar size={17} />
              Date listed
            </p>

            <p className="mt-2 text-lg font-bold text-gray-900">
              {formatDate(property.createdAt)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Last updated {formatDate(property.updatedAt)}
            </p>
          </div>
        </section>

        {/* Details */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900">
              Property description
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
              {property.description || "No description provided."}
            </p>

            <div className="my-6 border-t border-gray-100" />

            <h2 className="text-lg font-bold text-gray-900">
              Property features
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                <FiHome size={21} className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Property type</p>
                  <p className="mt-1 text-sm font-semibold capitalize text-gray-800">
                    {property.propertyType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                <MdBed size={23} className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Bedrooms</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {property.bedrooms ?? "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                <FiDroplet size={21} className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Bathrooms</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {property.bathrooms ?? "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <FiMapPin size={20} />
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                Full address
              </h2>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              {property.location?.address || "Address not provided"}
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {[
                property.location?.area,
                property.location?.city,
                property.location?.state,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-500">Listing reference</p>
              <p className="mt-1 break-all font-mono text-xs text-gray-700">
                {property._id}
              </p>
            </div>

            <Link
              to={`/owner/properties/edit/${property._id}`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <FiEdit2 size={16} />
              Edit listing details
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OwnerPropertyDetails;
