import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-300 pt-12 lg:pt-20">

      {/* Footer Content */}
      <section className="grid w-full grid-cols-1 gap-10 border-y border-gray-400 px-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:px-28 lg:py-12">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h1 className="text-2xl font-bold">
            Green<span className="text-green-500">Spring</span>Homes
          </h1>

          <p className="mt-2 max-w-xs text-gray-700">
            Connecting people with homes they can trust.
          </p>
        </div>

        {/* Discover */}
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 font-bold">Discover</h1>

          <Link to="" className="hover:text-green-500">
            Explore
          </Link>

          <Link to="" className="hover:text-green-500">
            How it works
          </Link>

          <Link to="" className="hover:text-green-500">
            Home
          </Link>
        </div>

        {/* Hosting */}
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 font-bold">Hosting</h1>

          <p className="cursor-pointer hover:text-green-500">
            Become a Host
          </p>

          <p className="cursor-pointer hover:text-green-500">
            Host Dashboard
          </p>

          <p className="cursor-pointer hover:text-green-500">
            Verification
          </p>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 font-bold">Support</h1>

          <p className="cursor-pointer hover:text-green-500">
            Help Center
          </p>

          <Link to="/contact" className="cursor-pointer hover:text-green-500">
            Contact
          </Link>

          <p className="cursor-pointer hover:text-green-500">
            Cancellation Policy
          </p>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 font-bold">Legal</h1>

          <p className="cursor-pointer hover:text-green-500">
            Terms
          </p>

          <p className="cursor-pointer hover:text-green-500">
            Privacy
          </p>
        </div>

      </section>

      {/* Copyright */}
      <section className="px-4 py-5 text-center text-sm text-gray-700">
        <p>
          © 2026 QuickStay. Verified properties. Flexible stays. Secure booking.
        </p>
      </section>

    </footer>
  )
}

export default Footer