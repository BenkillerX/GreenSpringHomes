import { useEffect, useMemo, useState } from "react";
import { Search, Users, UserCheck, UserX, MapPin, BriefcaseBusiness, Clock, Mail, Phone, RefreshCw, Loader2, AlertCircle, X, CheckCircle2, CalendarDays, Eye, } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface ProviderUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber?: string | null;
  whatsappNumber?: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

interface ServiceProvider {
  _id: string;
  user: ProviderUser;
  service: string;
  description: string;
  experience: number;
  image: {
    url: string;
    publicId: string;
  };
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceProvidersResponse {
  success: boolean;
  serviceProviders: ServiceProvider[];
  message?: string;
}

type StatusFilter = "all" | "active" | "inactive";

const ServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ServiceProvidersResponse>(
        "/api/admin/service-providers"
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch service providers."
        );
      }

      setProviders(response.data.serviceProviders);
    } catch (error: unknown) {
      console.error("Fetch service providers error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to load service providers.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  let isMounted = true;

  const loadProviders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ServiceProvidersResponse>(
        "/api/admin/service-providers"
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch service providers."
        );
      }

      if (isMounted) {
        setProviders(response.data.serviceProviders);
      }
    } catch (error: unknown) {
      console.error("Fetch service providers error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to load service providers.";

      if (isMounted) {
        setError(message);
        toast.error(message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  void loadProviders();

  return () => {
    isMounted = false;
  };
}, []);

  const activeProviders = providers.filter(
    (provider) => provider.user?.isActive
  ).length;

  const inactiveProviders = providers.length - activeProviders;

  const services = useMemo(
    () =>
      [...new Set(providers.map((provider) => provider.service))].sort(),
    [providers]
  );

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const user = provider.user;

      const fullName = user
        ? `${user.firstname} ${user.lastname}`.toLowerCase()
        : "";

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        fullName.includes(searchValue) ||
        user?.email.toLowerCase().includes(searchValue) ||
        provider.service.toLowerCase().includes(searchValue) ||
        provider.location.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user?.isActive) ||
        (statusFilter === "inactive" && !user?.isActive);

      const matchesService =
        serviceFilter === "all" || provider.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [providers, search, statusFilter, serviceFilter]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const closeDetails = () => setSelectedProvider(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-375 space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Service Providers
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor registered service providers.
            </p>
          </div>

          <button
            onClick={fetchProviders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Providers"
            value={providers.length}
            icon={<Users size={21} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Active Providers"
            value={activeProviders}
            icon={<UserCheck size={21} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Inactive Providers"
            value={inactiveProviders}
            icon={<UserX size={21} />}
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, service or location..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="all">All Account Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="all">All Services</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Providers Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Registered Providers
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {filteredProviders.length} provider
                {filteredProviders.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-75 flex-col items-center justify-center gap-3">
              <Loader2 size={30} className="animate-spin text-emerald-600" />
              <p className="text-sm text-slate-500">
                Loading service providers...
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-75 flex-col items-center justify-center px-4 text-center">
              <AlertCircle size={35} className="text-red-500" />
              <p className="mt-3 font-semibold text-slate-800">
                Unable to load providers
              </p>
              <p className="mt-1 text-sm text-slate-500">{error}</p>
              <button
                onClick={fetchProviders}
                className="mt-4 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Try again
              </button>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="flex min-h-75 flex-col items-center justify-center px-4 text-center">
              <BriefcaseBusiness size={38} className="text-slate-300" />
              <p className="mt-3 font-semibold text-slate-800">
                No service providers found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-237.5 text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Provider</th>
                    <th className="px-5 py-4 font-semibold">Service</th>
                    <th className="px-5 py-4 font-semibold">Location</th>
                    <th className="px-5 py-4 font-semibold">Experience</th>
                    <th className="px-5 py-4 font-semibold">Account Status</th>
                    <th className="px-5 py-4 font-semibold">Date Joined</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProviders.map((provider) => (
                    <tr
                      key={provider._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={provider.image?.url}
                            alt={`${provider.user?.firstname ?? "Provider"} profile`}
                            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                          />

                          <div>
                            <p className="font-semibold text-slate-800">
                              {provider.user?.firstname}{" "}
                              {provider.user?.lastname}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {provider.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          {provider.service}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          {provider.location}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {provider.experience}{" "}
                        {provider.experience === 1 ? "year" : "years"}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge active={provider.user?.isActive} />
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {formatDate(provider.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedProvider(provider)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={closeDetails}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Provider Details
                </h2>
                <p className="text-xs text-slate-500">
                  Service provider profile and account information
                </p>
              </div>

              <button
                onClick={closeDetails}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img
                  src={selectedProvider.image?.url}
                  alt="Provider profile"
                  className="h-20 w-20 rounded-2xl border border-slate-200 object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedProvider.user?.firstname}{" "}
                    {selectedProvider.user?.lastname}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedProvider.service}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge
                      active={selectedProvider.user?.isActive}
                    />

                    {selectedProvider.user?.isEmailVerified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        <CheckCircle2 size={13} />
                        Email verified
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Email not verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={<Mail size={17} />}
                  label="Email Address"
                  value={selectedProvider.user?.email}
                />

                <DetailItem
                  icon={<Phone size={17} />}
                  label="Phone Number"
                  value={selectedProvider.user?.phoneNumber || "Not provided"}
                />

                <DetailItem
                  icon={<Phone size={17} />}
                  label="WhatsApp Number"
                  value={
                    selectedProvider.user?.whatsappNumber || "Not provided"
                  }
                />

                <DetailItem
                  icon={<MapPin size={17} />}
                  label="Location"
                  value={selectedProvider.location}
                />

                <DetailItem
                  icon={<BriefcaseBusiness size={17} />}
                  label="Service"
                  value={selectedProvider.service}
                />

                <DetailItem
                  icon={<Clock size={17} />}
                  label="Experience"
                  value={`${selectedProvider.experience} ${
                    selectedProvider.experience === 1 ? "year" : "years"
                  }`}
                />

                <DetailItem
                  icon={<CalendarDays size={17} />}
                  label="Date Registered"
                  value={formatDate(selectedProvider.createdAt)}
                />
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold text-slate-800">
                  Service Description
                </h4>
                <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedProvider.description}
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                onClick={closeDetails}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}

const StatCard = ({
  title,
  value,
  icon,
  iconClass,
}: StatCardProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
      </div>

      <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>
    </div>
  </div>
);

const StatusBadge = ({ active }: { active?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
      active
        ? "bg-emerald-50 text-emerald-700"
        : "bg-red-50 text-red-700"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        active ? "bg-emerald-500" : "bg-red-500"
      }`}
    />
    {active ? "Active" : "Inactive"}
  </span>
);

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 wrap-break-word text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  </div>
);

export default ServiceProviders;
