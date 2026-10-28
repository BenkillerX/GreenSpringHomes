import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiUpload, FiX, FiMapPin, FiHome, FiImage, } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Property {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: {
    url: string;
    publicId: string;
  }[];
  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };
}

interface PropertyForm {
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  state: string;
  city: string;
  area: string;
  address: string;
}

const initialForm: PropertyForm = {
  title: "",
  description: "",
  propertyType: "apartment",
  listingType: "rent",
  price: "",
  bedrooms: "1",
  bathrooms: "1",
  state: "",
  city: "",
  area: "",
  address: "",
};

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<PropertyForm>(initialForm);
  const [existingImages, setExistingImages] = useState<
    Property["images"]
  >([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error("Property ID is missing");
      navigate("/owner/properties");
      return;
    }

    let cancelled = false;

    const fetchProperty = async () => {
      try {
        const response = await api.get(`/api/properties/${id}`);

        const property: Property =
          response.data.property ?? response.data;

        if (cancelled) return;

        setForm({
          title: property.title ?? "",
          description: property.description ?? "",
          propertyType: property.propertyType ?? "apartment",
          listingType: property.listingType ?? "rent",
          price: String(property.price ?? ""),
          bedrooms: String(property.bedrooms ?? 1),
          bathrooms: String(property.bathrooms ?? 1),
          state: property.location?.state ?? "",
          city: property.location?.city ?? "",
          area: property.location?.area ?? "",
          address: property.location?.address ?? "",
        });

        setExistingImages(property.images ?? []);
      } catch (error: unknown) {
        if (cancelled) return;

        console.error("Failed to fetch property:", error);

        const message = isAxiosError(error)
          ? error.response?.data?.message
          : undefined;

        toast.error(message || "Failed to load property");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchProperty();

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (existingImages.length + newImages.length + files.length > 5) {
      toast.error("You can have a maximum of 5 property images");
      event.target.value = "";
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds the 5 MB limit`);
        return false;
      }

      return true;
    });

    setNewImages((previous) => [...previous, ...validFiles]);
    event.target.value = "";
  };

  const removeNewImage = (index: number) => {
    setNewImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      toast.error("Property ID is missing");
      return;
    }

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.state.trim() ||
      !form.city.trim() ||
      !form.area.trim() ||
      !form.address.trim()
    ) {
      toast.error("Please complete all required fields");
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid property price");
      return;
    }

    if (existingImages.length + newImages.length > 5) {
      toast.error("A maximum of 5 images is allowed");
      return;
    }

    setSaving(true);
    const toastId = toast.loading("Updating property...");

    try {
      const payload = new FormData();

      payload.append("title", form.title.trim());
      payload.append("description", form.description.trim());
      payload.append("propertyType", form.propertyType);
      payload.append("listingType", form.listingType);
      payload.append("price", String(price));
      payload.append("bedrooms", form.bedrooms);
      payload.append("bathrooms", form.bathrooms);

      payload.append(
  "location",
  JSON.stringify({
    state: form.state.trim(),
    city: form.city.trim(),
    area: form.area.trim(),
    address: form.address.trim(),
  })
);

      newImages.forEach((image) => {
        payload.append("images", image);
      });

      await api.patch(`/api/properties/${id}`, payload);

      toast.success("Property updated successfully", {
        id: toastId,
      });

      navigate("/owner/properties");
    } catch (error: unknown) {
      console.error("Failed to update property:", error);

      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || "Failed to update property", {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
          <p className="mt-4 text-sm text-gray-500">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/owner/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
        >
          <FiArrowLeft size={18} />
          Back to my properties
        </Link>

        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <FiHome size={24} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your listing details so potential tenants can find
            the right property.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the main details of your listing.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Property title *
                </label>

                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Modern 2-bedroom apartment"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe the property, facilities, and nearby landmarks..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="propertyType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Property type *
                  </label>

                  <select
                    id="propertyType"
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >
                    {[
                      "apartment",
                      "house",
                      "duplex",
                      "bungalow",
                      "self-contained",
                      "land",
                      "office",
                      "shop",
                      "other",
                    ].map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="listingType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Listing type *
                  </label>

                  <select
                    id="listingType"
                    name="listingType"
                    value={form.listingType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="rent">For rent</option>
                    <option value="sale">For sale</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Price (₦) *
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    ₦
                  </span>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    step="any"
                    value={form.price}
                    onChange={handleChange}
                    required
                    placeholder="500000"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="bedrooms"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Bedrooms
                  </label>

                  <input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min="0"
                    value={form.bedrooms}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bathrooms"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Bathrooms
                  </label>

                  <input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min="0"
                    value={form.bathrooms}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <FiMapPin size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Property Location
                </h2>
                <p className="text-sm text-gray-500">
                  Update where the property is located.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {(
                [
                  ["state", "State", "e.g. Osun"],
                  ["city", "City", "e.g. Ile-Ife"],
                  ["area", "Area / Neighbourhood", "e.g. Mayfair"],
                  ["address", "Full address", "Street name and house number"],
                ] as const
              ).map(([name, label, placeholder]) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {label} *
                  </label>

                  <input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Images */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <FiImage size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Property Images
                </h2>
                <p className="text-sm text-gray-500">
                  Existing images will be kept. You can add more images.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {existingImages.map((image, index) => (
                <div
                  key={image.publicId || image.url}
                  className="relative aspect-4/3 overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={image.url}
                    alt={`Existing property image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                    Existing
                  </span>
                </div>
              ))}

              {newImages.map((image, index) => (
                <div
                  key={`${image.name}-${image.lastModified}-${index}`}
                  className="relative aspect-4/3 overflow-hidden rounded-xl border border-green-200"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New property image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    aria-label={`Remove ${image.name}`}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600 shadow hover:bg-red-50"
                  >
                    <FiX size={17} />
                  </button>

                  <span className="absolute bottom-2 left-2 rounded-md bg-green-700/90 px-2 py-1 text-xs text-white">
                    New image
                  </span>
                </div>
              ))}
            </div>

            {existingImages.length + newImages.length < 5 && (
              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-5 py-8 text-center transition hover:border-green-400 hover:bg-green-50/50">
                <FiUpload size={24} className="text-green-600" />

                <span className="mt-3 text-sm font-semibold text-gray-800">
                  Upload additional images
                </span>

                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG or WEBP · Maximum 5 MB per image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            <p className="mt-3 text-xs text-gray-500">
              {existingImages.length + newImages.length} of 5 images selected.
            </p>
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/owner/properties"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave size={17} />
              {saving ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
