const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400 hover:shadow-indigo-400/30",
  secondary:
    "border border-white/15 bg-white/5 text-slate-100 shadow-sm hover:border-white/25 hover:bg-white/10",
  ghost: "text-slate-300 hover:bg-white/10 hover:text-white",
  danger: "bg-red-600 text-white shadow-sm hover:bg-red-500",
};

export default function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  return (
    <button type={type} className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
