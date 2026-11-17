import {Router} from 'express';
import { getServiceProviderProfile } from './service-providers.controllers.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
const serviceProviderRoutes = Router();

serviceProviderRoutes.get( "/profile", authenticateToken, getServiceProviderProfile );
export default serviceProviderRoutes;