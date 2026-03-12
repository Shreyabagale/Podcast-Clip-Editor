import { useState } from "react"
import axios from "axios"

function AddPodcast(){

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [category,setCategory] = useState("")
const [fileUrl,setFileUrl] = useState("")

const handleAddPodcast = async () => {

try{
const userId = localStorage.getItem("userId")

const res = await axios.post(
"http://localhost:5000/podcast/add",
{
title,
description,
category,
fileUrl,
userId
}
)

alert(res.data)

}
catch(error){

alert("Error adding podcast")

}

}

return(

<div>

<h2>Add Podcast</h2>

<input
type="text"
placeholder="Podcast Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Youtube URL"
value={fileUrl}
onChange={(e)=>setFileUrl(e.target.value)}
/>

<br/><br/>

<button onClick={handleAddPodcast}>
Add Podcast
</button>

</div>

)

}

export default AddPodcast