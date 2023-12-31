import { Request, Response } from 'express';
import { getUserTicketCount, getUserEmergencyContact, getUserUpcomingBookings,getUserPastBookings} from '../services/profileServices';


export async function getUserTicketsHandler(req: Request, res: Response) {
    const userId = res.locals.user?.userID;

    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in session' });
    }

    try {
        const ticketCount = await getUserTicketCount(userId);
        return res.json({ ticketCount });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get ticket count' });
    }
}

export async function getUserEmergencyContactHandler(req: Request, res: Response) {
    const userId = res.locals.user?.userID;

    if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const emergencyContact = await getUserEmergencyContact(userId);
        if (!emergencyContact) {
            return res.status(404).json({ error: 'Emergency contact not found' });
        }
        return res.json(emergencyContact);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve emergency contact' });
    }
}

export async function getUserUpcomingBookingsHandler(req: Request, res: Response) {
    const userId = res.locals.user?.userID;

    if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const upcomingBookings = await getUserUpcomingBookings(userId);
        return res.json({ upcomingBookings });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve upcoming bookings' });
    }
}

export async function getUserPastBookingsHandler(req: Request, res: Response) {
    const userId = res.locals.user?.userID;

    if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const pastBookings = await getUserPastBookings(userId);
        return res.json({ pastBookings });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve past bookings' });
    }
}