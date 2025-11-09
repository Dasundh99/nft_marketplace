import React, { useState } from "react";
import axios from "axios";

export const DHLTrackingForm: React.FC<{ orderId: string }> = ({ orderId }) => {
  const [status, setStatus] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);

  const track = async () => {
    const res = await axios.get(`http://localhost:5000/api/order/track/${orderId}`);
    setStatus(res.data.orderStatus);
    setTrackingData(res.data.tracking);
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Track Delivery</h2>
      <p className="text-gray-500 mb-2">Order: {orderId}</p>
      <button onClick={track} className="bg-yellow-600 text-white px-4 py-2 rounded mb-3">Check Status</button>
      {status && <p>Status: <span className="font-semibold">{status}</span></p>}
      {trackingData && <pre className="text-xs bg-gray-50 p-2 mt-2 overflow-auto">{JSON.stringify(trackingData, null, 2)}</pre>}
    </div>
  );
};
