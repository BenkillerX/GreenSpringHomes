import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiSearch, FiMessageCircle, FiKey, FiCamera, FiUserCheck, FiHome, FiTool, FiCalendar, FiStar, FiUsers, } from "react-icons/fi";

const ROLES = [
  {
    id: "tenant",
    tab: "Find a home",
    icon: FiHome,
    headline: "Find a place you can trust, without the runaround.",
    cta: { label: "Search rentals", to: "/explore" },
    steps: [
      {
        icon: FiSearch,
        title: "Search by area and budget",
        text: "Filter listings by location, rent and size.",
      },
      {
        icon: FiMessageCircle,
        title: "Talk to the owner directly",
        text: "Ask questions and arrange an inspection in the chat.",
      },
      {
        icon: FiKey,
        title: "Move in",
        text: "Need repairs or fittings? Hire a vetted artisan on the same platform.",
      },
    ],
  },
  {
    id: "owner",
    tab: "List a property",
    icon: FiUsers,
    headline: "Put your property in front of people who are looking.",
    cta: { label: "List a property", to: "/register" },
    steps: [
      {
        icon: FiCamera,
        title: "Add photos, videos and details",
        text: "Set your rent, location and what's included.",
      },
      {
        icon: FiUserCheck,
        title: "Get verified",
        text: "A verified badge shows tenants your listing is real.",
      },
      {
        icon: FiMessageCircle,
        title: "Receive enquiries",
        text: "Reply to interested tenants and book inspections.",
      },
    ],
  },
  {
    id: "artisan",
    tab: "Offer a service",
    icon: FiTool,
    headline: "Get hired for the work you already do well.",
    cta: { label: "Join as an artisan", to: "/register" },
    steps: [
      {
        icon: FiTool,
        title: "Create your service profile",
        text: "List your trade, your area and examples of past work.",
      },
      {
        icon: FiCalendar,
        title: "Receive job requests",
        text: "Tenants and property owners near you send requests.",
      },
      {
        icon: FiStar,
        title: "Build your reputation",
        text: "Reviews from completed jobs bring you more work.",
      },
    ],
  },
];

const HowItWorksHero = () => {
  const [active, setActive] = useState("tenant");
  const role = ROLES.find((r) => r.id === active);

  return (
    <section className="border-b border-emerald-950/10 bg-[#F3F6F2] min-h-screen">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-24">
        {/* Left: framing + role picker */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-emerald-950 sm:text-5xl lg:text-[3.4rem]">
            One platform for homes, owners and the people who fix them.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-emerald-950/70">
            GreenSpringHomes connects tenants, property owners and artisans
            across Nigeria. Choose what you want to do to see how it works.
          </p>

          <div
            role="tablist"
            aria-label="Choose what you want to do"
            className="mt-8 inline-flex w-full flex-col gap-1 rounded-2xl bg-emerald-950/6 p-1 sm:w-auto sm:flex-row"
          >
            {ROLES.map((r) => {
              const Icon = r.icon;
              const selected = r.id === active;
              return (
                <button
                  key={r.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="hiw-panel"
                  onClick={() => setActive(r.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                    selected
                      ? "bg-white text-emerald-950 shadow-sm"
                      : "text-emerald-950/60 hover:text-emerald-950"
                  }`}
                >
                  <Icon size={16} />
                  {r.tab}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
           {role?.cta.to && (
            <Link
              to={role.cta.to}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              {role.cta.label}
              <FiArrowRight size={16} />
            </Link>
          )}

          <Link
            to="/explore"
            className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-semibold text-emerald-950/70 underline-offset-4 transition hover:text-emerald-950 hover:underline"
          >
            Browse the platform first
          </Link>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-semibold text-emerald-950/70 underline-offset-4 transition hover:text-emerald-950 hover:underline"
            >
              Browse the platform first
            </Link>
          </div>
        </div>

        {/* Right: steps for the chosen role */}
        <div
          id="hiw-panel"
          role="tabpanel"
          aria-live="polite"
          className="rounded-3xl bg-emerald-950 p-6 text-white sm:p-8"
        >
          <p className="text-xl font-medium leading-snug sm:text-2xl">
            {role?.headline}
          </p>

          <ol className="relative mt-8">
            {/* connecting line */}
            <span
              aria-hidden="true"
              className="absolute left-4.75 top-5 bottom-5 w-px bg-white/15"
            />
            {role?.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={`${role.id}-${i}`}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
                    <Icon size={18} />
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-1 max-w-sm text-sm leading-6 text-white/65">
                      {step.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;