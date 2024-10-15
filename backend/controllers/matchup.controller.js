import connectToMySql from "../database/connectMySql.js";
import { geteventid_fromToken } from "./utils/eventidfromToken.js";

export const MatchupWithRep = async (req, res) => {
    let connection;
    try {
        connection = await connectToMySql();
        let event_id = await geteventid_fromToken(req);
        const {user_id,business_id,info} = req.body;

        if (!user_id || !business_id || !info){
            return res.status(400).json({error:"data missing"})
        }
        const [data] = await connection.execute('Select user_id,fullname,info from business_representatives where business_id != ? AND event_id = ?',[business_id,event_id]);
        
            const response = await fetch('http://127.0.0.1:5500/matchup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(
                    {
                    "target":{"info":info,"user_id":user_id},
                    "participants":data
                })
            })
            if (!response.ok) {
                const text = await response.text();  // Get HTML error message
                throw new Error(`Error: ${response.status} - ${text}`);
            }

        
        const result = await response.json();
        res.status(200).json(result);

       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}