import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleRegister = (e)=>{

e.preventDefault()

axios.post("http://localhost:5000/user/register",{

name:name,
email:email,
password:password

})
.then(res=>{

alert("Registration Successful")

navigate("/login")

})
.catch(err=>{
console.log(err.response);

alert("Registration Failed")

})

}

return(

<div className="auth">

<h2>Register</h2>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="main-btn">
Register
</button>

</form>

<p>
Already have account?
<Link to="/login"> Login</Link>
</p>

</div>

)

}

export default Register;