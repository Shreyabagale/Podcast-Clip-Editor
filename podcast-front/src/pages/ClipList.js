import { useEffect,useState } from "react"
import axios from "axios"
import ClipCard from "../components/ClipCard"

function ClipList(){

const [clips,setClips] = useState([])

const fetchClips = async ()=>{

const res = await axios.get("http://localhost:5000/clip/all")

setClips(res.data)

}

useEffect(()=>{
fetchClips()
},[])

return(

<div>

<h2>Clips</h2>

{clips.length === 0 ? (
<p>No clips available</p>
) : (
clips.map((clip)=>(
<ClipCard
key={clip._id}
clip={clip}
refresh={fetchClips}
/>
))
)}

</div>

)

}

export default ClipList