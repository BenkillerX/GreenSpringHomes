import { useEffect, useState } from "react";
import { FiBriefcase, FiMapPin, FiClock, FiCalendar, FiCamera, FiEdit2, FiX, FiSave, } from "react-icons/fi";
import { useAuth } from "../../context/useAuth";
import api from "../../services/api";
import axios from "axios";

const MyServices = () => {
  const { serviceProviderProfile, getServiceProviderProfile, loading: authLoading, } = useAuth();

  const [profileLoading, setProfileLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    getServiceProviderProfile()
      .catch((error: unknown) => {
        console.error("FETCH SERVICE PROFILE ERROR:", error);
      })
      .finally(() => setProfileLoading(false));
  }, []);

const handleEdit = () => {
  if (!serviceProviderProfile) return;

  setService(serviceProviderProfile.service);
  setDescription(serviceProviderProfile.description);
  setExperience(String(serviceProviderProfile.experience));
  setLocation(serviceProviderProfile.location);
  setImage(null);
  setImagePreview(serviceProviderProfile.image?.url || "");

  setEditing(true);
};

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5MB.");
      return;
    }

    setError("");
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    if (!serviceProviderProfile) return;

    setService(serviceProviderProfile.service);
    setDescription(serviceProviderProfile.description);
    setExperience(String(serviceProviderProfile.experience));
    setLocation(serviceProviderProfile.location);
    setImage(null);
    setImagePreview(serviceProviderProfile.image?.url || "");
    setError("");
    setSuccess("");
    setEditing(false);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !service.trim() ||
      !description.trim() ||
      !experience ||
      !location.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!Number.isFinite(Number(experience)) || Number(experience) < 0) {
      setError("Please enter a valid experience value.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("service", service.trim());
      formData.append("description", description.trim());
      formData.append("experience", experience);
      formData.append("location", location.trim());

      if (image) {
        formData.append("image", image);
      }

      await api.put(
        "/api/service-providers/profile",
        formData
      );

      await getServiceProviderProfile();

      setImage(null);
      setEditing(false);
      setSuccess("Your service profile has been updated successfully.");

    } catch (error: unknown) {
      console.error("UPDATE SERVICE PROFILE ERROR:", error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to update your service profile."
        );
      } else {
        setError("Something went wrong while updating your profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-40 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!serviceProviderProfile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Service profile not found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            We couldn't retrieve your service provider profile.
          </p>

          <button
            onClick={() => {
              setProfileLoading(true);
              getServiceProviderProfile()
                .catch(console.error)
                .finally(() => setProfileLoading(false));
            }}
            className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Services
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your professional profile and service information.
          </p>
        </div>

        {!editing && (
          <button
            onClick={() => {
              handleEdit()
              setError("");
              setSuccess("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <FiEdit2 />
            Edit Profile
          </button>
        )}
      </div>

      {/* Feedback */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Profile Overview */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Profile Image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
              {serviceProviderProfile.image?.url && (
                <img
                  src={serviceProviderProfile.image.url}
                  alt="Service provider"
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold capitalize text-gray-900">
                {serviceProviderProfile.service}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <FiMapPin className="text-green-600" />
                  {serviceProviderProfile.location}
                </span>

                <span className="flex items-center gap-2">
                  <FiClock className="text-green-600" />
                  {serviceProviderProfile.experience} years experience
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                Joined{" "}
                {new Date(
                  serviceProviderProfile.createdAt
                ).toLocaleDateString("en-NG", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-5 sm:p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
            About My Service
          </h3>

          <p className="text-sm leading-7 text-gray-600">
            {serviceProviderProfile.description}
          </p>
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Service Profile
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your professional information.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
              aria-label="Cancel editing"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">

            {/* Image Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Profile / Business Image
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-28 w-28 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <FiCamera size={28} />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="service-image"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <FiCamera />
                    Change image
                  </label>

                  <input
                    id="service-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    JPG, PNG or WebP. Maximum size: 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Service Category
              </label>

              <input
                id="service"
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Plumbing"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the services you provide..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Years of Experience
              </label>

              <input
                id="experience"
                type="number"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ikeja, Lagos"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave />
                {saving ? "Saving changes..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Profile Details */}
      {!editing && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiBriefcase size={20} />
            </div>
            <p className="text-sm text-gray-500">Service Category</p>
            <h3 className="mt-1 text-lg font-semibold capitalize text-gray-900">
              {serviceProviderProfile.service}
            </h3>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiCalendar size={20} />
            </div>
            <p className="text-sm text-gray-500">Profile Created</p>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              {new Date(serviceProviderProfile.createdAt).toLocaleDateString(
                "en-NG",
                { day: "numeric", month: "short", year: "numeric" }
              )}
            </h3>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyServices;
