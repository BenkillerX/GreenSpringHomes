import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Discover",
    links: [
      { label: "Explore homes", to: "/explore" },
      { label: "Find a professional", to: "/professionals" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Home", to: "/" },
    ],
  },
  {
    title: "For Property Owners",
    links: [
      { label: "List your property", to: "/register/property-owner" },
      { label: "Owner dashboard", to: "/dashboard" },
      { label: "Property verification", to: "/verification" },
    ],
  },
  {
    title: "For Professionals",
    links: [
      { label: "Join as a professional", to: "/register/service-provider" },
      { label: "Provider dashboard", to: "/dashboard" },
      { label: "Get verified", to: "/verification" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/help" },
      { label: "Contact us", to: "/contact" },
      { label: "Cancellation policy", to: "/cancellation-policy" },
    ],
  },
];

const legalLinks = [
  { label: "Terms", to: "/terms" },
  { label: "Privacy", to: "/privacy" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-300 pt-12 lg:pt-20">
      {/* Footer Content */}
      <section className="grid w-full grid-cols-1 gap-10 border-y border-gray-400 px-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:px-28 lg:py-12">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-bold">
            Green<span className="text-green-500">Spring</span>Homes
          </h2>

          <p className="mt-2 max-w-xs text-gray-700">
            Connecting tenants, property owners and trusted professionals in
            one place.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((column) => (
          <div key={column.title} className="flex flex-col gap-2">
            <h3 className="mb-2 font-bold">{column.title}</h3>

            {column.links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-green-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </section>

      {/* Bottom bar */}
      <section className="flex flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm text-gray-700 sm:flex-row sm:px-8 sm:text-left lg:px-28">
        <p>
          © 2026 Green<span className="text-green-500">Spring</span>Homes.
          Verified properties. Trusted professionals. Secure bookings.
        </p>

        <div className="flex gap-5">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="hover:text-green-500"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  );
};

export default Footer;