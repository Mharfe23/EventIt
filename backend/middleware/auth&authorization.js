import jwt from 'jsonwebtoken';

export const protectRoute = (role="all") => async (req, res, next) => {
    try{

    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({eroor:"Unauthorized - No token provided"});

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({error:'Unauthorized - Invalid token' });
    
   
    req.user=decoded;

    if(req.user.role === 'event_org' && role === 'bus_admin'){
        next();
        return;
    }
    
    if (req.user.role !== role && role !== 'all') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
    
};

