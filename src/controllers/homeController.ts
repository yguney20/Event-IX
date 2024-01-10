import { Request, Response } from 'express';
import { getEvents,getEventsByCategory } from '../services/homeService';

export async function getEventsHandler(req: Request, res: Response) {
    try {
        const events = await getEvents();
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get events' });
    }
}

export async function getCategoryHandler(req: Request, res: Response) {
    const category = req.query.category as string;
    try {
        const events = await getEventsByCategory(category);
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get events' });
    }
}