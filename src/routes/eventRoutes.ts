// eventRouter.ts
import express from 'express';
import { eventDetailsHandler } from '../controllers/eventController';

const router = express.Router();

router.get('/api/events/:eventId', eventDetailsHandler);

export default router;
