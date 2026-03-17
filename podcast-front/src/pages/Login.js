import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const userId = localStorage.getItem("userId")

const handleLogin = async () => {

try{

const res = await axios.post(
"http://localhost:5000/user/login",
{
email,
password
}
)

// store userId
localStorage.setItem("userId", res.data.userId)

alert(res.data.message)

if(res.data.message === "Login successful"){
navigate("/dashboard")
}

}
catch(error){

alert("Login failed")

}

}

const logout = () => {

localStorage.removeItem("userId")

alert("Logged out successfully")

navigate("/login")

}

return(

<div className="auth">

{/* If user already logged in */}
{userId ? (

<div>

<h2>Profile</h2>

<p><b>User ID:</b> {userId.slice(0,8)}...</p>

<p>Status: Logged In</p>

<button onClick={logout}>
Logout
</button>

</div>

) : (

<div>

<h2>Login</h2>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="form-input"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="form-input"
/>

<button className="main-btn" onClick={handleLogin}>
Login
</button>

<p>
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>

)}

</div>

)

}

export default Login