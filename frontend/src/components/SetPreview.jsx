import { useEffect, useState } from "react";
import { fetchSets } from "../utils/api";

export default function SetPreview() {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSets() {
      try {
        const response = await fetchSets();
        const allSets = response.data;
        // Assuming sets have a created_at field to sort by
        const recentSets = allSets
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setSets(recentSets);
      } catch {
        setError("Failed to load sets.");
      } finally {
        setLoading(false);
      }
    }
    loadSets();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Recently Added Sets</h2>

      {loading && <p className="text-gray-300">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && sets.length === 0 && (
        <p className="text-gray-300">No sets found.</p>
      )}

      {!loading && !error && sets.length > 0 && (
        <ul className="list-disc list-inside text-gray-200">
          {sets.map(({ id, name, description }) => (
            <li key={id}>
              <strong>{name}</strong>
              {description && ` — ${description}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
