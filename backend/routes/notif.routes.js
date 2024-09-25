import express from 'express';
import { sendNotif,getNotifsRep,getNotifsAdmin,getNotif } from '../controllers/notif.controller.js';
import { protectRoute } from '../middleware/auth&authorization.js';

const router = express.Router();

router.post('/send', protectRoute('event_org'), sendNotif);
router.get('/get/rep', protectRoute(), getNotifsRep);
router.get('/get/admin', protectRoute(), getNotifsAdmin);
router.get('/get', protectRoute(), getNotif);

export default router;