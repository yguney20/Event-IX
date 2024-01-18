import { Request, Response } from 'express';
import { getUserTicketCount, getUserEmergencyContact, getUserFavoriteEventType,
    getUserUpcomingBookings,getUserPastBookings, updateUserProfile} from '../services/profileServices';
import { UpdateUserProfileInput } from '../schemas/userSchema';
import { getUserById } from '../services/userServices';



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
export async function getUserFavoriteEventTypeHandler(req: Request, res: Response) {
    const userId = res.locals.user?.userID;

    if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const favoriteEventType = await getUserFavoriteEventType(userId);
        if (favoriteEventType) {
            return res.json({ favoriteEventType });
        } else {
            return res.status(404).json({ error: 'No favorite event type found for this user' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve favorite event type' });
    }
}

export async function updateUserProfileHandler(req: Request<UpdateUserProfileInput["params"], {}, UpdateUserProfileInput["body"]>, res: Response) {
  const userId = Number(req.params.userID);

  if (!userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const data = req.body as UpdateUserProfileInput['body'];

  try {
    await updateUserProfile(userId, data);
    const updatedUser = await getUserById(userId);
    const emergencyContact = await getUserEmergencyContact(userId);

    // If successful, you might want to fetch and return the updated user profile
    // Here, you would call functions like getUserEmergencyContact, getUserUpcomingBookings, etc.

    // Example:
    // const updatedEmergencyContact = await getUserEmergencyContact(userId);
    // const upcomingBookings = await getUserUpcomingBookings(userId);
    
    // Return the updated data to the client
    return res.json({
      success: true,
      user: updatedUser,
      emergencyContact: emergencyContact,
      // Include any additional data you want to send back
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ error: 'Failed to update user profile' });
  }
}
