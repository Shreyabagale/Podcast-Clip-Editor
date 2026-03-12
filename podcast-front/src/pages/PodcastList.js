import { useEffect, useState } from "react"
import axios from "axios"
import PodcastCard from "../components/PodcastCard"

function PodcastList(){

const [podcasts,setPodcasts] = useState([])

const fetchPodcasts = async ()=>{

const userId = localStorage.getItem("userId")

let url = "http://localhost:5000/podcast/all"

if(userId){
url = `http://localhost:5000/podcast/all?userId=${userId}`
}

const res = await axios.get(url)

setPodcasts(res.data)

}

useEffect(()=>{
fetchPodcasts()
},[])

return(

<div>

<h2>Podcasts</h2>

{podcasts.map((p)=>(
<PodcastCard
key={p._id}
podcast={p}
refresh={fetchPodcasts}
/>
))}

</div>

)

}

export default PodcastList