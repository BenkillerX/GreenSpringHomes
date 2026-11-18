import { FiBriefcase, FiMapPin, FiClock, FiCalendar, FiArrowRight, } from "react-icons/fi";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react";

const ServiceHome = () => {
const { currentUser, serviceProviderProfile, getServiceProviderProfile, loading } = useAuth();
  const userInitial = currentUser?.firstname || "Provider";

  useEffect(() => {
    getServiceProviderProfile().catch((error: unknown) => {
      console.error(
        "FETCH SERVICE PROVIDER PROFILE ERROR:",
        error
      );
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 rounded-lg bg-gray-200" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 rounded-2xl bg-gray-200" />
            <div className="h-32 rounded-2xl bg-gray-200" />
          </div>
          <div className="h-64 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back {userInitial}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your services and connect with potential customers.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4">

        {/* Registered Service */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiBriefcase size={20} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              My Service
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-900 capitalize">
            {serviceProviderProfile?.service || "Not available"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Registered service
          </p>
        </div>

        {/* Experience */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiClock size={20} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Experience
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {serviceProviderProfile?.experience ?? 0}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Years of experience
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Service Provider Profile */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              My Service Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your professional information
            </p>
          </div>

          {serviceProviderProfile?.image?.url && (
            <img
              src={serviceProviderProfile.image.url}
              alt="Service provider"
              className="h-14 w-14 rounded-xl object-cover border border-gray-100"
            />
          )}
        </div>

          <div className="space-y-5 p-5">

            {!serviceProviderProfile ? (
              <div className="py-10 text-center">
                <p className="font-medium text-gray-700">
                  Unable to load your service profile.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Please refresh the page and try again.
                </p>
              </div>
            ) : (
              <>
                {/* Service */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    SERVICE CATEGORY
                  </p>

                  <h3 className="mt-2 text-xl font-semibold capitalize text-gray-900">
                    {serviceProviderProfile?.service || "Not available"}
                  </h3>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    ABOUT MY SERVICE
                  </p>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {serviceProviderProfile?.description}
                  </p>
                </div>

                {/* Additional Information */}
                <div className="flex flex-wrap gap-5 border-t border-gray-100 pt-5">

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMapPin className="text-green-600" />
                    {serviceProviderProfile?.location}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiClock className="text-green-600" />
                    {serviceProviderProfile?.experience} years experience
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCalendar className="text-green-600" />
                    Joined{" "}
                    {serviceProviderProfile?.createdAt && new Date(serviceProviderProfile.createdAt).toLocaleDateString(
                      "en-NG",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>

                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Overview */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="border-b border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Business Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your service provider activity
            </p>
          </div>

          <div className="space-y-5 p-5">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Customer inquiries
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Coming soon
                </p>
              </div>

              <FiArrowRight className="text-gray-400" />
            </div>

            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Service listings
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Coming soon
                  </p>
                </div>

                <FiArrowRight className="text-gray-400" />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Customer reviews
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Coming soon
                  </p>
                </div>

                <FiArrowRight className="text-gray-400" />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceHome;
