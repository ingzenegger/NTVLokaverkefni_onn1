//custom hook for fetching a specific id array of meals, such as featured in home page and cookies in NotFound

import { useState, useEffect } from "react";

export function useMeals(url, ids) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ids.length) return;

    const controller = new AbortController();

    async function fetchAll() {
      try {
        const promises = ids.map((id) =>
          fetch(`${url}${id}`, { signal: controller.signal }).then((res) =>
            res.json(),
          ),
        );

        const results = await Promise.all(promises);

        //each promise returns a meals array that need to be joined to one list
        const combined = results.flatMap((result) => result.meals ?? []);
        setMeals(combined);
      } catch (err) {
        if (err.name !== "AbortError") setError("villa kom upp!");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, [url, ids]);
  return { meals, loading, error };
}
