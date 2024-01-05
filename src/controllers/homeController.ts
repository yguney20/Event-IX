import { Request, Response } from 'express';
import { getEvents } from '../services/homeService';

export async function getEventsHandler(req: Request, res: Response) {
    try {
        const events = await getEvents();
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get events' });
    }
}
