import { Request, Response } from 'express';
import { getEventsByDate,getEventsByCategoryAndDate } from '../services/filterService';
import log from '../utils/logger';

export async function getEventsByDateHandler(req: Request, res: Response) {
    const date = req.query.date as string;
    try {
        const events = await getEventsByDate(date);
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get events' });
    }
}

export async function getCategoryAndDateHandler(req: Request, res: Response) {
    const category = req.query.category as string;
    const date = req.query.date as string;
    try {
        const events = await getEventsByCategoryAndDate(category, date);
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get events' });
    }
}