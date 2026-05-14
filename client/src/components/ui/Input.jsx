const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 shadow-inner shadow-black/20 placeholder:text-slate-500 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 disabled:cursor-not-allowed disabled:bg-white/[0.03]";

export default function Input({ className = "", ...props }) {
  return <input className={`${inputClass} ${className}`} {...props} />;
}
