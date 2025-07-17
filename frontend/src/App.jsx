import { useState, useEffect, useRef } from "react";
import SetList from "./components/SetList";
import AddSong from "./components/AddSong";
import MenuBar from "./components/MenuBar";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  const [view, setView] = useState("sets");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ⬇️ Close login form when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };

    if (showLogin) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogin]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView("sets");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setView("sets");
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
          <div
            ref={formRef}
            className="w-full max-w-sm transition-opacity duration-500 animate-fade-in bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <LoginForm onLogin={handleLogin} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <MenuBar view={view} setView={setView} />
        <div className="w-full bg-gray-800 shadow-md rounded-lg p-6 mt-6">
          <LogoutButton onLogout={handleLogout} />
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
    </div>
  );
}
