import { useEffect, useState } from "react";
import { fetchSongs } from "../utils/api";

export default function SongPreview() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSongs() {
      try {
        const response = await fetchSongs();
        const allSongs = response.data; // extract data from Axios response
        const recentSongs = allSongs
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setSongs(recentSongs);
      } catch {
        setError("Failed to load songs.");
      } finally {
        setLoading(false);
      }
    }
    loadSongs();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Recently Added Songs</h2>

      {loading && <p className="text-gray-300">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && songs.length === 0 && (
        <p className="text-gray-300">No songs found.</p>
      )}

      {!loading && !error && songs.length > 0 && (
        <ul className="list-disc list-inside text-gray-200">
          {songs.map(({ id, title, artist }) => (
            <li key={id}>
              <strong>{title}</strong> by {artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
