import { useEffect, useState } from "react";
import api from "../../services/api";
import type { Property } from "../landlord/OwnerHome";
import { Link } from "react-router-dom";
import SearchProperties from "./SearchProperties";
import SavePropertyButton from "./SavePropertyButton";

const TenantHome = () => {
  const [userPorperties, setUserPorperties] = useState<Property[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const filteredProperties = userPorperties.filter((property) => {
  if (!activeCategory) return true;

  return property.propertyType === activeCategory;
});
  useEffect(()=>{
     const getUserProperties = async () => {
    try {
      const response = await api.get("/api/properties/all");

      setUserPorperties(response.data.properties);
      
    } catch (error) {
      console.error(error);
    }
  };
      getUserProperties();

  },[])
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Search Section */}
        <SearchProperties onSearchResults={setUserPorperties} />
       
{/* Property Categories */}
<section>
  <div className="mb-4">
    <h2 className="text-lg font-bold text-slate-900">
      Categories
    </h2>
  </div>

  <div className="flex gap-3 overflow-x-auto pb-2">
    {[
      { label: "All Properties", value: "" },
      { label: "Apartments", value: "apartment" },
      { label: "Houses", value: "house" },
      { label: "Duplexes", value: "duplex" },
      { label: "Bungalows", value: "bungalow" },
      { label: "Self Contained", value: "self-contained" },
      { label: "Land", value: "land" },
      { label: "Offices", value: "office" },
      { label: "Shops", value: "shop" },
      { label: "Others", value: "other" },
    ].map((category) => (
      <button
      key={category.value}
      type="button"
      aria-pressed={activeCategory === category.value}
      onClick={() => setActiveCategory(category.value)}
      className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
        activeCategory === category.value
          ? "border-emerald-600 bg-emerald-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
      }`}
    >
      {category.label}
    </button>
    ))}
  </div>
</section>


        {/* Featured Properties */}
<section>
  <div className="mb-5 flex items-end justify-between gap-4">
    <div>

      <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
        Available Apartments
      </h2>

    </div>
  </div>

  {filteredProperties.length === 0 ? (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
      <h3 className="text-lg font-semibold text-slate-900">
      {activeCategory
        ? `No ${activeCategory} properties available`
        : "No properties available"}
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      {activeCategory
        ? "Try selecting another category to discover available properties."
        : "Check back later to discover available properties."}
    </p>
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {filteredProperties.map((property) => (
    <article
      key={property._id}
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

            console.error(
              "Failed to load property image:",
              img.currentSrc
            );

            img.onerror = null;
            img.src = "/placeholder-property.jpg";
          }}
        />

        {/* Availability Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
          Available
        </span>

        {/* Save Property Heart Button */}
        <div className="absolute right-4 top-4 z-10">
          <SavePropertyButton propertyId={property._id} />
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
            {property.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {[
              property.location?.area,
              property.location?.city,
              property.location?.state,
            ]
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
