import express from 'express';
import  {getBusinessesPerEvent, getBusinessRepresentatives} from '../controllers/users.controller.js';
import { protectRoute } from '../middleware/auth&authorization.js';


const router = express.Router();

router.get('/getBusPerEvent',protectRoute(), getBusinessesPerEvent);
router.get('/getBusRepresent',protectRoute(), getBusinessRepresentatives);


export default router;