
import connectToMySql from "../database/connectMySql.js";
import { geteventid_fromToken } from "./utils/eventidfromToken.js";
import bcrypt from 'bcryptjs';


export const createBusiness = async (req, res) => {
    const connection = await connectToMySql();

    try {

        
        const { email, password, business_name, business_phone, address, website, description, business_pic, business_category} = req.body;

        if (!email || !password || !business_name || !business_phone || !address || !website || !description || !business_pic || !business_category) {

            return res.status(400).json({ message: "All fields are required" });
        }

        

        const business_admin = await connection.execute('SELECT * FROM businesses WHERE (email = ? OR business_name = ?)', [email, business_name]);

        
        if (business_admin[0].length > 0) {

            return res.status(400).json({ message: "business admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const event_id = await geteventid_fromToken(req);

        await connection.beginTransaction();

        await connection.execute(
            'INSERT INTO businesses (business_name,email,password,event_id) VALUES (?,?,?,?)',
            [business_name, email, hashedPassword, event_id]);

        const [businessId] = await connection.execute('SELECT LAST_INSERT_ID() as busId');
        const business_id = businessId[0].busId;
        //const business_id = await last_businessAdmin_id();

        await connection.execute(
            'INSERT INTO business_details (business_id,business_phone,address,website,description,business_pic,business_category ) VALUES (?,?,?,?,?,?,?)'
            , [business_id, business_phone, address, website, description, business_pic,business_category]);

        await connection.commit();

        res.status(201).json({ message: `business admin created successfully `});

    } catch (error) {
        await connection.rollback();
        console.log("error in create account controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

export const updateBusiness = async (req, res) => {
    
    const connection = await connectToMySql();
    const { business_id, email, business_name, business_phone, address, website, description, business_pic } = req.body;

    if (!business_id || !email ||  !business_name || !business_phone || !address || !website || !description || !business_pic) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const business_admin = await connection.execute('SELECT * FROM businesses WHERE (email = ? OR business_name = ?) AND business_id != ?', [email, business_name, business_id]);

        if (business_admin[0].length > 0) {
            return res.status(400).json({ message: "Business admin with this email or business name already exists" });
        }

       
        await connection.beginTransaction();

        await connection.execute(
            'UPDATE businesses SET business_name = ?, email = ? WHERE business_id = ?',
            [business_name, email, business_id]
        );

        await connection.execute(
            'UPDATE business_details SET business_phone = ?, address = ?, website = ?, description = ?, business_pic = ? WHERE business_id = ?',
            [business_phone, address, website, description, business_pic, business_id]
        );

        await connection.commit();

        res.status(200).json({ message: `Business admin updated successfully` });
    } catch (error) {

        await connection.rollback();
        console.log("Error in update account controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteBusiness = async (req, res) => {
    const connection = await connectToMySql();
    const { business_id } = req.body;

    if (!business_id) {
        return res.status(400).json({ message: "Business id is required" });
    }

    try {
        await connection.beginTransaction();

        await connection.execute('DELETE FROM businesses WHERE business_id = ?', [business_id]);

        await connection.commit();

        res.status(200).json({ message: `Business admin deleted successfully` });
    } catch (error) {
        await connection.rollback();
        console.log("Error in delete account controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//representatives

export const createRepresentative = async (req, res) => {
    const connection = await connectToMySql();

    try {

        const { email, password, fullname, business_id,info } = req.body;
        const event_id = await geteventid_fromToken(req);

        if (!email || !password || !fullname || !business_id || !info) {

            return res.status(400).json({ message: "All fields are required" });
        }

        const representative = await connection.execute('SELECT * FROM business_representatives WHERE email = ? OR fullname = ?', [email,fullname]);

        if (representative[0].length > 0) {

            return res.status(400).json({ message: "Representative already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await connection.beginTransaction();

        await connection.execute(
            'INSERT INTO business_representatives (fullname,email,password,business_id,event_id,info) VALUES (?,?,?,?,?,?)',
            [fullname, email, hashedPassword, business_id,event_id,info]);

        await connection.commit();

        res.status(201).json({ message: `Representative created successfully `});

    } catch (error) {
        await connection.rollback();
        console.log("error in create account controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }finally{
        await connection.end();
    }

}

export const updateRepresentative = async (req, res) => {
    const connection = await connectToMySql();
    const { id, email, password, fullname,info } = req.body;

    if (!id || !email || !password || !fullname || !info) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const representative = await connection.execute('SELECT * FROM business_representatives WHERE email = ? OR fullname = ? AND user_id != ?', [email, fullname, id]);

        if (representative[0].length > 0) {
            return res.status(400).json({ message: "Representative with this email or fullname already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await connection.beginTransaction();

        await connection.execute(
            'UPDATE business_representatives SET fullname = ?, email = ?, password = ?, info = ? WHERE user_id = ?',
            [fullname, email, hashedPassword,info, id]
        );

        await connection.commit();

        res.status(200).json({ message: `Representative updated successfully` });
    } catch (error) {

        await connection.rollback();
        console.log("Error in update account controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }finally{
        await connection.end();
    }
}

export const deleteRepresentative = async (req, res) => {
    const connection = await connectToMySql();
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Representative id is required" });
    }

    try {
        await connection.beginTransaction();

        await connection.execute('DELETE FROM business_representatives WHERE user_id = ?', [id]);

        await connection.commit();

        res.status(200).json({ message: `Representative deleted successfully` });
    } catch (error) {
        await connection.rollback();
        console.log("Error in delete account controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }finally{
        await connection.end();
    }
}