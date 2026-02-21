import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// manual register and login
router.post("/register", registerUser);
router.post("/login", loginUser);

// google auth login or signup redirect user to google login

// calendar : allow event creation
// accessType: "offline" => gives refresh token
// prompt: "consent" => forces refresh token generation
router.get(
    "/google", 
    passport.authenticate("google", {
        scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
        accessType: "offline",
        prompt: "consent",
    })
);

// google callback after login
router.get(
    "/google/callback", 
    passport.authenticate("google", {session: false}),
    (req, res) => {
        // gogole strategy sends JWT in req.user.token
        const {token, user} = req.user;

        // redirect to frontend with token
        // e.g. frontend will read token from URL query params
        res.redirect(`${process.env.FRONTEND_URL}/google-success?token=${token}`);
    }
);

export default router;