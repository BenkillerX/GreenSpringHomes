import { Router } from "express";
import { getCurrentUser, Login, registerPropertyOwner, registerServiceProvider, registerTenant, updateCurrentUser, emailValidation,deleteCurrentUser, } from "./auth.controllers.js";
import { loginValidator, propertyOwnerValidator, serviceProviderValidator, tenantValidator } from "../../validators/auth.validator.js";
import { validateRequest } from "../../middleware/validator.middleware.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";


const authRoutes = Router()
authRoutes.post('/login', loginValidator, validateRequest, Login )

authRoutes.post( "/register/tenant", tenantValidator, validateRequest, registerTenant );
authRoutes.post( "/register/property-owner", propertyOwnerValidator, validateRequest, registerPropertyOwner );
authRoutes.post( "/register/service-provider", serviceProviderValidator, validateRequest, registerServiceProvider );
authRoutes.post("/verify-email", emailValidation)
authRoutes.get('/me', authenticateToken, getCurrentUser)
authRoutes.patch('/me',authenticateToken, updateCurrentUser)
authRoutes.delete("/me", authenticateToken, deleteCurrentUser);
export default authRoutes;