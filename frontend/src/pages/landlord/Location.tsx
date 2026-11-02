import { FiMapPin } from "react-icons/fi"
interface LLocationProps {
  state: string;
  setState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
}

const Location = ({ state, setState, city, setCity, area, setArea, address, setAddress }: LLocationProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
    
              <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
    
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <FiMapPin size={20} />
                </div>
    
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Property Location
                  </h2>
    
                  <p className="mt-1 text-xs text-gray-500">
                    Help people find your property.
                  </p>
                </div>
    
              </div>
    
              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
    
                {/* STATE */}
                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
    
                          
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="" disabled>
                  Select state
                </option>
    
                <option value="abia">Abia</option>
                <option value="adamawa">Adamawa</option>
                <option value="akwa-ibom">Akwa Ibom</option>
                <option value="anambra">Anambra</option>
                <option value="bauchi">Bauchi</option>
                <option value="bayelsa">Bayelsa</option>
                <option value="benue">Benue</option>
                <option value="borno">Borno</option>
                <option value="cross-river">Cross River</option>
                <option value="delta">Delta</option>
                <option value="ebonyi">Ebonyi</option>
                <option value="edo">Edo</option>
                <option value="ekiti">Ekiti</option>
                <option value="enugu">Enugu</option>
                <option value="fct">Abuja (FCT)</option>
                <option value="gombe">Gombe</option>
                <option value="imo">Imo</option>
                <option value="jigawa">Jigawa</option>
                <option value="kaduna">Kaduna</option>
                <option value="kano">Kano</option>
                <option value="katsina">Katsina</option>
                <option value="kebbi">Kebbi</option>
                <option value="kogi">Kogi</option>
                <option value="kwara">Kwara</option>
                <option value="lagos">Lagos</option>
                <option value="nasarawa">Nasarawa</option>
                <option value="niger">Niger</option>
                <option value="ogun">Ogun</option>
                <option value="ondo">Ondo</option>
                <option value="osun">Osun</option>
                <option value="oyo">Oyo</option>
                <option value="plateau">Plateau</option>
                <option value="rivers">Rivers</option>
                <option value="sokoto">Sokoto</option>
                <option value="taraba">Taraba</option>
                <option value="yobe">Yobe</option>
                <option value="zamfara">Zamfara</option>
              </select>
    
                </div>
    
                {/* CITY */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
    
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lagos"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
    
                {/* AREA */}
                <div>
                  <label
                    htmlFor="area"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Area
                  </label>
    
                  <input
                    id="area"
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Lekki Phase 1"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
    
                {/* ADDRESS */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
    
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 15 Admiralty Way"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
    
              </div>
            </section>
  )
}

export default Location