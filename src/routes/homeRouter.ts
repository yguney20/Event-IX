import express from "express";
import { getEventsHandler,getCategoryHandler } from "../controllers/homeController";
import { purchaseTicketsHandler } from "../controllers/ticketController";

const homeRouter = express.Router();

// Endpoint to get events
homeRouter.get('/api/all-events', getEventsHandler);
homeRouter.get('/api/events-by-category', getCategoryHandler);
homeRouter.post('/api/purchase-tickets', purchaseTicketsHandler);

export default homeRouter;
