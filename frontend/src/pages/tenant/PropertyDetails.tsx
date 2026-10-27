import { ArrowLeft, ArrowRight, Bath, BedDouble, CheckCircle2, ChevronRight, Heart, MapPin, Maximize2, ShieldCheck, Phone, CalendarDays, MessageCircle, Building2, } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Property } from "../landlord/OwnerHome";
import api from "../../services/api";
import toast from "react-hot-toast";
import DetailsSkeleton from "./DetailsSkeleton";
const PropertyDetails = () => {
  const { id } = useParams();

const [property, setProperty] = useState<Property | null>(null);

const [isSaved, setIsSaved] = useState(false);
const [saving, setSaving] = useState(false);
const [checkingSaved, setCheckingSaved] = useState(Boolean(id));
const [activeImage, setActiveImage] = useState(0);


useEffect(() => {
  if (!id) return;

  let cancelled = false;

  const checkSavedStatus = async () => {
    try {
      const response = await api.get(
        `/api/saved-properties/${id}/status`
      );

      if (!cancelled) {
        setIsSaved(response.data.isSaved);
      }
    } catch (error) {
      console.error("CHECK SAVED STATUS ERROR:", error);
    } finally {
      if (!cancelled) {
        setCheckingSaved(false);
      }
    }
  };

  checkSavedStatus();

  return () => {
    cancelled = true;
  };
}, [id]);

const handleSaveProperty = async () => {
  if (!id || saving || checkingSaved) return;

  try {
    setSaving(true);

    if (isSaved) {
      // Remove from saved properties
      await api.delete(`/api/saved-properties/${id}`);

      setIsSaved(false);
      toast.success("Property removed from favourites");
    } else {
      // Save property
      await api.post(`/api/saved-properties/${id}`);

      setIsSaved(true);
      toast.success("Property saved successfully!");
    }
  } catch (error) {
    console.error("SAVE PROPERTY ERROR:", error);

    toast.error("Unable to update saved property. Please try again.");
  } finally {
    setSaving(false);
  }
};
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
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
// Get populated owner information
const owner =
  property?.owner && typeof property.owner === "object"
    ? property.owner
    : null;

const phoneNumber = owner?.phoneNumber ?? null;
const whatsappNumber = owner?.whatsappNumber ?? null;

// Open the device's phone dialer
const callLink = phoneNumber
  ? `tel:${phoneNumber}`
  : null;

// Open WhatsApp with a prefilled property enquiry
const whatsappMessage = property
  ? `Hello, I'm interested in your property "${property.title}" listed on GreenSpringHomes. Is it still available?`
  : "";

const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
      whatsappMessage
    )}`
  : null;
  const formatPrice = (price: number) =>
    `₦${price.toLocaleString("en-NG")}`;

if (loading) {
  return (
   <DetailsSkeleton/>
  );
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
          {property.title}
        </h1>

        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 sm:text-base">
          <MapPin size={18} className="shrink-0 text-emerald-600" />

          {property.location.area}, {property.location.city},{" "}
          {property.location.state}, Nigeria
        </p>
          </div>

          <div className="flex items-center gap-2">
           
<button
  type="button"
  onClick={handleSaveProperty}
  disabled={saving || checkingSaved}
  aria-pressed={isSaved}
  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
    isSaved
      ? "border-red-200 bg-red-50 text-red-600"
      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
  }`}
>
  <Heart
    size={18}
    className={isSaved ? "fill-current" : ""}
  />
  {saving
    ? "Updating..."
    : checkingSaved
    ? "Checking..."
    : isSaved
    ? "Saved"
    : "Save"}
</button>

            {/* <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button> */}
          </div>
        </section>

        {/* Property Image Gallery */}
        
{/* Property Image Gallery */}
<section className="grid gap-3 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">

  {/* Main Image */}
  <div className="group relative h-64 overflow-hidden bg-slate-200 sm:col-span-2 sm:row-span-2 sm:h-110">

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
      className="group relative hidden h-53.5 overflow-hidden bg-slate-200 sm:block"
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
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">

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
                {/* Bedrooms */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <BedDouble
                    className="mb-3 text-emerald-600"
                    size={23}
                  />
                  <p className="text-lg font-bold text-slate-900">
                    {property.bedrooms}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Bedrooms
                  </p>
                </div>

                {/* Bathrooms */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <Bath
                    className="mb-3 text-emerald-600"
                    size={23}
                  />
                  <p className="text-lg font-bold text-slate-900">
                    {property.bathrooms}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Bathrooms
                  </p>
                </div>

                {/* Listing Type */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <Building2
                    className="mb-3 text-emerald-600"
                    size={23}
                  />
                  <p className="text-lg font-bold capitalize text-slate-900">
                    {property.listingType}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Listing type
                  </p>
                </div>

                {/* Property Type */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <Building2
                    className="mb-3 text-emerald-600"
                    size={23}
                  />
                  <p className="text-lg font-bold capitalize text-slate-900">
                    {property.propertyType}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Property type
                  </p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                About this property
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>{property.description}</p>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                Amenities and features
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Coming Soon........
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

             <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
            <MapPin
              size={17}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <span>
              {property.location.address}, {property.location.area},{" "}
              {property.location.city}, {property.location.state}, Nigeria
            </span>
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
                   Coming Soon.....
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Booking / Contact Sidebar */}
          <aside className="w-full min-w-0 space-y-5 lg:sticky lg:top-6">
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
 {/* Contact Property Owner */}
<div className="mt-6 w-full min-w-0 space-y-3">
  <h3 className="text-sm font-semibold text-slate-900">
    Contact Property Owner
  </h3>

  {owner && (
    <p className="wrap-break-word text-sm text-slate-500">
      {owner.firstname} {owner.lastname}
    </p>
  )}

  {/* WhatsApp Button */}
  {whatsappLink && (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-green-700 sm:px-5"
    >
      <MessageCircle size={19} className="shrink-0" />
      <span>Chat on WhatsApp</span>
    </a>
  )}

  {/* Call Button */}
  {callLink && (
    <a
      href={callLink}
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-4 py-3.5 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:px-5"
    >
      <Phone size={19} className="shrink-0" />
      <span>Call Property Owner</span>
    </a>
  )}

  {/* No Contact Information */}
  {!whatsappLink && !callLink && (
    <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-medium text-amber-800">
        Contact information unavailable
      </p>

      <p className="mt-1 text-xs text-amber-700">
        This property owner has not made their contact
        information available yet.
      </p>
    </div>
  )}
</div>


             
<button
  type="button"
  onClick={handleSaveProperty}
  disabled={saving || checkingSaved}
  aria-pressed={isSaved}
  className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
    isSaved
      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
      : "border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
  }`}
>
  <Heart
    size={18}
    className={isSaved ? "fill-current" : ""}
  />

  {saving
    ? "Updating..."
    : checkingSaved
    ? "Checking..."
    : isSaved
    ? "Saved to favourites"
    : "Save property"}
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

              <Link
                to="/tenant/"
                className="mt-4 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Explore more properties
                <ArrowRight size={16} className="ml-2 inline" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
