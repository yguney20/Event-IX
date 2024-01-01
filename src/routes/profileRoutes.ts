import express from "express";
import requireUser from "../middlewares/requireUser";

import { 
    getUserTicketsHandler, 
    getUserEmergencyContactHandler, 
    getUserUpcomingBookingsHandler, 
    getUserPastBookingsHandler 
} from "../controllers/profileController";

const profileRouter = express.Router();

// Route for getting user ticket count
profileRouter.get('/api/user/tickets', requireUser, getUserTicketsHandler);

// Route for getting user emergency contact
profileRouter.get('/api/user/emergency-contact', requireUser, getUserEmergencyContactHandler);

// Route for getting user upcoming bookings
profileRouter.get('/api/user/upcoming-bookings', requireUser, getUserUpcomingBookingsHandler);

// Route for getting user past bookings
profileRouter.get('/api/user/past-bookings', requireUser, getUserPastBookingsHandler);

export default profileRouter;
