import { useEffect,useState } from "react"
import axios from "axios"
import ClipCard from "../components/ClipCard"

function ClipList(){

const [clips,setClips] = useState([])

const userId = localStorage.getItem("userId")

const fetchClips = async ()=>{

try{

const res = await axios.get(`http://localhost:5000/clip/all/${userId}`)
setClips(res.data)

}

catch(error){
console.log("Error fetching clips",error)
}

}

useEffect(()=>{
fetchClips()

},[])

if(!userId){
return <h2>Please login first to see your clips</h2>
}

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