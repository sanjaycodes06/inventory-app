import Button from "./Button.jsx";

export default function Modal({ open, title, children, onClose, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        aria-label="Close dialog overlay"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl ${wide ? "max-w-3xl" : "max-w-lg"}`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          <Button type="button" variant="ghost" className="!px-2 !py-1 text-slate-400" aria-label="Close" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="text-sm text-slate-400">{children}</div>
      </div>
    </div>
  );
}
