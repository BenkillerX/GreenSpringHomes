import { ArrowUpRight, MapPin } from "lucide-react";

const RecentProperties = () => {

    const recentProperties = [
  {
    name: "Modern 3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    owner: "John Williams",
    price: "₦3,500,000/year",
    status: "Pending",
  },
  {
    name: "Luxury 4 Bedroom Duplex",
    location: "Ajah, Lagos",
    owner: "Sarah Johnson",
    price: "₦85,000,000",
    status: "Approved",
  },
  {
    name: "Self Contained Apartment",
    location: "Yaba, Lagos",
    owner: "Michael James",
    price: "₦450,000/year",
    status: "Pending",
  },
  {
    name: "Commercial Office Space",
    location: "Victoria Island, Lagos",
    owner: "David Peter",
    price: "₦6,000,000/year",
    status: "Approved",
  },
];

  return (
     <section className="overflow-hidden rounded-xl border border-gray-200 bg-white xl:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
              <div>
                <h2 className="font-bold text-gray-900">
                  Recent Properties
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Recently submitted property listings
                </p>
              </div>

              <a
                href="/admin/properties"
                className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
              >
                View all <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-162.5 text-left">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Property</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {recentProperties.map((property) => (
                    <tr key={property.name} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {property.name}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {property.location}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {property.owner}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {property.price}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            property.status === "Approved"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
  )
}

export default RecentProperties