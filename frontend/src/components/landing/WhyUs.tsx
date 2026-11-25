import { FiCheckCircle, FiUsers, FiTool, FiHeadphones, } from "react-icons/fi";

const reasons = [
  {
    icon: FiCheckCircle,
    audience: "For Tenants",
    title: "Verified Properties",
    text: "Every published home is reviewed and verified by our team before it goes live.",
  },
  {
    icon: FiUsers,
    audience: "For Owners",
    title: "Reach Genuine Tenants",
    text: "List your property once and connect with people who are actively looking for a home.",
  },
  {
    icon: FiTool,
    audience: "For Professionals",
    title: "Get Hired",
    text: "Carpenters, plumbers, electricians and more can showcase their skills to people who need them.",
  },
  {
    icon: FiHeadphones,
    audience: "For Everyone",
    title: "24/7 Support",
    text: "Real help whenever you need it, whether you're renting, listing or offering a service.",
  },
];

const WhyUs = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Why Green<span className="text-green-600">Spring</span>Homes
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            One platform where tenants, property owners and skilled
            professionals come together with trust.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, audience, title, text }) => (
            <article
              key={title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={22} />
                </span>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                  {audience}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;