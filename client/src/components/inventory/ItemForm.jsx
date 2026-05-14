import { useState } from "react";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Textarea from "../ui/Textarea.jsx";
import { HARDWARE_FAMILY_OPTIONS, ITEM_TYPE_OPTIONS, UNIT_OPTIONS } from "../../constants/hardware.js";

function formDataToPayload(form) {
  const fd = new FormData(form);
  const o = {};
  for (const [k, v] of fd.entries()) {
    if (v === "") continue;
    o[k] = v;
  }
  if (o.quantity !== undefined) o.quantity = Number(o.quantity);
  if (o.lowStockThreshold !== undefined) o.lowStockThreshold = Number(o.lowStockThreshold);
  return o;
}

export default function ItemForm({ categories = [], onSubmit, onCancel, onAddCategory, submitLabel = "Save item" }) {
  const [newCategory, setNewCategory] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [catError, setCatError] = useState("");

  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const payload = formDataToPayload(e.currentTarget);
        await onSubmit?.(payload);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="item-name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Item name <span className="text-red-500">*</span>
          </label>
          <Input id="item-name" name="name" required placeholder="e.g. M12 hex bolt, zinc plated" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="item-sku" className="mb-1.5 block text-sm font-medium text-slate-300">
            SKU / internal code
          </label>
          <Input id="item-sku" name="sku" placeholder="e.g. HW-BOLT-M12-50" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="item-mpn" className="mb-1.5 block text-sm font-medium text-slate-300">
            Manufacturer part # (MPN)
          </label>
          <Input id="item-mpn" name="manufacturerPartNumber" placeholder="OEM catalog number" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="item-brand" className="mb-1.5 block text-sm font-medium text-slate-300">
            Brand
          </label>
          <Input id="item-brand" name="brand" placeholder="e.g. DeWalt, Schneider" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="item-model" className="mb-1.5 block text-sm font-medium text-slate-300">
            Model / series
          </label>
          <Input id="item-model" name="model" placeholder="Model name or range" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="item-type" className="mb-1.5 block text-sm font-medium text-slate-300">
            Item type
          </label>
          <Select id="item-type" name="itemType" defaultValue="hardware">
            {ITEM_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="item-family" className="mb-1.5 block text-sm font-medium text-slate-300">
            Hardware family
          </label>
          <Select id="item-family" name="hardwareFamily" defaultValue="other">
            {HARDWARE_FAMILY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="item-category" className="mb-1.5 block text-sm font-medium text-slate-300">
            Category
          </label>
          <Select id="item-category" name="category" defaultValue="">
            <option value="">Uncategorized</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">New category</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Fasteners — metric"
              aria-label="New category name"
            />
            <Button
              type="button"
              variant="secondary"
              disabled={addingCat || !newCategory.trim() || !onAddCategory}
              onClick={async () => {
                setCatError("");
                setAddingCat(true);
                try {
                  await onAddCategory(newCategory.trim());
                  setNewCategory("");
                } catch (err) {
                  setCatError(err.response?.data?.message || err.message || "Could not add category");
                } finally {
                  setAddingCat(false);
                }
              }}
            >
              {addingCat ? "Saving…" : "Add category"}
            </Button>
          </div>
          {catError ? <p className="mt-2 text-xs text-red-400">{catError}</p> : null}
        </div>
        <div>
          <label htmlFor="item-qty" className="mb-1.5 block text-sm font-medium text-slate-300">
            Quantity on hand
          </label>
          <Input id="item-qty" name="quantity" type="number" min={0} step={1} defaultValue={0} />
        </div>
        <div>
          <label htmlFor="item-threshold" className="mb-1.5 block text-sm font-medium text-slate-300">
            Low-stock threshold
          </label>
          <Input id="item-threshold" name="lowStockThreshold" type="number" min={0} step={1} defaultValue={5} />
        </div>
        <div>
          <label htmlFor="item-unit" className="mb-1.5 block text-sm font-medium text-slate-300">
            Unit of measure
          </label>
          <Select id="item-unit" name="unit" defaultValue="ea">
            {UNIT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="item-location" className="mb-1.5 block text-sm font-medium text-slate-300">
            Storage location
          </label>
          <Input id="item-location" name="storageLocation" placeholder="Bin, aisle, shelf" autoComplete="off" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="item-desc" className="mb-1.5 block text-sm font-medium text-slate-300">
            Description & specs
          </label>
          <Textarea
            id="item-desc"
            name="description"
            rows={3}
            placeholder="Thread size, voltage, material, length, thread pitch, compatible tools…"
          />
        </div>
      </div>
      {onCancel ? (
        <div className="flex flex-wrap justify-end gap-2 border-t border-white/10 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="reset" variant="ghost">
            Reset form
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-end gap-2 border-t border-white/10 pt-4">
          <Button type="reset" variant="secondary">
            Reset
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      )}
    </form>
  );
}
