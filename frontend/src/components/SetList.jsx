import { useEffect, useState } from "react";
import { fetchSets } from "../utils/api";

export default function SetList() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetchSets()
      .then((response) => setSets(response.data))
      .catch((error) => console.error("Failed to fetch sets:", error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Sets</h2>
      {sets.length === 0 ? (
        <p>No sets found.</p>
      ) : (
        <ul>
          {sets.map((set) => (
            <li key={set.id}>
              <strong>{set.name}</strong>
              {set.songs && set.songs.length > 0 && (
                <ul className="pl-4">
                  {set.songs.map((song) => (
                    <li key={song.id}>
                      🎵 {song.title} by {song.artist}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
