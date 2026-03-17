import { useState } from "react"
import axios from "axios"

function CreateClip(){

const [podcastId,setPodcastId] = useState("")
const [title,setTitle] = useState("")
const [startTime,setStartTime] = useState("")
const [endTime,setEndTime] = useState("")
const [caption,setCaption] = useState("")
const [category,setCategory] = useState("")

// convert mm:ss to seconds
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

<div className="page create-clip">
<div className="create-clip-shell">

<header className="create-clip-header">
<div>
<h2 className="create-clip-title">Create Clip</h2>
<p className="create-clip-subtitle">Fill in the details to generate a shareable clip.</p>
</div>
</header>

<div className="create-clip-grid">

<section className="create-clip-panel">
<div className="create-clip-card">
<div className="create-clip-cardHead">
<h3 className="create-clip-cardTitle">Clip details</h3>
<p className="create-clip-cardHint">Use mm:ss for start/end times.</p>
</div>

<div className="create-clip-form">
<input
type="text"
placeholder="Podcast ID"
value={podcastId}
onChange={(e)=>setPodcastId(e.target.value)}
className="form-input"
/>

<input
type="text"
placeholder="Clip Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="form-input"
/>

<div className="create-clip-row2">
<input
type="text"
placeholder="Start Time (mm:ss)"
pattern="[0-9]+:[0-9]{2}"
value={startTime}
onChange={(e)=>setStartTime(e.target.value)}
className="form-input"
/>

<input
type="text"
placeholder="End Time (mm:ss)"
pattern="[0-9]+:[0-9]{2}"
value={endTime}
onChange={(e)=>setEndTime(e.target.value)}
className="form-input"
/>
</div>

<input
type="text"
placeholder="Caption"
value={caption}
onChange={(e)=>setCaption(e.target.value)}
className="form-input"
/>

<input
type="text"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="form-input"
/>

<button className="main-btn create-clip-btn" onClick={handleCreateClip}>
Create Clip
</button>
</div>
</div>
</section>

<aside className="create-clip-panel">
<div className="create-clip-card create-clip-preview">
<div className="create-clip-cardHead">
<h3 className="create-clip-cardTitle">Preview</h3>
<p className="create-clip-cardHint">This is a visual placeholder matching the template style.</p>
</div>

<div className="create-clip-previewBox" aria-hidden="true">
<div className="create-clip-previewBadge">Podcast Clip</div>
<div className="create-clip-previewLines">
<div className="create-clip-line w1" />
<div className="create-clip-line w2" />
<div className="create-clip-line w3" />
</div>
</div>
</div>
</aside>

</div>
</div>
</div>

)

}

export default CreateClip