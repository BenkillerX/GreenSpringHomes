import { MdVerifiedUser } from "react-icons/md";
import { FiShield, FiHome, FiKey, FiTool, FiArrowRight, } from "react-icons/fi";
import { Link } from "react-router-dom";

const audiences = [
  {
    icon: FiHome,
    title: "I need a home",
    text: "Browse verified properties",
    cta: "Explore Properties",
    to: "/explore",
  },
  {
    icon: FiKey,
    title: "I own property",
    text: "List it and find tenants",
    cta: "List Your Property",
    to: "/register/property-owner",
  },
  {
    icon: FiTool,
    title: "I offer a service",
    text: "Carpenters, plumbers & more",
    cta: "Join as a Professional",
    to: "/register/service-provider",
  },
];

const trustPoints = [
  "Verified Properties",
  "Secure Bookings",
  "Skilled Professionals",
  "24/7 Support",
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[url('/images/GreenSpringHomes1.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-[90%] max-w-7xl items-center justify-between gap-12 py-16 sm:w-[85%] lg:py-24">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[54%]">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm sm:text-sm">
            <MdVerifiedUser size={20} className="shrink-0 text-green-500" />
            Tenants, property owners and trusted professionals
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Find a Home.
            <br />
            List a Property.
            <br />
            <span className="text-green-400">Hire a Pro.</span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-100 sm:text-lg">
            GreenSpringHomes brings everyone in property together. Tenants find
            verified homes, owners reach genuine tenants, and skilled service
            providers like carpenters, plumbers and electricians get hired.
          </p>

          {/* Audience cards (one per user type) */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {audiences.map(({ icon: Icon, title, text, cta, to }) => (
              <Link
                key={title}
                to={to}
                aria-label={cta}
                className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-green-400 hover:bg-white/20 sm:flex-col sm:items-start sm:gap-2"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-green-400 transition group-hover:bg-green-500 group-hover:text-white">
                  <Icon size={22} />
                </span>

                <span className="min-w-0 flex-1 sm:flex-none">
                  <span className="block text-sm font-semibold sm:text-base">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-gray-300">
                    {text}
                  </span>
                </span>

                <FiArrowRight
                  size={18}
                  className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-green-400 sm:mt-1"
                />
              </Link>
            ))}
          </div>

          {/* Trust points */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-2">
                <MdVerifiedUser size={17} className="text-green-400" />
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative hidden h-137.5 w-[42%] lg:block">
          {/* Glow */}
          <div className="absolute right-10 top-20 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />

          {/* Main Building Image */}
          <div className="absolute right-0 top-1/2 h-127.5 w-105 -translate-y-1/2 overflow-hidden rounded-4xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm xl:w-117.5">
            <img
              src="/images/hero-building.png"
              alt="Modern property"
              className="h-full w-full rounded-3xl object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-black/60 p-4 text-white backdrop-blur-md">
              <p className="text-xs text-gray-300">Featured Property</p>
              <h3 className="mt-1 text-lg font-semibold">Modern Apartments</h3>
              <p className="mt-1 text-sm text-green-400">₦3,000,000 / year</p>
            </div>
          </div>

          {/* TENANTS BADGE */}
          <div className="absolute left-0 top-20 flex animate-[float_4s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiHome size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">For Tenants</p>
              <p className="text-sm font-semibold text-gray-900">
                Verified Homes
              </p>
            </div>
          </div>

          {/* OWNERS BADGE */}
          <div className="absolute right-3.75 top-8 flex animate-[float_4.5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiKey size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">For Owners</p>
              <p className="text-sm font-semibold text-gray-900">
                Reach Tenants
              </p>
            </div>
          </div>

          {/* SERVICE PROVIDERS BADGE */}
          <div className="absolute bottom-39 left-0 flex animate-[float_5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiTool size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">For Professionals</p>
              <p className="text-sm font-semibold text-gray-900">
                Get Hired
              </p>
            </div>
          </div>

          {/* SECURE BADGE */}
          <div className="absolute bottom-10 right-0 flex animate-[float_4.8s_ease-in-out_infinite] items-center gap-2 rounded-full border border-white/20 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-md">
            <FiShield size={16} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-900">
              Secure & Protected
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;