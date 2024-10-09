import express from 'express';
import  {getBusinessesPerEvent, getBusinessRepresentatives, getBusinessRepresentativesByBusiness} from '../controllers/users.controller.js';
import { protectRoute } from '../middleware/auth&authorization.js';


const router = express.Router();

router.get('/getBusPerEvent',protectRoute(), getBusinessesPerEvent);
router.get('/getBusRepresent',protectRoute(), getBusinessRepresentatives);
router.get('/getBusRepresentByBusiness',protectRoute("bus_admin"),getBusinessRepresentativesByBusiness);


export default router;