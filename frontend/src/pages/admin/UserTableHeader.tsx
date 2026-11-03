import {Search} from "lucide-react"
interface UserTableHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

const UserTableHeader = ({ search, setSearch, roleFilter, setRoleFilter, statusFilter, setStatusFilter, setCurrentPage }: UserTableHeaderProps) => {
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
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-64"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-emerald-500"
              >
                <option>All roles</option>
                <option>Tenant</option>
                <option>Property Owner</option>
                <option>Service Provider</option>
                <option>Admin</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-emerald-500"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>
  )
}

export default UserTableHeader