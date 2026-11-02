import { FiHome } from "react-icons/fi"

interface ListingDetailsProps {
  listingType: string;
  setListingType: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  propertyType: string;
}

const ListingDetails = ({ listingType, setListingType, price, setPrice, bedrooms, setBedrooms, bathrooms, setBathrooms, propertyType, }: ListingDetailsProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
    
              <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
    
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiHome size={20} />
                </div>
    
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Listing Details
                  </h2>
    
                  <p className="mt-1 text-xs text-gray-500">
                    Provide the important details about the property.
                  </p>
                </div>
    
              </div>
    
              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
    
                {/* LISTING TYPE */}
                <div>
                  <label
                    htmlFor="listingType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Listing Type
                  </label>
    
                  <select
                    id="listingType"
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="" disabled>
                      Select listing type
                    </option>
    
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                  </select>
                </div>
    
                {/* PRICE */}
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
    
                  <div className="flex">
                    <span className="flex items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-500">
                      ₦
                    </span>
    
                    <input
                      id="price"
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="2,500,000"
                      className="w-full rounded-r-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>
    
            {/* BEDROOMS */}
{propertyType !== "land" && (
  <div>
    <label
      htmlFor="bedrooms"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Bedrooms
    </label>

    <input
      id="bedrooms"
      type="number"
      min="0"
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
      placeholder="e.g. 3"
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
    />
  </div>
)}

{/* BATHROOMS */}
{propertyType !== "land" && (
  <div>
    <label
      htmlFor="bathrooms"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Bathrooms / Toilets
    </label>

    <input
      id="bathrooms"
      type="number"
      min="0"
      value={bathrooms}
      onChange={(e) => setBathrooms(e.target.value)}
      placeholder="e.g. 2"
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
    />
  </div>
)}
    
              </div>
            </section>
  )
}

export default ListingDetails