import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ darkMode, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/podcasts", label: "Podcasts" },
    { to: "/addpodcast", label: "Add Podcast" },
    { to: "/createclip", label: "Create Clip" },
    { to: "/clips", label: "Clips" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "bg-brand-500 text-white" : "text-brand-900 hover:bg-blush-100"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-blush-50/70 backdrop-blur shadow-sm border-b border-blush-200 dark:bg-slate-900/70 dark:border-slate-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white font-bold shadow">
            PC
          </div>
          <div>
            <div className="text-lg font-semibold text-brand-900 dark:text-white">Podcast Clip Editor</div>
            <div className="text-xs text-brand-700 dark:text-slate-400">Build clips from your favorite shows</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center rounded-lg border border-blush-200 bg-blush-50 px-3 py-2 text-sm font-medium text-brand-900 shadow-sm transition hover:bg-blush-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Toggle theme"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-peach-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-peach-600"
          >
            Logout
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-blush-200 bg-blush-50 p-2 text-brand-900 shadow-sm md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          aria-label="Open menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-blush-200 bg-blush-50/90 px-4 py-4 md:hidden dark:border-slate-700 dark:bg-slate-900/90">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onToggleTheme();
              }}
              className="rounded-lg border border-blush-200 bg-blush-50 px-4 py-2 text-left text-sm font-medium text-brand-900 shadow-sm transition hover:bg-blush-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {darkMode ? "Switch to Light" : "Switch to Dark"}
            </button>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setMobileOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="rounded-lg bg-peach-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-peach-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
