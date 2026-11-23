import { useState } from "react";
import {
  FiSearch,
  FiShield,
  FiHome,
  FiUser,
  FiCreditCard,
  FiChevronDown,
  FiArrowUpRight,
  FiHeadphones,
} from "react-icons/fi";

const topics = [
  {
    icon: FiHome,
    title: "Properties & Listings",
    description: "List, manage and update your properties.",
  },
  {
    icon: FiUser,
    title: "Account & Profile",
    description: "Manage your profile, settings and preferences.",
  },
  {
    icon: FiShield,
    title: "Safety & Verification",
    description: "How we verify properties and keep you safe.",
  },
  {
    icon: FiCreditCard,
    title: "Payments",
    description: "Payments, transactions and billing help.",
  },
];

const faqs = [
  {
    q: "How do I find a property on GreenSpringHomes?",
    a: "Use the search bar on the home page to filter by location, price and property type. Open any listing to see photos, details and the owner's profile.",
  },
  {
    q: "How can I list my property?",
    a: "Create an account, go to your dashboard and choose Add listing. Add clear photos, a description and your price, then submit it for review.",
  },
  {
    q: "How do I contact a property owner?",
    a: "Open the listing and use the contact options on the page. Keep all conversations on GreenSpringHomes so we can help if something goes wrong.",
  },
  {
    q: "How do I verify a property before making payment?",
    a: "Look for the verified badge on the listing, inspect the property in person, and never pay before you have confirmed the owner's identity and documents.",
  },
];

const Help = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);

  const term = query.trim().toLowerCase();
  const filteredTopics = topics.filter(
    (t) =>
      !term ||
      t.title.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
  );
  const filteredFaqs = faqs.filter(
    (f) =>
      !term ||
      f.q.toLowerCase().includes(term) ||
      f.a.toLowerCase().includes(term)
  );
  const noResults = filteredTopics.length === 0 && filteredFaqs.length === 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <header className="relative overflow-hidden bg-green-700">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-600/40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-green-800/40"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              How can we help you?
            </h1>
            <p className="mt-3 text-base text-green-100 sm:text-lg">
              Search our guides or browse a topic to get answers about renting,
              listing and paying on GreenSpringHomes.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg shadow-green-900/20 focus-within:ring-4 focus-within:ring-green-300/60">
              <FiSearch size={20} className="shrink-0 text-green-600" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search the help centre"
                placeholder="Search for answers, topics or questions"
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
              />
            </div>
          </div>

          {/* Customer care badge */}
          <div className="hidden shrink-0 lg:block">
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-green-700 shadow-xl">
                <FiHeadphones size={48} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16">
        {/* Topics */}
        {filteredTopics.length > 0 && (
          <section className="-mt-8 relative">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.title}
                    className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-md shadow-gray-200/60 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <FiArrowUpRight
                        size={18}
                        className="text-gray-300 transition group-hover:text-green-600"
                      />
                    </div>
                    <h3 className="mt-5 font-semibold text-gray-900">
                      {topic.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-500">
                      {topic.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        {filteredFaqs.length > 0 && (
          <section className="mt-14 grid gap-8 lg:grid-cols-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Quick answers to the things people ask most.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {filteredFaqs.map((faq, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={faq.q}>
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-green-50/50 focus:outline-none focus-visible:bg-green-50"
                      >
                        <span
                          className={`text-sm font-semibold sm:text-base ${
                            isOpen ? "text-green-700" : "text-gray-900"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <FiChevronDown
                          size={20}
                          className={`shrink-0 transition-transform duration-200 ${
                            isOpen
                              ? "rotate-180 text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="px-6 pb-6 text-sm leading-7 text-gray-600">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Empty search state */}
        {noResults && (
          <div className="mt-14 rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <p className="font-semibold">No results for “{query}”</p>
            <p className="mt-1 text-sm text-gray-500">
              Try a different word, or contact our support team below.
            </p>
          </div>
        )}

        {/* Customer care */}
        <section className="mt-14 overflow-hidden rounded-3xl bg-green-50 ring-1 ring-green-100">
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-md shadow-green-600/30">
                <FiHeadphones size={26} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Still need help?</h2>
                <p className="mt-1.5 max-w-lg text-sm leading-6 text-gray-600">
                  Can't find what you're looking for? Our customer care team is
                  ready to help.
                </p>
              </div>
            </div>

            <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-600/25 transition hover:bg-green-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300">
              <FiHeadphones size={18} />
              Contact support
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;