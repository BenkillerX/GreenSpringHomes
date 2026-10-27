import { Route, Routes } from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import LandingPage from "./pages/public/LandingPage"
import ExplorePage from "./pages/public/ExplorePage"
import HowItWorks from "./pages/public/HowItWorks"
// import PropertyDetails from "./pages/public/PropertyDetails"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Tenant from "./pages/auth/Tenant"
import ServiceProvider from "./pages/auth/ServiceProvider"
import PropertyOwner from "./pages/auth/PropertyOwner"
import TenantLayout from "./layouts/TenantLayout"
import TenantHome from "./pages/tenant/TenantHome"
import SavedProperties from "./pages/tenant/SavedProperties"
import Settings from "./pages/tenant/Settings"
import OwnerLayout from "./layouts/OwnerLayout"
import OwnerHome from "./pages/landlord/OwnerHome"
import ServiceProviderLayout from "./layouts/ServiceProviderLayout"
import ServiceHome from "./pages/serviceProvider/ServiceHome"
import TenantOnboarding from "./pages/onboarding/TenantOnboarding"
import ServiceProviderOnboarding from "./pages/onboarding/ServiceProviderOnboarding"
import PropertyOwnerOnboarding from "./pages/onboarding/PropertyOwnerOnboarding"
import OwnerProperties from "./pages/landlord/OwnerProperties"
import Addproperties from "./pages/landlord/Addproperties"
import OwnerMessages from "./pages/landlord/OwnerMessages"
import OwnerNotifications from "./pages/landlord/OwnerNotifications"
import OwnerSettings from "./pages/landlord/OwnerSettings"
import ScrollToTop from "./components/common/ScrollToTop"
import Help from "./pages/public/Help"
import BackToTop from "./components/common/BackToTop"
import VerifyEmail from "./pages/auth/VerifyEmail"
import PropertyDetails from "./pages/tenant/PropertyDetails"
import { Toaster } from "react-hot-toast";
import UpdateInfo from "./pages/landlord/UpdateInfo"
const App = () => {
  return (
    <>
    <ScrollToTop/>
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
      <Routes>
        {/* Public Pages Routes */}
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/explore" element={<ExplorePage/>}/>
          <Route path="/How-it-works" element={<HowItWorks/>}/>
          {/* <Route path="/propertydetails/:id"  element={<PropertyDetails/>}/> */}
          <Route path="/help" element={<Help/>}/>
        </Route>
        {/* Tenant Pages Routes */}
        <Route element={<TenantLayout/>}>
          <Route path="/tenant/" element={<TenantHome/>}/>
          <Route path="/tenant/saved-properties" element={<SavedProperties/>}/>
          <Route path="/tenant/settings" element={<Settings/>}/>
          <Route path="/tenant/details/:id" element={<PropertyDetails/>}/>
        </Route>

        <Route element={<OwnerLayout/>}>
            <Route path="/owner/" element={<OwnerHome/>}/>
            <Route path="/owner/properties" element={<OwnerProperties/>}/>
            <Route path="/owner/properties/add" element={<Addproperties/>}/>
            <Route path="/owner/messages" element={<OwnerMessages/>}/>
            <Route path="/owner/notifications" element={<OwnerNotifications/>}/>
            <Route path="/owner/settings" element={<OwnerSettings/>}/>
            <Route path="/owner/update" element={<UpdateInfo/>}/>
        </Route>
      <Route element={<ServiceProviderLayout/>}>
       <Route path="/service-provider/" element={<ServiceHome/>}/> 
      </Route>

        <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/register/tenant" element={<Tenant/>}/>
         <Route path="/register/service-provider" element={<ServiceProvider/>}/>
         <Route path="/register/property-owner" element={<PropertyOwner/>}/>
         <Route path="/tenant/onboarding" element={<TenantOnboarding/>}/>
         <Route path="/provider/onboarding" element={<ServiceProviderOnboarding/>}/>
         <Route path="/owner/onboarding" element={<PropertyOwnerOnboarding/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
      </Routes>
      <BackToTop/>
    </>
  )
}

export default App