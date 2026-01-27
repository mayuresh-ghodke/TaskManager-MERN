import User from "../models/User";
import bcrypt from "bcryptjs";

// Register the user
export const registerUser = async (req, res) => {
   const {name, email, password} = req.body;

   try{
      // check if user exists
      const userExists = await User.findOne({email});
      if(userExists) {
         return res.status(400).json({message: "User already exists"});
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // save user
      const user = await User.create({
         name, email, password: hashedPassword
      });
      res.status(201).json({message: "User registered successfully."});
   }
   catch(error){
      res.status(500).json({message: error.message});
   }
};

// Login user
export const loginUser = async(req, res) => {
   const {email, password} = req.body;

   try{
      const user = await User.findOne({email});
      if(!user){
         return res.status(400).json({message: "Invalid username or password"});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
         return res.status(400).json({message: "Invalid username or password"});
      }

      res.json({message: "Login Successfull", user: {
            id: user._id,
            email: user.email
         }
      });
   }
   catch(error){
      res.status(500).json({message: error.message});
   }
}