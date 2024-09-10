import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,role,res)=>{
    //event_organizer, business_representative, business_admin

    if(role !== "event_org" && role !== "bus_rep" && role !== "bus_admin"){
        res.status(500).json({error:"Invalid Role"});
    }
    const token = jwt.sign({userId,role},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, //prevent xss attacks
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    })
}
export default generateTokenAndSetCookie;