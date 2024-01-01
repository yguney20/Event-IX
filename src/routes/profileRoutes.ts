import express from "express";
import requireUser from "../middlewares/requireUser";

import { 
    getUserTicketsHandler, 
    getUserEmergencyContactHandler, 
    getUserUpcomingBookingsHandler, 
    getUserPastBookingsHandler, 
    getUserFavoriteEventTypeHandler
} from "../controllers/profileController";

const profileRouter = express.Router();

profileRouter.get('/api/user/tickets', requireUser, getUserTicketsHandler);
profileRouter.get('/api/user/emergency-contact', requireUser, getUserEmergencyContactHandler);
profileRouter.get('/api/user/upcoming-bookings', requireUser, getUserUpcomingBookingsHandler);
profileRouter.get('/api/user/past-bookings', requireUser, getUserPastBookingsHandler);
profileRouter.get('/api/user/fav-event-type', requireUser, getUserFavoriteEventTypeHandler);

export default profileRouter;
