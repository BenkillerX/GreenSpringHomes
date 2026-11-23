import { Link } from "react-router-dom";
import { FiUserPlus, FiPlusCircle, FiMessageCircle, FiArrowRight, } from "react-icons/fi";

const steps = [
  {
    icon: FiUserPlus,
    title: "Create your account",
    text: "Sign up and tell us how you want to use GreenSpringHomes.",
  },
  {
    icon: FiPlusCircle,
    title: "Build your presence",
    text: "Find what you need, or create listings, services and products to showcase.",
  },
  {
    icon: FiMessageCircle,
    title: "Connect and grow",
    text: "Connect with people, discover opportunities and manage everything from your dashboard.",
  },
];

const GettingStartedSection = () => {
  return (
    <section className="bg-[#F3F6F2] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-emerald-950 sm:text-4xl lg:text-[2.75rem]">
              Start in three simple steps.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-emerald-950/70">
              Create an account, choose what you want to do and start
              connecting with people on GreenSpringHomes.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F6F2]"
          >
            Create your account
            <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Steps */}
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="border-t-2 border-emerald-950 pt-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="text-7xl font-semibold leading-none tracking-tighter text-emerald-800/25 lg:text-8xl"
                  >
                    {i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-800">
                    <Icon size={20} />
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-semibold tracking-tight text-emerald-950">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-emerald-950/65">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default GettingStartedSection;