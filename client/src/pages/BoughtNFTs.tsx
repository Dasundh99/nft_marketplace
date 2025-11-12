import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { app } from "../utils/firebase";
import { Toaster, toast } from "react-hot-toast";

interface Purchase {
  mintAddress: string;
  name?: string;
  image?: string;
  price: number;
  seller: string;
  buyer: string;
  tx: string;
  createdAt?: any;
}

const BoughtNFTs: React.FC = () => {
  const wallet = useWallet();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet.publicKey) return;

    const db = getFirestore(app);
    const q = query(
      collection(db, "purchases"),
      where("buyer", "==", wallet.publicKey.toBase58()),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: Purchase[] = snapshot.docs.map(
          (doc) => doc.data() as Purchase
        );
        setPurchases(list);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        toast.error("Failed to load purchases");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [wallet.publicKey]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-8">🛍️ My Bought NFTs</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading your purchases...</p>
      ) : purchases.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven’t bought any NFTs yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {purchases.map((p, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all p-4"
            >
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name || "NFT"}
                className="rounded-lg mb-4 w-full h-56 object-cover border border-gray-800"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/placeholder.png")
                }
              />
              <h2 className="text-lg font-semibold mb-1 truncate">
                {p.name || "Unnamed NFT"}
              </h2>
              <p className="text-blue-400 font-semibold mb-1">
                💰 {p.price} SOL
              </p>

              <p className="text-sm text-gray-400">
                Seller: {p.seller.slice(0, 6)}...{p.seller.slice(-6)}
              </p>

              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p>
                  Mint:{" "}
                  <a
                    href={`https://explorer.solana.com/address/${p.mintAddress}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-400"
                  >
                    {p.mintAddress.slice(0, 6)}...{p.mintAddress.slice(-6)}
                  </a>
                </p>
                <p>
                  Tx:{" "}
                  <a
                    href={`https://explorer.solana.com/tx/${p.tx}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-400"
                  >
                    View on Explorer
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoughtNFTs;
