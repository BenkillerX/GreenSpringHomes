import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, BedDouble, Bath, Eye, CalendarDays, User, Mail, Phone, Building2, CheckCircle, XCircle, RefreshCw, Star, AlertCircle, } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

type PropertyOwner = {
  _id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
};

type PropertyImage = {
  url: string;
  publicId: string;
};

type Property = {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: "rent" | "sale";
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };
  images: PropertyImage[];
  owner: PropertyOwner | string;
  status: "active" | "inactive" | "rented" | "sold";
  verificationStatus: "pending" | "verified" | "rejected";
  rejectionReason?: string;
  views: number;
  isFeatured: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

type PropertyResponse = {
  success: boolean;
  message: string;
  property: Property;
};

const AdminPropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedPropertyId, setLoadedPropertyId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!propertyId) {
      return;
    }

    let cancelled = false;

    const loadProperty = async () => {
      try {
        const response = await api.get<PropertyResponse>(
          `/api/admin/properties/${propertyId}`
        );

        if (!response.data.success) {
          throw new Error("Failed to retrieve property");
        }

        if (cancelled) return;

        setProperty(response.data.property);
        setRejectionReason(response.data.property.rejectionReason ?? "");
        setError(null);
      } catch (error: unknown) {
        if (cancelled) return;

        console.error("Fetch property error:", error);
        setError("Unable to retrieve property details. Please try again.");
      } finally {
        if (!cancelled) {
          setLoadedPropertyId(propertyId);
          setLoading(false);
        }
      }
    };

    void loadProperty();

    return () => {
      cancelled = true;
    };
  }, [propertyId, retryCount]);

  const reloadProperty = () => {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getOwnerName = (owner: PropertyOwner | string) => {
    if (typeof owner === "string") return "Unknown owner";

    return (
      `${owner.firstname ?? ""} ${owner.lastname ?? ""}`.trim() ||
      owner.email ||
      "Unknown owner"
    );
  };

  const handleVerification = async (
    verificationStatus: "verified" | "rejected"
  ) => {
    if (!property) return;

    if (
      verificationStatus === "rejected" &&
      !rejectionReason.trim()
    ) {
      toast.error("Please provide a reason for rejecting this property.");
      return;
    }

    try {
      setUpdating(true);

      const response = await api.patch<PropertyResponse>(
        `/api/admin/properties/${property._id}/verification`,
        {
          verificationStatus,
          ...(verificationStatus === "rejected" && {
            rejectionReason: rejectionReason.trim(),
          }),
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to update verification");
      }

      setProperty(response.data.property);

      if (verificationStatus === "verified") {
        setRejectionReason("");
      }

      toast.success(response.data.message);
    } catch (error: unknown) {
      console.error("Verification update error:", error);
      toast.error("Unable to update property verification.");
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = async (
    status: Property["status"]
  ) => {
    if (!property || property.status === status) return;

    try {
      setUpdating(true);

      const response = await api.patch<PropertyResponse>(
        `/api/admin/properties/${property._id}/status`,
        { status }
      );

      if (!response.data.success) {
        throw new Error("Failed to update listing status");
      }

      setProperty(response.data.property);
      toast.success(response.data.message);
    } catch (error: unknown) {
      console.error("Status update error:", error);
      toast.error("Unable to update listing status.");
    } finally {
      setUpdating(false);
    }
  };

  if ((loading || loadedPropertyId !== propertyId) && propertyId) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <RefreshCw size={30} className="animate-spin text-green-700" />
        <p className="mt-3 text-sm text-gray-500">
          Loading property details...
        </p>
      </div>
    );
  }

  if (!propertyId || error || !property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <AlertCircle size={35} className="text-red-500" />

        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          Unable to load property
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {!propertyId ? "Invalid property ID" : error ?? "Property not found."}
        </p>

        {propertyId && (
          <button
            onClick={reloadProperty}
            className="mt-5 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  const owner =
    typeof property.owner === "string" ? null : property.owner;

  return (
    <div className="w-full space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            onClick={() => navigate("/admin/properties")}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
          >
            <ArrowLeft size={17} />
            Back to properties
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Property Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review property information and manage its verification.
          </p>
        </div>

        <button
          onClick={reloadProperty}
          disabled={updating}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Verification</p>
          <p className="mt-2 text-lg font-semibold capitalize text-gray-900">
            {property.verificationStatus}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Listing Status</p>
          <p className="mt-2 text-lg font-semibold capitalize text-gray-900">
            {property.status}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Property Views</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Eye size={19} />
            {property.views.toLocaleString("en-NG")}
          </p>
        </div>
      </div>

      {/* Property gallery */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900">
            Property Images
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Inspect the images submitted by the property owner.
          </p>
        </div>

        {property.images?.length > 0 ? (
          <div className="p-5">
            <div className="overflow-hidden rounded-xl bg-gray-100">
              <img
                src={property.images[selectedImage]?.url}
                alt={property.title}
                className="h-80 w-full object-cover sm:h-[450px]"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {property.images.map((image, index) => (
                <button
                  key={image.publicId}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-24 overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === index
                      ? "border-green-700"
                      : "border-transparent"
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
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-sm text-gray-400">
            No property images available.
          </div>
        )}
      </section>

      {/* Property information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {property.listingType === "rent" ? "For Rent" : "For Sale"}
                </span>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {property.title}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  {property.location.address},{" "}
                  {property.location.area},{" "}
                  {property.location.city},{" "}
                  {property.location.state}
                </p>
              </div>

              <p className="text-xl font-bold text-green-700">
                {formatPrice(property.price)}
                {property.listingType === "rent" && (
                  <span className="text-xs font-normal text-gray-400">
                    {" "} / year
                  </span>
                )}
              </p>
            </div>

            <div className="my-6 grid grid-cols-2 gap-4 border-y border-gray-100 py-5 sm:grid-cols-3">
              <div>
                <p className="text-xs text-gray-400">Property Type</p>
                <p className="mt-1 font-medium capitalize text-gray-800">
                  {property.propertyType}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Bedrooms</p>
                <p className="mt-1 flex items-center gap-2 font-medium text-gray-800">
                  <BedDouble size={17} />
                  {property.bedrooms}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Bathrooms</p>
                <p className="mt-1 flex items-center gap-2 font-medium text-gray-800">
                  <Bath size={17} />
                  {property.bathrooms}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900">
              Description
            </h3>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
              {property.description}
            </p>
          </section>

          {/* Location */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="font-semibold text-gray-900">
              Location Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                ["State", property.location.state],
                ["City", property.location.city],
                ["Area", property.location.area],
                ["Full Address", property.location.address],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="mt-1 text-sm font-medium capitalize text-gray-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner information */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">
              Property Owner
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <User size={21} />
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-gray-800">
                  {getOwnerName(property.owner)}
                </p>
                <p className="text-xs text-gray-400">Property owner</p>
              </div>
            </div>

            {owner && (
              <div className="mt-5 space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Mail size={17} className="mt-0.5 shrink-0 text-gray-400" />
                  <span className="break-all">{owner.email ?? "Not provided"}</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Phone size={17} className="mt-0.5 shrink-0 text-gray-400" />
                  <span>{owner.phoneNumber ?? "Not provided"}</span>
                </div>
              </div>
            )}
          </section>

          {/* Verification actions */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">
              Verification Review
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Review the submitted information before making a verification decision.
            </p>

            {property.verificationStatus === "rejected" && property.rejectionReason && (
              <div className="mt-4 rounded-lg bg-red-50 p-3">
                <p className="text-xs font-semibold text-red-700">
                  Rejection reason
                </p>
                <p className="mt-1 text-sm text-red-600">
                  {property.rejectionReason}
                </p>
              </div>
            )}

            <div className="mt-5 space-y-3">
              <button
                onClick={() => void handleVerification("verified")}
                disabled={updating || property.verificationStatus === "verified"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle size={17} />
                {property.verificationStatus === "verified"
                  ? "Property Verified"
                  : "Approve Property"}
              </button>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Rejection reason
                </label>

                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  placeholder="Explain why this property is being rejected..."
                  className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50"
                />
              </div>

              <button
                onClick={() => void handleVerification("rejected")}
                disabled={
                  updating ||
                  !rejectionReason.trim() ||
                  property.verificationStatus === "rejected"
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={17} />
                Reject Property
              </button>
            </div>
          </section>

          {/* Listing management */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">
              Listing Management
            </h2>

            <label className="mb-2 mt-4 block text-sm text-gray-600">
              Listing status
            </label>

            <select
              value={property.status}
              disabled={updating}
              onChange={(e) =>
                void handleStatusChange(e.target.value as Property["status"])
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-600 disabled:opacity-50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </select>

            <p className="mt-2 text-xs leading-5 text-gray-400">
              Changing listing status does not change its verification status.
            </p>
          </section>

          {/* Metadata */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">
              Listing Information
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Featured</span>
                <span className="flex items-center gap-1 font-medium text-gray-800">
                  <Star size={15} />
                  {property.isFeatured ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Priority</span>
                <span className="font-medium text-gray-800">
                  {property.priority}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="text-gray-500">Date Added</span>
                <span className="text-right font-medium text-gray-800">
                  {formatDate(property.createdAt)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1 text-gray-500">
                  <CalendarDays size={15} />
                  Last Updated
                </span>
                <span className="text-right font-medium text-gray-800">
                  {formatDate(property.updatedAt)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1 text-gray-500">
                  <Building2 size={15} />
                  Property ID
                </span>
                <span className="max-w-36 break-all text-right text-xs text-gray-500">
                  {property._id}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {updating && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
          <RefreshCw size={15} className="animate-spin" />
          Updating property...
        </div>
      )}
    </div>
  );
};

export default AdminPropertyDetails;
