function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/40 px-4 py-6">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-blush-50 shadow-xl">
        <header className="flex items-center justify-between border-b border-blush-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-blush-100"
          >
            Close
          </button>
        </header>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
