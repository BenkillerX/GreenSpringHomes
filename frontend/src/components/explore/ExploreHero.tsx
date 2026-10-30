import {FiArrowRight, FiHome, } from "react-icons/fi";

const ExploreHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f0f8f1]">
    
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
    
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700">
                  <FiHome />
                  Find your next home
                </span>
    
                <h1 className="mt-7 max-w-xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Find a place
                  <span className="text-green-600">
                    {" "}you'll love.
                  </span>
                </h1>
    
                <p className="mt-6 max-w-lg text-base leading-8 text-gray-500">
                  Discover properties, explore different
                  neighbourhoods and find a place that
                  feels like home. Your next destination
                  starts here.
                </p>
    
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href="#properties"
                    className="rounded-xl bg-green-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
                  >
                    Explore properties
                    <FiArrowRight className="ml-2 inline" />
                  </a>
                </div>
    
                <div className="mt-10 flex flex-wrap gap-8">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      Homes
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      For every lifestyle
                    </p>
                  </div>
    
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      Nigeria
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Explore different locations
                    </p>
                  </div>
                </div>
              </div>
    
              <div className="relative">
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-green-200/60 blur-3xl" />
    
                <img
                  src="/images/QuickStay1.jpg"
                  alt="Beautiful modern residential property"
                  className="relative h-87.5 w-full rounded-3xl object-cover shadow-2xl sm:h-112.5"
                />
    
                <div className="absolute -bottom-6 left-4 rounded-2xl bg-white p-4 shadow-xl sm:left-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                      <FiHome size={22} />
                    </div>
    
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        Find your perfect home
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Start exploring today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
          </section>
  )
}

export default ExploreHero