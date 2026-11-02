import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiHome, FiPlus,} from "react-icons/fi";
import api from "../../services/api";
import toast from "react-hot-toast";
import BasicInformation from "./BasicInformation";
import ListingDetails from "./ListingDetails";
import Location from "./Location";
import Images from "./Images";
const Addproperties = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
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
    if (propertyType !== "land") {
  formData.append("bedrooms", bedrooms);
  formData.append("bathrooms", bathrooms);
}

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
const handlePropertyTypeChange = (value: string) => {
  setPropertyType(value);

  if (value === "land") {
    setBedrooms("");
    setBathrooms("");
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

        {/* BASIC INFORMATION                         */}

       <BasicInformation
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        propertyType={propertyType}
        setPropertyType={handlePropertyTypeChange}
      />

        {/* LISTING DETAILS                           */}

        <ListingDetails
        listingType={listingType}
        setListingType={setListingType}
        price={price}
        setPrice={setPrice}
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        bathrooms={bathrooms}
        setBathrooms={setBathrooms}
        propertyType={propertyType}
      />

        {/* LOCATION                                  */}

        <Location 
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        area={area}
        setArea={setArea}
        address={address}
        setAddress={setAddress}
        />

        {/* IMAGES                                    */}
        <Images
        images={images}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
      />
        {/* PUBLISH INFORMATION                        */}

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
