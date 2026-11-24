import express from "express";
import { getAllProperties, getAllUsers, getPropertyStats, getRecentProperties, getRecentUsers, getUserStats, getUserStatsMain, getVerificationSummary, getPropertyById, updatePropertyVerification, updatePropertyStatus, givePromotion, getAllServiceProviders, } from "./admin.controller.js";
import { getAllTickets, getTicketMessages, sendMessage, } from "../customer-support/support.controllers.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const adminRoutes = express.Router();

// Protect every admin endpoint
adminRoutes.use(authenticateToken, authorizeRoles("admin"));

adminRoutes.get("/users", getAllUsers);
adminRoutes.get("/users/stats", getUserStats);
adminRoutes.get("/users/recent", getRecentUsers);
adminRoutes.get("/users/stats/main", getUserStatsMain);

adminRoutes.get("/properties/all", getAllProperties);
adminRoutes.get("/properties/stats", getPropertyStats);
adminRoutes.get("/properties/recent", getRecentProperties);
adminRoutes.get("/properties/:propertyId", getPropertyById);

adminRoutes.patch("/properties/:propertyId/verification", updatePropertyVerification);
adminRoutes.patch("/properties/:propertyId/status", updatePropertyStatus);
adminRoutes.get("/verification/summary", getVerificationSummary);
adminRoutes.patch("/properties/:propertyId/promotion", givePromotion);
adminRoutes.get("/service-providers", getAllServiceProviders);

// Support management
adminRoutes.get("/support/tickets", getAllTickets);

adminRoutes.get( "/support/tickets/:ticketId/messages", getTicketMessages );

adminRoutes.post( "/support/tickets/:ticketId/messages", sendMessage );

export default adminRoutes;