const RecentUsers = () => {

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
  return (
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
  )
}

export default RecentUsers