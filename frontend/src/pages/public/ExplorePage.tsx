import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiArrowRight, } from "react-icons/fi";
import type { Property } from "../landlord/OwnerHome";
import api from "../../services/api";
import ExploreHero from "../../components/explore/ExploreHero";

const ExplorePage = () => {
  const [userPorperties, setUserPorperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
      const getUserProperties = async () => {
        try {
          setLoading(true);
          setError("");

          const response = await api.get("/api/properties/all");

          setUserPorperties(response.data.properties || []);

        } catch (error) {
          console.error("Error fetching properties:", error);
          setError("Unable to load properties. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      getUserProperties();
  }, []);
  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProperties = useMemo(() => {
  return userPorperties.filter((property) => {
    const location = property.location || {};

    const searchable = [
      property.title,
      location.state,
      location.city,
      location.area,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      searchable.includes(search.toLowerCase()) &&
      (listingType === "all" ||
        property.listingType === listingType) &&
      (propertyType === "all" ||
        property.propertyType === propertyType) &&
      (!maxPrice || property.price <= Number(maxPrice))
    );
  });
}, [
  userPorperties,
  search,
  listingType,
  propertyType,
  maxPrice,
]);

  const formatPrice = (price:number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);


  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <ExploreHero/>

      {/* SEARCH AND FILTERS */}
      <section className="mx-auto max-w-7xl px-5 pt-16">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100">

          <div className="grid gap-4 md:grid-cols-4">

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                LOCATION
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4">
                <FiMapPin className="text-green-600" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter city, area or state"
                  className="w-full py-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                PROPERTY TYPE
              </label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none"
              >
                <option value="all">All properties</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="duplex">Duplex</option>
                <option value="bungalow">Bungalow</option>
                <option value="self-contained">Self-contained</option>
                <option value="land">Land</option>
                <option value="office">Office</option>
                <option value="shop">Shop</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                LISTING TYPE
              </label>

              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none"
              >
                <option value="all">Rent or Sale</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>

          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Maximum budget (₦)"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none sm:w-64"
            />

            <button
              onClick={() => {
                setSearch("");
                setListingType("all");
                setPropertyType("all");
                setMaxPrice("");
              }}
              className="text-sm font-semibold text-green-700 hover:underline"
            >
              Reset filters
            </button>

          </div>

        </div>
      </section>

      {/* PROPERTY LISTINGS */}
      <section
        id="properties"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              Explore our collection
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Discover properties
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Find a place that feels like home. Explore properties that match
              your lifestyle, location and budget.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500">
            <span className="font-bold text-slate-900">
              {filteredProperties.length}
            </span>{" "}
            properties found
          </p>
        </div>

        {/* Listing Type Filters */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {[
            { label: "All Properties", value: "all" },
            { label: "For Rent", value: "rent" },
            { label: "For Sale", value: "sale" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setListingType(item.value)}
              aria-pressed={listingType === item.value}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                listingType === item.value
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading properties...
            </p>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : filteredProperties.length > 0 ? (

          /* Property Grid */
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">

            {filteredProperties.map((property) => (
              <article
                key={property._id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={
                      property.images?.[0]?.url ||
                      "/placeholder-property.jpg"
                    }
                    alt={property.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder-property.jpg";
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Listing Type */}
                  <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold capitalize text-emerald-700 shadow-sm sm:text-xs">
                    For {property.listingType}
                  </span>

                  {/* Verification */}
                  {property.verificationStatus === "verified" && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm sm:text-xs">
                      Verified
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">

                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 sm:text-xs">
                      <FiMapPin className="shrink-0 text-emerald-600" />

                      <span className="line-clamp-1">
                        {property.location?.area},{" "}
                        {property.location?.state}
                      </span>
                    </div>

                    <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-slate-900 sm:text-base">
                      {property.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <p className="mt-auto text-base font-bold text-emerald-700 sm:text-lg">
                    {formatPrice(property.price)}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-2.5 text-[10px] text-slate-500 sm:text-xs">
                    {property.bedrooms != null && (
                      <span>{property.bedrooms} Beds</span>
                    )}

                    {property.bathrooms != null && (
                      <span>{property.bathrooms} Baths</span>
                    )}
                  </div>

                  {/* Action */}
                  <Link
                    to="/register/tenant"
                    className="mt-1 flex items-center justify-between rounded-lg border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white sm:text-sm"
                  >
                    View property
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        ) : (

          /* Empty State */
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
            <FiSearch className="mx-auto text-4xl text-slate-300" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No properties found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find any properties matching your selection.
              Try adjusting your filters to discover more properties.
            </p>

            <button
              type="button"
              onClick={() => setListingType("all")}
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              View all properties
            </button>
          </div>
        )}
      </section>


      {/* CTA */}
      <section className="bg-green-950 px-5 py-20 text-center text-white">

        <h2 className="text-3xl font-bold sm:text-4xl">
          Have a property to list?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-green-100">
          Connect with people searching for their next
          home. List your property on GreenSpringHomes.
        </p>

        <Link
          to="/register/property-owner"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-green-400"
        >
          List your property
          <FiArrowRight />
        </Link>

      </section>

    </div>
  );
};

export default ExplorePage;
