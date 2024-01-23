import express from "express";
import { getEventsByDateHandler, getCategoryAndDateHandler, getEventsByPriceHandler, getCategoryAndPriceHandler } from "../controllers/filterController";

const filterRouter = express.Router();

// Endpoint to get events
filterRouter.get('/api/all-events-by-date', getEventsByDateHandler);
filterRouter.get('/api/events-by-category-and-date', getCategoryAndDateHandler);
filterRouter.get('/api/all-events-by-price', getEventsByPriceHandler);
filterRouter.get('/api/events-by-category-and-price', getCategoryAndPriceHandler);

export default filterRouter;
