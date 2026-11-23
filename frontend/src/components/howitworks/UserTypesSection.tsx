import { Link } from "react-router-dom";
import { FiSearch, FiHome, FiTool, FiArrowRight } from "react-icons/fi";

const userTypes = [
  {
    icon: FiSearch,
    title: "Find a home",
    description:
      "Search for homes, apartments and properties that match your needs, location and budget.",
    steps: [
      "Create your account",
      "Explore available properties",
      "View property details",
      "Connect with the property owner",
    ],
    cta: { label: "Start searching", to: "/explore" },
    featured: true,
  },
  {
    icon: FiHome,
    title: "List your property",
    description:
      "Showcase your property and reach people who are actively looking for a home.",
    steps: [
      "Create your property listing",
      "Add photos and property details",
      "Submit for verification",
      "Manage your listings from your dashboard",
    ],
    cta: { label: "List a property", to: "/register" },
  },
  {
    icon: FiTool,
    title: "Offer your services",
    description:
      "Showcase your skills and connect with people who need your services.",
    steps: [
      "Create your service profile",
      "Add your skills and experience",
      "Display your services",
      "Connect with potential customers",
    ],
    cta: { label: "Join as a provider", to: "/register" },
  },
];

const UserTypesSection = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-green-600 sm:text-4xl lg:text-[2.75rem]">
            One platform, three ways to get started.
          </h2>
          <p className="max-w-md text-base leading-7 text-emerald-950/70 lg:justify-self-end">
            Whether you're looking for a home, listing a property or offering a
            service, GreenSpringHomes gives you what you need to begin.
          </p>
        </div>

        {/* Paths */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const dark = type.featured;

            return (
              <article
                key={type.title}
                className={`flex flex-col rounded-3xl p-7 sm:p-8 ${
                  dark
                    ? "bg-emerald-950 text-white"
                    : "bg-[#F3F6F2] text-emerald-950"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    dark
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-emerald-800 text-white"
                  }`}
                >
                  <Icon size={22} />
                </span>

                <h3 className="mt-7 text-2xl font-semibold tracking-tight">
                  {type.title}
                </h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    dark ? "text-white/65" : "text-emerald-950/65"
                  }`}
                >
                  {type.description}
                </p>

                {/* Steps: a real sequence, so numbered */}
                <ol className="relative mt-8 flex-1">
                  <span
                    aria-hidden="true"
                    className={`absolute left-3.25 top-4 bottom-4 w-px ${
                      dark ? "bg-white/15" : "bg-emerald-950/15"
                    }`}
                  />
                  {type.steps.map((step, i) => (
                    <li
                      key={step}
                      className="relative flex items-start gap-4 pb-5 last:pb-0"
                    >
                      <span
                        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          dark
                            ? "bg-emerald-900 text-emerald-200 ring-4 ring-emerald-950"
                            : "bg-white text-emerald-800 ring-4 ring-[#F3F6F2]"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`pt-0.5 text-sm leading-6 ${
                          dark ? "text-white/85" : "text-emerald-950/80"
                        }`}
                      >
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <Link
                  to={type.cta.to}
                  className={`mt-8 inline-flex items-center justify-between rounded-xl px-5 py-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    dark
                      ? "bg-white text-emerald-950 hover:bg-emerald-50 focus-visible:ring-white focus-visible:ring-offset-emerald-950"
                      : "bg-emerald-800 text-white hover:bg-emerald-900 focus-visible:ring-emerald-700 focus-visible:ring-offset-[#F3F6F2]"
                  }`}
                >
                  {type.cta.label}
                  <FiArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;