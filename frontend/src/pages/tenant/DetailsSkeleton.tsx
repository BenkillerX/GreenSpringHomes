const DetailsSkeleton = () => {
  return (
     <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 h-3 w-32 animate-pulse rounded bg-emerald-100" />
          <div className="h-7 w-64 max-w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-48 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        {/* Property layout */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Image skeleton */}
          <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-200 shadow-sm sm:h-96">
            <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />

            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-white/70" />
              <div className="space-y-2">
                <div className="h-3 w-28 animate-pulse rounded bg-white/70" />
                <div className="h-3 w-20 animate-pulse rounded bg-white/50" />
              </div>
            </div>
          </div>

          {/* Property details skeleton */}
          <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div className="h-7 w-28 animate-pulse rounded-full bg-emerald-50" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />
            </div>

            <div className="space-y-3">
              <div className="h-7 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

            <div className="border-t border-slate-100 pt-5">
              <div className="mb-3 h-3 w-24 animate-pulse rounded bg-slate-100" />
              <div className="h-9 w-40 animate-pulse rounded-lg bg-emerald-100" />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="space-y-2 rounded-xl bg-slate-50 p-3"
                >
                  <div className="h-5 w-5 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>

            {/* Contact button */}
            <div className="h-12 w-full animate-pulse rounded-xl bg-emerald-200" />

            <p className="text-center text-sm text-slate-400">
              Preparing your next home...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsSkeleton