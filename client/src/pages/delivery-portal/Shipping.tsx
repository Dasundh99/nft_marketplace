import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../../utils/api";
// import axios from "axios";

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
      await API.post("/shipment", newShipment);
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
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Shipping Portal
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 mb-8 bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        {/* Sender Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-xl border-b border-gray-700 pb-2">
            Sender Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              name="senderName"
              value={form.senderName}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Email"
              type="email"
              name="senderEmail"
              value={form.senderEmail}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Phone"
              name="senderPhone"
              value={form.senderPhone}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Address Line 1"
              name="senderAddress1"
              value={form.senderAddress1}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none col-span-2"
            />
            <input
              placeholder="City"
              name="senderCity"
              value={form.senderCity}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="State"
              name="senderState"
              value={form.senderState}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Zip"
              name="senderZip"
              value={form.senderZip}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Country"
              name="senderCountry"
              value={form.senderCountry}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Receiver Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-xl border-b border-gray-700 pb-2">
            Receiver Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              name="receiverName"
              value={form.receiverName}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Email"
              type="email"
              name="receiverEmail"
              value={form.receiverEmail}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Phone"
              name="receiverPhone"
              value={form.receiverPhone}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Address Line 1"
              name="receiverAddress1"
              value={form.receiverAddress1}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none col-span-2"
            />
            <input
              placeholder="City"
              name="receiverCity"
              value={form.receiverCity}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="State"
              name="receiverState"
              value={form.receiverState}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Zip"
              name="receiverZip"
              value={form.receiverZip}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Country"
              name="receiverCountry"
              value={form.receiverCountry}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Package Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-xl border-b border-gray-700 pb-2">
            Package Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Weight"
              name="packageWeight"
              value={form.packageWeight}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Dimensions"
              name="packageDimensions"
              value={form.packageDimensions}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              placeholder="Description"
              name="packageDescription"
              value={form.packageDescription}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none col-span-2"
            />
            <select
              name="courier"
              value={form.courier}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
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
              className="p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-400 focus:outline-none"
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200"
        >
          Create Shipment
        </button>
      </form>

      {/* Shipments Table */}
      <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
        Shipments
      </h3>
      {shipments.length === 0 ? (
        <p className="text-gray-400">No shipments yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="p-3 border border-gray-700">#</th>
                <th className="p-3 border border-gray-700">Sender</th>
                <th className="p-3 border border-gray-700">Receiver</th>
                <th className="p-3 border border-gray-700">Package</th>
                <th className="p-3 border border-gray-700">Courier</th>
                <th className="p-3 border border-gray-700">Service</th>
                <th className="p-3 border border-gray-700">Tracking #</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, idx) => (
                <tr
                  key={idx}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <td className="p-3 border border-gray-600">{idx + 1}</td>
                  <td className="p-3 border border-gray-600">{s.senderName}</td>
                  <td className="p-3 border border-gray-600">{s.receiverName}</td>
                  <td className="p-3 border border-gray-600">{s.packageDescription}</td>
                  <td className="p-3 border border-gray-600">{s.courier}</td>
                  <td className="p-3 border border-gray-600">{s.serviceType}</td>
                  <td className="p-3 border border-gray-600 font-mono">{s.trackingNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Shipping;
