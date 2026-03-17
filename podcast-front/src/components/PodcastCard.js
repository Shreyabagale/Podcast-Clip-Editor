import { useState } from "react";
import axios from "axios";

function PodcastCard({ podcast, refresh }) {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: podcast.title,
    description: podcast.description,
    category: podcast.category,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updatePodcast = async () => {
    await axios.put(`http://localhost:5000/podcast/update/${podcast._id}`, formData);
    setEditing(false);
    refresh();
  };

  const deletePodcast = async () => {
    await axios.delete(`http://localhost:5000/podcast/delete/${podcast._id}`);
    refresh();
  };

  // Helper to get YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(podcast.fileUrl);

  return (
    <div className="card card--wide">
      {editing ? (
        <div className="card-edit">
          <input className="form-input" name="title" value={formData.title} onChange={handleChange} />
          <input className="form-input" name="description" value={formData.description} onChange={handleChange} />
          <input className="form-input" name="category" value={formData.category} onChange={handleChange} />
          <div className="card-buttons">
            <button className="main-btn" onClick={updatePodcast}>Save</button>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <div className="card-top">
            <h3 className="card-title">{podcast.title}</h3>
            <span className="tag">{podcast.category}</span>
          </div>
          <p className="card-text">{podcast.description}</p>
          <p className="card-meta"><b>ID:</b> {podcast._id}</p>

          {/* YouTube video iframe */}
          {youtubeId && (
            <iframe
              className="card-video"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={podcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          <div className="card-buttons">
            <button className="btn" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={deletePodcast}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PodcastCard;