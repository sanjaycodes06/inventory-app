import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper.jsx";

function StatCard({ label, value, hint, trend }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 shadow-lg shadow-black/20 backdrop-blur-sm">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {trend ? (
        <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
          {trend}
        </p>
      ) : null}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PageWrapper
      description="Snapshot of inventory health and billing activity. Connect your API to drive these metrics live."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="SKU count" value="128" hint="Across 12 categories" trend="+4 this week" />
        <StatCard label="Low-stock items" value="7" hint="Below reorder threshold" />
        <StatCard label="Open invoices" value="0"int="Awaiting payment" />
        <StatCard label="Revenue (30d)" value="$0" hint="Posted + draft" trend="On track" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 shadow-lg shadow-black/20 backdrop-blur-sm lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white">Activity</h3>
          <p className="mt-1 text-sm text-slate-400">Recent stock movements and invoice events will appear here.</p>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="flex gap-3 border-l-2 border-indigo-400 pl-4">
              <span className="font-medium text-white">Restock</span>
              <span className="text-slate-500">Warehouse A · +120 units</span>
            </li>
            <li className="flex gap-3 border-l-2 border-white/15 pl-4">
              <span className="font-medium text-white">Invoice #1042</span>
              <span className="text-slate-500">Sent to Acme Co.</span>
            </li>
            <li className="flex gap-3 border-l-2 border-white/15 pl-4">
              <span className="font-medium text-white">Low stock</span>
              <span className="text-slate-500">SKU BR-09 below threshold</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm">
          <h3 className="font-display text-base font-semibold text-white">Quick actions</h3>
          <p className="mt-1 text-sm text-slate-400">Shortcuts for daily operations.</p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <Link
              className="rounded-lg border border-indigo-500/30 bg-indigo-500/15 px-3 py-2 font-medium text-indigo-200 shadow-sm hover:border-indigo-400/50 hover:bg-indigo-500/25"
              to="/inventory"
            >
              Add inventory
            </Link>
            <Link
              className="rounded-lg border border-transparent px-3 py-2 font-medium text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              to="/billing"
            >
              New invoice
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
