import { useEffect, useState } from "react";
import { listInvoices } from "../api/billing.api.js";

export function useBilling(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInvoices(params)
      .then((res) => {
        const payload = res.data?.data;
        if (!cancelled) setData(payload?.invoices ?? []);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}
