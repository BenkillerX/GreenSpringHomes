import { FiInfo } from "react-icons/fi"

interface BasicInformationProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
}

const BasicInformation = ({ title, setTitle, description, setDescription, propertyType, setPropertyType, }: BasicInformationProps) => {
  return (
     <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
    
              <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
    
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FiInfo size={20} />
                </div>
    
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Basic Information
                  </h2>
    
                  <p className="mt-1 text-xs text-gray-500">
                    Tell potential tenants about your property.
                  </p>
                </div>
    
              </div>
    
              <div className="space-y-5 p-5 sm:p-6">
    
                {/* TITLE */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Property Title
                  </label>
    
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern 3 Bedroom Apartment in Lekki"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
    
                  <p className="mt-2 text-xs text-gray-400">
                    Use a clear title that describes the property.
                  </p>
                </div>
    
                {/* DESCRIPTION */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
    
                  <textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the property, its condition, features, surroundings, accessibility, etc."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
    
                  <p className="mt-2 text-xs text-gray-400">
                    Give potential tenants enough information to understand the property.
                  </p>
                </div>
    
                {/* PROPERTY TYPE */}
                <div>
                  <label
                    htmlFor="propertyType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Property Type
                  </label>
    
                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="" disabled>
                      Select property type
                    </option>
    
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
    
              </div>
            </section>
  )
}

export default BasicInformation