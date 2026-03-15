import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      if (res.data === "Login successful") {
        const storedUsername = email.includes("@") ? email.split("@")[0] : email;
        localStorage.setItem("username", storedUsername);
        addToast("Logged in successfully", "success");
        navigate("/dashboard");
      } else {
        setError(res.data || "Unexpected response from server.");
        addToast(res.data || "Unexpected response from server.", "error");
      }
    } catch (err) {
      setError("Unable to login. Please check your credentials and try again.");
      addToast("Unable to login. Please check your credentials and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (

<div className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-blush-200 bg-blush-50/90 p-8 shadow-lg backdrop-blur">
        <h2 className="text-2xl font-semibold text-brand-900">Welcome back</h2>
        <p className="mt-1 text-sm text-brand-700">Log in to manage your podcasts and clips.</p>

        {error && (
          <div className="mt-5 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <label className="block">
            <span className="text-sm font-medium text-brand-900">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-brand-900">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-blush-200"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-700">
          Don&apos;t have an account?{' '}
          <Link className="font-medium text-brand-600 hover:text-brand-700" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login