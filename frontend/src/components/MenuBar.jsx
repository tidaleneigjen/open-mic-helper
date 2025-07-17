// components/MenuBar.jsx
export default function MenuBar({ view, setView }) {
  return (
    <nav className="w-full flex justify-center space-x-6 bg-gray-800 p-4 rounded-md shadow-md text-gray-100">
      <button
        onClick={() => setView("sets")}
        className={`px-4 py-2 rounded-md font-semibold transition ${
          view === "sets" ? "bg-indigo-600" : "hover:bg-indigo-700"
        }`}
      >
        Sets
      </button>
      <button
        onClick={() => setView("add-song")}
        className={`px-4 py-2 rounded-md font-semibold transition ${
          view === "add-song" ? "bg-indigo-600" : "hover:bg-indigo-700"
        }`}
      >
        Add Song
      </button>
    </nav>
  );
}
