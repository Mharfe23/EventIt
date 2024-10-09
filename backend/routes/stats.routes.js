import express from 'express';
import { protectRoute } from '../middleware/auth&authorization.js';
import { getBusinessNumbers,getBusinessRepresentativesNumbers
    ,getRepresentativesPerBusiness,getPresentativesToday, BusinessToday, getDailyBusSignups
    ,getNotifNumber,getNotifNumberToday
 } from '../controllers/stats.controller.js';
 import { getDailySignups } from '../controllers/stats.controller.js';
const router = express.Router();

router.get('/BusinessNumbers',protectRoute(), getBusinessNumbers);
router.get('/BusinessRepresentativesNumbers',protectRoute(), getBusinessRepresentativesNumbers);
router.get('/RepresentativesPerBusiness',protectRoute('event_org'), getRepresentativesPerBusiness);
router.get('/RepresentativesToday',protectRoute('event_org'), getPresentativesToday);
router.get('/BusinessToday',protectRoute('event_org'), BusinessToday);
router.get('/daily-signups',protectRoute('event_org'), getDailySignups);
router.get('/daily-bus-signups',protectRoute('event_org'), getDailyBusSignups);
router.get('/notifnum',protectRoute('event_org'), getNotifNumber);
router.get('/notifnumtoday',protectRoute('event_org'), getNotifNumberToday);

export default router;