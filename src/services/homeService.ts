import { pool } from '../utils/connectToDb'; // Assuming you have a utility file for DB connection
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

export async function getEvents() {
    try {
        const query = `
            SELECT EventID, Name, Type, Date, VenueID, Description, OrganizerID, ImageURL
            FROM Events
            ORDER BY Date DESC
        `;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error getting events from the database:", error);
        throw error;
    }
}
export async function getEventsByCategory(category: string): Promise<EventDetails[]> {
    try {
        const query = `
            SELECT EventID, Name, Type, Date, VenueID, Description, OrganizerID, ImageURL
            FROM Events
            WHERE Type = ?
            ORDER BY Date DESC
        `;
        const [results] = await pool.query<RowDataPacket[]>(query, [category]);
        return results as EventDetails[];
    } catch (error) {
        console.error("Error getting events from the database:", error);
        throw error;
    }



}

export async function getUserRecommendations(userId: number): Promise<EventDetails[]> {
    try {
        const query = `
            SELECT Events.*
            FROM Events
            WHERE Type IN (
                SELECT Type 
                FROM Events 
                JOIN Tickets ON Events.EventID = Tickets.EventID
                WHERE Tickets.BookingID IN (
                    SELECT BookingID 
                    FROM Bookings 
                    WHERE UserID = ?
                )
            )
            AND Events.EventID NOT IN (
                SELECT EventID 
                FROM Tickets 
                JOIN Bookings ON Tickets.BookingID = Bookings.BookingID
                WHERE UserID = ?
            )
            ORDER BY Events.Date;
        `;
        const [results] = await pool.query<RowDataPacket[]>(query, [userId, userId]);
        return results as EventDetails[];
    } catch (error) {
        console.error("Error getting user recommendations:", error);
        throw error;
    }
}
