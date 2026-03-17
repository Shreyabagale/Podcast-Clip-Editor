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
    <div className="card card--wide">
      {editing ? (
        <div className="card-edit">
          <input className="form-input" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input className="form-input" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
          <input className="form-input" name="caption" value={formData.caption} onChange={handleChange} placeholder="Caption" />
          <div className="clip-timeRow">
            <input className="form-input" name="startTime" type="number" value={formData.startTime} onChange={handleChange} placeholder="Start Time (s)" />
            <input className="form-input" name="endTime" type="number" value={formData.endTime} onChange={handleChange} placeholder="End Time (s)" />
          </div>
          <div className="card-buttons">
            <button className="main-btn" onClick={updateClip}>Save</button>
            <button className="btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-body">
            <div className="card-top">
              <h3 className="card-title">{clip.title}</h3>
              <span className="tag">{clip.category}</span>
            </div>
            <p className="card-meta"><b>Podcast:</b> {clip.podcastId?.title || "N/A"}</p>
            <p className="card-text"><b>Caption:</b> {clip.caption}</p>
            <p className="card-meta"><b>Clip Time:</b> {clip.startTime}s → {clip.endTime}s</p>

          {/* YouTube clip only */}
          <iframe
  className="card-video"
  src={`https://www.youtube.com/embed/${youtubeId}?start=${clip.startTime}&end=${clip.endTime}&autoplay=0&controls=0`}
  title={clip.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

          <div className="card-buttons">
            <button className="btn" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={deleteClip}>Delete</button>
            <button className="btn" onClick={downloadClip}>Download</button>
            <button className="btn" onClick={shareClip}>Share</button>
          </div>
        </div>

        </>
      )}
    </div>
  );
}

export default ClipCard;