import express from 'express';
import { signupEventOrga, loginEventOrga ,logoutEventOrga,
        signupBusAdmin, loginBusAdmin, logoutBusAdmin,
        signupBusinessRep, loginBusinessRep, logoutBusinessRep
        
    }from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup/organizer',signupEventOrga);

router.post('/login/organizer',loginEventOrga);

router.post('/logout/organizer',logoutEventOrga);


//business admin routes

router.post('/signup/businessAdmin',signupBusAdmin);
router.post('/login/businessAdmin',loginBusAdmin);
router.post('/logout/businessAdmin',logoutBusAdmin);


//business representatives

router.post('/signup/businessRep',signupBusinessRep);
router.post('/login/businessRep',loginBusinessRep);
router.post('/logout/businessRep',logoutBusinessRep);









export default router;