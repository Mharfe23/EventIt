import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//import setupDatabase from "./database/setupDatabase.js";
import connectToMySql  from "./database/connectMySql.js";
import authRoutes from "./routes/auth.routes.js";
import notifRoutes from "./routes/notif.routes.js";
import crudRoutes from "./routes/crud.routes.js";
import userRoutes from "./routes/users.routes.js";
import statsRoutes from "./routes/stats.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
    
app.use('/api/auth/',authRoutes);

app.use('/api/notif',notifRoutes);

app.use('/api/org/crud/',crudRoutes);

app.use('/api/users',userRoutes);

app.use('/api/stats/',statsRoutes);

app.listen(process.env.PORT,() => {
    connectToMySql();
   
    console.log(`Server is running on port ${process.env.PORT}`);
})