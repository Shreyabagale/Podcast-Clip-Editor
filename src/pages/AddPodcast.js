import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function AddPodcast() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddPodcast = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post("http://localhost:5000/podcast/add", {
        title,
        description,
        category,
        fileUrl,
        userId,
      });

      const message = res.data || "Podcast added successfully.";
      setMessage(message);
      addToast(message, "success");
      setTitle("");
      setDescription("");
      setCategory("");
      setFileUrl("");
    } catch (err) {
      const errMsg = "There was a problem adding the podcast. Please try again.";
      setError(errMsg);
      addToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blush-200 bg-blush-50/90 p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-900">Add Podcast</h1>
      <p className="mt-2 text-sm text-brand-700">Share a new podcast by pasting a YouTube link and filling in the details.</p>

      {message && (
        <div className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleAddPodcast}>
        <label className="block">
          <span className="text-sm font-medium text-brand-900">Podcast Title</span>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
            placeholder="Your episode name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-brand-900">Description</span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
            placeholder="A brief description of the episode"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-brand-900">Category</span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="e.g. Technology, Health"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brand-900">YouTube URL</span>
            <input
              required
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-blush-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Podcast"}
        </button>
      </form>
    </div>
  );
}

export default AddPodcast;
