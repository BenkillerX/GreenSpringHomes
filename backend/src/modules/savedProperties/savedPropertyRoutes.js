import express from "express";


import { authenticateToken } from "../../middleware/auth.middleware.js";
import { checkSavedProperty, getSavedProperties, removeSavedProperty, saveProperty } from "./savedPropertyController.js";

const savedPropertiesRoutes = express.Router();

// All routes require authentication
savedPropertiesRoutes.use(authenticateToken);

savedPropertiesRoutes.post("/:propertyId", saveProperty);

savedPropertiesRoutes.get("/", getSavedProperties);

savedPropertiesRoutes.get("/:propertyId/status", checkSavedProperty);

savedPropertiesRoutes.delete("/:propertyId", removeSavedProperty);

export default savedPropertiesRoutes;