import { useState } from "react";
import { Phone, MessageCircle, Eye, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";
import { isAxiosError } from "axios";
const UpdateInfo = () => {
  const { currentUser, setCurrentUser, loading } = useAuth();
  const [saving, setSaving] = useState(false);
const [phoneNumber, setPhoneNumber] = useState(
  currentUser?.phoneNumber ?? ""
);

const [whatsappNumber, setWhatsappNumber] = useState(
  currentUser?.whatsappNumber ?? ""
);

const [contactVisibility, setContactVisibility] = useState(
  currentUser?.contactVisibility ?? false
);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneNumber.trim() && !whatsappNumber.trim()) {
      toast.error("Enter at least one contact number");
      return;
    }

    try {
      setSaving(true);

      const response = await api.patch("/api/auth/me", {
        phoneNumber: phoneNumber.trim() || null,
        whatsappNumber: whatsappNumber.trim() || null,
        contactVisibility,
      });

      setCurrentUser(response.data.user);

      toast.success("Contact information updated successfully!");
    }catch (error: unknown) {
  console.error("UPDATE CONTACT ERROR:", error);

  if (isAxiosError<{ message?: string }>(error)) {
    toast.error(
      error.response?.data?.message ??
        "Unable to update contact information"
    );
  } else {
    toast.error("An unexpected error occurred");
  }
} finally {
  setSaving(false);
}
  };

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={28} />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "propertyOwner") {
    return (
      <div className="p-6 text-center text-red-600">
        This page is only available to property owners.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Contact Information
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Update how interested tenants can reach you about your properties.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        {/* Phone Number */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Phone size={17} className="text-emerald-600" />
            Phone Number
          </label>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+2348012345678"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageCircle size={17} className="text-emerald-600" />
            WhatsApp Number
          </label>

          <input
            type="tel"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="+2348012345678"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <p className="mt-2 text-xs text-slate-400">
            Use international format, for example +2348012345678.
          </p>
        </div>

        {/* Contact Visibility */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-emerald-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Show Contact Information
                </h3>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Allow interested tenants to see your contact information
                when viewing your property listings.
              </p>
            </div>

            <input
              type="checkbox"
              checked={contactVisibility}
              onChange={(e) => setContactVisibility(e.target.checked)}
              className="mt-1 h-5 w-5 accent-emerald-600"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Contact Information
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateInfo;
