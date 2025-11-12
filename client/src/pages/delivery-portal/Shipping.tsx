import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface Shipment {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress1: string;
  senderAddress2?: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  senderCountry: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress1: string;
  receiverAddress2?: string;
  receiverCity: string;
  receiverState: string;
  receiverZip: string;
  receiverCountry: string;
  packageWeight: string;
  packageDimensions: string;
  packageDescription: string;
  courier: string;
  serviceType: string;
  trackingNumber: string;
}

const Shipping: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress1: "",
    senderAddress2: "",
    senderCity: "",
    senderState: "",
    senderZip: "",
    senderCountry: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAddress1: "",
    receiverAddress2: "",
    receiverCity: "",
    receiverState: "",
    receiverZip: "",
    receiverCountry: "",
    packageWeight: "",
    packageDimensions: "",
    packageDescription: "",
    courier: "DHL",
    serviceType: "Standard",
  });

  const generateTrackingNumber = () =>
    `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.receiverEmail) {
      toast.error("Receiver email is required!");
      return;
    }

    const trackingNumber = generateTrackingNumber();
    const newShipment = { ...form, trackingNumber };
    setShipments([...shipments, newShipment]);

    try {
      await axios.post("http://localhost:5000/api/shipment", newShipment);
      toast.success("Shipment created and email sent to receiver!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    }

    setForm({
      senderName: "",
      senderEmail: "",
      senderPhone: "",
      senderAddress1: "",
      senderAddress2: "",
      senderCity: "",
      senderState: "",
      senderZip: "",
      senderCountry: "",
      receiverName: "",
      receiverEmail: "",
      receiverPhone: "",
      receiverAddress1: "",
      receiverAddress2: "",
      receiverCity: "",
      receiverState: "",
      receiverZip: "",
      receiverCountry: "",
      packageWeight: "",
      packageDimensions: "",
      packageDescription: "",
      courier: "DHL",
      serviceType: "Standard",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shipping Portal (Demo)</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 mb-6 border p-4 rounded shadow"
      >
        {/* Sender Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Sender Details</h3>
          <input
            placeholder="Name"
            name="senderName"
            value={form.senderName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Email"
            type="email"
            name="senderEmail"
            value={form.senderEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Phone"
            name="senderPhone"
            value={form.senderPhone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Address Line 1"
            name="senderAddress1"
            value={form.senderAddress1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="City"
            name="senderCity"
            value={form.senderCity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="State"
            name="senderState"
            value={form.senderState}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Zip"
            name="senderZip"
            value={form.senderZip}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Country"
            name="senderCountry"
            value={form.senderCountry}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Receiver Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Receiver Details</h3>
          <input
            placeholder="Name"
            name="receiverName"
            value={form.receiverName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Email"
            type="email"
            name="receiverEmail"
            value={form.receiverEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            placeholder="Phone"
            name="receiverPhone"
            value={form.receiverPhone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Address Line 1"
            name="receiverAddress1"
            value={form.receiverAddress1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="City"
            name="receiverCity"
            value={form.receiverCity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="State"
            name="receiverState"
            value={form.receiverState}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Zip"
            name="receiverZip"
            value={form.receiverZip}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Country"
            name="receiverCountry"
            value={form.receiverCountry}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Package Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Package Details</h3>
          <input
            placeholder="Weight"
            name="packageWeight"
            value={form.packageWeight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Dimensions"
            name="packageDimensions"
            value={form.packageDimensions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Description"
            name="packageDescription"
            value={form.packageDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="courier"
            value={form.courier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="DHL">DHL</option>
            <option value="FedEx">FedEx</option>
            <option value="UPS">UPS</option>
            <option value="USPS">USPS</option>
          </select>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
            <option value="Overnight">Overnight</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Shipment
        </button>
      </form>

      {/* Shipments Table */}
      <h3 className="text-xl font-semibold mb-2">Shipments</h3>
      {shipments.length === 0 ? (
        <p>No shipments yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Sender</th>
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Package</th>
              <th className="border p-2">Courier</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Tracking #</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s, idx) => (
              <tr key={idx}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{s.senderName}</td>
                <td className="border p-2">{s.receiverName}</td>
                <td className="border p-2">{s.packageDescription}</td>
                <td className="border p-2">{s.courier}</td>
                <td className="border p-2">{s.serviceType}</td>
                <td className="border p-2 font-mono">{s.trackingNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Shipping;
