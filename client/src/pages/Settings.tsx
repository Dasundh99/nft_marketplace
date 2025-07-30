import React, { useState } from "react";

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="ml-25 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Appearance</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Enable Dark Mode
          </label>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Receive email alerts
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
