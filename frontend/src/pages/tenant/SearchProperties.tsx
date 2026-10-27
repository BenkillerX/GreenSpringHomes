
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import api from "../../services/api";
import type { Property } from "../landlord/OwnerHome";


interface SearchPropertiesProps {
  onSearchResults: (properties: Property[]) => void;
}

const SearchProperties = ({
  onSearchResults,
}: SearchPropertiesProps) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (maxPrice !== "" && Number(maxPrice) < 0) {
      setError("Maximum budget cannot be negative.");
      return;
    }

    try {
      setSearching(true);
      setError("");

      const response = await api.get("/api/properties/search", {
        params: {
          location: location.trim(),
          propertyType,
          maxPrice,
        },
      });

      const properties: Property[] = response.data.properties;

      // Send search results to TenantHome
      onSearchResults(properties);

      console.log("Search results:", properties);
      console.log("Total found:", response.data.count);
    } catch (err) {
      console.error("PROPERTY SEARCH ERROR:", err);
      setError("Unable to search properties. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <section className="w-full border-b border-slate-200 bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSearch();
        }}
        className="flex w-full flex-col gap-2 md:flex-row md:items-center"
      >
        {/* LOCATION */}
        <div className="min-w-0 flex-1">
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state or neighborhood"
            aria-label="Location"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>

        {/* PROPERTY TYPE */}
        <div className="min-w-0 md:w-48">
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            aria-label="Property type"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          >
            <option value="">All property types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="duplex">Duplex</option>
            <option value="bungalow">Bungalow</option>
            <option value="self-contained">Self Contained</option>
            <option value="land">Land</option>
            <option value="office">Office</option>
            <option value="shop">Shop</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* MAXIMUM BUDGET */}
        <div className="min-w-0 md:w-44">
          <input
            id="budget"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max budget (₦)"
            aria-label="Maximum budget in naira"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>

        {/* SEARCH BUTTON */}
        <button
          type="submit"
          disabled={searching}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {searching ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={17} />
              Search
            </>
          )}
        </button>
      </form>

      {/* ERROR MESSAGE */}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </section>
  );
};

export default SearchProperties;
