import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";

function PodcastCard({ podcast, refresh }) {
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsEditing(false);
    refresh();
  };

  const deletePodcast = async () => {
    try {
      await axios.delete(`http://localhost:5000/podcast/delete/${podcast._id}`);
      addToast("Podcast deleted.", "success");
      refresh();
    } catch (err) {
      addToast("Failed to delete podcast.", "error");
    }
  };

  // Helper to get YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(podcast.fileUrl);

  return (
    <div className="group rounded-2xl border border-blush-200 bg-blush-50/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-900">{podcast.title}</h3>
            <p className="mt-1 text-sm text-brand-700">{podcast.description}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {podcast.category || "Uncategorized"}
          </span>
        </div>

        <p className="text-xs text-brand-500">ID: {podcast._id}</p>

        {youtubeId ? (
          <div className="mt-4 overflow-hidden rounded-xl bg-brand-900">
            <iframe
              className="h-56 w-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={podcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-blush-100 p-4 text-sm text-brand-700">
            No valid YouTube link found.
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setIsDeleting(true)}
            className="inline-flex items-center justify-center rounded-lg border border-blush-200 bg-blush-50 px-4 py-2 text-sm font-semibold text-brand-900 shadow-sm transition hover:bg-blush-100"
          >
            Delete
          </button>
        </div>
      </div>

      <Modal open={isEditing} title="Edit Podcast" onClose={() => setIsEditing(false)}>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-brand-900">Title</span>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brand-900">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full resize-none rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brand-900">Category</span>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </label>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-blush-200 bg-blush-50 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-blush-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={updatePodcast}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={isDeleting} title="Confirm delete" onClose={() => setIsDeleting(false)}>
        <div className="space-y-4">
          <p className="text-sm text-brand-700">Are you sure you want to delete this podcast? This action cannot be undone.</p>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsDeleting(false)}
              className="rounded-lg border border-blush-200 bg-blush-50 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-blush-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                deletePodcast();
                setIsDeleting(false);
              }}
              className="rounded-lg bg-peach-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-peach-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PodcastCard;