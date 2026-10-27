import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Loader2, BookmarkX, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

// Property interface
interface Property {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: "rent" | "sale";
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: "active" | "inactive" | "rented" | "sold";

  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };

  images: {
    url: string;
    publicId: string;
  }[];
}

// Saved property interface
interface SavedProperty {
  _id: string;
  user: string;
  property: Property;
  createdAt: string;
}

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Fetch saved properties
const fetchSavedProperties = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await api.get("/api/saved-properties");

    setSavedProperties(response.data.savedProperties ?? []);
  } catch (error) {
    console.error("FETCH SAVED PROPERTIES ERROR:", error);

    setError("Unable to load saved properties. Please try again.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  let cancelled = false;

  const loadSavedProperties = async () => {
    try {
      const response = await api.get("/api/saved-properties");

      if (cancelled) return;

      setSavedProperties(response.data.savedProperties ?? []);
    } catch (error) {
      if (cancelled) return;

      console.error("FETCH SAVED PROPERTIES ERROR:", error);

      setError("Unable to load saved properties. Please try again.");
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  void loadSavedProperties();

  return () => {
    cancelled = true;
  };
}, []);

  // Remove a property from saved properties
  const handleRemoveSaved = async (propertyId: string) => {
    if (removingId) return;

    try {
      setRemovingId(propertyId);

      await api.delete(`/api/saved-properties/${propertyId}`);

      // Update UI without refreshing the page
      setSavedProperties((previous) =>
        previous.filter(
          (saved) => saved.property._id !== propertyId
        )
      );

      toast.success("Property removed from saved properties");
    } catch (error) {
      console.error("REMOVE SAVED PROPERTY ERROR:", error);

      toast.error("Unable to remove saved property");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Saved Properties
        </h1>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex min-h-75 flex-col items-center justify-center">
          <Loader2
            size={36}
            className="animate-spin text-emerald-600"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading your saved properties...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl bg-white p-6 text-center">
          <p className="text-sm text-red-500">{error}</p>

          <button
            onClick={fetchSavedProperties}
            className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && savedProperties.length === 0 && (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <BookmarkX
              size={36}
              className="text-emerald-600"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            No saved properties yet
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            You haven't saved any properties yet.
            Explore available properties and tap the heart icon
            to save the ones you like.
          </p>

          <Link
            to="/tenant/"
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Explore Properties
          </Link>
        </div>
      )}

      {/* Saved Properties Grid */}
      {!loading && !error && savedProperties.length > 0 && (
        <>
          {/* Properties Count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">
              {savedProperties.length}{" "}
              {savedProperties.length === 1
                ? "saved property"
                : "saved properties"}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {savedProperties.map((saved) => {
              const property = saved.property;

              return (
                <article
                  key={saved._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Property Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">

                    <img
                      src={
                        property.images?.[0]?.url ||
                        "/placeholder-property.jpg"
                      }
                      alt={property.title}
                      loading="lazy"
                      className="block h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const img = e.currentTarget;

                        img.onerror = null;
                        img.src = "/placeholder-property.jpg";
                      }}
                    />

                    {/* Property Status */}
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                      {property.status === "active"
                        ? "Available"
                        : property.status}
                    </span>

                    {/* Remove Saved Property */}
                    <button
                      type="button"
                      onClick={() => handleRemoveSaved(property._id)}
                      disabled={removingId === property._id}
                      aria-label="Remove from saved properties"
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {removingId === property._id ? (
                        <Loader2
                          size={20}
                          className="animate-spin text-red-500"
                        />
                      ) : (
                        <Heart
                          size={21}
                          className="fill-red-500 text-red-500"
                        />
                      )}
                    </button>

                  </div>

                  {/* Property Details */}
                  <div className="space-y-4 p-5">

                    <div>
                      <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
                        {property.title}
                      </h3>

                      <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={15} className="shrink-0" />

                        <span className="truncate">
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

                    {/* Price and Details Button */}
                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">

                      <div>
                        <p className="text-xl font-bold text-emerald-700">
                          ₦{property.price.toLocaleString()}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {property.listingType === "rent"
                            ? "For Rent"
                            : "For Sale"}
                        </p>
                      </div>

                      <Link
                        to={`/tenant/details/${property._id}`}
                        className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        View details
                      </Link>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        </>
      )}
    </div>
  );
};

export default SavedProperties;