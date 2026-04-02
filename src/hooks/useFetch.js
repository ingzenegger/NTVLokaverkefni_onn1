import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isCancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        const json = await response.json();
        if (!isCancelled) {
          setData(json);
        }
      } catch (err) {
        if (!isCancelled && err.name !== "AbortError") setError(err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [url]);
  return { data, loading, error };
}
