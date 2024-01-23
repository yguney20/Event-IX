import { pool } from '../utils/connectToDb'; 
import { RowDataPacket } from 'mysql2';
import { EventDetails } from './eventService';

export async function getEventsByDate(date: string) {
    try {
        const query = `
            SELECT EventID, Name, Type, Date, VenueID, Description, OrganizerID, ImageURL
            FROM Events
            WHERE Date = ?
            ORDER BY Date DESC
        `;
        const [rows] = await pool.query(query, [date]);
        return rows;
    } catch (error) {
        console.error("Error getting events from the database:", error);
        throw error;
    }
}

export async function getEventsByCategoryAndDate(category: string, date: string): Promise<EventDetails[]> {
    try {
        const query = `
            SELECT EventID, Name, Type, Date, VenueID, Description, OrganizerID, ImageURL
            FROM Events
            WHERE Type = ? AND Date = ?
            ORDER BY Date DESC
        `;
        const [results] = await pool.query<RowDataPacket[]>(query, [category, date]);
        return results as EventDetails[];
    } catch (error) {
        console.error("Error getting events from the database:", error);
        throw error;
    }
}
