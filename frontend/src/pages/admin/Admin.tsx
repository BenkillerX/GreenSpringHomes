import { Users, Building2, BadgeCheck, Wallet, TrendingUp, TrendingDown, ArrowUpRight, Clock, MapPin, CheckCircle2, AlertCircle, UserPlus, PlusCircle, FileCheck, Activity, } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,450",
    change: "+12.5%",
    positive: true,
    description: "Compared to last month",
    icon: Users,
  },
  {
    title: "Total Properties",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    description: "Compared to last month",
    icon: Building2,
  },
  {
    title: "Pending Verification",
    value: "36",
    change: "-4.3%",
    positive: true,
    description: "Compared to last month",
    icon: BadgeCheck,
  },
  {
    title: "Total Revenue",
    value: "₦4.8M",
    change: "+18.6%",
    positive: true,
    description: "Compared to last month",
    icon: Wallet,
  },
];

const recentProperties = [
  {
    name: "Modern 3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    owner: "John Williams",
    price: "₦3,500,000/year",
    status: "Pending",
  },
  {
    name: "Luxury 4 Bedroom Duplex",
    location: "Ajah, Lagos",
    owner: "Sarah Johnson",
    price: "₦85,000,000",
    status: "Approved",
  },
  {
    name: "Self Contained Apartment",
    location: "Yaba, Lagos",
    owner: "Michael James",
    price: "₦450,000/year",
    status: "Pending",
  },
  {
    name: "Commercial Office Space",
    location: "Victoria Island, Lagos",
    owner: "David Peter",
    price: "₦6,000,000/year",
    status: "Approved",
  },
];

const recentUsers = [
  {
    name: "Daniel Williams",
    email: "daniel@example.com",
    role: "Property Owner",
    date: "Today, 10:24 AM",
    initials: "DW",
  },
  {
    name: "Grace Johnson",
    email: "grace@example.com",
    role: "Tenant",
    date: "Today, 09:15 AM",
    initials: "GJ",
  },
  {
    name: "Michael James",
    email: "michael@example.com",
    role: "Service Provider",
    date: "Yesterday",
    initials: "MJ",
  },
];

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-green-700">
              GreenSpringHomes / Administration
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back. Here's what's happening on your platform.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
            <Activity size={17} className="text-green-700" />
            Platform Overview
          </div>
        </div>

        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Platform Statistics
            </h2>
            <span className="text-xs text-gray-400">
              Overview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                      <Icon size={21} />
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-green-700">
                      {stat.positive ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {stat.change}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                      {stat.value}
                    </h3>
                    <p className="mt-2 text-xs text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent Properties */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white xl:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
              <div>
                <h2 className="font-bold text-gray-900">
                  Recent Properties
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Recently submitted property listings
                </p>
              </div>

              <a
                href="/admin/properties"
                className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
              >
                View all <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-162.5 text-left">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Property</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {recentProperties.map((property) => (
                    <tr key={property.name} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {property.name}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {property.location}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {property.owner}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {property.price}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            property.status === "Approved"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-bold text-gray-900">
              Quick Actions
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Frequently used administrative tools
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="/admin/users"
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-green-200 hover:bg-green-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <UserPlus size={19} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    Manage Users
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    View and manage accounts
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-gray-400" />
              </a>

              <a
                href="/admin/property-verification"
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-green-200 hover:bg-green-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                  <FileCheck size={19} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    Verify Properties
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Review pending submissions
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-gray-400" />
              </a>

              <a
                href="/admin/service-providers"
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-green-200 hover:bg-green-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                  <PlusCircle size={19} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    Service Providers
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Manage service accounts
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-gray-400" />
              </a>
            </div>
          </section>
        </div>

        {/* Recent Users and Verification Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Recent Users */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900">
                  Recent Registrations
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Latest users on GreenSpringHomes
                </p>
              </div>

              <a
                href="/admin/users"
                className="text-xs font-semibold text-green-700 hover:text-green-800"
              >
                View all
              </a>
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              {recentUsers.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-700">
                    {user.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {user.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700">
                      {user.role}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      {user.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verification Summary */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-bold text-gray-900">
              Verification Overview
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Property verification activity
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                    <Clock size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Awaiting Review
                    </p>
                    <p className="text-xs text-gray-400">
                      Properties pending approval
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">36</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700">
                    <CheckCircle2 size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Approved
                    </p>
                    <p className="text-xs text-gray-400">
                      Verified property listings
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">1,120</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <AlertCircle size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Rejected
                    </p>
                    <p className="text-xs text-gray-400">
                      Listings that need attention
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">128</span>
              </div>
            </div>

            <a
              href="/admin/property-verification"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
            >
              Review Properties
              <ArrowUpRight size={16} />
            </a>
          </section>
        </div>

        <footer className="border-t border-gray-200 py-5 text-center text-xs text-gray-400">
          GreenSpringHomes Administration Panel
        </footer>
      </div>
    </div>
  );
};

export default Admin;