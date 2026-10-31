import { AlertCircle, ArrowUpRight, CheckCircle2, Clock } from "lucide-react"

const VerificationSummary = () => {
  return (
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
  )
}

export default VerificationSummary