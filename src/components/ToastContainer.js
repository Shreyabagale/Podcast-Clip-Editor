import { useToast } from "../context/ToastContext";

const variants = {
  info: "bg-brand-500 text-white",
  success: "bg-peach-500 text-white",
  error: "bg-rose-500 text-white",
  warning: "bg-blush-400 text-brand-900",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur ${variants[toast.type] || variants.info}`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-relaxed">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="rounded-lg p-1 text-white/60 transition hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
