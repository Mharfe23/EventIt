import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import connectToMySql from '../database/connectMySql.js';
import { getEventId } from '../database/utils/geteventid.js';



export const signupEventOrga = async (req,res) =>{

    const connection = await connectToMySql();
    try {
        const { name_event, description, start_date, end_date, location } = req.body;
        const { name_organizer, email, password, confirmPassword, phone } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
        }

        const [event] = await connection.execute('SELECT * FROM events WHERE name = ?', [name_event]);

        const [event_org] = await connection.execute('SELECT * FROM event_organizers WHERE email = ?', [email]);

        if (event_org.length > 0) {
            return res.status(400).json({ error: "Ce compte existe déjà" });
        }

        if (event.length > 0) {
            return res.status(400).json({ error: "evenement existe déjà" });
        }

        await connection.beginTransaction();

        await connection.execute(
            'INSERT INTO events (name, description, start_date, end_date, location) VALUES (?, ?, ?, ?, ?)',
            [name_event, description, start_date, end_date, location]
        );

        const [eventIdResult] = await connection.execute('SELECT LAST_INSERT_ID() as eventId');
        const event_id = eventIdResult[0].eventId;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await connection.execute(
            'INSERT INTO event_organizers (name, email, password, phone, event_id) VALUES (?, ?, ?, ?, ?)',
            [name_organizer, email, hashedPassword, phone, event_id]
        );

        const [organizerIdResult] = await connection.execute('SELECT LAST_INSERT_ID() as organizerId');
        const organizer_id = organizerIdResult[0].organizerId;

        await connection.commit();

        generateTokenAndSetCookie(organizer_id, "event_org", res);
        res.status(201).json({
            organizer_id: organizer_id,
            name: name_organizer,
            email: email,
            phone: phone,
            event_id: event_id,
            name_event: name_event,
        });

    } catch (error) {
        await connection.rollback();
        console.log("Error in signup controller (event_org):", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await connection.end();
    }
};


export const loginEventOrga = async (req,res) =>{

    const connection = await connectToMySql();
    try {
        const {email,password} = req.body;
        const result = await connection.execute('Select * from event_organizers where email = ?',[email]);
        let user = result[0][0];
        if (!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message:"Données invalides"});
        }

        generateTokenAndSetCookie(user.organizer_id,"event_org",res);
        res.status(200).json({...user,password:undefined});

    } catch (error) {
        console.log("error in login controller (event_org)",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }finally{
        await connection.end();
    }
}

export const logoutEventOrga = (req,res) =>{

    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully)"});

    } catch (error) {
        
        console.log("error in logout controller (event_org",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}



export const signupBusAdmin = async (req, res) => {
    
    const connection = await connectToMySql();

    try {

        
        const { email, password, confirmPassword, business_name, business_phone, address, website, description, business_pic, event_name } = req.body;

        if (!email || !password || !confirmPassword || !business_name || !business_phone || !address || !website || !description || !business_pic || !event_name) {

            return res.status(400).json({ message: "All fields are required" });
        }

        if (password != confirmPassword) {

            return res.status(400).json({ message: "Passwords do not match" });
        }

        const business_admin = await connection.execute('SELECT * FROM businesses WHERE (email = ? OR business_name = ?)', [email, business_name]);

        
        if (business_admin[0].length > 0) {

            return res.status(400).json({ message: "business admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const event_id = await getEventId(event_name);

        await connection.beginTransaction();

        await connection.execute(
            'INSERT INTO businesses (business_name,email,password,event_id) VALUES (?,?,?,?)',
            [business_name, email, hashedPassword, event_id]);

        const [businessId] = await connection.execute('SELECT LAST_INSERT_ID() as busId');
        const business_id = businessId[0].busId;
        //const business_id = await last_businessAdmin_id();

        await connection.execute(
            'INSERT INTO business_details (business_id,business_phone,address,website,description,business_pic) VALUES (?,?,?,?,?,?)'
            , [business_id, business_phone, address, website, description, business_pic]);

        await connection.commit();

        generateTokenAndSetCookie(business_id, "bus_admin", res);


        res.status(201).json({
            business_id: business_id,
            business_name: business_name,
            email: email,
            business_phone: business_phone,
            address: address,
            website: website,
            description: description,
            business_pic: business_pic,
            event_id: event_id
        });

    } catch (error) {
        await connection.rollback();
        console.log("error in signup controller (signup Business Admin)", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
   
}



export const loginBusAdmin = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const { email, password } = req.body;
        const result = await connection.execute('SELECT * FROM businesses WHERE email = ?', [email]);
        const businessAdmin = result[0][0];
        if (!businessAdmin || !(await bcrypt.compare(password, businessAdmin.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateTokenAndSetCookie(businessAdmin.business_id, "bus_admin", res);
        res.status(200).json({ ...businessAdmin, password: undefined });

    } catch (error) {
        console.log("error in login controller (business admin)", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await connection.end();
    }
}

export const logoutBusAdmin = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller (business admin)", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const signupBusinessRep = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const {business_name, fullname,email, password ,confirmPassword, event_name, info} = req.body;

        if (!email || !fullname || !password || !confirmPassword || !business_name || !event_name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const [business] = await connection.execute('SELECT business_id FROM businesses WHERE business_name = ?', [business_name]);
        if (business.length == 0) {
            return res.status(400).json({ message: "Business does not exist" });
        }
        
        const [businessRep] = await connection.execute('SELECT * FROM business_representatives WHERE email = ?', [email]);
        
        
        if (businessRep.length > 0) {
            return res.status(400).json({ message: "Business Representative already exists" });
        }
        
        
        const business_id = business[0].business_id;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const event_id= await getEventId(event_name);

        await connection.execute('INSERT INTO business_representatives (email, business_id, fullname, password,event_id, info) VALUES (?, ?, ?,?,?,?)', [ email,business_id, fullname, hashedPassword,event_id,info]);

        const [presentativedResult] = await connection.execute('SELECT LAST_INSERT_ID() as presentativeId');
        const userid = presentativedResult[0].presentativeId;
      

        await connection.commit();
        generateTokenAndSetCookie(userid, "bus_rep", res);

        res.status(201).json({
            userid: userid,
            business_id: business_id,
            fullname: fullname,
            email: email,
            event_id: event_id,
            info: info
        });

    } catch (error) {
        console.log("error in signup controller (business rep)", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await connection.end();
    }
}

export const loginBusinessRep = async (req, res) => {
    const connection = await connectToMySql();
    try {
        const { email, password } = req.body;
        const result = await connection.execute('SELECT * FROM business_representatives WHERE email = ?', [email]);
        const businessRep = result[0][0];
        if (!businessRep || !(await bcrypt.compare(password, businessRep.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateTokenAndSetCookie(businessRep.userid, "bus_rep", res);
        res.status(200).json({ ...businessRep, password: undefined });

    } catch (error) {
        console.log("error in login controller (business rep)", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await connection.end();
    }
}

export const logoutBusinessRep = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller (business rep)", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}