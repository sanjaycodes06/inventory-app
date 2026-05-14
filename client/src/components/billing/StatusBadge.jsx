import Badge from "../ui/Badge.jsx";

const variantFor = (status) => {
  const s = String(status ?? "").toLowerCase();
  if (s === "paid" || s === "completed") return "success";
  if (s === "pending" || s === "sent") return "warning";
  if (s === "overdue" || s === "void") return "danger";
  return "default";
};

export default function StatusBadge({ status }) {
  return <Badge variant={variantFor(status)}>{status ?? "—"}</Badge>;
}
