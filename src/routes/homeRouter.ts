import express from "express";
import { getEventsHandler,getCategoryHandler } from "../controllers/homeController";

const homeRouter = express.Router();

// Endpoint to get events
homeRouter.get('/api/all-events', getEventsHandler);
homeRouter.get('/api/events-by-category', getCategoryHandler);

export default homeRouter;
