import React, { useState } from "react";
import axios from "axios";

export const DHLWorkflow: React.FC = () => {
  // State
  const [orderId, setOrderId] = useState("");
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [item, setItem] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [packageWeight, setPackageWeight] = useState("");

  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);

  // Step 1: Confirm Payment
  const confirmPayment = async () => {
    if (!orderId || !buyer || !seller || !item) return alert("Fill all payment fields");
    try {
      await axios.post("http://localhost:5000/api/order/confirm-payment", {
        orderId, buyer, seller, item
      });
      alert("Payment confirmed");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Step 2: Create DHL Shipment
  const createShipment = async () => {
    if (!orderId || !receiverName || !postalCode || !cityName || !countryCode || !packageWeight) {
      return alert("Fill all shipment fields");
    }
    try {
      const res = await axios.post("http://localhost:5000/api/order/create-shipment", {
        orderId,
        receiverAddress: { name: receiverName, postalCode, cityName, countryCode },
        packageWeight: Number(packageWeight)
      });
      setTrackingNumber(res.data.shipment.shipmentTrackingNumber);
      alert("Shipment created");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Step 3: Track DHL Shipment
  const trackShipment = async () => {
    if (!orderId) return alert("Provide orderId to track");
    try {
      const res = await axios.get(`http://localhost:5000/api/order/track/${orderId}`);
      setOrderStatus(res.data.orderStatus);
      setTrackingData(res.data.tracking);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-500 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">DHL Workflow Dashboard</h1>

      {/* Payment Section */}
      <div className="border p-4 rounded-xl bg-black shadow-md">
        <h2 className="text-lg font-semibold mb-3">Confirm Payment</h2>
        <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID" className="border p-2 w-full mb-2" />
        <input value={buyer} onChange={e => setBuyer(e.target.value)} placeholder="Buyer Wallet" className="border p-2 w-full mb-2" />
        <input value={seller} onChange={e => setSeller(e.target.value)} placeholder="Seller Wallet" className="border p-2 w-full mb-2" />
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="Item Name" className="border p-2 w-full mb-3" />
        <button onClick={confirmPayment} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Payment</button>
      </div>

      {/* Shipment Section */}
      <div className="border p-4 rounded-xl bg-black shadow-md">
        <h2 className="text-lg font-semibold mb-3">Create DHL Shipment</h2>
        <input value={receiverName} onChange={e => setReceiverName(e.target.value)} placeholder="Receiver Name" className="border p-2 w-full mb-2" />
        <input value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="Postal Code" className="border p-2 w-full mb-2" />
        <input value={cityName} onChange={e => setCityName(e.target.value)} placeholder="City" className="border p-2 w-full mb-2" />
        <input value={countryCode} onChange={e => setCountryCode(e.target.value)} placeholder="Country Code" className="border p-2 w-full mb-2" />
        <input value={packageWeight} onChange={e => setPackageWeight(e.target.value)} placeholder="Weight (kg)" className="border p-2 w-full mb-3" />
        <button onClick={createShipment} className="bg-blue-600 text-white px-4 py-2 rounded">Create Shipment</button>
      </div>

      {/* Tracking Section */}
      <div className="border p-4 rounded-xl bg-black shadow-md">
        <h2 className="text-lg font-semibold mb-3">Track Shipment</h2>
        <button onClick={trackShipment} className="bg-green-600 text-white px-4 py-2 rounded mb-3">Check Status</button>
        {orderStatus && <p>Status: <span className="font-semibold">{orderStatus}</span></p>}
        {trackingNumber && <p>Tracking #: <span className="font-semibold">{trackingNumber}</span></p>}
        {trackingData && <pre className="text-xs bg-gray-50 p-2 mt-2 overflow-auto">{JSON.stringify(trackingData, null, 2)}</pre>}
      </div>
    </div>
  );
};
