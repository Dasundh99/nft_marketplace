// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import BuyNFT from "../components/BuyNft";

// interface NFTListing {
//   nft_address: string;
//   price: number;
//   seller_address: string;
//   name?: string;
//   image_uri?: string;
//   description?: string;
//   currency_symbol?: string;
// }

// const BuyNFTPage: React.FC = () => {
//   const [listings, setListings] = useState<NFTListing[]>([]);
//   const [selectedNFT, setSelectedNFT] = useState<NFTListing | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch active listings
//   const fetchListings = async (): Promise<void> => {
//     setLoading(true);
//     toast.loading("Fetching active listings...");

//     try {
//       const endpoint = `${import.meta.env.VITE_SHYFT_ENDPOINT}/marketplace/active_listings`.replace(
//         /([^:]\/)\/+/g,
//         "$1"
//       );

//       const res = await axios.get(endpoint, {
//         params: {
//           network: import.meta.env.VITE_NETWORK || "devnet",
//           marketplace_address: import.meta.env.VITE_MARKETPLACE_ADDRESS,
//         },
//         headers: {
//           "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//         },
//       });

//       if (!res.data.success || !res.data.result) {
//         throw new Error(res.data.message || "Failed to load listings");
//       }

//       console.log("🛍️ Active Listings:", res.data.result);
//       setListings(res.data.result);
//       toast.dismiss();
//       toast.success("✅ Listings loaded successfully!");
//     } catch (err: any) {
//       toast.dismiss();
//       console.error("❌ Error fetching listings:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Failed to fetch listings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">🛒 NFT Marketplace</h1>

//       {loading && (
//         <p className="text-center text-gray-400 mb-6">Loading listings...</p>
//       )}

//       {!loading && listings.length === 0 && (
//         <p className="text-center text-gray-400">
//           No NFTs listed for sale yet.
//         </p>
//       )}

//       {/* NFT Grid */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {listings.map((item) => (
//           <div
//             key={item.nft_address}
//             className="bg-gray-900 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all"
//           >
//             <img
//               src={item.image_uri || "/placeholder.png"}
//               alt={item.name || "NFT"}
//               className="rounded-lg mb-4 w-full h-56 object-cover"
//             />
//             <h2 className="text-lg font-semibold">{item.name || "Unnamed NFT"}</h2>
//             <p className="text-sm text-gray-400 mb-2">
//               {item.description?.slice(0, 60) || "No description"}
//             </p>
//             <p className="text-blue-400 font-semibold mb-4">
//               {item.price} {item.currency_symbol || "SOL"}
//             </p>

//             <button
//               onClick={() => setSelectedNFT(item)}
//               data-toggle="modal"
//               data-target="#buyNft"
//               className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* 🛒 Buy Modal */}
//       {selectedNFT && (
//   <BuyNFT
//     buy={{
//       nft: {
//         image_uri: selectedNFT.image_uri || "/placeholder.png",
//         name: selectedNFT.name || "Unnamed NFT",
//         description: selectedNFT.description || "",
//       },
//       nft_address: selectedNFT.nft_address,
//       price: selectedNFT.price,
//       seller_address: selectedNFT.seller_address,
//       currency_symbol: selectedNFT.currency_symbol || "SOL",
//     }}
//     setLoader={setLoading}
//     onClose={() => setSelectedNFT(null)} // ✅ closes modal
//   />
// )}

//     </div>
//   );
// };

// export default BuyNFTPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Transaction } from "@solana/web3.js";
// import {
//   ENDPOINT,
//   SHYFT_API_KEY,
//   NFT_MARKETPLACE,
//   NETWORK,
//   notifySuccess,
//   notifyError,
// } from "../utils/constants";

// interface NFTListing {
//   nft_address: string;
//   price: number;
//   seller_address: string;
//   name?: string;
//   image_uri?: string;
//   description?: string;
//   currency_symbol?: string;
// }

// const BuyNFTPage: React.FC = () => {
//   const { connection } = useConnection();
//   const { sendTransaction, publicKey } = useWallet();

//   const [listings, setListings] = useState<NFTListing[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ==================================
//   // 🔹 Fetch Active Listings
//   // ==================================
//   const fetchListings = async () => {
//     setLoading(true);
//     toast.loading("Fetching active listings...");

//     try {
//       const nftUrl = `${ENDPOINT}/marketplace/active_listings`.replace(
//         /([^:]\/)\/+/g,
//         "$1"
//       );

//       const res = await axios.get(nftUrl, {
//         params: {
//           network: NETWORK,
//           marketplace_address: NFT_MARKETPLACE,
//         },
//         headers: {
//           "x-api-key": SHYFT_API_KEY,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.data.success && res.data.result) {
//         setListings(res.data.result);
//         toast.success("✅ Listings loaded successfully!");
//       } else {
//         throw new Error("No active listings found.");
//       }
//     } catch (err: any) {
//       console.error("❌ Fetch listings error:", err);
//       notifyError("Failed to fetch active listings");
//     } finally {
//       toast.dismiss();
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   // ==================================
//   // 💰 Buy NFT Function
//   // ==================================
//   const buyNFT = async (nft: NFTListing) => {
//     if (!publicKey) {
//       notifyError("Please connect your wallet first!");
//       return;
//     }

//     try {
//       setLoading(true);
//       toast.loading("Preparing NFT purchase...");

//       const nftUrl = `${ENDPOINT}/marketplace/buy`.replace(/([^:]\/)\/+/g, "$1");

//       // 🔧 Simplified Payload (no service_charge)
//       const payload = {
//         network: NETWORK,
//         marketplace_address: NFT_MARKETPLACE,
//         nft_address: nft.nft_address,
//         price: Number(nft.price),
//         seller_address: nft.seller_address,
//         buyer_wallet: publicKey.toString(),
//       };

//       console.log("[BUY NFT] Payload:", payload);

//       const response = await axios.post(nftUrl, payload, {
//         headers: {
//           "x-api-key": SHYFT_API_KEY,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("📡 [BUY NFT] Raw Shyft Response:", response.data);

//       if (!response.data.success) {
//         console.error("❌ [BUY NFT] Failed:", response.data);
//         notifyError(response.data.message || "Failed to create buy transaction");
//         return;
//       }

//       // ✅ Decode & send transaction
//       const encodedTx = response.data.result.encoded_transaction;
//       const transaction = Transaction.from(Buffer.from(encodedTx, "base64"));

//       const signature = await sendTransaction(transaction, connection);
//       await connection.confirmTransaction(signature, "processed");

//       notifySuccess("🎉 NFT Purchased Successfully!");
//       console.log("✅ Transaction Signature:", signature);
//     } catch (err: any) {
//       console.error("💥 [BUY NFT] Error:", err);
//       notifyError(
//         err.response?.data?.message ||
//           err.response?.data?.error ||
//           err.message ||
//           "Something went wrong"
//       );
//     } finally {
//       toast.dismiss();
//       setLoading(false);
//     }
//   };

//   // ==================================
//   // 🖼️ UI RENDER
//   // ==================================
//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">🛒 NFT Marketplace</h1>

//       {loading && <p className="text-center text-gray-400 mb-6">Loading...</p>}

//       {!loading && listings.length === 0 && (
//         <p className="text-center text-gray-400">No NFTs listed for sale.</p>
//       )}

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {listings.map((nft) => (
//           <div
//             key={nft.nft_address}
//             className="bg-gray-900 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all"
//           >
//             <img
//               src={nft.image_uri || "/placeholder.png"}
//               alt={nft.name || "NFT"}
//               className="rounded-lg mb-4 w-full h-56 object-cover"
//             />
//             <h2 className="text-lg font-semibold">{nft.name || "Unnamed NFT"}</h2>
//             <p className="text-sm text-gray-400 mb-2">
//               {nft.description?.slice(0, 60) || "No description"}
//             </p>
//             <p className="text-blue-400 font-semibold mb-4">
//               {nft.price} {nft.currency_symbol || "SOL"}
//             </p>

//             <button
//               onClick={() => buyNFT(nft)}
//               className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg transition"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BuyNFTPage;

// BuyNFTPage.tsx
// BuyNFTPage.tsx — FINAL WORKING VERSION

