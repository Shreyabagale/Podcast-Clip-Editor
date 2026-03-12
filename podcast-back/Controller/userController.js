const User = require("../Model/user")

const registerUser = async (req,res)=>{

    try{

        const {name,email,password} = req.body

        if(!name || !email || !password){

            return res.send("All fields required")

        }

        const existingUser = await User.findOne({email})

        if(existingUser){

            return res.send("User already exists")

        }

        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save()

        res.send("User registered successfully")

    }

    catch(error){

        res.send("Registration failed")

    }

}

const loginUser = async (req,res)=>{

    try{

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){

            return res.send("User not found")

        }

        if(user.password !== password){

            return res.send("Incorrect password")

        }

        res.send("Login successful")

    }

    catch(error){

        res.send("Login error")

    }

}

module.exports = {registerUser,loginUser};