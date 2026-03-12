import { useNavigate } from "react-router-dom";

import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Login(){
    const navigate = useNavigate();

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async () => {

try{

const res = await axios.post(
"http://localhost:5000/user/login",
{
email,
password
}
)

alert(res.data)

if(res.data === "Login successful"){
    navigate("/dashboard")
}

}
catch(error){

alert("Login error")

}

}

return(

<div className="auth">

<h2>Login</h2>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="main-btn" onClick={handleLogin}>
Login
</button>

<p>
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>

)

}

export default Login