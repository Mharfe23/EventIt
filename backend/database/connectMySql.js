import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connectToMySql = async () => {
    try {
        const connection = await  mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.Mysqlpassword,
            port: '3306',
            database: 'event_plateform_db'
        });

        connection.execute('SET AUTOCOMMIT = 0');
        
        
        return connection;
    } catch (error) {
        console.log('Error connecting to MySQL database:', error);
    }
}
export default connectToMySql;
/*
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.Mysqlpassword,
    port: '3306',
    database: 'event_plateform_db',
    waitForConnections: true,
    connectionLimit: 10, // Adjust the limit based on your needs
    queueLimit: 0
});

const connectToMySql = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        return connection;
    } catch (error) {
        console.log('Error connecting to MySQL database:', error);
    }
}

export default connectToMySql;*/

/*Singleton implementation


let connection;

const getMySqlConnection = async () => {
    if (!connection) {
        connection = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.MYSQL_PASSWORD,
            port: 3306,
            database: 'event_plateform_db'
        });
        console.log('MySQL connection established.');
    }

    return connection;
};


*/