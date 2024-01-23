import { Request, Response } from 'express';
import { purchaseTickets } from '../services/ticketService';

export async function purchaseTicketsHandler(req: Request, res: Response) {
    try {
        const { eventId, userId, ticketCount, totalPrice } = req.body;
        const result = await purchaseTickets(eventId, userId, ticketCount, totalPrice);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing ticket purchase' });
    }
}
