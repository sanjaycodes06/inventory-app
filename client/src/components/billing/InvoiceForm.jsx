import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function InvoiceForm({ onSubmit }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(new FormData(e.currentTarget));
      }}
    >
      <div>
        <label htmlFor="invoice-customer" className="mb-1.5 block text-sm font-medium text-slate-300">
          Customer
        </label>
        <Input id="invoice-customer" name="customer" placeholder="Company or contact name" autoComplete="off" />
      </div>
      <Button type="submit" className="w-full">
        Create invoice
      </Button>
    </form>
  );
}
