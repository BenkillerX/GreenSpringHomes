import { FiArrowRight, FiCheckCircle, FiHome, FiSearch, FiShield, FiUserPlus, FiTool, FiShoppingBag, FiGrid, FiMessageCircle, FiPlusCircle, } from "react-icons/fi";
import { Link } from "react-router-dom";
import HowItWorksHero from "../../components/howitworks/HowItWorksHero";

const HowItWorks = () => {
  const userTypes = [
    {
      icon: FiSearch,
      title: "Find a Home",
      description:
        "Search for homes, apartments and properties that match your needs, location and budget.",
      steps: [
        "Create your account",
        "Explore available properties",
        "View property details",
        "Connect with the property owner",
      ],
    },
    {
      icon: FiHome,
      title: "List Your Property",
      description:
        "Property owners can showcase their properties and reach people actively looking for a home.",
      steps: [
        "Create your property listing",
        "Add photos and property details",
        "Submit for verification",
        "Manage your listings from your dashboard",
      ],
    },
    {
      icon: FiTool,
      title: "Offer Your Services",
      description:
        "Service providers can showcase their skills and connect with people who need their services.",
      steps: [
        "Create your service profile",
        "Add your skills and experience",
        "Display your services",
        "Connect with potential customers",
      ],
    },
    {
      icon: FiShoppingBag,
      title: "Sell on the Marketplace",
      description:
        "Display products you want to sell and connect with people looking for products on greenSpringHomes.",
      steps: [
        "Create your seller profile",
        "Add your products",
        "Set your prices and product details",
        "Connect with interested buyers",
      ],
    },
  ];

  const platformFeatures = [
    {
      icon: FiShield,
      title: "Built Around Trust",
      description:
        "We are building greenSpringHomes around verification, transparency and safer interactions between users.",
    },
    {
      icon: FiGrid,
      title: "Everything in One Place",
      description:
        "Homes, property services and products come together in one platform.",
    },
    {
      icon: FiMessageCircle,
      title: "Connect Directly",
      description:
        "Connect with property owners, service providers, sellers and potential customers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <HowItWorksHero/>
      {/* HOW THE PLATFORM WORKS */}
      <section className="bg-gray-50 px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              One platform. Different possibilities.
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500">
              Whether you're searching for a home, listing a property,
              offering a service or selling a product, greenSpringHomes
              gives you the tools to get started.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {userTypes.map((type, index) => {
              const Icon = type.icon;

              return (
                <div
                  key={type.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-8"
                >

                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <Icon size={23} />
                    </div>

                    <span className="text-sm font-semibold text-gray-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {type.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {type.description}
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Get started
                    </p>

                    <div className="space-y-3">
                      {type.steps.map((step) => (
                        <div
                          key={step}
                          className="flex items-start gap-3"
                        >
                          <FiCheckCircle
                            size={17}
                            className="mt-0.5 shrink-0 text-green-500"
                          />

                          <span className="text-sm text-gray-600">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* SIMPLE PROCESS */}
      <section className="bg-white px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Getting started
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Start in three simple steps
            </h2>

            <p className="mt-4 text-gray-500">
              Create an account, choose what you want to do and start
              connecting with people on greenSpringHomes.
            </p>
          </div>


          <div className="relative mt-14 grid gap-8 md:grid-cols-3">

            {/* CONNECTING LINE */}
            <div className="absolute left-[16.66%] right-[16.66%] top-7 hidden border-t border-dashed border-green-200 md:block" />

            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green-600 text-white shadow-sm">
                <FiUserPlus size={22} />
              </div>

              <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-green-600">
                Step 01
              </span>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                Create your account
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Sign up and tell us how you want to use
                greenSpringHomes.
              </p>
            </div>


            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green-600 text-white shadow-sm">
                <FiPlusCircle size={22} />
              </div>

              <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-green-600">
                Step 02
              </span>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                Build your presence
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Find what you need or create listings, services
                and products to showcase.
              </p>
            </div>


            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green-600 text-white shadow-sm">
                <FiMessageCircle size={22} />
              </div>

              <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-green-600">
                Step 03
              </span>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                Connect & grow
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Connect with people, discover opportunities and
                manage everything from your dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* PLATFORM BENEFITS */}
      <section className="bg-gray-50 px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-5 md:grid-cols-3">

            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-green-600 px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
            <FiHome size={25} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-green-100 sm:text-base">
            Find a home, list your property, offer your services or
            showcase your products. Your next opportunity could be
            right here.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              Create an Account
              <FiArrowRight size={17} />
            </Link>

            <Link
              to="/explore"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore greenSpringHomes
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HowItWorks;