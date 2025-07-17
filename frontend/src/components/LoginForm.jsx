import { useState } from "react";
import { loginUser } from "../utils/api";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-xl mb-4">Login</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <label className="block mb-2">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 w-full rounded bg-gray-700 text-white"
          required
        />
      </label>
      <label className="block mb-4">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full rounded bg-gray-700 text-white"
          required
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
