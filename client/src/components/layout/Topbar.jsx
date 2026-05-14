import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory",
  "/billing": "Billing",
};

function titleFromPath(pathname) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/inventory/")) return "Item details";
  if (pathname.startsWith("/billing/invoices/")) return "Invoice details";
  return "Overview";
}

export default function Topbar() {
  const { pathname } = useLocation();
  const title = titleFromPath(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-slate-950/75 px-6 backdrop-blur-xl">
      <div>
        <h1 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h1>
        <p className="text-xs text-slate-400">Manage stock, items, and billing in one place.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-block">
          Live
        </span>
      </div>
    </header>
  );
}
