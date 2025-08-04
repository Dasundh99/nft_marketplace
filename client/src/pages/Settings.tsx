import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <aside className="w-64 bg-[#121212] p-4 flex flex-col justify-start">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            `block mt-2 w-full text-xs px-2 py-1 rounded ${
              isActive ? "bg-gray-600" : "bg-black"
            }`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="notificationSettings"
          className={({ isActive }) =>
            `block mt-2 w-full text-xs px-2 py-1 rounded ${
              isActive ? "bg-gray-600" : "bg-black"
            }`
          }
        >
          Notifications
        </NavLink>
      </aside>

      <main className="flex-1 bg-black text-white p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Settings;
