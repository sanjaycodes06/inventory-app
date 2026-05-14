import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper.jsx";
import StatusBadge from "../components/billing/StatusBadge.jsx";
import Button from "../components/ui/Button.jsx";

export default function InvoiceDetailPage() {
  const { id } = useParams();

  return (
    <PageWrapper>
      <div className="mb-6">
        <Link
          to="/billing"
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
        >
          ← Back to billing
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-xl shadow-black/30 backdrop-blur-sm">
        <div className="border-b border-white/10 bg-white/[0.04] px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Invoice</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-white">#{id}</h2>
            </div>
            <StatusBadge status="Pending" />
          </div>
        </div>
        <div className="grid gap-8 px-8 py-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-white">Bill to</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Customer name and address will render here once connected to your billing service.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Line items</h3>
            <p className="mt-2 text-sm text-slate-400">Line item table placeholder.</p>
            <div className="mt-4 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6 text-center text-sm text-slate-500">
              No line items loaded
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 bg-black/20 px-8 py-4">
          <Button type="button" variant="secondary">
            Download PDF
          </Button>
          <Button type="button">Record payment</Button>
        </div>
      </div>
    </PageWrapper>
  );
}
