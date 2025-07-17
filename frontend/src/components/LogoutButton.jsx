export default function LogoutButton({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      // className="mt-6 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
       className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
    >
      Logout
    </button>
  );
}
