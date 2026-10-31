import { Link } from "react-router-dom"
import {
  FiHome,
} from "react-icons/fi";
const LoginImageSide = () => {
  return (
    <>
         <div className="relative hidden h-162.5 w-1/2 overflow-hidden rounded-4xl bg-green-700 md:block">

      {/* Background Image */}
      <img
        src="/images/GreenSpringHomes1.jpg"
        alt="Modern QuickStay property"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 lg:p-12">

        {/* Logo */}
        <Link to="/" className="w-fit">
          <h2 className="text-2xl font-bold text-white">
            Green<span className="text-green-400">Spring</span>Homes
          </h2>
        </Link>

        {/* Main Message */}
        <div className="max-w-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
            <FiHome size={23} />
          </div>

          <h2 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
            Your next home is closer than you think.
          </h2>

          <p className="mt-5 leading-7 text-gray-200">
            Discover verified properties, connect with trusted hosts and
            manage your stays with confidence.
          </p>

          {/* Trust badges */}
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              ✓ Verified Properties
            </span>

            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              ✓ Secure Bookings
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-3 text-sm text-gray-200">
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300" />
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400" />
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-500" />
          </div>

          <span>Trusted by people finding their next stay</span>
        </div>

      </div>
    </div>
    </>
  )
}

export default LoginImageSide