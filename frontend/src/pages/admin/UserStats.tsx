import { Users, UserRound, Home, ShieldAlert, } from "lucide-react";
import { useState } from "react";

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

const UserStats = () => {
      const [users] = useState<User[]>(mockUsers);
    
      const totalUsers = users.length;
  const totalTenants = users.filter((u) => u.role === "Tenant").length;
  const totalOwners = users.filter(
    (u) => u.role === "Property Owner"
  ).length;
  const suspendedUsers = users.filter(
    (u) => u.status === "Suspended"
  ).length;

    const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Tenants",
      value: totalTenants,
      icon: UserRound,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Property Owners",
      value: totalOwners,
      icon: Home,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Suspended Users",
      value: suspendedUsers,
      icon: ShieldAlert,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value.toLocaleString()}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  )
}

export default UserStats