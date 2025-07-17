import { useState } from "react";
import { addSong } from "../utils/api";

export default function AddSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [length, setLength] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong({ title, artist, length })
      .then(() => {
        setTitle("");
        setArtist("");
        setLength("");
      })
      .catch((err) => {
        console.error("Error adding song:", err);
        alert("Failed to add song");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <h2 className="text-xl font-bold">Add New Song</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        required
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        required
      />
      <input
        type="text"
        placeholder="Approximate Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
      >
        Add Song
      </button>
    </form>
  );
}
