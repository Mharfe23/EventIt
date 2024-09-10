import connectToMySql from "../connectMySql.js";

export const getEventId = async (eventName) => {
    const connection = await connectToMySql(); // Ensure the connection is awaited
    const query = `SELECT event_id FROM events WHERE name = ?`; // Use parameterized query
    try {
        const [rows] = await connection.execute(query, [eventName]); // Pass parameters separately
        if (rows.length === 0) {
            return 1;
        }
        return rows[0].event_id;
    } catch (error) {
        console.log(error.message);
    } finally {
        await connection.end(); // Ensure connection is properly closed
    }
};
   