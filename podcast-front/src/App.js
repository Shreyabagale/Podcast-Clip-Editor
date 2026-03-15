import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import PodcastList from "./pages/PodcastList";
import AddPodcast from "./pages/AddPodcast";
import CreateClip from "./pages/CreateClip";
import ClipList from "./pages/ClipList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViralReels from "./pages/ViralReels"


import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

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

        <Route path="/viral" element={<ViralReels/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;