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
    <div style={{ border: "1px solid gray", padding: "15px", margin: "10px" }}>
      {editing ? (
        <div>
          <input name="title" value={formData.title} onChange={handleChange} />
          <input name="description" value={formData.description} onChange={handleChange} />
          <input name="category" value={formData.category} onChange={handleChange} />
          <button onClick={updatePodcast}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{podcast.title}</h3>
          <p>{podcast.description}</p>
          <p>{podcast.category}</p>
          <p><b>ID:</b> {podcast._id}</p>

          {/* YouTube video iframe */}
          {youtubeId && (
            <iframe
              width="400"
              height="225"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={podcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}

      <button onClick={deletePodcast}>Delete</button>
    </div>
  );
}

export default PodcastCard;