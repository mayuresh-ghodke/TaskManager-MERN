import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

connectDb();

const app = express();

/** We import passport config to register Google Strategy
 *  passport.initialize() is required.
 *  /api/auth: is the base for Google OAuth routes.
 */
// passport init
app.use(passport.initialize());

// middleware
app.use(cors());
app.use(express.json()); // json parsing
app.use("/uploads", express.static("uploads"));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
