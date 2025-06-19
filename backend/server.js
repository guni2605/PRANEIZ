import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import adminRouter from './routes/AdminRoute.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import { ItemRouter } from './routes/ItemRoute.js';
import './config/passport.js';
import { userRouter } from './routes/userRoutes.js';
dotenv.config();
connectDb();
connectCloudinary();
app.listen(process.env.PORT ,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})
app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/admin',adminRouter);
app.use('/api/v2',ItemRouter);
app.use(cookieSession({ name: "session", keys: ["key"], maxAge: 24 * 60 * 60 * 1000 }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/user",userRouter)
// Routes
app.use("/api/auth", authRoutes);