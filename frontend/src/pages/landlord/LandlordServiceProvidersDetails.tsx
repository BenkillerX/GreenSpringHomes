import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiClock, FiPhone, FiMessageCircle, } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../services/api";

interface ServiceProvider {
  _id: string;
  image?: {
    url?: string;
  };
  service: string;
  description: string;
  experience: number;
  location: string;
  provider: {
    firstname: string;
    lastname: string;
    phoneNumber: string | null;
    whatsappNumber: string | null;
    contactVisibility?: boolean;
  };
  contactVisible: boolean;
}


const LandlordServiceProvidersDetails = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProvider = async () => {
      try {
        const response = await api.get(`/api/service-providers/${id}`);
        setProvider(response.data.serviceProvider);
      } catch (error: unknown) {
        console.error("Fetch provider details error:", error);
        toast.error("Unable to load provider details.");
      } finally {
        setLoading(false);
      }
    };

    getProvider();
  }, [id]);

  const getWhatsAppLink = (number: string) => {
    let formattedNumber = number.replace(/\D/g, "");

    if (formattedNumber.startsWith("0")) {
      formattedNumber = `234${formattedNumber.slice(1)}`;
    }

    return `https://wa.me/${formattedNumber}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Loading provider details...
        </p>
      </div>
    );
  }

  if (!provider) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Provider not found
          </h2>

          <Link
            to="/tenant/service-providers"
            className="mt-4 inline-block text-sm font-semibold text-emerald-700"
          >
            Back to service providers
          </Link>
        </div>
      </main>
    );
  }

  const providerName = `${provider.provider.firstname} ${provider.provider.lastname}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-6">

        <Link
          to="/tenant/service-providers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700"
        >
          <FiArrowLeft />
          Back to service providers
        </Link>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-64 bg-slate-100 sm:h-80">
            <img
              src={provider.image?.url || "/placeholder-provider.jpg"}
              alt={providerName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/placeholder-provider.jpg";
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6 p-5 sm:p-8">
            <div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                {provider.service}
              </span>

              <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                {providerName}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Service Provider
              </p>
            </div>

            <div className="grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FiMapPin size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {provider.location || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FiClock size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Experience</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {provider.experience} years
                  </p>
                </div>
              </div>
            </div>

            <section>
              <h2 className="text-lg font-bold text-slate-900">
                About this professional
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {provider.description}
              </p>
            </section>

            <section className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900">
                Contact this provider
              </h2>

              {(provider.contactVisible ||
                provider.provider.contactVisibility) &&
              (provider.provider.phoneNumber ||
                provider.provider.whatsappNumber) ? (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  {provider.provider.whatsappNumber && (
                    <a
                      href={getWhatsAppLink(provider.provider.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <FiMessageCircle />
                      Contact on WhatsApp
                    </a>
                  )}

                  {provider.provider.phoneNumber && (
                    <a
                      href={`tel:${provider.provider.phoneNumber}`}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <FiPhone />
                      Call Provider
                    </a>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  This provider hasn't made their contact details public.
                </p>
              )}
            </section>
          </div>
        </article>
      </div>
    </main>
  );
};

export default LandlordServiceProvidersDetails;