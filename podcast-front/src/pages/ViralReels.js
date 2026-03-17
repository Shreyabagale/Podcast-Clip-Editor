import { useState, useEffect } from "react"
import axios from "axios"

function ViralReels(){

const [podcasts,setPodcasts] = useState([])
const [selectedPodcastId,setSelectedPodcastId] = useState("")
const [reels,setReels] = useState([])
const [videoUrl,setVideoUrl] = useState("")

// Fetch podcasts
useEffect(()=>{

const fetchPodcasts = async ()=>{

try{

const userId = localStorage.getItem("userId")

const res = await axios.get(
"http://localhost:5000/podcast/all/" + userId
)

setPodcasts(res.data)

}
catch(err){

console.log(err)

}

}

fetchPodcasts()

},[])

const generateReels = async ()=>{

try{

if(!selectedPodcastId){
alert("Please select a podcast")
return
}

const selectedPodcast = podcasts.find(
(p)=>p._id === selectedPodcastId
)

// store video url
setVideoUrl(selectedPodcast.fileUrl)

const res = await axios.post(
"http://localhost:5000/clip/generate-viral",
{
podcastId:selectedPodcastId
}
)

const fixedReels = res.data.map(r=>({
...r,
startTime:Number(r.startTime),
endTime:Number(r.endTime)
}))

setReels(fixedReels)

}
catch(err){

console.log(err)

}

}

const adjustStart = (index,value)=>{

const updated=[...reels]

updated[index].startTime=Math.max(
0,
updated[index].startTime + value
)

setReels(updated)

}

const adjustEnd = (index,value)=>{

const updated=[...reels]

updated[index].endTime=Math.max(
updated[index].startTime + 1,
updated[index].endTime + value
)

setReels(updated)

}

const saveClip = async (reel)=>{

try{

const userId=localStorage.getItem("userId")

await axios.post(
"http://localhost:5000/clip/create",
{
podcastId:selectedPodcastId,
title:reel.title,
startTime:reel.startTime,
endTime:reel.endTime,
caption:reel.caption,
category:reel.category,
userId:userId,
fileUrl: videoUrl
}
)

alert("Clip saved successfully")

}
catch(err){

console.log(err)

}

}

return(

<div className="page viral">

<h2>Generate Viral Reels</h2>

<select
value={selectedPodcastId}
onChange={(e)=>setSelectedPodcastId(e.target.value)}
className="form-select"
>

<option value="">Select your podcast</option>

{podcasts.map((p)=>(
<option key={p._id} value={p._id}>
{p.title}
</option>
))}

</select>

<br/><br/>

<button className="main-btn" onClick={generateReels}>
Generate 5 Viral Reels
</button>

<br/><br/>

<div className="viral-grid">

{reels.map((reel,index)=>{

const videoId = videoUrl.split("/").pop().split("?")[0]

return(

<div
key={index}
className="viral-card"
>

<h3>{reel.title}</h3>

<p>
Start: {reel.startTime}
<button className="btn btn-sm" onClick={()=>adjustStart(index,-5)}> -5 </button>
<button className="btn btn-sm" onClick={()=>adjustStart(index,5)}> +5 </button>
</p>

<p>
End: {reel.endTime}
<button className="btn btn-sm" onClick={()=>adjustEnd(index,-5)}> -5 </button>
<button className="btn btn-sm" onClick={()=>adjustEnd(index,5)}> +5 </button>
</p>

<iframe
width="220"
height="380"
src={`https://www.youtube.com/embed/${videoId}?start=${reel.startTime}&end=${reel.endTime}&autoplay=0&controls=0`}
title="Clip Preview"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
className="viral-iframe"
/>

<br/><br/>

<button className="main-btn" onClick={()=>saveClip(reel)}>
Save Clip
</button>

</div>

)

})}

</div>

</div>

)

}

export default ViralReels