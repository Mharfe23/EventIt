import express from 'express';
import { protectRoute } from '../middleware/auth&authorization.js';
import { getBusinessNumbers,getBusinessRepresentativesNumbers
    ,getRepresentativesPerBusiness,getPresentativesToday, BusinessToday
 } from '../controllers/stats.controller.js';
 import { getDailySignups } from '../controllers/stats.controller.js';
const router = express.Router();

router.get('/BusinessNumbers',protectRoute('event_org'), getBusinessNumbers);
router.get('/BusinessRepresentativesNumbers',protectRoute('event_org'), getBusinessRepresentativesNumbers);
router.get('/RepresentativesPerBusiness',protectRoute('event_org'), getRepresentativesPerBusiness);
router.get('/RepresentativesToday',protectRoute('event_org'), getPresentativesToday);
router.get('/BusinessToday',protectRoute('event_org'), BusinessToday);
router.get('/daily-signups',protectRoute('event_org'), getDailySignups);
export default router;