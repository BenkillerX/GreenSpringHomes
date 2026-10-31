import { ArrowUpRight, FileCheck, PlusCircle, UserPlus } from 'lucide-react'
const QuickActions = () => {
  return (
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
  )
}

export default QuickActions