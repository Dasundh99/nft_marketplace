// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";
// import { app } from "../utils/firebase";
// import { Toaster, toast } from "react-hot-toast";

// interface Purchase {
//   mintAddress: string;
//   name?: string;
//   image?: string;
//   price: number;
//   seller: string;
//   buyer: string;
//   tx: string;
//   createdAt?: any;
// }

// const BoughtNFTs: React.FC = () => {
//   const wallet = useWallet();
//   const [purchases, setPurchases] = useState<Purchase[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!wallet.publicKey) return;

//     const db = getFirestore(app);
//     const q = query(
//       collection(db, "purchases"),
//       where("buyer", "==", wallet.publicKey.toBase58()),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(
//       q,
//       (snapshot) => {
//         const list: Purchase[] = snapshot.docs.map(
//           (doc) => doc.data() as Purchase
//         );
//         setPurchases(list);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Firestore error:", error);
//         toast.error("Failed to load purchases");
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, [wallet.publicKey]);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <Toaster position="top-right" />
//       <h1 className="text-3xl font-bold text-center mb-8">🛍️ My Bought NFTs</h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading your purchases...</p>
//       ) : purchases.length === 0 ? (
//         <p className="text-center text-gray-400">
//           You haven’t bought any NFTs yet.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {purchases.map((p, index) => (
//             <div
//               key={index}
//               className="bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all p-4"
//             >
//               <img
//                 src={p.image || "/placeholder.png"}
//                 alt={p.name || "NFT"}
//                 className="rounded-lg mb-4 w-full h-56 object-cover border border-gray-800"
//                 onError={(e) =>
//                   ((e.target as HTMLImageElement).src = "/placeholder.png")
//                 }
//               />
//               <h2 className="text-lg font-semibold mb-1 truncate">
//                 {p.name || "Unnamed NFT"}
//               </h2>
//               <p className="text-blue-400 font-semibold mb-1">
//                 💰 {p.price} SOL
//               </p>

//               <p className="text-sm text-gray-400">
//                 Seller: {p.seller.slice(0, 6)}...{p.seller.slice(-6)}
//               </p>

//               <div className="mt-3 text-xs text-gray-500 space-y-1">
//                 <p>
//                   Mint:{" "}
//                   <a
//                     href={`https://explorer.solana.com/address/${p.mintAddress}?cluster=devnet`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="underline text-blue-400"
//                   >
//                     {p.mintAddress.slice(0, 6)}...{p.mintAddress.slice(-6)}
//                   </a>
//                 </p>
//                 <p>
//                   Tx:{" "}
//                   <a
//                     href={`https://explorer.solana.com/tx/${p.tx}?cluster=devnet`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="underline text-blue-400"
//                   >
//                     View on Explorer
//                   </a>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BoughtNFTs;

// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Connection, PublicKey } from "@solana/web3.js";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
// } from "firebase/firestore";
// import { db } from "../utils/firebase";
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

// interface Purchase {
//   mintAddress: string;
//   name?: string;
//   image?: string;
//   price: number;
//   seller: string;
//   buyer: string;
//   tx: string;
//   weight?: number;
//   createdAt?: any;
// }

// const BoughtNFTs: React.FC = () => {
//   const wallet = useWallet();

//   const [purchases, setPurchases] = useState<Purchase[]>([]);
//   const [deliveryData, setDeliveryData] = useState<Record<string, any>>({});
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedNFT, setSelectedNFT] = useState<Purchase | null>(null);

//   const [deliveryForm, setDeliveryForm] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     phone: "",
//   });

//   // Load purchases
//   useEffect(() => {
//     if (!wallet.publicKey) return;

//     const q = query(
//       collection(db, "purchases"),
//       where("buyer", "==", wallet.publicKey.toBase58()),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(q, (snap) => {
//       setPurchases(snap.docs.map((d) => d.data() as Purchase));
//       setLoading(false);
//     });

//     return () => unsub();
//   }, [wallet.publicKey]);

//   // Load delivery records
//   useEffect(() => {
//     if (!wallet.publicKey) return;

//     const q = query(
//       collection(db, "deliveries"),
//       where("buyer", "==", wallet.publicKey.toBase58())
//     );

//     const unsub = onSnapshot(q, (snap) => {
//       const map: Record<string, any> = {};
//       snap.forEach((doc) => {
//         map[doc.data().mintAddress] = doc.data();
//       });
//       setDeliveryData(map);
//     });

//     return () => unsub();
//   }, [wallet.publicKey]);

//   // Open modal
//   const openDeliveryModal = (nft: Purchase) => {
//     setSelectedNFT(nft);
//     setDeliveryForm({
//       fullName: "",
//       address: "",
//       city: "",
//       postalCode: "",
//       phone: "",
//     });
//     setShowModal(true);
//   };

//   // Confirm delivery → Burn NFT → Save delivery → Create shipment
//   const handleDeliveryConfirm = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedNFT) return;

//     if (!wallet.publicKey || !wallet.signTransaction) {
//       toast.error("Please connect wallet");
//       return;
//     }

//     try {
//       toast.loading("Burning NFT…");

//       const connection = new Connection("https://api.devnet.solana.com");
//       const metaplex = Metaplex.make(connection).use(
//         walletAdapterIdentity(wallet)
//       );

//       // 🔥 Burn NFT
//       await metaplex.nfts().delete({
//         mintAddress: new PublicKey(selectedNFT.mintAddress),
//       });

//       toast.dismiss();
//       toast.success("🔥 NFT burned successfully");

//       // Save delivery info BEFORE shipment
//       await addDoc(collection(db, "deliveries"), {
//         buyer: wallet.publicKey.toBase58(),
//         mintAddress: selectedNFT.mintAddress,
//         fullName: deliveryForm.fullName,
//         address: deliveryForm.address,
//         city: deliveryForm.city,
//         postalCode: deliveryForm.postalCode,
//         phone: deliveryForm.phone,
//         weight: selectedNFT.weight || 100,
//         status: "delivering",
//         createdAt: Date.now(),
//       });

//       toast.loading("Creating shipment…");

//       // Call backend
//       const res = await axios.post(
//         "http://localhost:5000/api/shipment/create",
//         {
//           fullName: deliveryForm.fullName,
//           address: deliveryForm.address,
//           city: deliveryForm.city,
//           postalCode: deliveryForm.postalCode,
//           phone: deliveryForm.phone,
//           weight: selectedNFT.weight || 100,
//           mintAddress: selectedNFT.mintAddress,
//         }
//       );

//       toast.dismiss();
//       toast.success("🚚 Shipment created!");

//       console.log("Shipment:", res.data);

//       setShowModal(false);
//     } catch (err: any) {
//       toast.dismiss();
//       console.error(err);

//       const message =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         err.message ||
//         "Shipment failed";

//       toast.error(message);
//     }
//   };

//   const renderStatusBadge = (mint: string) => {
//     const d = deliveryData[mint];
//     if (!d) return null;

//     return (
//       <span className="px-2 py-1 bg-blue-600 text-xs rounded">
//         {d.status}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <Toaster position="top-right" />

//       <h1 className="text-3xl font-bold text-center mb-8">
//         🛍️ My Bought NFTs
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading…</p>
//       ) : purchases.length === 0 ? (
//         <p className="text-center text-gray-400">
//           You haven't bought anything yet.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {purchases.map((p, index) => (
//             <div
//               key={p.mintAddress}
//               className="bg-gray-900 p-4 rounded-xl flex flex-col"
//             >
//               <img
//                 src={p.image}
//                 alt={p.name || "NFT image"}
//                 title={p.name || "NFT image"}
//                 className="rounded-lg mb-4 w-full h-56 object-cover"
//               />

//               <h2 className="text-lg font-semibold">{p.name}</h2>
//               <p className="text-blue-400 font-semibold">💰 {p.price} SOL</p>

//               <p className="text-gray-400 text-sm mb-2">
//                 Seller: {p.seller.slice(0, 6)}...
//                 {p.seller.slice(-6)}
//               </p>

//               {renderStatusBadge(p.mintAddress)}

//               {!deliveryData[p.mintAddress] && (
//                 <button
//                   onClick={() => openDeliveryModal(p)}
//                   className="mt-auto bg-green-600 hover:bg-green-700 py-2 rounded"
//                 >
//                   Confirm Delivery & Burn
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Delivery Modal */}
//       {showModal && selectedNFT && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="bg-gray-900 p-6 rounded-xl w-96">
//             <h2 className="text-xl font-bold mb-4">Enter Delivery Details</h2>

//             <form onSubmit={handleDeliveryConfirm} className="space-y-3">
//               {[
//                 { key: "fullName", label: "Full Name" },
//                 { key: "address", label: "Street Address" },
//                 { key: "city", label: "City" },
//                 { key: "postalCode", label: "Postal Code" },
//                 { key: "phone", label: "Phone Number" },
//               ].map((f) => (
//                 <input
//                   key={f.key}
//                   type="text"
//                   placeholder={f.label}
//                   aria-label={f.label}
//                   required
//                   className="w-full p-2 bg-gray-800 rounded"
//                   onChange={(e) =>
//                     setDeliveryForm({
//                       ...deliveryForm,
//                       [f.key]: e.target.value,
//                     })
//                   }
//                 />
//               ))}

//               <button className="w-full bg-blue-600 py-2 rounded">
//                 Confirm & Burn
//               </button>

//               <button
//                 type="button"
//                 className="w-full bg-gray-700 py-2 rounded mt-2"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BoughtNFTs;

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
import API from "../utils/api";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

interface Purchase {
  mintAddress: string;
  name?: string;
  image?: string;
  price: number;
  seller: string;
  buyer: string;
  tx: string;
  weight?: number;
  createdAt?: any;
}

const BoughtNFTs: React.FC = () => {
  const wallet = useWallet();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [deliveryData, setDeliveryData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<Purchase | null>(null);

  const [deliveryForm, setDeliveryForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // Load purchases
  useEffect(() => {
    if (!wallet.publicKey) return;

    const q = query(
      collection(db, "purchases"),
      where("buyer", "==", wallet.publicKey.toBase58()),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setPurchases(snap.docs.map((d) => d.data() as Purchase));
      setLoading(false);
    });

    return () => unsub();
  }, [wallet.publicKey]);

  // Load delivery updates
  useEffect(() => {
    if (!wallet.publicKey) return;

    const q = query(
      collection(db, "deliveries"),
      where("buyer", "==", wallet.publicKey.toBase58())
    );

    const unsub = onSnapshot(q, (snap) => {
      const map: Record<string, any> = {};
      snap.forEach((doc) => {
        map[doc.data().mintAddress] = doc.data();
      });
      setDeliveryData(map);
    });

    return () => unsub();
  }, [wallet.publicKey]);

  // Open modal
  const openDeliveryModal = (nft: Purchase) => {
    setSelectedNFT(nft);
    setDeliveryForm({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    });
    setShowModal(true);
  };

  // Burn NFT + save delivery + create shipment
  const handleDeliveryConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNFT) return;

    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Please connect wallet");
      return;
    }

    try {
      toast.loading("Burning NFT…");

      const connection = new Connection("https://api.devnet.solana.com");
      const metaplex = Metaplex.make(connection).use(
        walletAdapterIdentity(wallet)
      );

      // 🔥 Burn NFT
      await metaplex.nfts().delete({
        mintAddress: new PublicKey(selectedNFT.mintAddress),
      });

      toast.dismiss();
      toast.success("🔥 NFT burned");

      // Save delivery BEFORE shipment
      await addDoc(collection(db, "deliveries"), {
        buyer: wallet.publicKey.toBase58(),
        mintAddress: selectedNFT.mintAddress,
        fullName: deliveryForm.fullName,
        address: deliveryForm.address,
        city: deliveryForm.city,
        postalCode: deliveryForm.postalCode,
        phone: deliveryForm.phone,
        weight: selectedNFT.weight || 100,
        status: "delivering",
        createdAt: Date.now(),
      });

      toast.loading("Creating shipment…");

      // Backend call — updated (removed unused variable)
      await API.post("shipment/create", {
        fullName: deliveryForm.fullName,
        address: deliveryForm.address,
        city: deliveryForm.city,
        postalCode: deliveryForm.postalCode,
        phone: deliveryForm.phone,
        weight: selectedNFT.weight || 100,
        mintAddress: selectedNFT.mintAddress,
      });

      toast.dismiss();
      toast.success("🚚 Shipment created!");

      setShowModal(false);
    } catch (err: any) {
      toast.dismiss();
      console.error("Delivery Error:", err);

      // Clean error handling: React-safe messages only
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Shipment failed";

      toast.error(message);
    }
  };

  const renderStatusBadge = (mint: string) => {
    const d = deliveryData[mint];
    if (!d) return null;

    return (
      <span className="px-2 py-1 bg-blue-600 text-xs rounded">
        {d.status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold text-center mb-8">🛍️ My Bought NFTs</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading…</p>
      ) : purchases.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven’t bought anything yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {purchases.map((p) => (
            <div
              key={p.mintAddress}
              className="bg-gray-900 p-4 rounded-xl flex flex-col"
            >
              <img
                src={p.image}
                alt={p.name || "NFT image"}
                title={p.name || "NFT image"}
                className="rounded-lg mb-4 w-full h-56 object-cover"
              />

              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-blue-400 font-semibold">💰 {p.price} SOL</p>

              <p className="text-gray-400 text-sm mb-2">
                Seller: {p.seller.slice(0, 6)}...
                {p.seller.slice(-6)}
              </p>

              {renderStatusBadge(p.mintAddress)}

              {!deliveryData[p.mintAddress] && (
                <button
                  onClick={() => openDeliveryModal(p)}
                  className="mt-auto bg-green-600 hover:bg-green-700 py-2 rounded"
                >
                  Confirm Delivery & Burn
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delivery Modal */}
      {showModal && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Enter Delivery Details</h2>

            <form onSubmit={handleDeliveryConfirm} className="space-y-3">
              {[ 
                { key: "fullName", label: "Full Name" },
                { key: "address", label: "Street Address" },
                { key: "city", label: "City" },
                { key: "postalCode", label: "Postal Code" },
                { key: "phone", label: "Phone Number" },
              ].map((f) => (
                <input
                  key={f.key}
                  type="text"
                  placeholder={f.label}
                  aria-label={f.label}
                  required
                  className="w-full p-2 bg-gray-800 rounded"
                  onChange={(e) =>
                    setDeliveryForm((prev) => ({
                      ...prev,
                      [f.key]: e.target.value,
                    }))
                  }
                />
              ))}

              <button className="w-full bg-blue-600 py-2 rounded text-white">
                Confirm & Burn
              </button>

              <button
                type="button"
                className="w-full bg-gray-700 py-2 rounded mt-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoughtNFTs;
