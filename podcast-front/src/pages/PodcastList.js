import { useEffect, useState } from "react"
import axios from "axios"
import PodcastCard from "../components/PodcastCard"

function PodcastList(){

const [podcasts,setPodcasts] = useState([])

const userId = localStorage.getItem("userId")

const fetchPodcasts = async ()=>{

try{

const res = await axios.get(`http://localhost:5000/podcast/all/${userId}`)
setPodcasts(res.data)

}

catch(error){
console.log("Error fetching podcasts",error)
}

}

useEffect(()=>{

if(userId){
fetchPodcasts()
}

},[])

if(!userId){
return <h2>Please login first to see your podcasts</h2>
}

return(

<div>

<h2>Podcasts</h2>

{podcasts.length === 0 ? (
<p>No podcasts available</p>
) : (
podcasts.map((p)=>(
<PodcastCard
key={p._id}
podcast={p}
refresh={fetchPodcasts}
/>
))
)}

</div>

)

}

export default PodcastList