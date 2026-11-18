import {Router} from 'express';
import { getServiceProviderProfile, updateServiceProviderProfile } from './service-providers.controllers.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';
const serviceProviderRoutes = Router();

serviceProviderRoutes.get( "/profile", authenticateToken, getServiceProviderProfile );
serviceProviderRoutes.put( "/profile", authenticateToken, authorizeRoles("serviceProvider"), upload.single("image"), updateServiceProviderProfile );
export default serviceProviderRoutes;