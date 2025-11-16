// // src/pages/DeliveryStatus.tsx

// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   onSnapshot,
//   orderBy,
//   updateDoc,
//   doc
// } from "firebase/firestore";
// import { app } from "../utils/firebase";
// import axios from "axios";
// import { Toaster, toast } from "react-hot-toast";
// import DeliveryTimeline from "../components/DeliveryTimeline";

// interface Delivery {
//   id: string;
//   fullName: string;
//   address: string;
//   phone: string;
//   buyer: string;
//   mintAddress: string;
//   weight: number;
//   status: string;
//   shipmentId?: string;
//   trackingNumber?: string;
//   labelUrl?: string;
//   createdAt?: any;
// }

// const DeliveryStatus: React.FC = () => {
//   const wallet = useWallet();
//   const [deliveries, setDeliveries] = useState<Delivery[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load deliveries from Firestore
//   useEffect(() => {
//     if (!wallet.publicKey) return;

//     const db = getFirestore(app);
//     const q = query(
//       collection(db, "deliveries"),
//       where("buyer", "==", wallet.publicKey.toBase58()),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(
//       q,
//       (snapshot) => {
//     const list: Delivery[] = snapshot.docs.map((d) => {
//   const data = d.data() as any;

//   // Remove id inside Firestore document data
//   if ("id" in data) {
//     delete data.id;
//   }

//   return {
//     id: d.id, // Firestore document ID (correct)
//     ...data,
//   };
// });

//         setDeliveries(list);
//         setLoading(false);
//       },
//       (err) => {
//         toast.error("Failed to load deliveries");
//         console.error(err);
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, [wallet.publicKey]);

//   // ShipEngine status polling
//   const checkDeliveryStatus = async (delivery: Delivery) => {
//     if (!delivery.trackingNumber) return;

//     try {
//       const res = await axios.get(
//         `https://api.shipengine.com/v1/tracking?tracking_number=${delivery.trackingNumber}`,
//         {
//           headers: { "API-Key": import.meta.env.VITE_SHIPENGINE_API_KEY },
//         }
//       );

//       const statusCode =
//         res.data?.events?.[0]?.status_code?.toUpperCase() || "";

//       let mapped = delivery.status;

//       if (statusCode === "IT") mapped = "in_transit";
//       if (statusCode === "OF") mapped = "out_for_delivery";
//       if (statusCode === "DL") mapped = "delivered";

//       if (mapped !== delivery.status) {
//         const db = getFirestore(app);
//         await updateDoc(doc(db, "deliveries", delivery.id), {
//           status: mapped,
//         });
//       }
//     } catch (err) {
//       console.error("Status check error:", err);
//     }
//   };

//   // Poll ShipEngine every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       deliveries.forEach((d) => checkDeliveryStatus(d));
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [deliveries]);

//   // Auto refresh every 30 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       window.location.reload();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <Toaster position="top-right" />

//       <h1 className="text-3xl font-bold text-center mb-8">📦 Delivery Status</h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading delivery updates...</p>
//       ) : deliveries.length === 0 ? (
//         <p className="text-center text-gray-400">
//           No delivery records found.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {deliveries.map((d) => (
//             <div key={d.id} className="bg-gray-900 p-5 rounded-xl shadow-lg">
//               <h3 className="text-xl font-bold mb-2">
//                 NFT Mint: {d.mintAddress.slice(0, 6)}...
//                 {d.mintAddress.slice(-6)}
//               </h3>

//               {/* STATUS BADGE */}
//               <span
//                 className={`px-3 py-1 rounded text-xs ${
//                   d.status === "delivered"
//                     ? "bg-green-600"
//                     : d.status === "out_for_delivery"
//                     ? "bg-blue-600"
//                     : d.status === "in_transit"
//                     ? "bg-yellow-600"
//                     : d.status === "shipped"
//                     ? "bg-purple-600"
//                     : "bg-gray-600"
//                 }`}
//               >
//                 {d.status.toUpperCase()}
//               </span>

//               <p className="mt-3 text-sm text-gray-300">
//                 <strong>Recipient:</strong> {d.fullName}
//               </p>
//               <p className="text-sm text-gray-300">
//                 <strong>Address:</strong> {d.address}
//               </p>
//               <p className="text-sm text-gray-300">
//                 <strong>Phone:</strong> {d.phone}
//               </p>
//               <p className="text-sm text-gray-300">
//                 <strong>Weight:</strong> {d.weight}g
//               </p>

//               {d.trackingNumber && (
//                 <p className="mt-3 text-sm">
//                   <strong>Tracking:</strong> {d.trackingNumber}
//                 </p>
//               )}

//               {d.labelUrl && (
//                 <a
//                   href={d.labelUrl}
//                   target="_blank"
//                   className="block mt-2 text-blue-400 underline"
//                 >
//                   📄 Download Shipping Label
//                 </a>
//               )}

//               {d.shipmentId && (
//                 <p className="text-xs text-gray-500 mt-2">
//                   Shipment ID: {d.shipmentId}
//                 </p>
//               )}

//               {/* DELIVERY TIMELINE */}
//               <DeliveryTimeline status={d.status} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeliveryStatus;

// src/pages/DeliveryStatus.tsx

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DeliveryTimeline from "../components/DeliveryTimeline";
import { db } from "../utils/firebase";

interface Delivery {
  id: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  buyer: string;
  mintAddress: string;
  weight: number;
  status: string;
  shipmentId?: string;
  trackingNumber?: string;
  labelUrl?: string;
  createdAt?: any;
}

const DeliveryStatus: React.FC = () => {
  const wallet = useWallet();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------
  // LOAD FIRESTORE DELIVERIES
  // ---------------------------------------------------------
  useEffect(() => {
    if (!wallet.publicKey) return;

    const q = query(
      collection(db, "deliveries"),
      where("buyer", "==", wallet.publicKey.toBase58()),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: Delivery[] = snapshot.docs.map((d) => {
          const data = d.data() as any;

          // Prevent ID duplication from Firestore
          delete data.id;

          return {
            id: d.id,
            ...data,
          };
        });

        setDeliveries(list);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        toast.error("Failed to load deliveries");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [wallet.publicKey]);

  // ---------------------------------------------------------
  // POLL SHIPENGINE TRACKING STATUS
  // ---------------------------------------------------------
  const checkDeliveryStatus = async (delivery: Delivery) => {
    if (!delivery.trackingNumber) return;

    try {
      const res = await axios.get(
        `https://api.shipengine.com/v1/tracking?tracking_number=${delivery.trackingNumber}`,
        {
          headers: { "API-Key": import.meta.env.VITE_SHIPENGINE_API_KEY },
        }
      );

      const statusCode =
        res.data?.events?.[0]?.status_code?.toUpperCase() || "";

      let mapped = delivery.status;

      if (statusCode === "IT") mapped = "in_transit";
      if (statusCode === "OF") mapped = "out_for_delivery";
      if (statusCode === "DL") mapped = "delivered";

      if (mapped !== delivery.status) {
        await updateDoc(doc(db, "deliveries", delivery.id), {
          status: mapped,
        });
      }
    } catch (err) {
      console.error("Status check error:", err);
    }
  };

  // Call ShipEngine every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      deliveries.forEach((d) => checkDeliveryStatus(d));
    }, 10000);

    return () => clearInterval(interval);
  }, [deliveries]);

  // Auto refresh UI every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-8">
        📦 Delivery Status
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading delivery updates...</p>
      ) : deliveries.length === 0 ? (
        <p className="text-center text-gray-400">No delivery records found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveries.map((d) => (
            <div
              key={d.id}
              className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-1">
                NFT Mint: {d.mintAddress.slice(0, 6)}...
                {d.mintAddress.slice(-6)}
              </h3>

              {/* STATUS BADGE */}
              <span
                className={`px-3 py-1 rounded text-xs ${
                  d.status === "delivered"
                    ? "bg-green-600"
                    : d.status === "out_for_delivery"
                    ? "bg-blue-600"
                    : d.status === "in_transit"
                    ? "bg-yellow-600"
                    : d.status === "shipped"
                    ? "bg-purple-600"
                    : "bg-gray-600"
                }`}
              >
                {d.status.toUpperCase()}
              </span>

              {/* DETAILS */}
              <p className="mt-3 text-sm text-gray-300">
                <strong>Recipient:</strong> {d.fullName}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Address:</strong> {d.address}, {d.city},{" "}
                {d.postalCode}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Phone:</strong> {d.phone}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Weight:</strong> {d.weight}g
              </p>

              {d.trackingNumber && (
                <p className="mt-3 text-sm">
                  <strong>Tracking:</strong> {d.trackingNumber}
                </p>
              )}

              {d.labelUrl && (
                <a
                  href={d.labelUrl}
                  target="_blank"
                  className="block mt-2 text-blue-400 underline"
                >
                  📄 Download Shipping Label
                </a>
              )}

              {d.shipmentId && (
                <p className="text-xs text-gray-500 mt-2">
                  Shipment ID: {d.shipmentId}
                </p>
              )}

              {/* TIMELINE UI */}
              <DeliveryTimeline status={d.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryStatus;
