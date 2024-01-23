// Import the pool from your DB connection module
import { pool } from '../utils/connectToDb';
import { ResultSetHeader } from 'mysql2';

export async function purchaseTickets(eventId: number, userId: number, ticketCount: number, totalPrice: number) {
    const connection = await pool.getConnection();

    try {
        // Start transaction
        await connection.beginTransaction();

        // Create a new booking
        const bookingSql = `
            INSERT INTO Bookings (UserID, BookingDate, PaymentType, TicketCount)
            VALUES (?, NOW(), ?, ?)
        `;
        
        const [bookingResult] = await connection.query(bookingSql, [userId, 'Online', ticketCount]);
        const bookingId = (bookingResult as ResultSetHeader).insertId;  // Type assertion

        // Create individual tickets
        const ticketSql = `
            INSERT INTO Tickets (BookingID, EventID, TicketStatus)
            VALUES (?, ?, 'sold')
        `;
        for (let i = 0; i < ticketCount; i++) {
            await connection.query(ticketSql, [bookingId, eventId]);
        }

        // Commit transaction
        await connection.commit();

        return { success: true, message: 'Tickets purchased successfully', bookingId };
    } catch (error) {
        // Rollback transaction in case of error
        await connection.rollback();
        throw error;
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
}
