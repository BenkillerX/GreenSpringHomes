import { Router } from "express";
import { completePropertyOwnerOnboarding, completeServiceProviderOnboarding, completeTenantOnboarding } from "./onboarding.controllers.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const onboardingRoutes = Router();
onboardingRoutes.post('/tenant', authenticateToken, completeTenantOnboarding)
onboardingRoutes.post( "/service-provider", authenticateToken, authorizeRoles("serviceProvider"), upload.single("image"), completeServiceProviderOnboarding );
onboardingRoutes.post('/property-owner', authenticateToken, completePropertyOwnerOnboarding)
export default onboardingRoutes;