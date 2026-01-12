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
  getDocs,
} from "firebase/firestore";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DeliveryTimeline from "../components/DeliveryTimeline";
import { db } from "../utils/firebase";

interface Delivery {
  id: string;
  buyer: string;
  mintAddress: string;

  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;

  status: string;
  shipmentId?: string;
  trackingNumber?: string;
  labelUrl?: string;
  createdAt?: any;

  // NFT data (from nfts collection)
  nftName?: string;
  quantity?: number;
  weight?: number;
}

interface NFTData {
  mintAddress: string;
  name: string;
  quantity: number;
  weight: number;
}

const DeliveryStatus: React.FC = () => {
  const wallet = useWallet();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchNFTData = async (): Promise<Record<string, NFTData>> => {
    const map: Record<string, NFTData> = {};
    const snap = await getDocs(collection(db, "nfts"));

    snap.forEach((doc) => {
      const data = doc.data() as NFTData;
      map[data.mintAddress] = data;
    });

    return map;
  };

  useEffect(() => {
    if (!wallet.publicKey) return;

    const q = query(
      collection(db, "deliveries"),
      where("buyer", "==", wallet.publicKey.toBase58()),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      async (snapshot) => {
        const deliveryList: Delivery[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));

        // Load NFT metadata
        const nftMap = await fetchNFTData();

        // Merge NFT data into deliveries
        const merged = deliveryList.map((d) => {
          const nft = nftMap[d.mintAddress];
          return {
            ...d,
            nftName: nft?.name || "Unknown NFT",
            quantity: nft?.quantity || 0,
            weight: nft?.weight || 0,
          };
        });

        setDeliveries(merged);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Failed to load deliveries");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [wallet.publicKey]);

 
  const checkDeliveryStatus = async (delivery: Delivery) => {
    if (!delivery.trackingNumber) return;

    try {
      const res = await axios.get(
        `https://api.shipengine.com/v1/tracking?tracking_number=${delivery.trackingNumber}`,
        {
          headers: {
            "API-Key": import.meta.env.VITE_SHIPENGINE_API_KEY,
          },
        }
      );

      const code = res.data?.events?.[0]?.status_code?.toUpperCase();

      let newStatus = delivery.status;
      if (code === "IT") newStatus = "in_transit";
      if (code === "OF") newStatus = "out_for_delivery";
      if (code === "DL") newStatus = "delivered";

      if (newStatus !== delivery.status) {
        await updateDoc(doc(db, "deliveries", delivery.id), {
          status: newStatus,
        });
      }
    } catch (err) {
      console.error("Tracking error:", err);
    }
  };

  useEffect(() => {
    const i = setInterval(() => {
      deliveries.forEach(checkDeliveryStatus);
    }, 10000);
    return () => clearInterval(i);
  }, [deliveries]);


  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-8">📦 Delivery Status</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : deliveries.length === 0 ? (
        <p className="text-center text-gray-400">No deliveries found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveries.map((d) => (
            <div
              key={d.id}
              className="bg-gray-900 p-5 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2">
                {d.nftName}
              </h3>

              <span className="text-xs px-3 py-1 rounded bg-indigo-600">
                {d.status.toUpperCase()}
              </span>

              <div className="mt-3 text-sm text-gray-300 space-y-1">
                <p><b>Recipient:</b> {d.fullName}</p>
                <p><b>Address:</b> {d.address}, {d.city}</p>
                <p><b>Phone:</b> {d.phone}</p>
                <p><b>Quantity:</b> {d.quantity}</p>
                <p><b>Weight:</b> {d.weight} g</p>
              </div>

              {d.trackingNumber && (
                <p className="mt-2 text-sm">
                  <b>Tracking:</b> {d.trackingNumber}
                </p>
              )}

              {d.labelUrl && (
                <a
                  href={d.labelUrl}
                  target="_blank"
                  className="block mt-2 text-blue-400 underline"
                >
                  Download Shipping Label
                </a>
              )}

              <DeliveryTimeline status={d.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryStatus;
