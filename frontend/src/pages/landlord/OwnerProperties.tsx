import { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiFilter,
//   FiMapPin,
//   FiEdit2,
//   FiTrash2,
  FiEye,
//   FiMoreVertical,
  FiHome,
  FiDroplet
} from "react-icons/fi";
import { MdBed } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../../services/api";
import type { Property } from "./OwnerHome";
import toast from "react-hot-toast";

const OwnerProperties = () => {

    const [userPorperties, setUserPorperties] = useState<Property[]>([]);
    const [propertiesCount, setPropertiesCount] = useState<number>(0)
    
  useEffect(() => {
    const getUserProperties = async () => {
      try {
        const response = await api.get("/api/properties/");
  
        setUserPorperties(response.data.properties);
        setPropertiesCount(response.data.count);
        
      } catch (error) {
        console.error(error);
      }
    };
  
    getUserProperties();
  }, []);
  async function handleDelete(id: string) {
  const toastId = toast.loading("Deleting property...");

  try {
    await api.delete(`/api/properties/${id}`);

    setUserPorperties((prev) =>
      prev.filter((property) => property._id !== id)
    );

    setPropertiesCount((prev) => prev - 1);

    toast.success("Property deleted successfully!", {
      id: toastId,
    });
  } catch (error) {
    console.error(error);

    toast.error("Failed to delete property", {
      id: toastId,
    });
  }
}

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Property Management
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Properties
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage and monitor the properties you've listed on QuickStay.
          </p>
        </div>

        <Link
        to="/owner/properties/add"
          className=" inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] "
        >
          <FiPlus size={18} />
          Add Property
        </Link>
      </div>


      {/* Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">

        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiHome size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Total Properties
              </p>

              <p className="text-xl font-bold text-gray-900">
                {propertiesCount}
              </p>
            </div>
          </div>
        </div>


        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiEye size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Active Listings
              </p>

              <p className="text-xl font-bold text-gray-900">
                0
              </p>
            </div>
          </div>
        </div>


        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <FiFilter size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Inactive
              </p>

              <p className="text-xl font-bold text-gray-900">
                0
              </p>
            </div>
          </div>
        </div>

      </div>


      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        {/* Search */}
        <div className="relative flex-1">

          <FiSearch
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search your properties..."
            className=" w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 "
          />
        </div>


        {/* Filter */}
        <button
          className=" inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 "
        >
          <FiFilter size={17} />
          Filter
        </button>

      </div>


      {/* Property Section */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm">

  {/* Section Header */}
  <div className="flex items-center justify-between border-b border-gray-100 p-5">

    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Your Listings
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Properties you've added to QuickStay
      </p>
    </div>

    <span className="hidden sm:block text-sm text-gray-400">
      {userPorperties.length}{" "}
      {userPorperties.length === 1 ? "property" : "properties"}
    </span>

  </div>


  {/* Dynamic Content */}
  {userPorperties.length === 0 ? (

    /* Empty State */
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

      <div
        className=" flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600 mb-6 "
      >
        <FiHome size={34} />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        No properties yet
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        You haven't added any properties yet. List your first
        property and make it discoverable to people searching
        for homes on QuickStay.
      </p>

      <Link
        to="/owner/properties/add"
        className=" mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 "
      >
        <FiPlus size={18} />
        Add Your First Property
      </Link>

    </div>

  ) : (

    /* Properties */
    <div className="p-5 space-y-4">

      {userPorperties.map((property) => (

        <div
          key={property._id}
          className=" flex flex-col md:flex-row overflow-hidden rounded-2xl border border-gray-100 hover:shadow-sm transition "
        >

          {/* Image */}
          
{/* Property Image */}
<div className="w-full md:w-56 h-48 md:h-auto shrink-0 overflow-hidden bg-slate-100">
  <img
    src={
      property.images?.[0]?.url ||
      "/placeholder-property.jpg"
    }
    alt={property.title}
    loading="lazy"
    className="block w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/placeholder-property.jpg";
    }}
  />
</div>



          {/* Details */}
          <div className="flex-1 p-5">

            {/* Title + Status */}
            <div className="flex items-start justify-between gap-4">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {property.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {property.location?.area},{" "}
                  {property.location?.city},{" "}
                  {property.location?.state}
                </p>
              </div>

              <span
                className={` shrink-0 rounded-full px-3 py-1 text-xs font-medium ${ property.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600" } `}
              >
                {property.status}
              </span>

            </div>


            {/* Price */}
            <div className="mt-4">

              <p className="text-xl font-bold text-gray-900">
                ₦{property.price.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500 capitalize">
                For {property.listingType}
              </p>

            </div>


            {/* Features */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">

              <span className="flex items-center gap-1.5">
                <MdBed
                  size={18}
                  className="text-green-600"
                />
                {property.bedrooms} Bedrooms
              </span>

              <span className="flex items-center gap-1.5">
                <FiDroplet
                  size={16}
                  className="text-green-600"
                />
                {property.bathrooms} Bathrooms
              </span>

              <span className="flex items-center gap-1.5 capitalize">
                <FiHome
                  size={16}
                  className="text-green-600"
                />
                {property.propertyType}
              </span>

            </div>


            {/* Bottom */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-gray-100">

              {/* Stats */}
              <div className="flex items-center gap-5 text-xs text-gray-500">

                <span className="flex items-center gap-1.5">
                  <FiEye
                    size={15}
                    className="text-green-600"
                  />
                  {property.views} views
                </span>

                <span className="capitalize">
                  Verification:{" "}
                  <span
                    className={
                      property.verificationStatus === "approved"
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {property.verificationStatus}
                  </span>
                </span>

              </div>


              {/* Actions */}
             <div className="flex items-center gap-2">
  {/* View Property */}
 <Link
  to={`/owner/properties/${property._id}`}
  className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
>
  View
</Link>

  {/* Edit Property */}
  <Link
    to={`/owner/properties/edit/${property._id}`}
    className="px-3 py-1.5 text-sm font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition"
  >
    Edit
  </Link>

  {/* Delete Property */}
  <button
    type="button"
    onClick={() => handleDelete(property._id)}
    className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
  >
    Delete
  </button>
</div>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
    </div>
  );
};

export default OwnerProperties;
