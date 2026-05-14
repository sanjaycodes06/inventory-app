const styles = {
  default: "border-white/15 bg-white/10 text-slate-300",
  success: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  warning: "border-amber-500/35 bg-amber-500/15 text-amber-200",
  danger: "border-red-500/35 bg-red-500/15 text-red-300",
  info: "border-indigo-400/35 bg-indigo-500/15 text-indigo-200",
};

export default function Badge({ children, variant = "default", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${styles[variant] ?? styles.default} ${className}`}
    >
      {children}
    </span>
  );
}
