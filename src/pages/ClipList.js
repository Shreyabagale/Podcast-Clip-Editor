import { useEffect, useState } from "react";
import axios from "axios";
import ClipCard from "../components/ClipCard";

function ClipList() {
  const [clips, setClips] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClips = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/clip/all");
      setClips(res.data);
    } catch (err) {
      setError("Unable to load clips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredClips = clips.filter((c) => {
    const target = `${c.title} ${c.description}`.toLowerCase();
    return target.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-blush-200 bg-blush-50/90 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-brand-900">Clips</h1>
            <p className="mt-2 text-sm text-brand-700">
              View and manage your created clips. Edit or delete them as needed.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clips..."
                className="w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500 sm:w-80"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-400">
                🔍
              </span>
            </label>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="rounded-2xl border border-dashed border-blush-200 bg-blush-50/90 p-10 text-center text-brand-500 shadow-sm">
          Loading clips...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700 shadow-sm">
          {error}
        </div>
      ) : filteredClips.length === 0 ? (
        <div className="rounded-2xl border border-blush-200 bg-blush-50/90 p-10 text-center text-brand-500 shadow-sm">
          {search
            ? "No clips match your search. Try changing the keywords."
            : "No clips found. Create a new clip from the dashboard."}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredClips.map((clip) => (
            <ClipCard key={clip._id} clip={clip} refresh={fetchClips} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ClipList;
