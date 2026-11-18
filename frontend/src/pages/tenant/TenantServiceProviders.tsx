
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiClock, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../services/api";

interface ServiceProvider {
  _id: string;
  image?: {
    url?: string;
    publicId?: string;
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
  };
  contactVisible: boolean;
}

const TenantServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServiceProviders = async () => {
      try {
        const response = await api.get("/api/service-providers");
        setProviders(response.data.serviceProviders ?? []);
      } catch (error: unknown) {
        console.error("Failed to fetch service providers:", error);
        toast.error("Unable to load service providers.");
      } finally {
        setLoading(false);
      }
    };

    getServiceProviders();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(providers.map((provider) => provider.service).filter(Boolean))];
  }, [providers]);

  const filteredProviders = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesCategory =
        !activeCategory || provider.service === activeCategory;

      const providerName = [
        provider.provider?.firstname,
        provider.provider?.lastname,
      ].filter(Boolean).join(" ");

      const matchesSearch =
        !searchTerm ||
        [
          providerName,
          provider.service,
          provider.location,
          provider.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [providers, activeCategory, search]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Loading service providers...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header and Search */}
        <section>
          <h1 className="text-2xl font-bold text-slate-900">
            Find Service Providers
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Discover professionals who can help with your property needs.
          </p>

          <div className="relative mt-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, service or location..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </section>

        {/* Service Categories */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Service Categories
            </h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              type="button"
              aria-pressed={!activeCategory}
              onClick={() => setActiveCategory("")}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                !activeCategory
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
              }`}
            >
              All Services
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Available Providers */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Available Professionals
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Browse professionals and view their profiles.
              </p>
            </div>

            <span className="shrink-0 text-sm text-slate-500">
              {filteredProviders.length} found
            </span>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No service providers found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search or select a different service category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => {
                const providerName = [
                  provider.provider?.firstname,
                  provider.provider?.lastname,
                ].filter(Boolean).join(" ") || "Service Provider";

                return (
                  <Link
                    key={provider._id}
                    to={`/tenant/service-providers/${provider._id}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Provider Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={
                          provider.image?.url ||
                          "/placeholder-provider.jpg"
                        }
                        alt={providerName}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            "/placeholder-provider.jpg";
                        }}
                        className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                        {provider.service}
                      </span>
                    </div>

                    {/* Provider Details */}
                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {providerName}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                          {provider.description}
                        </p>
                      </div>

                      <div className="space-y-2 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FiMapPin className="shrink-0 text-emerald-600" />
                          {provider.location || "Location not specified"}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FiClock className="shrink-0 text-emerald-600" />
                          {provider.experience} years experience
                        </div>
                      </div>

                      <div className="flex justify-end border-t border-slate-100 pt-4">
                        <span className="text-sm font-semibold text-emerald-700 transition group-hover:text-emerald-800">
                          View profile →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default TenantServiceProviders;
