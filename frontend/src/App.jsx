import { useState, useEffect } from "react";
import SetList from "./components/SetList";
import AddSong from "./components/AddSong";
import MenuBar from "./components/MenuBar";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import Home from "./components/Home"; // <-- import Home view

export default function App() {
  const [view, setView] = useState("home");  // default to "home"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setView("home");
    setShowLogin(false);
  };

  const handleSongAdded = () => {
    setView("sets");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4">
        {!showLogin ? (
          <div
            className="w-48 h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-full animate-pulse cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => setShowLogin(true)}
            title="Click to log in"
          />
        ) : (
          <div className="w-full max-w-sm transition-opacity duration-500 animate-fade-in">
            <LoginForm onLogin={handleLogin} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <MenuBar view={view} setView={setView} onLogout={handleLogout} />
        <div className="w-full bg-gray-800 shadow-md rounded-lg p-6 mt-6">
          {view === "home" && <Home />}
          {view === "sets" && <SetList />}
          {view === "add-song" && <AddSong onSongAdded={handleSongAdded} />}
          {/* You can add other views like "songs", "sessions" here as you build them */}
        </div>
      </div>
    </div>
  );
}
