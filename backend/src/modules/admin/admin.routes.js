import express from "express";
import { getAllProperties, getAllUsers, getPropertyStats, getRecentProperties, getRecentUsers, getUserStats, getUserStatsMain, getVerificationSummary, getPropertyById, updatePropertyVerification, updatePropertyStatus, givePromotion, getAllServiceProviders, } from "./admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/users", getAllUsers);
adminRoutes.get("/users/stats", getUserStats);
adminRoutes.get("/users/recent", getRecentUsers);
adminRoutes.get("/users/stats/main", getUserStatsMain);

adminRoutes.get("/properties/all", getAllProperties);
adminRoutes.get("/properties/stats", getPropertyStats);
adminRoutes.get("/properties/recent", getRecentProperties);
adminRoutes.get("/properties/:propertyId", getPropertyById);

adminRoutes.patch( "/properties/:propertyId/verification", updatePropertyVerification );

adminRoutes.patch( "/properties/:propertyId/status", updatePropertyStatus );
adminRoutes.get("/verification/summary", getVerificationSummary);
adminRoutes.patch("/properties/:propertyId/promotion", givePromotion);
adminRoutes.get("/service-providers", getAllServiceProviders);
export default adminRoutes;