import connectToMySql from "../database/connectMySql.js";
import { geteventid_fromToken } from "./utils/eventidfromToken.js";

export const getBusinessesPerEvent = async (req, res) => {
    const connection = await connectToMySql();

    try {
        const event_id = await geteventid_fromToken(req);
       
        const [results] = await connection.execute(
            "SELECT businesses.business_id ,business_name,business_phone,address, email,website,description,business_pic FROM businesses,business_details where (businesses.business_id = business_details.business_id) AND event_id = ?",[event_id]
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
            "SELECT user_id,fullname, info FROM business_representatives WHERE event_id = ?",
            [event_id]
        );
        res.status(200).json(results[0]);
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
        const business_id = req.params.id;
        const [results] = await connection.execute(
            "SELECT user_id ,fullname, info FROM business_representatives WHERE business_id = ? AND event_id = ?",
            [business_id,event_id]
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}