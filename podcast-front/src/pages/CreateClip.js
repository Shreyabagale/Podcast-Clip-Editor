import { useState } from "react"
import axios from "axios"

function CreateClip(){

const [podcastId,setPodcastId] = useState("")
const [title,setTitle] = useState("")
const [startTime,setStartTime] = useState("")
const [endTime,setEndTime] = useState("")
const [caption,setCaption] = useState("")
const [category,setCategory] = useState("")

const convertToSeconds = (time) => {

const parts = time.split(":")

const minutes = parseInt(parts[0])
const seconds = parseInt(parts[1])

return minutes * 60 + seconds

}

const handleCreateClip = async ()=>{

try{
const startSeconds = convertToSeconds(startTime)
const endSeconds = convertToSeconds(endTime)

const userId = localStorage.getItem("userId")
const res = await axios.post(
"http://localhost:5000/clip/create",
{
podcastId,
title,
startTime: startSeconds,
endTime: endSeconds,
caption,
category,
userId
}
)

alert(res.data)

}
catch(error){

alert("Error creating clip")

}

}

return(

<div>

<h2>Create Clip</h2>

<input
type="text"
placeholder="Podcast ID"
value={podcastId}
onChange={(e)=>setPodcastId(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Clip Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Start Time (mm:ss)"
pattern="[0-9]+:[0-9]{2}"
value={startTime}
onChange={(e)=>setStartTime(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="End Time (mm:ss)"
pattern="[0-9]+:[0-9]{2}"
value={endTime}
onChange={(e)=>setEndTime(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Caption"
value={caption}
onChange={(e)=>setCaption(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<br/><br/>

<button onClick={handleCreateClip}>
Create Clip
</button>

</div>

)

}

export default CreateClip