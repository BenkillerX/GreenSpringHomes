import { FiArrowRight, FiCheckCircle, FiHome, FiKey, FiTool, } from "react-icons/fi";

const SERVICES = [
  {
    icon: FiHome,
    title: "Rent a home",
    text: "Browse listings across Nigeria.",
    href: "#properties",
  },
  {
    icon: FiKey,
    title: "List a property",
    text: "Reach tenants looking for a place.",
    href: "#properties",
  },
  {
    icon: FiTool,
    title: "Hire an artisan",
    text: "Plumbers, electricians, carpenters.",
    href: "#properties",
  },
];

const ExploreHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#f0f8f1] to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-2 lg:py-24">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-1.5 text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Rentals · Property listings · Trusted artisans
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
            Find your next home in Nigeria, with
            <span className="text-green-600"> trusted help </span>
            close by.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600">
            GreenSpringHomes connects tenants, property owners and skilled
            artisans in one place, so finding, listing and maintaining a home
            is simpler.
          </p>

          {/* Trust points */}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {["Verified listings", "Skilled local artisans", "Free to browse"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FiCheckCircle className="text-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-green-200/60 blur-3xl" />

          <img
            src="/images/GreenSpringHomes1.jpg"
            alt="Modern residential property listed on GreenSpringHomes"
            className="relative h-87.5 w-full rounded-3xl object-cover shadow-2xl sm:h-125"
          />

          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:left-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <FiTool size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Need repairs or fittings?</p>
              <p className="mt-0.5 text-xs text-gray-500">Hire a vetted artisan nearby</p>
            </div>
          </div>
        </div>
      </div>

      {/* Three pillars */}
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text, href }) => (
            <a
              key={title}
              href={href}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="mt-0.5 text-sm text-gray-500">{text}</p>
              </div>
              <FiArrowRight className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-600" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreHero;