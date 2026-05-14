import PageWrapper from "../components/layout/PageWrapper.jsx";
import InvoiceForm from "../components/billing/InvoiceForm.jsx";
import InvoiceTable from "../components/billing/InvoiceTable.jsx";

const demoInvoices = [
  { id: "a1", number: "INV-1042", customer: "Acme Co.", status: "Paid", total: 1820.5 },
  { id: "a2", number: "INV-1043", customer: "Northwind", status: "Pending", total: 640 },
  { id: "a3", number: "INV-1044", customer: "Globex", status: "Overdue", total: 210.25 },
];

export default function BillingPage() {
  return (
    <PageWrapper
      title="Billing"
      description="Track invoices, statuses, and totals. Demo data below — replace with API responses."
    >
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-slate-300">Recent invoices</h3>
          <InvoiceTable invoices={demoInvoices} />
        </div>
        <div>
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 shadow-lg shadow-black/20 backdrop-blur-sm">
            <h3 className="font-display text-base font-semibold text-white">New invoice</h3>
            <p className="mt-1 text-sm text-slate-400">Create a draft and send it when ready.</p>
            <div className="mt-6">
              <InvoiceForm
                onSubmit={() => {
                  /* hook to API */
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
