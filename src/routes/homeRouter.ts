import express from "express";
import { getEventsHandler,getCategoryHandler } from "../controllers/homeController";
import { purchaseTicketsHandler } from "../controllers/ticketController";
import { getUserRecommendations } from '../services/homeService';


const homeRouter = express.Router();

// Endpoint to get events
homeRouter.get('/api/all-events', getEventsHandler);
homeRouter.get('/api/events-by-category', getCategoryHandler);
homeRouter.post('/api/purchase-tickets', purchaseTicketsHandler);
homeRouter.get('/api/user-recommendations/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const recommendations = await getUserRecommendations(userId);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user recommendations' });
    }
});


export default homeRouter;
