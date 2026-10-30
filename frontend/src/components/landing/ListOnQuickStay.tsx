import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
const ListOnGreenSpringHomes = () => {
    const stayPeriod = [
        {
        title:"Short stays",
        des:"Nightly pricing for weekends and short trips."
        },
        {
        title:"Long stays",
        des:"Weekly and monthly rates for extended stays." 
        },
        {
            title:"Flexible stays",
            des:"Set your own minimum and maximum nights."
        },
    ]
  return (
   <section className="w-full min-h-140 bg-gray-200 px-4 py-10 sm:px-6 md:px-10 lg:px-28 lg:py-15">

  {/* Have A Property Card */}
  <div className="mb-10 flex flex-col gap-8 rounded-2xl bg-white px-5 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">

    {/* Text */}
    <div className="w-full lg:w-1/2">
      <h1 className="mb-4 text-xl font-medium leading-tight sm:text-2xl lg:text-4xl">
        Have a property? List it on Green<span className='text-green-500'>Spring</span>Homes.
      </h1>

      <p className="mb-8 max-w-140 text-sm leading-6 text-gray-400 sm:text-base">
        Verify once, publish professionally and manage reservations,
        availability and earnings from one dashboard.
      </p>

      <Link
        to="/register/property-owner"
        className="inline-flex rounded-md bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 sm:px-6 sm:py-3.5"
      >
        Become a Host
      </Link>
    </div>

    {/* Stay Period Cards */}
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-1/2 lg:grid-cols-3">
      {stayPeriod.map((period) => (
        <div
          key={period.title}
          className="rounded-xl bg-gray-100 px-4 py-4 transition hover:bg-green-50"
        >
          <h1 className="text-base font-medium text-gray-800 sm:text-lg">
            {period.title}
          </h1>

          <p className="mt-1 text-sm leading-5 text-gray-400">
            {period.des}
          </p>
        </div>
      ))}
    </div>
  </div>


  {/* Guest Reviews */}
  <div className="px-1 sm:px-2">

    <h1 className="text-xl font-medium text-gray-900 sm:text-2xl">
      Guest reviews
    </h1>

    {/* Reviews */}
    <div className="mt-5 flex gap-4 overflow-x-auto pb-3">

      <div className="min-w-70 max-w-sm rounded-2xl border border-gray-300 bg-white px-5 py-4 sm:min-w-87.5">

        {/* Stars */}
        <div className="mb-3 flex gap-1">
          <FaStar className="text-green-500" />
          <FaStar className="text-green-500" />
          <FaStar className="text-green-500" />
          <FaStar className="text-green-500" />
          <FaStar className="text-green-500" />
        </div>

        <h1 className="text-sm leading-6 text-gray-700 sm:text-base">
          “Exactly as described — spotless, quiet and the check-in code worked
          perfectly.”
        </h1>

        <p className="mt-4 text-xs text-gray-400 sm:text-sm">
          Samuel Adeleke · Modern 2-Bedroom Apartment
        </p>

      </div>

    </div>
  </div>

</section>
  )
}

export default ListOnGreenSpringHomes