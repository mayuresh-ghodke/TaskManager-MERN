import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true
        },
        password: {
            type: String,
        },

        // not necessity but strongly recommendation
        // to identify google auth users
        // gives unique profile id
        googleId:{
            type: String,
        },

        // google tokens we are storing because, required for calendar api
        googleAccessToken: {
            type:String,
        },
        googleRefreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

// hide sensitive data: prevents tokens leaking accidently
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.googleAccessToken;
        delete ret.googleRefreshToken;
        return ret;
    },
});

export default mongoose.model("User", userSchema);