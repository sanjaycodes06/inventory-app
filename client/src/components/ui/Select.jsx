const selectClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 shadow-inner shadow-black/20 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 disabled:cursor-not-allowed disabled:bg-white/[0.03] [&>option]:bg-slate-900 [&>option]:text-slate-100";

export default function Select({ className = "", children, ...props }) {
  return (
    <select className={`${selectClass} ${className}`} {...props}>
      {children}
    </select>
  );
}
