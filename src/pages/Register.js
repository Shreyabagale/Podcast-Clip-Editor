import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
      });

      addToast("Registration successful! Please log in.", "success");
      navigate("/login");
    } catch (err) {
      console.error(err?.response || err);
      setError("Unable to register. Please check your details and try again.");
      addToast("Unable to register. Please check your details and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-blush-200 bg-blush-50/90 p-8 shadow-lg backdrop-blur">
        <h2 className="text-2xl font-semibold text-brand-900">Create an account</h2>
        <p className="mt-1 text-sm text-brand-700">Get started with managing your podcasts and clips.</p>

        {error && (
          <div className="mt-5 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <label className="block">
            <span className="text-sm font-medium text-brand-900">Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-blush-200 bg-blush-50 px-4 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500"
              placeholder="Your name"
            />
          </label>

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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-700">
          Already have an account?{' '}
          <Link className="font-medium text-brand-600 hover:text-brand-700" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;