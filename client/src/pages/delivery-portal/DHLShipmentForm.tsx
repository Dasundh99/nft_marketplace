import React, { useState } from "react";
import axios from "axios";

export const DHLShipmentForm: React.FC<{ orderId: string; onShipped: (t: string) => void }> = ({ orderId, onShipped }) => {
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [weight, setWeight] = useState("");

  const createShipment = async () => {
    const body = {
      orderId,
      receiverAddress: { name, postalCode, cityName, countryCode },
      packageWeight: Number(weight)
    };
    const res = await axios.post("http://localhost:5000/api/order/create-shipment", body);
    alert("Shipment created 📦");
    onShipped(res.data.shipment.shipmentTrackingNumber);
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Create DHL Shipment</h2>
      <p className="text-gray-500 mb-2">Order: {orderId || "(confirm payment first)"}</p>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Receiver Name" className="border p-2 w-full mb-2" />
      <input value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="Postal Code" className="border p-2 w-full mb-2" />
      <input value={cityName} onChange={e => setCityName(e.target.value)} placeholder="City" className="border p-2 w-full mb-2" />
      <input value={countryCode} onChange={e => setCountryCode(e.target.value)} placeholder="Country Code (e.g., US)" className="border p-2 w-full mb-2" />
      <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" className="border p-2 w-full mb-3" />
      <button onClick={createShipment} className="bg-green-600 text-white px-4 py-2 rounded">Create Shipment</button>
    </div>
  );
};
