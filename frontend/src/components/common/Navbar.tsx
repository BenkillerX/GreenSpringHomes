import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiHelpCircle, FiChevronRight, FiPlus } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "How It Works", path: "/how-it-works" },
];

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <Link
    to="/"
    onClick={onClick}
    className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
  >
    <img
      src="/GreenSpringLogo.jpeg"
      alt="GreenSpringHomes logo"
      className="h-9 w-9 shrink-0 rounded-lg object-cover"
    />
    <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
      Green<span className="text-green-600">Spring</span>Homes
    </span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // Add a shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll, close on Escape, and close if the screen grows to desktop size
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-lg transition-shadow duration-300 ${
          scrolled ? "border-gray-200/80 shadow-sm" : "border-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name} className="shrink-0">
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              to="/help"
              aria-label="Help"
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <FiHelpCircle size={17} />
              <span className="hidden xl:inline">Help</span>
            </Link>

            <Link
              to="/login"
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="whitespace-nowrap rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 hover:shadow-md active:scale-[0.97]"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile / tablet menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            <FiMenu size={22} />
          </button>
        </nav>
      </header>

      {/* Overlay (outside the header so it isn't affected by its backdrop blur) */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile / tablet drawer */}
      <aside
        id="mobile-drawer"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-[transform,visibility] duration-300 ease-out lg:hidden ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-5">
          <Logo onClick={closeMenu} />

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-green-50 hover:text-green-600"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <FiChevronRight size={17} className="text-gray-400" />
                </NavLink>
              </li>
            ))}
          </ul>

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
              className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98]"
            >
              Create an Account
            </Link>
          </div>

          {/* Host CTA + support */}
          <div className="mt-auto pt-8">
            <div className="rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 p-4 ring-1 ring-green-100">
              <p className="text-sm font-semibold text-gray-900">
                Have a property?
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                List your property on Green
                <span className="text-green-600">Spring</span>Homes and reach
                potential tenants.
              </p>

              <Link
                to="/register/property-owner"
                onClick={closeMenu}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
              >
                <FiPlus size={17} />
                List Your Property
              </Link>
            </div>

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
      </aside>
    </>
  );
};

export default Navbar;