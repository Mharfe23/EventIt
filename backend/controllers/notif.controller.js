import connectToMySql from "../database/connectMySql.js";
import { geteventid_fromToken } from "./utils/eventidfromToken.js";

export const sendNotif = async (req, res) => {
    let connection;
    try {
        connection = await connectToMySql();
        const { title,content, target} = req.body;
        const organizer_id = req.user.userId;

        const Event = await connection.execute(
            "SELECT event_id FROM event_organizers WHERE organizer_id = ?",
            [organizer_id]
        );
        const event_id = Event[0][0].event_id;
        connection.beginTransaction();  
        const [results] = await connection.execute(
        "INSERT INTO notifications (organizer_id, event_id,title, content,target) VALUES (?,?,?,?,?)",
        [organizer_id, event_id, title, content,target]
        );
        connection.commit();
        res.status(201).json({ message: "Notification sent" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
};

export const getNotifsAdmin = async (req, res) => {
    let connection;
    try {
        connection = await connectToMySql();
        
        let event_id = await geteventid_fromToken(req);

        const [results] = await connection.execute(
            "SELECT notification_id as id,title,content,target,created_at as date FROM notifications WHERE event_id = ? AND target = ?",
            [event_id,'admin']
        );
        res.status(200).json( results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}

export const getNotifsRep = async (req, res) => {
    let connection;
    try {
        connection = await connectToMySql();
        
        let event_id = await geteventid_fromToken(req);

        const [results] = await connection.execute(
            "SELECT SELECT notification_id as id,title,content,target,created_at as date FROM notifications WHERE event_id = ? AND target = ?",
            [event_id,'representative']
        );
        res.status(200).json( results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}

export const getNotif = async (req, res) => {
    let connection;
    try {
        connection = await connectToMySql();
        
        let event_id = await geteventid_fromToken(req);

        const [results] = await connection.execute(
            "SELECT notification_id as id,title,content,target,created_at as date FROM notifications WHERE event_id = ? ORDER BY date desc",
            [event_id]
        );
        res.status(200).json( results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }finally{
        await connection.end();
    }
}