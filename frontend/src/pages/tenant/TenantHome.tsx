import { useEffect, useState } from "react";
import api from "../../services/api";
import type { Property } from "../landlord/OwnerHome";
import { Link } from "react-router-dom";

const TenantHome = () => {
   const [userPorperties, setUserPorperties] = useState<Property[]>([]);
    const [propertiesCount, setPropertiesCount] = useState<number>(0)
  useEffect(()=>{
     const getUserProperties = async () => {
    try {
      const response = await api.get("/api/properties/all");

      setUserPorperties(response.data.properties);
      setPropertiesCount(response.data.count)
      
    } catch (error) {
      console.error(error);
    }
  };
      getUserProperties();

  },[])
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome Section */}

        {/* Search Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div className="lg:col-span-2">
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                placeholder="Enter a city or neighborhood"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="propertyType"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Property type
              </label>

              <select
                id="propertyType"
                defaultValue=""
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="" disabled>
                  All property types
                </option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="duplex">Duplex</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Maximum budget
              </label>

              <select
                id="budget"
                defaultValue=""
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="" disabled>
                  Select budget
                </option>
                <option value="500000">₦500,000</option>
                <option value="1000000">₦1,000,000</option>
                <option value="2000000">₦2,000,000</option>
                <option value="5000000">₦5,000,000+</option>
              </select>
            </div>

          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
          >
            Search properties
          </button>
        </section>

        {/* Property Categories */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Explore by category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Find the right space for your needs.
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              "All properties",
              "Apartments",
              "Houses",
              "Duplexes",
              "Studio apartments",
            ].map((category, index) => (
              <button
                key={category}
                type="button"
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  index === 0
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Properties */}
<section>
  <div className="mb-5 flex items-end justify-between gap-4">
    <div>
      <p className="text-sm font-medium text-emerald-600">
        Find your next home
      </p>

      <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
        Available Apartments
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {propertiesCount} properties available
      </p>
    </div>
  </div>

  {userPorperties.length === 0 ? (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
      <h3 className="text-lg font-semibold text-slate-900">
        No properties available
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Check back later to discover available apartments.
      </p>
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {userPorperties.map((property) => (
        <article
          key={property._id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Property Image */}
          <div className="relative h-52 bg-slate-100">
            <img
              src={property.images?.[0] || "/placeholder-property.jpg"}
              alt={property.title}
              className="h-full w-full object-cover"
            />

            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
              Available
            </span>
          </div>

          {/* Property Details */}
          <div className="space-y-4 p-5">
            <div>
              <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
                {property.title}
              </h3>

             <p className="mt-2 text-sm text-slate-500">
  {[property.location?.area, property.location?.city, property.location?.state]
    .filter(Boolean)
    .join(", ")}
</p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-xl font-bold text-emerald-700">
                  ₦{property.price.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Per year
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
      ))}
    </div>
  )}
</section>

      </div>
    </main>
  );
};

export default TenantHome;
