import { Link } from "react-router-dom";
import Table from "../ui/Table.jsx";
import StatusBadge from "./StatusBadge.jsx";

export default function InvoiceTable({ invoices = [] }) {
  const columns = [
    { key: "number", label: "Invoice #" },
    { key: "customer", label: "Customer" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total" },
    { key: "actions", label: "" },
  ];
  const rows = invoices.map((inv, i) => ({
    id: inv.id ?? inv._id ?? i,
    number: (
      <Link className="font-medium text-indigo-400 hover:text-indigo-300" to={`/billing/invoices/${inv.id ?? inv._id ?? i}`}>
        {inv.number ?? `#${1000 + i}`}
      </Link>
    ),
    customer: inv.customer ?? "—",
    status: <StatusBadge status={inv.status ?? "Draft"} />,
    total: typeof inv.total === "number" ? `$${inv.total.toFixed(2)}` : inv.total ?? "—",
    actions: (
      <Link
        to={`/billing/invoices/${inv.id ?? inv._id ?? i}`}
        className="text-sm font-semibold text-slate-400 hover:text-indigo-300"
      >
        View →
      </Link>
    ),
  }));
  return <Table columns={columns} rows={rows} />;
}
