
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
        className="mx-auto max-w-7xl px-5 py-20"
      >

        <div className="flex flex-wrap items-end justify-between gap-4">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Explore our collection
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Discover properties
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Find a property that matches your needs.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {filteredProperties.length} properties found
          </p>

        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { label: "All", value: "all" },
            { label: "For Rent", value: "rent" },
            { label: "For Sale", value: "sale" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setListingType(item.value)}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                listingType === item.value
                  ? "bg-green-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-green-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
  <div className="py-20 text-center">
    <p className="text-gray-500">Loading properties...</p>
  </div>
) : error ? (
  <div className="py-20 text-center">
    <p className="text-red-500">{error}</p>
  </div>
) : filteredProperties.length > 0 ? (
  <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

    {filteredProperties.map((property) => (
      <div
        key={property._id}
        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={property.images?.[0]?.url}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-xs font-bold capitalize text-green-700 shadow-sm">
            For {property.listingType}
          </span>

          {property.verificationStatus === "verified" && (
            <span className="absolute bottom-4 left-4 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white">
              Verified Property
            </span>
          )}

        
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiMapPin className="text-green-600" />
            {property.location?.area}, {property.location?.state}
          </div>

          <h3 className="mt-3 text-lg font-bold text-gray-900">
            {property.title}
          </h3>

          <p className="mt-3 text-xl font-bold text-green-700">
            {formatPrice(property.price)}
          </p>

          <div className="mt-5 flex items-center gap-5 border-t border-gray-100 pt-4 text-xs text-gray-500">
            {property.bedrooms && (
              <span>{property.bedrooms} Bedrooms</span>
            )}

            {property.bathrooms && (
              <span>{property.bathrooms} Bathrooms</span>
            )}
          </div>

          <Link
            to={`/register/tenant`}
            className="mt-5 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
          >
            View property
            <FiArrowRight />
          </Link>
        </div>
      </div>
    ))}

  </div>
) : (
  <div className="py-24 text-center">
    <FiSearch className="mx-auto text-4xl text-gray-300" />

    <h3 className="mt-5 text-xl font-bold text-gray-900">
      No properties found
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Try adjusting your search or filters.
    </p>
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
