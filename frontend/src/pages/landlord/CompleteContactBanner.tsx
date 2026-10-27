import { AlertCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const CompleteContactBanner = () => {
  const { currentUser, loading } = useAuth();

  // Wait for authentication to finish
  if (loading || !currentUser) return null;

  // Only property owners should see this banner
  if (currentUser.role !== "propertyOwner") return null;

  const hasPhone = Boolean(currentUser.phoneNumber?.trim());
  const hasWhatsapp = Boolean(currentUser.whatsappNumber?.trim());
  const isVisible = currentUser.contactVisibility === true;

  // Require at least one contact method and permission to display it
  const isContactComplete = (hasPhone || hasWhatsapp) && isVisible;

  if (isContactComplete) return null;

  return (
    <div
      role="status"
      className="relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <AlertCircle size={24} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Complete Your Contact Information
            </h3>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Action Required
            </span>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Interested tenants need a way to reach you about your
            listed properties. Add your phone or WhatsApp number
            and enable contact visibility so tenants can get in touch.
          </p>

          {/* Reminder */}
          <div className="mt-4 flex items-start gap-2 text-sm text-amber-800">
            <Phone size={16} className="mt-0.5 shrink-0" />
            <span>
              Your contact details will only be shown publicly
              when you enable contact visibility.
            </span>
          </div>

          {/* Action */}
          <Link
            to="/owner/update"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Update Contact Information
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompleteContactBanner;