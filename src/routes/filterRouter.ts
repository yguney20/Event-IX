import express from "express";
import { getEventsByDateHandler,getCategoryAndDateHandler } from "../controllers/filterController";

const filterRouter = express.Router();

// Endpoint to get events
filterRouter.get('/api/all-events-by-date', getEventsByDateHandler);
filterRouter.get('/api/events-by-category-and-date', getCategoryAndDateHandler);

export default filterRouter;
