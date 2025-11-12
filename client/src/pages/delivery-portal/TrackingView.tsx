import React, { useState } from "react";

interface TrackingEvent {
  StatusDescription: string;
  Date: string;
  Details?: string;
}

const TrackingView: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("dhl");
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTracking = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a valid tracking number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/track/${carrier}/${trackingNumber.trim()}`
      );
      if (!res.ok) throw new Error("Failed to fetch tracking data");
      const data = await res.json();
      const item = data.data?.items?.[0];
      setStatus(item?.status || "Unknown");
      setEvents(item?.origin_info?.trackinfo || []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch tracking data");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTrackingNumber("");
    setCarrier("dhl");
    setEvents([]);
    setStatus("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 text-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-5 text-white">
            <h1 className="text-3xl font-bold">Package Tracker</h1>
            <p className="text-blue-200 mt-1">Track your shipment in real-time</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Tracking Number</label>
              <input
                type="text"
                placeholder="Enter your tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Carrier</label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="dhl">DHL</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
                <option value="usps">USPS</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={fetchTracking}
                disabled={loading || !trackingNumber.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Track Package"
                )}
              </button>
              {(trackingNumber || status) && (
                <button
                  onClick={clearForm}
                  disabled={loading}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-gray-200 font-medium py-3 rounded-lg transition"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-800 border border-red-700 rounded-lg p-4 text-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          {status && (
            <div className="px-6 pb-6">
              <div className="bg-green-800 border border-green-700 rounded-lg p-4 mb-6 text-green-100">
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="mr-2">✅</span>
                  Current Status: {status}
                </h3>
                {events.length > 0 && (
                  <p className="text-green-200 text-sm mt-1">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                )}
              </div>

              {events.length > 0 ? (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                  <ul className="space-y-6">
                    {events.slice().reverse().map((event, index) => (
                      <li key={index} className="relative flex">
                        <div className="absolute left-4 top-2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-gray-900 shadow-md"></div>
                        <div className="ml-8 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-sm w-full">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-100">
                              {event.StatusDescription}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(event.Date).toLocaleDateString()}
                            </span>
                          </div>
                          {event.Details && (
                            <p className="text-sm text-gray-300 mt-1">{event.Details}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No tracking events available yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingView;
