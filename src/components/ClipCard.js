import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

function ClipCard({ clip, refresh }) {
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
    try {
      await axios.put(`http://localhost:5000/clip/update/${clip._id}`, formData);
      addToast("Clip updated.", "success");
      setIsEditing(false);
      refresh();
    } catch (err) {
      addToast("Failed to update clip.", "error");
    }
  };

  const deleteClip = async () => {
    try {
      await axios.delete(`http://localhost:5000/clip/delete/${clip._id}`);
      addToast("Clip deleted.", "success");
      refresh();
    } catch (err) {
      console.error("Error deleting clip:", err);
      addToast("Failed to delete clip.", "error");
    }
  };

  if (!isYouTube) return null; // Skip non-YouTube clips

  return (
    <div className="group rounded-2xl border border-blush-200 bg-blush-50/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-brand-900">{clip.title}</h3>
          <p className="mt-1 text-sm text-brand-700">
            <span className="font-medium text-brand-900">Podcast:</span> {clip.podcastId?.title || "N/A"}
          </p>
          <p className="mt-1 text-sm text-brand-700">
            <span className="font-medium text-brand-900">Category:</span> {clip.category}
          </p>
          <p className="mt-1 text-sm text-brand-700">
            <span className="font-medium text-brand-900">Caption:</span> {clip.caption}
          </p>
          <p className="mt-1 text-sm text-brand-700">
            <span className="font-medium text-brand-900">Clip Time:</span> {clip.startTime}s → {clip.endTime}s
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-brand-900">
          <iframe
            className="h-56 w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?start=${clip.startTime}&end=${clip.endTime}&autoplay=0&controls=0`}
            title={clip.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex-wrap gap-3">
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

      <Modal open={isEditing} title="Edit Clip" onClose={() => setIsEditing(false)}>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-brand-900">Title</span>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Clip title"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brand-900">Category</span>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Category"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brand-900">Caption</span>
            <input
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Clip caption"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-brand-900">Start time (s)</span>
              <input
                name="startTime"
                type="number"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-brand-900">End time (s)</span>
              <input
                name="endTime"
                type="number"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
              />
            </label>
          </div>

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
              onClick={updateClip}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={isDeleting} title="Delete clip" onClose={() => setIsDeleting(false)}>
        <div className="space-y-4">
          <p className="text-sm text-brand-700">Are you sure you want to delete this clip? This action cannot be undone.</p>
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
                deleteClip();
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

export default ClipCard;
