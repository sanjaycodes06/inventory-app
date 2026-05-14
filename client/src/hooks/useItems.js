import { useEffect, useState } from "react";
import { listItems } from "../api/items.api.js";

export function useItems(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listItems(params)
      .then((res) => {
        const payload = res.data?.data;
        if (!cancelled) setData(payload?.items ?? []);
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
