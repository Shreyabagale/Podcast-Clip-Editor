import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function Dashboard() {
  const username = localStorage.getItem("username") || "";
  const targetText = useMemo(
    () => `Hello${username ? `, ${username}` : ""}`,
    [username]
  );

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText("");
    let index = 0;

    const interval = setInterval(() => {
      const nextChar = targetText[index] ?? "";
      setDisplayText((prev) => prev + nextChar);
      index += 1;

      if (index >= targetText.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [targetText]);

  const items = [
    {
      label: "Podcasts",
      description: "Browse, edit, and remove your saved podcasts.",
      to: "/podcasts",
    },
    {
      label: "Add Podcast",
      description: "Add a new podcast from a YouTube link.",
      to: "/addpodcast",
    },
    {
      label: "Create Clip",
      description: "Create a highlight clip from an existing podcast.",
      to: "/createclip",
    },
    {
      label: "Clips",
      description: "View, edit, and delete your saved clips.",
      to: "/clips",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-blush-200 bg-blush-50/90 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-brand-900">
          {displayText}
          <span className="wave inline-block"> 👋</span>
        </h1>
        <p className="mt-2 text-sm text-brand-700">
          Get started by choosing where you want to go next. Your work is saved automatically.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-2xl border border-blush-200 bg-blush-50/90 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-blush-100 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-brand-900">{item.label}</h2>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                →
              </span>
            </div>
            <p className="mt-3 text-sm text-brand-700">{item.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-600">
              Go to {item.label}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
