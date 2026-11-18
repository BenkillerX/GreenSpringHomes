import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FiArrowRight, FiCalendar, FiCheck, FiMoon, FiSliders } from "react-icons/fi";

const stayPeriod = [
  {
    icon: FiMoon,
    title: "Short stays",
    des: "Nightly pricing for weekends and short trips.",
  },
  {
    icon: FiCalendar,
    title: "Long stays",
    des: "Weekly and monthly rates for extended stays.",
  },
  {
    icon: FiSliders,
    title: "Flexible stays",
    des: "Set your own minimum and maximum nights.",
  },
];

const hostPerks = [
  "Verify once",
  "Publish professionally",
  "Manage reservations, availability and earnings",
];

const reviews = [
  {
    name: "Samuel Adeleke",
    detail: "Tenant · Modern 2-Bedroom Apartment",
    rating: 5,
    quote:
      "Exactly as described — spotless, quiet and the check-in code worked perfectly.",
  },
  {
    name: "Chiamaka Okonkwo",
    detail: "Tenant · Self-contained Apartment",
    rating: 5,
    quote:
      "I was worried about fake listings, but the verified badge gave me confidence. The inspection was smooth from start to finish.",
  },
  {
    name: "Engr. Tunde Ajayi",
    detail: "Property Owner · 3 listings",
    rating: 5,
    quote:
      "Listing was straightforward, and I now manage bookings and availability from one dashboard. I get genuine enquiries.",
  },
  {
    name: "Folake Adebayo",
    detail: "Property Owner · Ado-Ekiti",
    rating: 4,
    quote:
      "Verification took a little time, but it was worth it. Tenants trust the listing more because it is verified.",
  },
  {
    name: "Emmanuel Ojo",
    detail: "Plumber · Service Provider",
    rating: 5,
    quote:
      "I joined as a professional and started getting job requests within the first week. It has brought me steady work.",
  },
  {
    name: "Blessing Ogunleye",
    detail: "Carpenter · Service Provider",
    rating: 5,
    quote:
      "Clients can see my verified profile before they call, so I spend less time convincing people and more time working.",
  },
];

const ListOnGreenSpringHomes = () => {
  return (
    <section className="w-full bg-gray-50 px-4 py-14 sm:px-6 md:px-10 lg:px-28 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Host CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-green-950 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            {/* Text */}
            <div className="w-full lg:w-[48%]">
              <span className="inline-flex rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-300">
                For property owners
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Have a property? List it on Green
                <span className="text-green-400">Spring</span>Homes.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-green-100/70 sm:text-base">
                Verify once, publish professionally and manage reservations,
                availability and earnings from one dashboard.
              </p>

              <ul className="mt-6 space-y-3">
                {hostPerks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-3 text-sm text-green-50 sm:text-base"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <FiCheck size={12} strokeWidth={3} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                to="/register/property-owner"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/40 transition hover:bg-green-400 sm:text-base"
              >
                Become a Host
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stay types */}
            <div className="grid w-full gap-4 lg:w-[46%]">
              {stayPeriod.map(({ icon: Icon, title, des }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-green-400/40 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-green-100/60">
                      {des}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guest reviews */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Testimonials
        </span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          What our community is saying
        </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div>
                  <div
                    className="flex gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        className={
                          i < review.rating ? "text-amber-400" : "text-gray-200"
                        }
                      />
                    ))}
                  </div>

                  <blockquote className="mt-4 text-base leading-7 text-gray-700">
                    “{review.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {review.name}
                    </p>
                   <p className="text-xs text-gray-500">{review.detail}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListOnGreenSpringHomes;