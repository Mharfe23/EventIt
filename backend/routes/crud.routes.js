import express from 'express';
import { createBusiness, updateBusiness, deleteBusiness, createRepresentative, updateRepresentative, deleteRepresentative } from '../controllers/crud.controller.js';
import { protectRoute } from '../middleware/auth&authorization.js';


const router = express.Router();


router.post('/createBusiness',protectRoute('event_org'), createBusiness);
router.put('/updateBusiness',protectRoute('event_org'), updateBusiness);
router.delete('/deleteBusiness',protectRoute('event_org'), deleteBusiness);

router.post('/createRepresentative',protectRoute('bus_admin'), createRepresentative);
router.put('/updateRepresentative',protectRoute('bus_admin'), updateRepresentative);
router.delete('/deleteRepresentative',protectRoute('bus_admin'), deleteRepresentative);
export default router;