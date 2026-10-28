import { Link } from "react-router-dom"
import { FiMessageCircle, FiPlus, FiArrowRight, FiCalendar, FiHome, } from "react-icons/fi";

const QuickActions = () => {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm">

          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your QuickStay activity
            </p>
          </div>


          <div className="p-4 space-y-2">

            <Link to="/owner/properties/add" className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition hover:bg-gray-50">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FiPlus size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Add Property
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  List a new property
                </p>
              </div>

              <FiArrowRight
                size={17}
                className="text-gray-400 transition group-hover:translate-x-1"
              />
            </Link>


            <Link to="/owner/properties" className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition hover:bg-gray-50">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FiHome size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Manage Properties
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  View and edit your listings
                </p>
              </div>

              <FiArrowRight
                size={17}
                className="text-gray-400 transition group-hover:translate-x-1"
              />
            </Link>


            <Link to="/owner/notifications" className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition hover:bg-gray-50">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FiCalendar size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Notifications
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  See tenant requests
                </p>
              </div>

              <FiArrowRight
                size={17}
                className="text-gray-400 transition group-hover:translate-x-1"
              />
            </Link>


            <Link to="/owner/messages" className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition hover:bg-gray-50">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FiMessageCircle size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Messages
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Chat with potential tenants
                </p>
              </div>

              <FiArrowRight
                size={17}
                className="text-gray-400 transition group-hover:translate-x-1"
              />
            </Link>

          </div>
        </div>
  )
}

export default QuickActions