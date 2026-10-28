import { Link } from "react-router-dom";
import {
  FiArrowLeft,
} from "react-icons/fi";

const Register = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gray-50">
      {/* Back to Home */}
        <div className="absolute left-5 top-5 z-20 sm:left-8 sm:top-7">
          <Link
            to="/"
            className="flex items-center text-sm font-medium text-gray-600 transition hover:text-green-600"
          >
            <FiArrowLeft size={18} />
           Back to Green<span className="text-green-500">Spring</span>Homes
          </Link>
        </div>
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Join Green<span className="text-green-500">Spring</span>Home.
          </h1>

          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            What would you like to use Green<span className="text-green-500">Spring</span>Home for?
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Tenant */}
          <Link
            to="/register/tenant"
            className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-50 text-green-500 mb-6 text-2xl">
              🏠
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Find a Home
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Search for homes, apartments and properties that match your needs.
            </p>

            <span className="inline-block mt-6 text-sm font-medium text-green-500 group-hover:translate-x-1 transition-transform">
              Continue →
            </span>
          </Link>

          {/* Property Owner */}
          <Link
            to="/register/property-owner"
            className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-50 text-green-500 mb-6 text-2xl">
              🏢
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              List a Property
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              List and manage your properties and connect with potential tenants.
            </p>

            <span className="inline-block mt-6 text-sm font-medium text-green-500 group-hover:translate-x-1 transition-transform">
              Continue →
            </span>
          </Link>

          {/* Service Provider */}
          <Link
            to="/register/service-provider"
            className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-50 text-green-500 mb-6 text-2xl">
              🛠️
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Offer a Service
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Offer your skills and services to people looking for trusted professionals.
            </p>

            <span className="inline-block mt-6 text-sm font-medium text-green-500 group-hover:translate-x-1 transition-transform">
              Continue →
            </span>
          </Link>

        </div>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;