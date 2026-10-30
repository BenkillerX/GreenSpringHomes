import { Link } from "react-router-dom"
import { FiArrowRight, FiCheckCircle, FiHome, FiShield, FiTool, FiShoppingBag, FiGrid, FiMessageCircle, } from "react-icons/fi";

const HowItWorksHero = () => {
  return (
    <section className="overflow-hidden border-b border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
    
        {/* Left content */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Discover more with GreenSpringHomes
          </div>
    
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
            Find opportunities.
            <span className="block text-green-600">
              Make connections.
            </span>
            Build something better.
          </h1>
    
          <p className="mt-6 max-w-lg text-base leading-8 text-gray-500">
            Whether you're searching for a place to call home, looking to
            list a property, offering professional services or selling
            products, GreenSpringHomes brings opportunities together.
          </p>
    
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Get Started
              <FiArrowRight size={17} />
            </Link>
    
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              Explore Platform
            </Link>
          </div>
    
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-green-600" />
              Discover properties
            </span>
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-green-600" />
              Connect with people
            </span>
          </div>
        </div>
    
        {/* Right visual */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5 shadow-sm sm:p-7">
    
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400">
                  GREENSPRINGHOMES
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">
                  Explore possibilities
                </h3>
              </div>
    
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <FiGrid size={20} />
              </div>
            </div>
    
            <div className="mt-6 grid grid-cols-2 gap-3">
    
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FiHome size={21} />
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Properties
                </h4>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Find or list your next home.
                </p>
              </div>
    
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiTool size={21} />
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Services
                </h4>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Discover skilled professionals.
                </p>
              </div>
    
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <FiShoppingBag size={21} />
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Marketplace
                </h4>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Discover products and sellers.
                </p>
              </div>
    
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <FiMessageCircle size={21} />
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Connections
                </h4>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Connect and explore opportunities.
                </p>
              </div>
    
            </div>
    
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-green-600">
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  A platform built around trust
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Discover, connect and grow with confidence.
                </p>
              </div>
            </div>
    
          </div>
        </div>
    
      </div>
    </section>
  )
}

export default HowItWorksHero