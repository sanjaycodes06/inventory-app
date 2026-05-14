import { Link } from "react-router-dom";
import StockBadge from "./StockBadge.jsx";
import Badge from "../ui/Badge.jsx";
import { HARDWARE_FAMILY_OPTIONS } from "../../constants/hardware.js";

function familyLabel(value) {
  return HARDWARE_FAMILY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export default function ItemCard({ item }) {
  const id = item?._id ?? item?.id;
  const name = item?.name ?? "Unnamed item";
  const sku = item?.sku ?? "—";
  const qty = item?.quantity ?? 0;
  const threshold = item?.lowStockThreshold ?? 5;
  const brandModel = [item?.brand, item?.model].filter(Boolean).join(" · ");
  const mpn = item?.manufacturerPartNumber;
  const categoryName = item?.category?.name;

  return (
    <Link
      to={`/inventory/${id}`}
      className="group block rounded-xl border border-white/10 bg-slate-900/45 p-5 shadow-lg shadow-black/25 backdrop-blur-sm transition hover:border-indigo-500/35 hover:bg-slate-900/70 hover:shadow-indigo-500/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-white group-hover:text-indigo-200">{name}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">SKU {sku}</p>
          {brandModel ? <p className="mt-1 truncate text-xs text-slate-400">{brandModel}</p> : null}
          {mpn ? <p className="mt-0.5 text-xs text-slate-500">MPN {mpn}</p> : null}
        </div>
        <StockBadge quantity={qty} threshold={threshold} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item?.hardwareFamily ? <Badge variant="info">{familyLabel(item.hardwareFamily)}</Badge> : null}
        {categoryName ? (
          <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300">
            {categoryName}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-2xl font-semibold tabular-nums text-white">{qty}</p>
      <p className="text-xs text-slate-500">units on hand{item?.unit ? ` (${item.unit})` : ""}</p>
    </Link>
  );
}
