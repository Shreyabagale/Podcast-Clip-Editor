import { useState } from "react";
import axios from "axios";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

function ClipCard({ clip, refresh }) {
const downloadClip = () => {

if(!clip.fileUrl){
alert("Video URL missing for this clip")
return
}

const clipLink = `${clip.fileUrl}?t=${clip.startTime}`

const element = document.createElement("a")

const file = new Blob([clipLink], {type:"text/plain"})

element.href = URL.createObjectURL(file)

element.download = "clip_link.txt"

document.body.appendChild(element)

element.click()

document.body.removeChild(element)

}

const shareClip = async () => {

if(!clip.fileUrl){
alert("Video URL missing for this clip")
return
}

const clipLink = `${clip.fileUrl}?t=${clip.startTime}`

try{

if(navigator.share){

await navigator.share({
title:"Podcast Clip",
text:"Check out this podcast clip!",
url:clipLink
})

}else{

navigator.clipboard.writeText(clipLink)
alert("Clip link copied!")

}

}catch(err){
console.log(err)
}

}
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: clip.title,
    category: clip.category,
    caption: clip.caption,
    startTime: clip.startTime,
    endTime: clip.endTime,
  });

  const youtubeId = getYouTubeId(clip.podcastId?.fileUrl);
  const isYouTube = !!youtubeId;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateClip = async () => {
    await axios.put(`http://localhost:5000/clip/update/${clip._id}`, formData);
    setEditing(false);
    refresh();
  };

  const deleteClip = async () => {
    try {
      await axios.delete(`http://localhost:5000/clip/delete/${clip._id}`);
      refresh();
    } catch (err) {
      console.error("Error deleting clip:", err);
    }
  };

  if (!isYouTube) return null; // Skip non-YouTube clips

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      {editing ? (
        <div>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
          <input name="caption" value={formData.caption} onChange={handleChange} placeholder="Caption" />
          <input name="startTime" type="number" value={formData.startTime} onChange={handleChange} placeholder="Start Time (s)" />
          <input name="endTime" type="number" value={formData.endTime} onChange={handleChange} placeholder="End Time (s)" />
          <button onClick={updateClip}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{clip.title}</h3>
          <p><b>Podcast:</b> {clip.podcastId?.title || "N/A"}</p>
          <p><b>Category:</b> {clip.category}</p>
          <p><b>Caption:</b> {clip.caption}</p>
          <p><b>Clip Time:</b> {clip.startTime}s → {clip.endTime}s</p>

          {/* YouTube clip only */}
          <iframe
  width="400"
  height="225"
  src={`https://www.youtube.com/embed/${youtubeId}?start=${clip.startTime}&end=${clip.endTime}&autoplay=0&controls=0`}
  title={clip.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

          <br /><br />
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={deleteClip} style={{ marginLeft: "10px" }}>Delete</button>
          <br/><br/>

<button onClick={downloadClip}>
Download
</button>

<button onClick={shareClip} style={{marginLeft:"10px"}}>
Share
</button>
        </>
      )}
    </div>
  );
}

export default ClipCard;