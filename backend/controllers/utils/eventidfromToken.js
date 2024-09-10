import connectToMySql from "../../database/connectMySql.js";


export const geteventid_fromToken = async (req) => {

    const connection = await connectToMySql();
    const user_id = req.user.userId;
    const role = req.user.role;
    let Event;
    
    if (role === "event_org") {
        Event = await connection.execute(
            "SELECT event_id FROM event_organizers WHERE organizer_id = ?",
            [user_id]);
    }
    if (role === "bus_rep") {
        Event = await connection.execute(
            "SELECT event_id FROM business_representatives WHERE user_id = ?",
            [user_id]
        );
    }
    if (role === "bus_admin") {
         Event = await connection.execute(
            "SELECT event_id FROM businesses WHERE business_id = ?",
            [user_id]
        );
    }
    
    const event_id = Event[0][0].event_id;
    return event_id;
}