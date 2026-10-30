import { FiHelpCircle, FiSearch, FiMessageCircle, FiShield, FiHome, FiUser, FiCreditCard, FiChevronRight, FiArrowRight, } from "react-icons/fi";

const Help = () => {
  const topics = [
    {
      icon: FiHome,
      title: "Properties & Listings",
      description: "Learn how to list, manage and update your properties.",
    },
    {
      icon: FiUser,
      title: "Account & Profile",
      description: "Manage your profile, account settings and preferences.",
    },
    {
      icon: FiShield,
      title: "Safety & Verification",
      description: "Learn about property verification and staying safe.",
    },
    {
      icon: FiCreditCard,
      title: "Payments",
      description: "Get help with payments, transactions and billing.",
    },
  ];

  const faqs = [
    "How do I find a property on GreenSpringHomes?",
    "How can I list my property?",
    "How do I contact a property owner?",
    "How do I verify a property before making payment?",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-12">

        {/* Page heading */}
        <div className="border-b border-gray-200 pb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiHelpCircle size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Help Centre
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Find answers and get support with GreenSpringHomes.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-7 max-w-2xl">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              How can we help you?
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
              <FiSearch size={20} className="shrink-0 text-gray-400" />

              <input
                type="text"
                placeholder="Search for answers, topics or questions..."
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Help topics */}
        <section className="mt-9">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Browse help topics
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Explore guides and information about using our platform.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <button
                  key={topic.title}
                  className="group rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-green-200 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {topic.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-green-600">
                    Explore topic
                    <FiChevronRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Frequently asked questions */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Quick answers to common questions.
              </p>
            </div>

            <button className="hidden items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 sm:flex">
              View all
              <FiArrowRight size={16} />
            </button>
          </div>

          <div className="mt-5 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
            {faqs.map((faq) => (
              <button
                key={faq}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  {faq}
                </span>
                <FiChevronRight
                  size={18}
                  className="shrink-0 text-gray-400"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Contact support */}
        <section className="mt-12 flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiMessageCircle size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Still need help?
              </h2>
              <p className="mt-1 max-w-lg text-sm leading-6 text-gray-500">
                Can't find the answer you're looking for? Get in touch
                with our support team and we'll be happy to assist you.
              </p>
            </div>
          </div>

          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
            <FiMessageCircle size={17} />
            Contact Support
          </button>
        </section>

      </main>
    </div>
  );
};

export default Help;