import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import ServiceHome from "./pages/serviceProvider/ServiceHome";

// Layouts
const PublicLayout = lazy(() => import("./layouts/PublicLayout"));
const TenantLayout = lazy(() => import("./layouts/TenantLayout"));
const OwnerLayout = lazy(() => import("./layouts/OwnerLayout"));
const ServiceProviderLayout = lazy(
  () => import("./layouts/ServiceProviderLayout")
);

// Public pages
const LandingPage = lazy(() => import("./pages/public/LandingPage"));
const ExplorePage = lazy(() => import("./pages/public/ExplorePage"));
const HowItWorks = lazy(() => import("./pages/public/HowItWorks"));
const Help = lazy(() => import("./pages/public/Help"));

// Authentication pages
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Tenant = lazy(() => import("./pages/auth/Tenant"));
const PropertyOwner = lazy(() => import("./pages/auth/PropertyOwner"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));

// Tenant pages
const TenantHome = lazy(() => import("./pages/tenant/TenantHome"));
const SavedProperties = lazy(
  () => import("./pages/tenant/SavedProperties")
);
const Settings = lazy(() => import("./pages/tenant/Settings"));
const PropertyDetails = lazy( () => import("./pages/tenant/PropertyDetails") );

// Property owner pages
const OwnerHome = lazy(() => import("./pages/landlord/OwnerHome"));
const OwnerProperties = lazy( () => import("./pages/landlord/OwnerProperties") );
const Addproperties = lazy( () => import("./pages/landlord/Addproperties") );
const OwnerMessages = lazy( () => import("./pages/landlord/OwnerMessages") );
const OwnerNotifications = lazy( () => import("./pages/landlord/OwnerNotifications") ); 
const OwnerSettings = lazy( () => import("./pages/landlord/OwnerSettings") ); 
const UpdateInfo = lazy(() => import("./pages/landlord/UpdateInfo")); 
const EditProperty = lazy( () => import("./pages/landlord/EditProperty ") ); 
const OwnerPropertyDetails = lazy( () => import("./pages/landlord/OwnerPropertyDetails") );

// Onboarding pages
const TenantOnboarding = lazy( () => import("./pages/onboarding/TenantOnboarding") ); 
const ServiceProviderOnboarding = lazy( () => import("./pages/onboarding/ServiceProviderOnboarding") ); 
const PropertyOwnerOnboarding = lazy( () => import("./pages/onboarding/PropertyOwnerOnboarding") );
// Common pages
const ComingSoon = lazy( () => import("./components/common/ComingSoon") );

const App = () => {
  const { pathname } = useLocation();

  const isPublicPage = [
    "/",
    "/explore",
    "/How-it-works",
    "/help",
  ].includes(pathname);

  return (
    <>
      <ScrollToTop />

      <Analytics />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
          },
        }}
      />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

              <p className="text-sm text-gray-500">
                Loading GreenSpringHomes...
              </p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Public Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/How-it-works" element={<HowItWorks />} />
            <Route path="/help" element={<Help />} />
          </Route>

          {/* Tenant Pages */}
          <Route element={<TenantLayout />}>
            <Route path="/tenant/" element={<TenantHome />} />
            <Route
              path="/tenant/saved-properties"
              element={<SavedProperties />}
            />
            <Route path="/tenant/settings" element={<Settings />} />
            <Route
              path="/tenant/details/:id"
              element={<PropertyDetails />}
            />
          </Route>

          {/* Property Owner Pages */}
          <Route element={<OwnerLayout />}>
            <Route path="/owner/" element={<OwnerHome />} />

            <Route
              path="/owner/properties"
              element={<OwnerProperties />}
            />

            <Route
              path="/owner/properties/add"
              element={<Addproperties />}
            />

            <Route
              path="/owner/messages"
              element={<OwnerMessages />}
            />

            <Route
              path="/owner/notifications"
              element={<OwnerNotifications />}
            />

            <Route
              path="/owner/settings"
              element={<OwnerSettings />}
            />

            <Route
              path="/owner/update"
              element={<UpdateInfo />}
            />

            <Route
              path="/owner/properties/edit/:id"
              element={<EditProperty />}
            />

            <Route
              path="/owner/properties/:id"
              element={<OwnerPropertyDetails />}
            />
          </Route>

          {/* Service Provider Pages */}
          <Route element={<ServiceProviderLayout />}>
            <Route
              path="/service-provider/"
              element={<ServiceHome />}
            />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/tenant" element={<Tenant />} />

          <Route
            path="/register/service-provider"
            element={
              <ComingSoon
                title="Service Provider Registration"
                description="We're preparing service provider registration on GreenSpringHomes. You'll soon be able to connect with property owners and tenants who need your services."
              />
            }
          />

          <Route
            path="/register/property-owner"
            element={<PropertyOwner />}
          />

          {/* Onboarding */}
          <Route
            path="/tenant/onboarding"
            element={<TenantOnboarding />}
          />

          <Route
            path="/provider/onboarding"
            element={<ServiceProviderOnboarding />}
          />

          <Route
            path="/owner/onboarding"
            element={<PropertyOwnerOnboarding />}
          />

          {/* Email Verification */}
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </Suspense>

      {isPublicPage && <BackToTop />}
    </>
  );
};

export default App;