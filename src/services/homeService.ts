import { pool } from '../utils/connectToDb'; // Assuming you have a utility file for DB connection

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
