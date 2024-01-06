// eventController.ts
import { Request, Response } from 'express';
import { getEventDetails } from '../services/eventService';

export async function eventDetailsHandler(req: Request, res: Response): Promise<void> {
    try {
        const eventId = parseInt(req.params.eventId);
        const eventDetails = await getEventDetails(eventId);
        
        if (eventDetails) {
            res.json(eventDetails);
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving event details');
    }
}
