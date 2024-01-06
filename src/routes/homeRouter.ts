import express from "express";
import { getEventsHandler } from "../controllers/homeController";

const homeRouter = express.Router();

// Endpoint to get events
homeRouter.get('/api/all-events', getEventsHandler);

export default homeRouter;
