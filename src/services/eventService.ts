import { pool } from '../utils/connectToDb'; 
import { RowDataPacket } from 'mysql2';

export interface EventDetails {
    EventID: number;
    Name: string;
    Type: string;
    Date: Date;
    VenueID: number;
    Description: string;
    OrganizerID: number;

}
//get event details by id

export async function getEventDetails(eventId: number): Promise<EventDetails | null> {
    const eventQuery = `
        SELECT Events.*, Venues.Name AS VenueName, Venues.Location, Venues.Capacity, Organizers.Name AS OrganizerName 
        FROM Events 
        JOIN Venues ON Events.VenueID = Venues.VenueID 
        JOIN Organizers ON Events.OrganizerID = Organizers.OrganizerID 
        WHERE Events.EventID = ?
    `;

    try {
        const [results] = await pool.query<RowDataPacket[]>(eventQuery, [eventId]);
        const eventDetails = results as EventDetails[];

        return eventDetails.length > 0 ? eventDetails[0] : null;
    } catch (error) {
        console.error("Error getting event details from the database:", error);
        throw error;
    }
}