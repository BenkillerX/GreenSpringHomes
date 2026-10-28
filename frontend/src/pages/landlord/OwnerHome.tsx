import { FiEye, FiPlus, FiArrowRight, FiHome, FiDroplet, } from "react-icons/fi";
import { MdBed } from "react-icons/md";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import CompleteContactBanner from "./CompleteContactBanner";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export interface Property {
  _id: string;
    owner:
  | string
  | {
      _id: string;
      firstname: string;
      lastname: string;
      phoneNumber?: string | null;
      whatsappNumber?: string | null;
    };

  title: string;
  description: string;

  propertyType: string;
  listingType: string;

  price: number;
  bedrooms: number;
  bathrooms: number;

  images: {
  url: string;
  publicId: string;
}[];

  status: string;
  verificationStatus: string;

  views: number;

  location: {
    state: string;
    city: string;
    area: string;
    address: string;
  };

  createdAt: string;
  updatedAt: string;
}

const OwnerHome = () => {
  const { currentUser } = useAuth();

const userInitial = currentUser?.lastname || "Unknown";

const [userPorperties, setUserPorperties] = useState<Property[]>([]);
const [propertiesCount, setPropertiesCount] = useState<number>(0);

useEffect(() => {
  console.log("OwnerHome mounted");

  const getUserProperties = async () => {
    console.log("Fetching owner properties...");

    try {
      const response = await api.get("/api/properties/");
      const properties: Property[] = response.data.properties;
      setUserPorperties(properties);
      setPropertiesCount(response.data.count);
    } catch (error) {
      console.error("FETCH PROPERTIES ERROR:", error);
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
<CompleteContactBanner/>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back {userInitial}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your properties and connect with potential tenants.
          </p>
        </div>

        <Link
        to="/owner/properties/add" 
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
        >
          <FiPlus size={18} />
          Add Property
        </Link>
      </div>


      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        {/* Properties */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiHome size={20} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Properties
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {propertiesCount}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Total properties
          </p>
        </div>


        {/* Views */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiEye size={20} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Visibility
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            0
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Property views
          </p>
        </div>
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* My Properties */}
        <div className="xl:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-sm">

  {/* Header */}
  <div className="flex items-center justify-between p-5 border-b border-gray-100">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        My Properties
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Manage your listed properties
      </p>
    </div>

    <Link to="/owner/properties" className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700">
      View all
      <FiArrowRight size={16} />
    </Link>
  </div>

 <div className="p-5 space-y-4">
  {userPorperties.map((property) => (
    <div
      key={property._id}
      className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-sm transition"
    >
      <div className="flex flex-col md:flex-row">

        {/* Property Image */}
<div className="w-full md:w-52 h-48 md:h-48 shrink-0 bg-gray-100">
  <img
    src={property.images?.[0]?.url}
    alt={property.title}
    className="block w-full h-full object-cover"
    onLoad={() => {
      console.log(
        "IMAGE LOADED SUCCESSFULLY:",
        property.images?.[0]?.url
      );
    }}
    onError={(e) => {
      console.error("IMAGE FAILED TO LOAD:", {
        property: property.title,
        url: e.currentTarget.currentSrc,
        naturalWidth: e.currentTarget.naturalWidth,
      });
    }}
  />
</div>

        {/* Property Details */}
        <div className="flex-1 p-5">

          {/* Top section */}
          <div className="flex items-start justify-between gap-4">

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {property.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {property.location?.area}, {property.location?.city},{" "}
                {property.location?.state}
              </p>
            </div>

            {/* Status */}
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                property.status === "active"
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
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
              {property.listingType}
            </p>
          </div>

          {/* Property Features */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">

            <span>
              <MdBed size={16} />
               {property.bedrooms} Bedrooms
            </span>

            <span>
              <FiDroplet size={16} />
               {property.bathrooms} Bathrooms
            </span>

            <span className="capitalize">
              <FiHome size={16} />
               {property.propertyType}
            </span>

          </div>

          {/* Bottom section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-gray-100">

            {/* Stats */}
            <div className="flex items-center gap-5 text-xs text-gray-500">

              <span>
                <FiEye size={15} />
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
    </div>
  ))}
</div>

</div>


        {/* Quick Actions */}
        <QuickActions/>
      </div>


      {/* Recent Activity */}
        <RecentActivity/>    

    </div>
  );
};

export default OwnerHome;

