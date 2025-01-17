const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const checkFormat = (name, email, password) => {
    // Validate all fields
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    // Validate password strength
    if (password.length < 4) {
        throw new Error("Password must be at least 4 characters long");
    }
};


const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        checkFormat(name,email,password)
        const isUser=await User.findOne({email});
        if (isUser) {
            return res.status(400).json({ success:false,error: true, message: "User already exists" });
        }

        const hashedPassword=await bcrypt.hash(password,10);
         // Create new user
         const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        // Success response
        console.log({
            name,
            email
        })
        return res.status(201).json({
            success:true,
            error: false,
            message: "Account created successfully",
        })


    }catch (error) {
        if (error.message.includes("All fields are required") || error.message.includes("Invalid email format") || error.message.includes("Password must be at least")) {
            return res.status(400).json({ success:false,error: true, message: error.message });
        }
        console.error("Error creating account:", error);
        return res.status(500).json({ success:false,error: true, message: "Server error, please try again later" });
    }
}

module.exports=signup