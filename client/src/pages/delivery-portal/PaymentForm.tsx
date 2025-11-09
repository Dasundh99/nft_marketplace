import React, { useState } from "react";
import axios from "axios";

export const PaymentForm: React.FC<{ onConfirmed: (id: string) => void }> = ({ onConfirmed }) => {
  const [orderId, setOrderId] = useState("");
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [item, setItem] = useState("");

  const confirmPayment = async () => {
    const res = await axios.post("http://localhost:5000/api/order/confirm-payment", {
      orderId, buyer, seller, item
    });
    alert("Payment Confirmed ✅");
    onConfirmed(orderId);
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Confirm Payment</h2>
      <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID" className="border p-2 w-full mb-2" />
      <input value={buyer} onChange={e => setBuyer(e.target.value)} placeholder="Buyer Wallet" className="border p-2 w-full mb-2" />
      <input value={seller} onChange={e => setSeller(e.target.value)} placeholder="Seller Wallet" className="border p-2 w-full mb-2" />
      <input value={item} onChange={e => setItem(e.target.value)} placeholder="Item Name" className="border p-2 w-full mb-3" />
      <button onClick={confirmPayment} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Payment</button>
    </div>
  );
};
