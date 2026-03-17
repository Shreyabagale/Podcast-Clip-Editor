import { Link } from "react-router-dom"

function Dashboard(){

return(

<div className="page">

<h2>Dashboard</h2>

<p>Welcome to Podcast Clip Editor</p>

<br/>

<Link to="/podcasts">
<button>View Podcasts</button>
</Link>

<br/><br/>

<Link to="/addpodcast">
<button>Add Podcast</button>
</Link>

<br/><br/>

<a href="/viral">
<button>Generate Viral Reels</button>
</a>

<br></br><br></br>

<Link to="/createclip">
<button>Create Clip</button>
</Link>

<br/><br/>

<Link to="/clips">
<button>View Clips</button>
</Link>

</div>

)

}

export default Dashboard