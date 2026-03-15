import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import PodcastList from "./pages/PodcastList";
import AddPodcast from "./pages/AddPodcast";
import CreateClip from "./pages/CreateClip";
import ClipList from "./pages/ClipList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-400 to-blush-50 text-brand-900 dark:from-brand-900 dark:via-brand-700 dark:to-brand-900 dark:text-blush-50">
        <BrowserRouter>
          <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((v) => !v)} />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              {/* Default page */}
              <Route path="/" element={<Login />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/podcasts" element={<PodcastList />} />

              <Route path="/addpodcast" element={<AddPodcast />} />

              <Route path="/createclip" element={<CreateClip />} />

              <Route path="/clips" element={<ClipList />} />
            </Routes>
          </main>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}

export default App;