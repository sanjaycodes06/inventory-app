import Badge from "../ui/Badge.jsx";

export default function StockBadge({ quantity, threshold = 5 }) {
  const low = Number(quantity) <= threshold;
  return (
    <Badge variant={low ? "warning" : "success"}>{low ? "Low stock" : "In stock"}</Badge>
  );
}
