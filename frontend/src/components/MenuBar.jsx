import LogoutButton from "./LogoutButton"; // Adjust the path if your LogoutButton is in a different folder

export default function MenuBar({ view, setView, onLogout }) {
  const buttons = [
    { label: "Home", view: "home" },
    { label: "Songs", view: "add-song" },
    { label: "Sets", view: "sets" },
    { label: "Sessions", view: "sessions" },
  ];

  return (
    <div className="w-full flex justify-between items-center bg-gray-800 text-gray-100 px-4 py-3 rounded-lg shadow-md">
      <div className="flex gap-4">
        {buttons.map(({ label, view: targetView }) => (
          <button
            key={label}
            onClick={() => setView(targetView)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              view === targetView
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <LogoutButton onLogout={onLogout} />
    </div>
  );
}
