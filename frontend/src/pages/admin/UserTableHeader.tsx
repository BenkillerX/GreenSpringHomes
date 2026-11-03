import { Search } from "lucide-react";

type RoleFilter =
  | "all"
  | "tenant"
  | "propertyOwner"
  | "serviceProvider"
  | "admin";

type StatusFilter = "all" | "active" | "suspended";

interface UserTableHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  roleFilter: RoleFilter;
  setRoleFilter: (value: RoleFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
  setCurrentPage: (value: number) => void;
}

const UserTableHeader = ({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  setCurrentPage,
}: UserTableHeaderProps) => {
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleRoleFilter = (value: RoleFilter) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          All Users
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          View and manage registered platform accounts.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-64"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) =>
            handleRoleFilter(e.target.value as RoleFilter)
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-emerald-500"
        >
          <option value="all">All roles</option>
          <option value="tenant">Tenant</option>
          <option value="propertyOwner">Property Owner</option>
          <option value="serviceProvider">Service Provider</option>
          <option value="admin">Admin</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            handleStatusFilter(e.target.value as StatusFilter)
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-emerald-500"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
    </div>
  );
};

export default UserTableHeader;