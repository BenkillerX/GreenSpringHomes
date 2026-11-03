import express from "express";
import { getAllUsers, getRecentProperties, getRecentUsers, getUserStats, getUserStatsMain, getVerificationSummary } from "./admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/users", getAllUsers);
adminRoutes.get("/users/stats", getUserStats);
adminRoutes.get("/properties/recent", getRecentProperties);
adminRoutes.get("/users/recent", getRecentUsers);
adminRoutes.get("/verification/summary", getVerificationSummary);
adminRoutes.get("/users/stats/main", getUserStatsMain);
export default adminRoutes;

  