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

const user = await User.findOne({email,password})

if(!user){
return res.status(400).send("Invalid credentials")
}

res.json({
message:"Login successful",
userId:user._id
})

}

catch(error){

res.send("Login failed")

}

}

module.exports = {registerUser,loginUser};