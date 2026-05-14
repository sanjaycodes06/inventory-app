import Input from "../ui/Input.jsx";

export default function FilterBar({ onChange }) {
  return (
    <div className="relative max-w-md">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500" aria-hidden>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <Input
        className="pl-10"
        placeholder="Search by name or SKU…"
        onChange={(e) => onChange?.(e.target.value)}
        aria-label="Search inventory"
      />
    </div>
  );
}
