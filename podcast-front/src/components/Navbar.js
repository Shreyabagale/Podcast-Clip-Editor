import { Link } from "react-router-dom"

function Navbar(){

return(

<div className="navbar">

<div className="logo">
Podcast Clip Editor
</div>

<div className="nav-links">

<Link to="/dashboard">Dashboard</Link>

<Link to="/podcasts">Podcasts</Link>

<Link to="/addpodcast">Add Podcast</Link>

<Link to="/createclip">Create Clip</Link>

<Link to="/clips">Clips</Link>

<Link to="/login">Logout</Link>

</div>

</div>

)

}

export default Navbar