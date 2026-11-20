import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHelpCircle,
  FiChevronRight,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";

type NavChild = { name: string; path: string; description?: string };
type NavItem = { name: string; path: string; children?: NavChild[] };

const navLinks: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Explore",
    path: "/explore",
    children: [
      {
        name: "Properties for Rent",
        path: "/explore?type=rent",
        description: "Apartments and houses ready to move into",
      },
      {
        name: "Artisans",
        path: "/explore?type=artisans",
        description: "Find trusted professionals near you",
      },
      {
        name: "Browse All",
        path: "/explore",
        description: "See everything on GreenSpringHomes",
      },
    ],
  },
  {
    name: "How It Works",
    path: "/how-it-works",
    children: [
      {
        name: "For Tenants",
        path: "/how-it-works#tenants",
        description: "Search, connect and rent with confidence",
      },
      {
        name: "For Property Owners",
        path: "/how-it-works#owners",
        description: "List your property and reach tenants",
      },
      {
        name: "For Artisans",
        path: "/how-it-works#artisans",
        description: "Get discovered and win more jobs",
      },
    ],
  },
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

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-green-50 text-green-700"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`;

const DesktopNavItem = ({ link }: { link: NavItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // Escape closes the menu
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!link.children) {
    return (
      <li className="shrink-0">
        <NavLink to={link.path} end={link.path === "/"} className={desktopLinkClass}>
          {link.name}
        </NavLink>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <NavLink
        to={link.path}
        onClick={() => setOpen(false)}
        className={desktopLinkClass}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {link.name}
        <FiChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </NavLink>

      <div
        className={`absolute left-0 top-full z-50 w-72 pt-2 transition duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gray-100">
          {link.children.map((child) => (
            <li key={child.name}>
              <Link
                to={child.path}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 transition hover:bg-green-50"
              >
                <span className="block text-sm font-semibold text-gray-900">
                  {child.name}
                </span>
                {child.description && (
                  <span className="mt-0.5 block text-xs leading-5 text-gray-500">
                    {child.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <DesktopNavItem key={link.name} link={link} />
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

      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-drawer"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-[transform,visibility] duration-300 ease-out lg:hidden ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
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

        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const hasChildren = !!link.children;
              const isExpanded = expanded === link.name;

              return (
                <li key={link.name}>
                  <div className="flex items-center gap-1">
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex flex-1 items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-green-50 text-green-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      {!hasChildren && (
                        <FiChevronRight size={17} className="text-gray-400" />
                      )}
                    </NavLink>

                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : link.name)}
                        aria-label={`Toggle ${link.name} menu`}
                        aria-expanded={isExpanded}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-50 hover:text-green-600"
                      >
                        <FiChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="ml-4 overflow-hidden border-l border-gray-100 pl-2">
                        {link.children!.map((child) => (
                          <li key={child.name}>
                            <Link
                              to={child.path}
                              onClick={closeMenu}
                              tabIndex={isExpanded ? 0 : -1}
                              className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="my-6 border-t border-gray-100" />

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

          <div className="mt-auto pt-8">
            <div className="rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 p-4 ring-1 ring-green-100">
              <p className="text-sm font-semibold text-gray-900">Have a property?</p>
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