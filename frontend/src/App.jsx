import { useState, useEffect } from "react";
import SetList from "./components/SetList";
import AddSong from "./components/AddSong";
import MenuBar from "./components/MenuBar";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  const [view, setView] = useState("sets");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView("sets");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setView("sets");
  };

  const handleSongAdded = () => {
    setView("sets");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between px-4 py-10">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <MenuBar view={view} setView={setView} />

        <div className="w-full bg-gray-800 shadow-md rounded-lg p-6 mt-6">
          {view === "sets" && (
            <>
              <h1 className="text-3xl font-bold mb-4 text-center">
                Open Mic Helper 🎤
              </h1>
              <SetList />
            </>
          )}
          {view === "add-song" && <AddSong onSongAdded={handleSongAdded} />}
        </div>
      </div>

      {/* Logout button stuck to bottom */}
      <div className="w-full max-w-3xl mx-auto mt-6">
        <LogoutButton onLogout={handleLogout} />
      </div>
    </div>
  );
}
