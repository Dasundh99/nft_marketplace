import React, { useState } from "react";

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="ml-5">
      <h1 className="text-2xl font-semibold mb-6">Notification Settings</h1>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-gray-800 p-4 rounded">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
        </div>

        <div className="flex items-center justify-between bg-gray-800 p-4 rounded">
          <span>SMS Notifications</span>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={smsNotifications}
            onChange={() => setSmsNotifications(!smsNotifications)}
          />
        </div>

        <div className="flex items-center justify-between bg-gray-800 p-4 rounded">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
          />
        </div>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => alert("Settings saved")}
      >
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;
