import { useMemo, useState } from "react";
import { Users, MoreHorizontal, ChevronLeft, ChevronRight,  Mail, Eye,  CheckCircle2, Download, UserPlus, } from "lucide-react";
import UserStats from "./UserStats";
import UserTableHeader from "./UserTableHeader";

type UserRole = "Tenant" | "Property Owner" | "Service Provider" | "Admin";
type UserStatus = "Active" | "Suspended";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  verified: boolean;
  joinedAt: string;
}

const mockUsers: User[] = [
  {
    id: "GS001",
    firstname: "David",
    lastname: "Johnson",
    email: "david@gmail.com",
    role: "Property Owner",
    status: "Active",
    verified: true,
    joinedAt: "Nov 03, 2026",
  },
  {
    id: "GS002",
    firstname: "Sarah",
    lastname: "Williams",
    email: "sarah@gmail.com",
    role: "Tenant",
    status: "Active",
    verified: true,
    joinedAt: "Nov 02, 2026",
  },
  {
    id: "GS003",
    firstname: "Michael",
    lastname: "Brown",
    email: "michael@gmail.com",
    role: "Property Owner",
    status: "Suspended",
    verified: false,
    joinedAt: "Oct 29, 2026",
  },
  {
    id: "GS004",
    firstname: "Grace",
    lastname: "Okafor",
    email: "grace@gmail.com",
    role: "Tenant",
    status: "Active",
    verified: true,
    joinedAt: "Oct 27, 2026",
  },
  {
    id: "GS005",
    firstname: "Daniel",
    lastname: "Adeyemi",
    email: "daniel@gmail.com",
    role: "Service Provider",
    status: "Active",
    verified: false,
    joinedAt: "Oct 25, 2026",
  },
  {
    id: "GS006",
    firstname: "Esther",
    lastname: "James",
    email: "esther@gmail.com",
    role: "Tenant",
    status: "Active",
    verified: true,
    joinedAt: "Oct 22, 2026",
  },
  {
    id: "GS007",
    firstname: "Samuel",
    lastname: "Peter",
    email: "samuel@gmail.com",
    role: "Property Owner",
    status: "Active",
    verified: true,
    joinedAt: "Oct 20, 2026",
  },
  {
    id: "GS008",
    firstname: "Jennifer",
    lastname: "Cole",
    email: "jennifer@gmail.com",
    role: "Tenant",
    status: "Suspended",
    verified: false,
    joinedAt: "Oct 18, 2026",
  },
];

const UserManagement = () => {
  const [users] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 6;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm);

      const matchesRole =
        roleFilter === "All roles" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );


  

  const getInitials = (firstname: string, lastname: string) =>
    `${firstname[0]}${lastname[0]}`.toUpperCase();

  const roleStyles: Record<UserRole, string> = {
    Tenant: "bg-blue-50 text-blue-700",
    "Property Owner": "bg-emerald-50 text-emerald-700",
    "Service Provider": "bg-purple-50 text-purple-700",
    Admin: "bg-amber-50 text-amber-700",
  };

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("All roles");
    setStatusFilter("All statuses");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375 space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              User Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage, monitor and oversee GreenSpringHomes users.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <Download size={17} />
              Export
            </button>

            <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
              <UserPlus size={17} />
              Add User
            </button>
          </div>
        </div>

        {/* Statistics */}
        <UserStats/>

        {/* Users Section */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
         <UserTableHeader
            search={search}
            setSearch={setSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setCurrentPage={setCurrentPage}
          />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    User
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Verification
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Joined
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          ["bg-emerald-100 text-emerald-700", "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700"][index % 3]
                        }`}>
                          {getInitials(user.firstname, user.lastname)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {user.firstname} {user.lastname}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[user.role]}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Verification */}
                    <td className="px-5 py-4">
                      {user.verified ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <CheckCircle2 size={15} />
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-amber-600">
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`} />
                        {user.status}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {user.joinedAt}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          title="View user"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Email user"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Mail size={17} />
                        </button>

                        <button
                          title="More actions"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Users size={23} />
                      </div>
                      <p className="mt-3 font-semibold text-slate-800">
                        No users found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try adjusting your search or filters.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredUsers.length === 0
                  ? 0
                  : (currentPage - 1) * usersPerPage + 1}
                {" - "}
                {Math.min(currentPage * usersPerPage, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {filteredUsers.length}
              </span>{" "}
              users
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-emerald-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
