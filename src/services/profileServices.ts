import { pool } from '../utils/connectToDb';
import { CreateUserInput, UpdateUserProfileInput} from '../schemas/userSchema';
import argon2 from "argon2";

export async function getUserTicketCount(userId: number): Promise<number> {
    try {
        const query = `
            SELECT COUNT(*) as ticketCount
            FROM Tickets
            JOIN Bookings ON Tickets.BookingID = Bookings.BookingID
            WHERE Bookings.UserID = ?
        `;
        const values = [userId];
        const [rows] = await pool.query(query, values);

        const ticketCount = (rows as any)[0].ticketCount;
        
        return ticketCount;
    } catch (error) {
        console.error("Error getting user ticket count:", error);
        return 0; 
    }
}
export async function getUserUpcomingBookings(userId: number): Promise<any[]> {
    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = `
            SELECT Bookings.BookingID, Bookings.BookingDate, Bookings.PaymentType,
                   Events.EventID, Events.Name, Events.Date AS EventDate, Venues.Location
            FROM Bookings
            JOIN Tickets ON Bookings.BookingID = Tickets.BookingID
            JOIN Events ON Tickets.EventID = Events.EventID
            JOIN Venues ON Events.VenueID = Venues.VenueID
            WHERE Bookings.UserID = ? AND Events.Date > ?
            ORDER BY Events.Date ASC
        `;
        const values = [userId, currentDate];
        const [rows] = await pool.query(query, values);

        return rows as any[];
    } catch (error) {
        console.error("Error getting user upcoming bookings:", error);
        return [];
    }
}

export async function getUserPastBookings(userId: number): Promise<any[]> {
    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = `
            SELECT Bookings.BookingID, Bookings.BookingDate, Bookings.PaymentType,
                   Events.EventID, Events.Name, Events.Date AS EventDate, Venues.Location
            FROM Bookings
            JOIN Tickets ON Bookings.BookingID = Tickets.BookingID
            JOIN Events ON Tickets.EventID = Events.EventID
            JOIN Venues ON Events.VenueID = Venues.VenueID
            WHERE Bookings.UserID = ? AND Events.Date < ?
        `;
        const values = [userId, currentDate];
        const [rows] = await pool.query(query, values);

        return rows as any[];
    } catch (error) {
        console.error("Error getting user past bookings:", error);
        return [];
    }
}

export async function getUserEmergencyContact(userId: number): Promise<any | null> {
    try {
        const query = `
            SELECT *
            FROM EmergencyContact
            WHERE UserID = ?
        `;
        const values = [userId];
        const [rows] = await pool.query(query, values);

        if ((rows as any).length === 0) {
            return null;
        }

        return (rows as any)[0];
    } catch (error) {
        console.error("Error getting user emergency contact:", error);
        return null;
    }
}

export async function getUserFavoriteEventType(userId: number) {
    try {
        const query = `
            SELECT Events.Type, COUNT(*) as eventCount
            FROM Bookings
            JOIN Tickets ON Bookings.BookingID = Tickets.BookingID
            JOIN Events ON Tickets.EventID = Events.EventID
            WHERE Bookings.UserID = ?
            GROUP BY Events.Type
            ORDER BY eventCount DESC
            LIMIT 1
        `;
        const values = [userId];
        const [rows] = await pool.query(query, values);

        if ((rows as any).length === 0) {
            return null; 
        }
        return (rows as any)[0].Type; 
    } catch (error) {
        console.error("Error getting user favorite event type:", error);
        return null; 
    }
}

export async function updateUserProfile(userId: number, data: UpdateUserProfileInput['body']) {
    const { userphone, emergencyContact } = data;

    try {
        // Begin a transaction
        await pool.query('START TRANSACTION');

        // Update the phone number
        const updatePhoneQuery = 'UPDATE Users SET phone = ? WHERE userID = ?';
        const phoneValues = [userphone, userId];
        await pool.query(updatePhoneQuery, phoneValues);

        // Check if there is an existing emergency contact
        const existingContactQuery = 'SELECT * FROM EmergencyContact WHERE UserID = ?';
        const existingContactValues = [userId];
        const [existingContactRows] = await pool.query(existingContactQuery, existingContactValues);

        if (emergencyContact) {
            // If there's an existing contact, update it
            if ((existingContactRows as any).length > 0) {
                const { name, phone, relation } = emergencyContact;
                const updateEmergencyContactQuery = `
                    UPDATE EmergencyContact
                    SET Name = ?, Phone= ?, Relation = ?
                    WHERE UserID = ?;
                `;
                const updateEmergencyContactValues = [name, phone, relation, userId];
                await pool.query(updateEmergencyContactQuery, updateEmergencyContactValues);
            } else {
                // If there's no existing contact, insert a new one
                const { name, phone, relation } = emergencyContact;
                const insertEmergencyContactQuery = `
                    INSERT INTO EmergencyContact (UserID, Phone, Name, Relation)
                    VALUES (?, ?, ?, ?);
                `;
                const insertEmergencyContactValues = [userId, phone, name, relation];
                await pool.query(insertEmergencyContactQuery, insertEmergencyContactValues);
            }
        } else {
            // If no emergency contact data is provided, delete the existing contact if any
            if ((existingContactRows as any).length > 0) {
                const deleteEmergencyContactQuery = 'DELETE FROM EmergencyContact WHERE UserID = ?';
                const deleteValues = [userId];
                await pool.query(deleteEmergencyContactQuery, deleteValues);
            }
        }

        // Commit the transaction
        await pool.query('COMMIT');
    } catch (error) {
        // Rollback the transaction if there is an error
        await pool.query('ROLLBACK');
        console.error('Error updating user profile:', error);
        throw error; // Propagate the error to the controller
    }
}
