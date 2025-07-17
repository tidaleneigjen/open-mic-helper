export default function LogoutButton({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="mt-6 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
