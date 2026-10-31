import { MdVerifiedUser } from "react-icons/md"
import { FiShield,FiUsers,} from "react-icons/fi";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
   <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[url('/images/GreenSpringHomes1.jpg')] bg-cover bg-center">
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/55" />

  {/* Main Content */}
  <div className="relative z-10 mx-auto flex w-[85%] max-w-7xl items-center justify-between gap-12 py-24">

    {/* LEFT SIDE */}
    <div className="w-full lg:w-[52%]">

      {/* Badge */}
      <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-sm text-white backdrop-blur-sm">
        <MdVerifiedUser size={20} className="text-green-500" />
        Verified properties. Flexible stays. Secure booking
      </span>

      {/* Heading */}
      <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        Find A Place
        <br />
        <span className="text-green-400">You Can Trust</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-base leading-7 text-gray-100 sm:text-lg md:text-xl">
        Comfortable homes, verified properties and flexible stays all in
        one place.
      </p>

      {/* Features */}
      <div className="mt-8 flex max-w-3xl flex-wrap gap-x-6 gap-y-4 text-sm text-white sm:text-base">
        <span className="flex items-center gap-2">
          <MdVerifiedUser size={17} className="text-green-400" />
          Verified Properties
        </span>

        <span className="flex items-center gap-2">
          <MdVerifiedUser size={17} className="text-green-400" />
          Secure Bookings
        </span>

        <span className="flex items-center gap-2">
          <MdVerifiedUser size={17} className="text-green-400" />
          Flexible Stays
        </span>

        <span className="flex items-center gap-2">
          <MdVerifiedUser size={17} className="text-green-400" />
          24/7 Support
        </span>
      </div>

      {/* CTA */}
      <div className="mt-9 flex flex-wrap gap-4">
        <Link to="/explore" className="rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700">
          Explore Properties
        </Link>

        <Link to="/register/property-owner" className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-green-700">
          List Your Property
        </Link>
      </div>
    </div>


    {/* RIGHT SIDE */}
    <div className="relative hidden h-137.5 w-[45%] lg:block ">

      {/* Glow */}
      <div className="absolute right-10 top-20 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />

      {/* Main Building Image */}
      <div className="absolute right-0 top-1/2 h-127.5 w-117.5 -translate-y-1/2 overflow-hidden rounded-4xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
        <img
          src="/images/hero-building.png"
          alt="Modern property"
          className="h-full w-full rounded-3xl object-cover"
        />

        {/* Image overlay */}
        <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-black/60 p-4 text-white backdrop-blur-md">
          <p className="text-xs text-gray-300">Featured Property</p>
          <h3 className="mt-1 text-lg font-semibold">
            Modern Apartments
          </h3>
          <p className="mt-1 text-sm text-green-400">
            ₦3,000,000 / year
          </p>
        </div>
      </div>


      {/* VERIFIED BADGE */}
      <div className="absolute left-3 top-24 flex animate-[float_4s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
          <MdVerifiedUser size={21} />
        </div>

        <div>
          <p className="text-xs text-gray-500">Property</p>
          <p className="text-sm font-semibold text-gray-900">
            Verified
          </p>
        </div>
      </div>


      {/* SECURE BOOKING BADGE */}
      <div className="absolute bottom-39 left-5 flex animate-[float_5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
          <FiShield size={20} />
        </div>

        <div>
          <p className="text-xs text-gray-500">Booking</p>
          <p className="text-sm font-semibold text-gray-900">
            Secure & Protected
          </p>
        </div>
      </div>


      {/* USERS BADGE */}
      <div className="absolute right-3.75 top-20 flex animate-[float_4.5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
          <FiUsers size={20} />
        </div>

        <div>
          <p className="text-xs text-gray-500">Trusted by</p>
          <p className="text-sm font-semibold text-gray-900">
            1,000+ Users
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
  )
}

export default HeroSection