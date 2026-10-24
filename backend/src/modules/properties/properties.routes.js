import {Router} from "express"
import { addProperty, deleteProperty, getAllProperties, getProperties, getPropertyById, searchProperties } from "./properties.controllers.js"
import { authenticateToken } from "../../middleware/auth.middleware.js"
import { authorizeRoles } from "../../middleware/role.middleware.js"
import { propertyValidator } from "../../validators/property.validator.js"
import { validateRequest } from "../../middleware/validator.middleware.js"
import { upload } from "../../middleware/upload.middleware.js"

const propertyRoutes = Router()

propertyRoutes.post('/',authenticateToken , authorizeRoles("propertyOwner"), upload.array("images", 5),propertyValidator, validateRequest ,addProperty)
propertyRoutes.get('/', authenticateToken, authorizeRoles("propertyOwner"), getProperties)
propertyRoutes.get("/search", searchProperties);
propertyRoutes.get("/all", getAllProperties);
propertyRoutes.get("/:id", getPropertyById);
propertyRoutes.delete("/:id",authenticateToken, authorizeRoles("propertyOwner"), deleteProperty);
export default propertyRoutes