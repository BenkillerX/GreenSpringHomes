import { Users, Building2, BadgeCheck, Wallet, TrendingUp, TrendingDown } from "lucide-react";

const AdminStats = () => {
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
  return (
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
  )
}

export default AdminStats