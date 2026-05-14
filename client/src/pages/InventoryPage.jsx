import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper.jsx";
import FilterBar from "../components/inventory/FilterBar.jsx";
import ItemCard from "../components/inventory/ItemCard.jsx";
import ItemForm from "../components/inventory/ItemForm.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import { fetchItems, createItem } from "../api/items.js";
import { fetchCategories, createCategory } from "../api/categories.js";

export default function InventoryPage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const loadCategories = useCallback(async () => {
    try {
      const list = await fetchCategories();
      setCategories(Array.isArray(list) ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : []);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories, refreshTick]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchItems({ search: debouncedQ || undefined, limit: 100 });
        if (!cancelled) setItems(data.items ?? []);
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || e.message || "Failed to load items");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedQ, refreshTick]);

  const handleAddCategory = async (name) => {
    const cat = await createCategory(name);
    setCategories((prev) =>
      [...prev.filter((c) => String(c._id) !== String(cat._id)), cat].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleCreateItem = async (payload) => {
    setFormError("");
    await createItem(payload);
    setModalOpen(false);
    setRefreshTick((t) => t + 1);
  };

  return (
    <>
      <PageWrapper
        title="Hardware inventory"
        description="Add fasteners, tools, electrical, safety gear, and other SKUs with manufacturer data, locations, and stock rules."
        actions={
          <Button
            type="button"
            onClick={() => {
              setFormError("");
              setModalOpen(true);
            }}
          >
            Add item
          </Button>
        }
      >
        {error ? (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">{error}</div>
        ) : null}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar onChange={setQ} />
          <p className="text-sm text-slate-500">
            {loading ? (
              "Loading…"
            ) : (
              <>
                Showing <span className="font-semibold text-slate-200">{items.length}</span> items
              </>
            )}
          </p>
        </div>

        {!loading && items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center backdrop-blur-sm">
            <p className="font-medium text-white">No items yet</p>
            <p className="mt-1 text-sm text-slate-400">Create your first hardware SKU with SKU, MPN, and location.</p>
            <Button type="button" className="mt-6" onClick={() => setModalOpen(true)}>
              Add item
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </PageWrapper>

      <Modal
        open={modalOpen}
        wide
        title="Add hardware item"
        onClose={() => {
          setModalOpen(false);
          setFormError("");
        }}
      >
        {formError ? (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-950/50 px-3 py-2 text-sm text-red-200">{formError}</p>
        ) : null}
        <ItemForm
          categories={categories}
          onAddCategory={handleAddCategory}
          onCancel={() => {
            setModalOpen(false);
            setFormError("");
          }}
          submitLabel="Save to inventory"
          onSubmit={async (payload) => {
            try {
              await handleCreateItem(payload);
            } catch (e) {
              setFormError(e.response?.data?.message || e.message || "Could not save item");
            }
          }}
        />
      </Modal>
    </>
  );
}
