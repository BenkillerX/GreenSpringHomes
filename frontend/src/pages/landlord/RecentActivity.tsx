import { FiArrowRight, FiClock, } from "react-icons/fi";

const RecentActivity = () => {
  return (
   <div className="mt-6 rounded-2xl bg-white border border-gray-100 shadow-sm">

        <div className="flex items-center justify-between p-5 border-b border-gray-100">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Stay updated on your properties
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700">
            View all
            <FiArrowRight size={16} />
          </button>

        </div>


        {/* Empty Activity */}
        <div className="flex flex-col items-center justify-center py-14 px-6 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
            <FiClock size={23} />
          </div>

          <h3 className="text-sm font-semibold text-gray-800">
            No recent activity
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Your property activity will appear here.
          </p>

        </div>

      </div>
  )
}

export default RecentActivity