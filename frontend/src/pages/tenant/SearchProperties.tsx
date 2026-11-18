import { useState } from "react";
import { Search, Loader2, MapPin, ChevronDown } from "lucide-react";
import api from "../../services/api";
import type { Property } from "../landlord/OwnerHome";

interface SearchPropertiesProps {
  onSearchResults: (properties: Property[]) => void;
}

const inputBase =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 md:h-11 md:rounded-lg md:text-sm";

const SearchProperties = ({ onSearchResults }: SearchPropertiesProps) => {
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
        className="grid grid-cols-2 gap-2.5 md:flex md:items-center md:gap-2"
      >
        {/* LOCATION (full width on mobile) */}
        <div className="relative col-span-2 min-w-0 md:flex-1">
          <MapPin
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state or neighborhood"
            aria-label="Location"
            className={`${inputBase} pl-10 pr-3`}
          />
        </div>

        {/* PROPERTY TYPE (half width on mobile) */}
        <div className="relative col-span-1 min-w-0 md:w-48">
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            aria-label="Property type"
            className={`${inputBase} appearance-none truncate pl-3 pr-9`}
          >
            <option value="">All types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="duplex">Duplex</option>
            <option value="bungalow">Bungalow</option>
            <option value="self-contained">Self Contained</option>
            <option value="land">Land</option>
            <option value="office">Office</option>
            <option value="shop">Shop</option>
            <option value="car">Cars</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* MAXIMUM BUDGET (half width on mobile) */}
        <div className="relative col-span-1 min-w-0 md:w-44">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
            ₦
          </span>
          <input
            id="budget"
            type="number"
            inputMode="numeric"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max budget"
            aria-label="Maximum budget in naira"
            className={`${inputBase} pl-7 pr-3`}
          />
        </div>

        {/* SEARCH BUTTON (full width on mobile) */}
        <button
          type="submit"
          disabled={searching}
          className="col-span-2 flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:h-11 md:rounded-lg md:text-sm"
        >
          {searching ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
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