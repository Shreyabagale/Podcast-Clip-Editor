import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function CreateClip() {
  const [podcastId, setPodcastId] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { addToast } = useToast();
  const [error, setError] = useState("");

  const convertToSeconds = (time) => {
    const parts = time.split(":");
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  };

  const handleCreateClip = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const startSeconds = convertToSeconds(startTime);
      const endSeconds = convertToSeconds(endTime);

      const res = await axios.post("http://localhost:5000/clip/create", {
        podcastId,
        title,
        startTime: startSeconds,
        endTime: endSeconds,
        caption,
        category,
      });

      const message = res.data || "Clip created successfully.";
      setMessage(message);
      addToast(message, "success");
      setPodcastId("");
      setTitle("");
      setStartTime("");
      setEndTime("");
      setCaption("");
      setCategory("");
    } catch (err) {
      const errMsg = "Error creating clip. Please check the values and try again.";
      setError(errMsg);
      addToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blush-200 bg-blush-50/90 p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-900">Create Clip</h1>
      <p className="mt-2 text-sm text-brand-700">Create a clip from a podcast by supplying the podcast ID and the time range.</p>

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

      <form className="mt-6 space-y-4" onSubmit={handleCreateClip}>
        <label className="block">
          <span className="text-sm font-medium text-brand-900">Podcast ID</span>
          <input
            required
            value={podcastId}
            onChange={(e) => setPodcastId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
            placeholder="Paste the podcast ID here"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-brand-900">Clip title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
            placeholder="Name your clip"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-brand-900">Start time (mm:ss)</span>
            <input
              required
              pattern="[0-9]+:[0-9]{2}"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="00:00"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-brand-900">End time (mm:ss)</span>
            <input
              required
              pattern="[0-9]+:[0-9]{2}"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="00:30"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-brand-900">Caption</span>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
            placeholder="Short caption for the clip"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-brand-900">Category</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
            placeholder="e.g. Highlights"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-blush-200"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create clip"}
        </button>
      </form>
    </div>
  );
}

export default CreateClip;
