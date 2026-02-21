// this file will hold google oauth strategy
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// passport google strategy
passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            // profile contains info from google account
            try{
                const email = profile.emails[0].value;
                
                let user = await User.findOne({googleId: profile.id});

                if(!user) {
                    // if not found, check by email
                    user = await User.findOne({email});

                    // create new user
                    if(user){
                        user.googleId = profile.id;
                    }
                    else{
                        user = await User.create({
                            name: profile.displayName,
                            email,
                            googleId: profile.id,
                            password: null, // we are using google login, no password
                        });
                    }
                }

                // storing google tokens (required for calendar)
                user.googleAccessToken = accessToken;
                if(refreshToken){
                    user.googleRefreshToken = refreshToken;
                }
                await user.save();

                // generate token
                const token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }, 
                    process.env.JWT_SECRET, 
                    {expiresIn: "1d",
                });

                // done(null, token) passes jwt (token) to route
                done(null, {token, user});
            }
            catch(error) {
                done(error, null);
            }
        }
    )
);

export default passport;