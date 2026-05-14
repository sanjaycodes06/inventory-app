import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper.jsx";
import StockBadge from "../components/inventory/StockBadge.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { fetchItem } from "../api/items.js";
import { HARDWARE_FAMILY_OPTIONS } from "../constants/hardware.js";

function familyLabel(value) {
  return HARDWARE_FAMILY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export default function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) {
        setItem(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const data = await fetchItem(id);
        if (!cancelled) setItem(data);
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || e.message || "Failed to load item");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <p className="text-sm text-slate-400">Loading item…</p>
      </PageWrapper>
    );
  }

  if (error || !item) {
    return (
      <PageWrapper>
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">{error || "Item not found."}</div>
        <Link to="/inventory" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
          ← Back to inventory
        </Link>
      </PageWrapper>
    );
  }

  const qty = item.quantity ?? 0;
  const threshold = item.lowStockThreshold ?? 5;

  return (
    <PageWrapper>
      <div className="mb-6">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
        >
          ← Back to inventory
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 shadow-xl shadow-black/30 backdrop-blur-sm lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Item</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-white">{item.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.hardwareFamily ? <Badge variant="info">{familyLabel(item.hardwareFamily)}</Badge> : null}
                {item.category?.name ? (
                  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300">
                    {item.category.name}
                  </span>
                ) : null}
              </div>
            </div>
            <StockBadge quantity={qty} threshold={threshold} />
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-slate-500">SKU</dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-slate-100">{item.sku || "—"}</dd>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-slate-500">MPN</dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-slate-100">{item.manufacturerPartNumber || "—"}</dd>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-slate-500">Brand / model</dt>
              <dd className="mt-1 text-sm font-medium text-slate-200">
                {[item.brand, item.model].filter(Boolean).join(" · ") || "—"}
              </dd>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-slate-500">Unit</dt>
              <dd className="mt-1 text-sm font-medium text-slate-200">{item.unit || "ea"}</dd>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-slate-500">On hand</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-white">{qty}</dd>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-slate-500">Storage location</dt>
              <dd className="mt-1 text-sm font-medium text-slate-200">{item.storageLocation || "—"}</dd>
            </div>
          </dl>

          {item.description ? (
            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-sm font-semibold text-white">Description</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ) : null}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-lg shadow-black/25 backdrop-blur-sm">
            <h3 className="font-display text-sm font-semibold text-white">Actions</h3>
            <div className="mt-4 flex flex-col gap-2">
              <Button type="button" variant="secondary" className="w-full justify-center" disabled>
                Adjust stock (soon)
              </Button>
              <Button type="button" variant="ghost" className="w-full justify-center" disabled>
                Print label (soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
