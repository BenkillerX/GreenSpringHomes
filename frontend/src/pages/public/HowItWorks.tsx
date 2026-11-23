import { FiArrowRight, FiHome, FiShield, FiGrid, FiMessageCircle, } from "react-icons/fi";
import { Link } from "react-router-dom";
import HowItWorksHero from "../../components/howitworks/HowItWorksHero";
import UserTypesSection from "../../components/howitworks/UserTypesSection";
import GettingStartedSection from "../../components/howitworks/GettingStartedSection";

const HowItWorks = () => {

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
      <UserTypesSection/>


      {/* SIMPLE PROCESS */}
    <GettingStartedSection/>


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