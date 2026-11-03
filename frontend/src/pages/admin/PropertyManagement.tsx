import { useState } from "react";
import { Building2, CheckCircle2, Clock3, XCircle, Search, SlidersHorizontal, Plus, ChevronLeft, ChevronRight, ArrowUpDown, } from "lucide-react";

type VerificationFilter = "all" | "pending" | "verified" | "rejected";
type ListingFilter = "all" | "rent" | "sale";

const PropertyManagement = () => {
  const [search, setSearch] = useState("");
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>("all");
  const [listingFilter, setListingFilter] =
    useState<ListingFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    {
      title: "Total Properties",
      value: "—",
      description: "All platform listings",
      icon: Building2,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Verified Properties",
      value: "—",
      description: "Approved listings",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Review",
      value: "—",
      description: "Awaiting verification",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Rejected Properties",
      value: "—",
      description: "Listings declined",
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  // const verificationStyles = {
  //   pending: "bg-amber-50 text-amber-700",
  //   verified: "bg-emerald-50 text-emerald-700",
  //   rejected: "bg-red-50 text-red-700",
  // };

  // const resetFilters = () => {
  //   setSearch("");
  //   setVerificationFilter("all");
  //   setListingFilter("all");
  //   setCurrentPage(1);
  // };

  return (
    <div className="w-full space-y-7 pb-10">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Property Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage, review and monitor all property listings on GreenSpringHomes.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-800">
          <Plus size={17} />
          Add Property
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-lg p-3 ${stat.iconStyle}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Property listings */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Table heading */}
        <div className="border-b border-gray-200 p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Properties
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage property listings across the platform.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
              <SlidersHorizontal size={16} />
              More Filters
            </button>
          </div>

          {/* Search and filters */}
          <div className="mt-5 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by property title, owner or location..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <select
              value={verificationFilter}
              onChange={(e) => {
                setVerificationFilter(e.target.value as VerificationFilter);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-green-600"
            >
              <option value="all">All verification statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={listingFilter}
              onChange={(e) => {
                setListingFilter(e.target.value as ListingFilter);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-green-600"
            >
              <option value="all">All listing types</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-left">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Property
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Owner
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Property Type
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Verification
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <span className="flex items-center gap-1">
                    Date Added
                    <ArrowUpDown size={13} />
                  </span>
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={8} className="px-5 py-20 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                      <Building2 size={26} className="text-gray-400" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-gray-800">
                      No properties to display
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Property listings will appear here once they are
                      retrieved from your GreenSpringHomes database.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-800">0</span> of{" "}
            <span className="font-medium text-gray-800">0</span> properties
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-lg border border-gray-200 p-2 text-gray-400 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="rounded-lg bg-green-700 px-3.5 py-2 text-sm font-medium text-white">
              {currentPage}
            </span>

            <button
              disabled
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-400 disabled:cursor-not-allowed"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagement;