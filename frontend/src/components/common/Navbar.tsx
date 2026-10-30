import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHelpCircle,  FiChevronRight,FiPlus,  } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };


  return (
    <header className="w-full border-b border-gray-200 sticky top-0 z-50 bg-white">
      <nav>
        {/* MOBILE NAVBAR */}
        <div className="px-4 py-3 flex items-center justify-between md:hidden">
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-xl font-bold">
              Green<span className="text-green-500">Spring</span>Home
            </h1>
          </Link>

          {/* Hamburger / Close Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
       <div
  className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 md:hidden ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Header */}
  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
    <Link to="/" onClick={closeMenu}>
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
        Green<span className="text-green-600">Spring</span>Home
      </h2>
    </Link>

    <button
      onClick={closeMenu}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-green-50 hover:text-green-600"
      aria-label="Close menu"
    >
      <FiX size={20} />
    </button>
  </div>

  {/* Navigation */}
  <div className="flex h-[calc(100vh-81px)] flex-col px-5 py-6">
    <ul className="space-y-1">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            onClick={closeMenu}
            className="flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
          >
            <span>{link.name}</span>

            <FiChevronRight
              size={17}
              className="text-gray-400"
            />
          </Link>
        </li>
      ))}
    </ul>

    {/* Divider */}
    <div className="my-6 border-t border-gray-100" />

    {/* Account */}
    <div className="space-y-3">
      <Link
        to="/login"
        onClick={closeMenu}
        className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
      >
        Login
      </Link>

      <Link
        to="/register"
        onClick={closeMenu}
        className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
      >
        Create an Account
      </Link>
    </div>

    {/* Host CTA */}
    <div className="mt-auto">
      <div className="rounded-2xl bg-green-50 p-4">
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-900">
            Have a property?
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            List your property on Green<span className="text-green-500">Spring</span>Homes and reach potential tenants.
          </p>
        </div>

        <Link
          to="/register/property-owner"
          onClick={closeMenu}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <FiPlus size={17} />
          List Your Property
        </Link>
      </div>

      {/* Support */}
      <Link
        to="/help"
        onClick={closeMenu}
        className="mt-4 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-500 transition hover:text-green-600"
      >
        <FiHelpCircle size={17} />
        Need help?
      </Link>
    </div>
  </div>
</div>

        {/* OVERLAY */}
        {isOpen && (
          <div
            onClick={closeMenu}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* DESKTOP / TABLET NAVBAR */}
        <div className="hidden md:flex items-center px-8 lg:px-28 py-2 justify-between w-full">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-xl font-bold">
              Green<span className="text-green-500">Spring</span>Homes
            </h1>
          </Link>

          {/* Navigation */}
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-700 font-medium hover:text-green-500 transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex gap-3 items-center">
            <Link
              to="/help"
              className="flex items-center justify-center gap-2 px-4 py-1.5 bg-white text-green-500 rounded-lg  hover:bg-green-600 hover:text-white transition"
            >
              <FiHelpCircle size={18} />
              Help
            </Link>

            <Link
              to="/login"
              className="px-4 py-1.5 border-2 border-green-500 text-green-500 hover:bg-green-500  hover:text-white text-sm rounded-lg transition"
            >
              Sign In
            </Link>

            <Link
              to="/register/property-owner"
              className="bg-green-500 px-4 py-1.5 rounded-xl text-white hover:bg-green-600 transition"
            >
              List Property
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;