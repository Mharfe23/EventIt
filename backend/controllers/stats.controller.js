import connectToMySql from "../database/connectMySql.js";
import { geteventid_fromToken } from "./utils/eventidfromToken.js";


export const getBusinessNumbers = async (req, res) => {
    
    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const [results] = await connection.execute(
            "SELECT COUNT(*) as number FROM businesses WHERE event_id = ?",
            [event_id]
        );
        res.status(200).json(results[0].number);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
    
}
export const getBusinessRepresentativesNumbers = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const [results] = await connection.execute(
            "SELECT COUNT(*) as number FROM business_representatives WHERE event_id = ?",
            [event_id]
        );
        res.status(200).json(results[0].number);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
    

}

export const getRepresentativesPerBusiness = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        
        const [results] = await connection.execute(
            "SELECT b.business_name, COUNT(*) as Représentant FROM business_representatives as br,businesses as b WHERE br.business_id=b.business_id  AND b.event_id = ? GROUP BY b.business_id",
            [event_id]
        );
        res.status(200).json(results);

    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }finally{
        await connection.end();
    }

}

export const getPresentativesToday = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const [results] = await connection.execute(
            "SELECT COUNT(*) as number FROM business_representatives WHERE event_id = ? AND DATE(created_at) = CURDATE()",
            [event_id]
        );
        res.status(200).json(results[0].number);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}
export const BusinessToday = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const [results] = await connection.execute(
            "SELECT COUNT(*) as number FROM businesses WHERE event_id = ? AND DATE(created_at) = CURDATE()",
            [event_id]
        );
        res.status(200).json(results[0].number);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}


export const getDailySignups = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const event_id = await geteventid_fromToken(req);
        const [results] = await connection.execute(
            `SELECT DATE(created_at) as date, COUNT(*) as count 
             FROM business_representatives 
             WHERE event_id = ? 
             GROUP BY DATE(created_at) 
             ORDER BY DATE(created_at)`,
            [event_id]
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await connection.end();
    }
};