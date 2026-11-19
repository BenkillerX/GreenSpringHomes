import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiX } from "react-icons/fi";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";
import axios from "axios";

const SERVICE_CATEGORIES = [
  {
    name: "Building, Construction & Engineering",
    skills: [
      "Building contractors",
      "Civil engineers",
      "Structural engineers",
      "Architects",
      "Quantity surveyors",
      "Building technicians",
      "Welders",
      "Tilers",
      "Roofers",
      "POP installers",
      "Aluminium fabricators",
    ],
  },
  {
    name: "Home Repairs & Maintenance",
    skills: [
      "Plumbers",
      "Electricians",
      "AC installation and repair technicians",
      "Generator technicians",
      "Painters",
      "Carpenters",
      "Locksmiths",
      "CCTV installers",
      "Solar system installers",
      "Pest control professionals",
    ],
  },
  {
    name: "Interior Design & Decoration",
    skills: [
      "Interior designers",
      "Furniture makers",
      "Upholsterers",
      "Curtain and blinds installers",
      "Wallpaper installers",
      "Home decorators",
      "Lighting specialists",
      "Kitchen designers",
      "Space planners",
    ],
  },
  {
    name: "Cleaning & Facility Management",
    skills: [
      "Residential cleaners",
      "Office cleaners",
      "Post-construction cleaners",
      "Fumigation services",
      "Waste management companies",
      "Facility managers",
      "Swimming pool maintenance",
      "Gardening and landscaping",
    ],
  },
  {
    name: "Creative, Media & Entertainment",
    skills: [
      "Video editors",
      "Videographers",
      "Photographers",
      "Graphic designers",
      "Animators",
      "Motion graphics designers",
      "Content creators",
      "Drone operators",
      "Scriptwriters",
      "Voice-over artists",
    ],
  },
  {
    name: "Technology & Software",
    skills: [
      "Website developers",
      "Software programmers",
      "Mobile app developers",
      "UI/UX designers",
      "WordPress developers",
      "IT consultants",
      "Cybersecurity professionals",
      "Data analysts",
      "Computer repair technicians",
      "Network engineers",
    ],
  },
  {
    name: "Digital Marketing & Advertising",
    skills: [
      "Digital marketers",
      "Social media managers",
      "SEO specialists",
      "Facebook and Google Ads specialists",
      "Email marketers",
      "Brand strategists",
      "Copywriters",
      "Marketing consultants",
      "Public relations professionals",
    ],
  },
  {
    name: "Real Estate Professionals",
    skills: [
      "Real estate consultants",
      "Property valuers",
      "Estate surveyors",
      "Property managers",
      "Real estate agents",
      "Property lawyers",
      "Land surveyors",
      "Property inspection professionals",
      "Mortgage consultants",
    ],
  },
  {
    name: "Legal & Professional Services",
    skills: [
      "Lawyers",
      "Legal consultants",
      "Accountants",
      "Tax consultants",
      "Business consultants",
      "Company registration consultants",
      "Insurance brokers",
      "Financial consultants",
    ],
  },
  {
    name: "Moving, Logistics & Transportation",
    skills: [
      "Moving companies",
      "Furniture movers",
      "Truck and van rentals",
      "Delivery services",
      "Logistics companies",
      "Relocation consultants",
      "Storage and warehousing providers",
    ],
  },
  {
    name: "Events & Hospitality",
    skills: [
      "Event planners",
      "Caterers",
      "Decorators",
      "Rental furniture providers",
      "Sound and lighting technicians",
      "DJs",
      "MCs",
      "Event photographers",
      "Short-let apartment managers",
      "Hospitality consultants",
    ],
  },
  {
    name: "Education & Training",
    skills: [
      "Private tutors",
      "Computer trainers",
      "Vocational instructors",
      "Real estate trainers",
      "Business coaches",
      "Professional development consultants",
      "Online course providers",
    ],
  },
  {
    name: "Security Services",
    skills: [
      "Security companies",
      "Private security personnel",
      "CCTV operators and installers",
      "Access control specialists",
      "Alarm system installers",
      "Security consultants",
    ],
  },
  {
    name: "Lifestyle & Personal Services",
    skills: [
      "Laundry and dry-cleaning services",
      "Professional gardeners",
      "Home care providers",
      "Personal chefs",
      "Personal fitness trainers",
      "Beauty professionals",
      "Pet care providers",
    ],
  },
  {
    name: "Business & Administrative Services",
    skills: [
      "Virtual assistants",
      "Data entry professionals",
      "Customer support specialists",
      "Business plan writers",
      "Recruitment agencies",
      "Human resource consultants",
      "Procurement consultants",
      "Office support services",
    ],
  },
] as const;

const ServiceProviderOnboarding = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [contactVisibility, setContactVisibility] = useState(true);

  const availableSkills =
    SERVICE_CATEGORIES.find((item) => item.name === category)?.skills ?? [];

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setService("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !category ||
      !service ||
      !description.trim() ||
      experience === "" ||
      !location.trim() ||
      !phoneNumber.trim() ||
      !whatsappNumber.trim() ||
      !image
    ) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    const normalizedPhone = phoneNumber.replace(/[\s-]/g, "");
    const normalizedWhatsApp = whatsappNumber.replace(/[\s-]/g, "");

    if (!/^\+?[0-9]{10,15}$/.test(normalizedPhone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(normalizedWhatsApp)) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }

    if (!Number.isFinite(Number(experience)) || Number(experience) < 0) {
      setError("Please enter a valid experience value.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);
      formData.append("description", description.trim());
      formData.append("experience", experience);
      formData.append("location", location.trim());
      formData.append("phoneNumber", normalizedPhone);
      formData.append("whatsappNumber", normalizedWhatsApp);
      formData.append("contactVisibility", String(contactVisibility));
      formData.append("category", category.trim());
      formData.append("service", service.trim());

      await api.post("/api/onboarding/service-provider", formData);

      const response = await api.get("/api/auth/me");
      setCurrentUser(response.data.user);

      navigate("/service-provider/");
    } catch (error: unknown) {
      console.error("Service provider onboarding error:", error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Something went wrong while completing onboarding."
        );
      } else {
        setError("Something went wrong while completing onboarding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Complete your profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Tell us about the professional service you provide so customers
            can find and contact you.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile / Business Image
            </label>

            <div className="flex items-center gap-5">
              <div className="relative w-28 h-28 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Service provider preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiCamera className="text-gray-400" size={28} />
                )}

                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow"
                    aria-label="Remove image"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="inline-block cursor-pointer rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                >
                  {image ? "Change image" : "Upload image"}
                </label>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG or WebP. Maximum size: 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Service Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Service category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="">Select a service category</option>

              {SERVICE_CATEGORIES.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-gray-500">
              Choose the category that best describes your professional field.
            </p>
          </div>

          {/* Professional Skill */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your professional skill
            </label>

            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              disabled={!category}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">
                {category
                  ? "Select your professional skill"
                  : "Select a category first"}
              </option>

              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-gray-500">
              Select the specific service you offer from the approved list.
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Describe your service
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell customers what you do and what they can expect..."
              rows={5}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Years of experience
            </label>

            <input
              id="experience"
              type="number"
              min="0"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 3"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Ikeja, Lagos"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>

            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 08012345678"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label
              htmlFor="whatsappNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              WhatsApp Number
            </label>

            <input
              id="whatsappNumber"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. 08012345678"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Contact Visibility */}
          <div className="rounded-xl border border-gray-200 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={contactVisibility}
                onChange={(e) => setContactVisibility(e.target.checked)}
                className="mt-1 h-4 w-4 accent-green-600"
              />

              <span>
                <span className="block text-sm font-medium text-gray-700">
                  Allow customers to contact me
                </span>

                <span className="mt-1 block text-xs text-gray-500">
                  When enabled, tenants can see your phone number and WhatsApp
                  number on your service provider profile.
                </span>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Completing profile..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderOnboarding;
