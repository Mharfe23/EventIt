import connectToMySql from "../database/connectMySql.js";
import { geteventid_fromToken } from "./utils/eventidfromToken.js";

export const getBusinessesPerEvent = async (req, res) => {
    const connection = await connectToMySql();

    try {
        const event_id = await geteventid_fromToken(req);
       
        const [results] = await connection.execute(
            "SELECT businesses.business_id ,business_name,business_phone,address, email,website,description,business_pic,business_category FROM businesses,business_details where (businesses.business_id = business_details.business_id) AND event_id = ?",[event_id]
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const getBusinessRepresentatives = async (req, res) => {

    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        
        const [results] = await connection.execute(
            "SELECT user_id,fullname, info,br.email,business_name FROM business_representatives as br,businesses as bs WHERE br.event_id = ? AND  br.business_id = bs.business_id",
            [event_id]
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}

export const getBusinessRepresentativesByBusiness = async (req, res) => {  

    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const business_id = req.user.userId;
        
        if (!event_id || !business_id) {
            return res.status(400).json({ error: "Invalid event ID or business ID" });
        }
        
       
        const [results] = await connection.execute(
            "SELECT user_id ,fullname,email, info FROM business_representatives WHERE business_id = ? AND event_id = ?",
            [business_id, event_id]
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}

export const getBusinessRepresentativesByBusinessToday = async (req, res) => {  

    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const business_id = req.user.userId;
        
        if (!event_id || !business_id) {
            return res.status(400).json({ error: "Invalid event ID or business ID" });
        }
        
       
        const [results] = await connection.execute(
            "SELECT user_id ,fullname,email, info FROM business_representatives WHERE business_id = ? AND event_id = ? AND DATE(created_at) = CURDATE()",
            [business_id, event_id]
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}