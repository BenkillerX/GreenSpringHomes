import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  CheckCircle2,
  ChevronRight,
  Heart,
  MapPin,
  Maximize2,
  ShieldCheck,
//   Sofa,
  CarFront,
//   Wifi,
//   Zap,
//   Droplets,
//   CookingPot,
//   LockKeyhole,
  CalendarDays,
  MessageCircle,
  Share2,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Property } from "../landlord/OwnerHome";
import api from "../../services/api";
const PropertyDetails = () => {
  const { id } = useParams();

const [property, setProperty] = useState<Property | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [isSaved, setIsSaved] = useState(false);
const [activeImage, setActiveImage] = useState(0);
useEffect(() => {
  const fetchProperty = async () => {
    if (!id) {
      setError("Property ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/api/properties/${id}`);

      setProperty(response.data.property);
      console.log(response.data.property);
      
      setActiveImage(0);
    } catch (error) {
      console.error("Failed to fetch property:", error);
      setError("Unable to load this property.");
    } finally {
      setLoading(false);
    }
  };

  fetchProperty();
}, [id]);
const propertyImages = property?.images ?? [];
  const formatPrice = (price: number) =>
    `₦${price.toLocaleString("en-NG")}`;
if (loading) {
  return <div className="p-8 text-center">Loading property...</div>;
}

if (error || !property) {
  return (
    <div className="p-8 text-center text-red-500">
      {error || "Property not found."}
    </div>
  );
}
  return (
    
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <a href="/" className="transition hover:text-emerald-700">
            Home
          </a>
          <ChevronRight size={15} />
          <a
            href="/tenant/dashboard"
            className="transition hover:text-emerald-700"
          >
            Properties
          </a>
          <ChevronRight size={15} />
          <span className="font-medium text-slate-800">
            Property details
          </span>
        </nav>

        {/* Page Heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={14} />
                Verified listing
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Available
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Modern 3-Bedroom Apartment
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 sm:text-base">
              <MapPin size={18} className="shrink-0 text-emerald-600" />
              Lekki Phase 1, Lagos State, Nigeria
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                isSaved
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              <Heart
                size={18}
                className={isSaved ? "fill-current" : ""}
              />
              {isSaved ? "Saved" : "Save"}
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </section>

        {/* Property Image Gallery */}
        
{/* Property Image Gallery */}
<section className="grid gap-3 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">

  {/* Main Image */}
  <div className="group relative h-64 overflow-hidden bg-slate-200 sm:col-span-2 sm:row-span-2 sm:h-[440px]">

    <img
      src={
        propertyImages[activeImage]?.url ||
        "/placeholder-property.jpg"
      }
      alt={`${property.title} - Photo ${activeImage + 1}`}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/placeholder-property.jpg";
      }}
    />

    {/* Previous Image */}
    {propertyImages.length > 1 && (
      <button
        type="button"
        onClick={() =>
          setActiveImage((prev) =>
            prev === 0 ? propertyImages.length - 1 : prev - 1
          )
        }
        aria-label="Previous image"
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
      >
        <ArrowLeft size={18} />
      </button>
    )}

    {/* Next Image */}
    {propertyImages.length > 1 && (
      <button
        type="button"
        onClick={() =>
          setActiveImage((prev) =>
            (prev + 1) % propertyImages.length
          )
        }
        aria-label="Next image"
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
      >
        <ArrowRight size={18} />
      </button>
    )}

    {/* Image Counter */}
    {propertyImages.length > 0 && (
      <span className="absolute bottom-4 left-4 rounded-lg bg-black/55 px-3 py-2 text-xs font-medium text-white">
        {activeImage + 1} / {propertyImages.length} photos
      </span>
    )}

  </div>

  {/* Thumbnail Images */}
  {propertyImages.slice(1, 5).map((image, index) => (
    <button
      key={image.publicId}
      type="button"
      onClick={() => setActiveImage(index + 1)}
      className="group relative hidden h-[214px] overflow-hidden bg-slate-200 sm:block"
      aria-label={`View property photo ${index + 2}`}
    >
      <img
        src={image.url}
        alt={`${property.title} - Photo ${index + 2}`}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder-property.jpg";
        }}
      />

      {index === 3 && propertyImages.length > 5 && (
        <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 text-sm font-semibold text-white transition group-hover:bg-black/60">
          <Maximize2 size={18} />
          +{propertyImages.length - 5} more photos
        </span>
      )}
    </button>
  ))}

</section>


        {/* Main Content and Sidebar */}
        <div className="grid items-start gap-8 lg:grid-cols-3">

          {/* Main Property Information */}
          <div className="space-y-8 lg:col-span-2">

            {/* Property Overview */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                Property overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore the key details of this property before arranging a
                viewing.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <BedDouble className="mb-3 text-emerald-600" size={23} />
                  <p className="text-lg font-bold text-slate-900">3</p>
                  <p className="mt-1 text-xs text-slate-500">Bedrooms</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Bath className="mb-3 text-emerald-600" size={23} />
                  <p className="text-lg font-bold text-slate-900">3</p>
                  <p className="mt-1 text-xs text-slate-500">Bathrooms</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <CarFront className="mb-3 text-emerald-600" size={23} />
                  <p className="text-lg font-bold text-slate-900">1</p>
                  <p className="mt-1 text-xs text-slate-500">Parking space</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Building2 className="mb-3 text-emerald-600" size={23} />
                  <p className="text-lg font-bold text-slate-900">Apartment</p>
                  <p className="mt-1 text-xs text-slate-500">Property type</p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                About this property
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Discover comfortable living in this contemporary
                  three-bedroom apartment, designed with spacious interiors
                  and practical features for everyday living.
                </p>

                <p>
                  The property offers a welcoming living area, well-planned
                  bedrooms, and a functional kitchen. Its location provides
                  access to nearby shops, restaurants, and essential services.
                </p>

                <p>
                  Contact the property owner to confirm availability, arrange
                  an inspection, and learn more about the rental terms.
                </p>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                Amenities and features
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Features listed for this property.
              </p>

              {/* <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {amenities.map(({ name, icon: Icon }) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon size={19} />
                    </div>

                    <span className="text-sm font-medium text-slate-700">
                      {name}
                    </span>
                  </div>
                ))}
              </div> */}
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                Location
              </h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={17} className="text-emerald-600" />
                Lekki Phase 1, Lagos State, Nigeria
              </p>

              <div className="mt-5 flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <MapPin
                    size={30}
                    className="mx-auto text-emerald-600"
                  />
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    Property location
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    A map can be integrated here later.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Booking / Contact Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm text-slate-500">
                Rental price
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {formatPrice(property.price)}
                </h2>
                <span className="text-sm text-slate-500">/ year</span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Confirm agency fees, deposits, and other charges with the
                property owner.
              </p>

              <div className="my-5 border-t border-slate-100" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={19}
                    className="mt-0.5 text-emerald-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Availability
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Available now
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 text-emerald-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Listing status
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Verified property
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <MessageCircle size={18} />
                Contact property owner
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <Heart
                  size={18}
                  className={isSaved ? "fill-red-500 text-red-500" : ""}
                />
                {isSaved ? "Saved to favourites" : "Save property"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Inspect the property and confirm all rental terms before
                making any payment.
              </p>
            </section>

            {/* Help Card */}
            <section className="rounded-2xl bg-emerald-50 p-5">
              <h3 className="font-bold text-slate-900">
                Need help finding a home?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Our platform helps you explore available properties and
                connect with property owners.
              </p>

              <button
                type="button"
                className="mt-4 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Explore more properties
                <ArrowRight size={16} className="ml-2 inline" />
              </button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
