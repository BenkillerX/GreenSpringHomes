
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiHome,
  FiMapPin,
  FiImage,
  FiInfo,
  FiPlus,
  FiX,
} from "react-icons/fi";
import api from "../../services/api";
import toast from "react-hot-toast";
const Addproperties = () => {
  const navigate = useNavigate();

  // ==============================
  // FORM STATES
  // ==============================

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [listingType, setListingType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");

  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [images, setImages] = useState<File[]>([]);

  // ==============================
  // UI STATES
  // ==============================

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ==============================
  // IMAGE HANDLER
  // ==============================

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
    setError("");
  };

  // ==============================
  // REMOVE IMAGE
  // ==============================

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ==============================
  // SUBMIT FORM
  // ==============================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (images.length === 0) {
        setError("Please upload at least one property image.");
        setLoading(false);
        return;
      }
console.log("Images state:", images);
console.log("Number of images:", images.length);
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("propertyType", propertyType);
      formData.append("listingType", listingType);
      formData.append("price", price);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);

      formData.append("location[state]", state);
      formData.append("location[city]", city);
      formData.append("location[area]", area);
      formData.append("location[address]", address);

     images.forEach((image) => {
  formData.append("images", image);
});

console.log("FormData images:");

for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

      const response = await api.post("/api/properties/", formData);

      console.log("Property created:", response.data);

      navigate("/owner/properties");
    }
// Inside your handleSubmit function
catch (error) {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors;

    console.log("Backend validation errors:", errors);

    if (Array.isArray(errors) && errors.length > 0) {
      toast.error(errors[0].msg);
    } else {
      toast.error(
        error.response?.data?.message ||
        "Failed to add property"
      );
    }
  } else {
    console.error(error);
    toast.error("Something went wrong");
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* PAGE HEADER */}
      <div className="mx-auto mb-6 max-w-5xl">

        <button
          type="button"
          onClick={() => navigate("/owner/properties")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600"
        >
          <FiArrowLeft size={17} />
          Back to Properties
        </button>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Add Property
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl space-y-6"
      >

        {/* ERROR */}
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ========================================= */}
        {/* BASIC INFORMATION                         */}
        {/* ========================================= */}

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

        {/* ========================================= */}
        {/* LISTING DETAILS                           */}
        {/* ========================================= */}

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
                placeholder="3"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* BATHROOMS */}
            <div>
              <label
                htmlFor="bathrooms"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Bathrooms
              </label>

              <input
                id="bathrooms"
                type="number"
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder="3"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* LOCATION                                  */}
        {/* ========================================= */}

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

        {/* ========================================= */}
        {/* IMAGES                                    */}
        {/* ========================================= */}

        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FiImage size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Property Images
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Add clear photos of the property. Maximum 5 images.
              </p>
            </div>

          </div>

          <div className="p-5 sm:p-6">

            {/* UPLOAD AREA */}
            <label
              htmlFor="propertyImages"
              className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center transition hover:border-green-400 hover:bg-green-50/40"
            >

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm">
                <FiImage size={25} />
              </div>

              <p className="text-sm font-semibold text-gray-700">
                Upload property photos
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG or WEBP
              </p>

              <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-green-600 shadow-sm">
                <FiPlus size={15} />
                Choose Images
              </span>

              <input
                id="propertyImages"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

            {/* IMAGE PREVIEWS */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                  >

                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Property ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow transition hover:bg-white"
                    >
                      <FiX size={15} />
                    </button>

                  </div>
                ))}

              </div>
            )}

            {images.length > 0 && (
              <p className="mt-3 text-xs text-gray-500">
                {images.length} {images.length === 1 ? "image" : "images"} selected.
              </p>
            )}

          </div>
        </section>

        {/* ========================================= */}
        {/* PUBLISH INFORMATION                        */}
        {/* ========================================= */}

        <div className="rounded-2xl border border-green-100 bg-green-50 p-5 sm:p-6">

          <div className="flex gap-3">

            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiHome size={17} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-green-900">
                Ready to publish?
              </h3>

              <p className="mt-1 text-xs leading-5 text-green-700">
                Once published, your property will become visible to people browsing properties on QuickStay.
              </p>
            </div>

          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/owner/properties")}
            disabled={loading}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus size={18} />

            {loading ? "Publishing..." : "Publish Property"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default Addproperties;
