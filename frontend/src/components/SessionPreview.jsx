import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function SessionPreview() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const response = await axiosInstance.get("/sessions/");
        const allSessions = response.data;
        const recentSessions = allSessions
          .sort((a, b) => {
            if (a.date && b.date) {
              return new Date(b.date) - new Date(a.date);
            }
            return b.id - a.id;
          })
          .slice(0, 5);
        setSessions(recentSessions);
      } catch {
        // Fail silently: just set sessions to empty
        setSessions([]);
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Recently Added Sessions</h2>

      {loading && <p className="text-gray-300">Loading...</p>}

      {!loading && sessions.length === 0 && (
        <p className="text-gray-300">No sessions found.</p>
      )}

      {!loading && sessions.length > 0 && (
        <ul className="list-disc list-inside text-gray-200">
          {sessions.map(({ id, name, date, description }) => (
            <li key={id}>
              <strong>{name}</strong>
              {date && ` — ${new Date(date).toLocaleDateString()}`}
              {description && ` — ${description}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
