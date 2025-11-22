// import { useEffect, useState } from "react";
// import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { clusterApiUrl, Connection } from "@solana/web3.js";

// interface NFTData {
//   name: string;
//   image: string;
//   description: string;
//   attributes: { trait_type: string; value: string }[];
// }

// export default function Goods() {
//   const wallet = useWallet();
//   const [nfts, setNfts] = useState<NFTData[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNFTs = async () => {
//       if (!wallet.connected || !wallet.publicKey) return;
//       setLoading(true);

//       const connection = new Connection(clusterApiUrl("devnet"));
//       const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

//       try {
//         const ownedNFTs = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey });

//         const filtered = ownedNFTs.filter((nft) => nft.model === "metadata");

//         const detailed = await Promise.all(
//           filtered.map(async (nft) => {
//             const metadata = await metaplex.nfts().load({ metadata: nft });
//             const json = await fetch(metadata.uri).then((res) => res.json());

//             return {
//               name: json.name,
//               image: json.image,
//               description: json.description,
//               attributes: json.attributes || [],
//             };
//           })
//         );

//         setNfts(detailed);
//       } catch (e) {
//         console.error("Failed to fetch NFTs", e);
//       }

//       setLoading(false);
//     };

//     fetchNFTs();
//   }, [wallet.connected]);

//   if (!wallet.connected) return <div className="text-center mt-10">Connect your wallet</div>;
//   if (loading) return <div className="text-center mt-10">Loading NFTs...</div>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Your Minted Goods</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {nfts.map((nft, idx) => (
//           <div key={idx} className="border rounded-xl p-4 shadow-md">
//             <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded" />
//             <h2 className="text-lg font-semibold mt-2">{nft.name}</h2>
//             <p className="text-sm text-gray-600">{nft.description}</p>
//             <ul className="mt-2 text-sm">
//               {nft.attributes.map((attr, i) => (
//                 <li key={i}>
//                   <strong>{attr.trait_type}:</strong> {attr.value}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { fetchNFTsForWallet } from "../utils/solana";
// import type { Nft } from "@metaplex-foundation/js";

// const Goods: React.FC = () => {
//   const { wallet, publicKey } = useWallet();
//   const [nfts, setNFTs] = useState<Nft[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const loadNFTs = async () => {
//     if (!wallet?.adapter || !publicKey) return;

//     setLoading(true);
//     setError("");

//     try {
//       const fetched = await fetchNFTsForWallet(wallet.adapter);
//       setNFTs(fetched);
//     } catch (err: any) {
//       console.error("Error fetching NFTs:", err);
//       setError("Failed to load NFTs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadNFTs();
//   }, [wallet, publicKey]);

//   return (
//     <div className="p-5 text-white">
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-3xl font-bold">Minted Goods</h1>
//         <button
//           onClick={loadNFTs}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Refresh
//         </button>
//       </div>

//       {loading && <p>Loading NFTs...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {nfts.length === 0 && !loading ? (
//         <p className="text-gray-400">No NFTs found for this wallet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {nfts.map((nft, i) => (
//             <div
//               key={i}
//               className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition"
//             >
//               {nft.json?.image ? (
//                 <img
//                   src={nft.json.image}
//                   alt={nft.name}
//                   className="w-full h-48 object-cover rounded mb-3"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-700 flex items-center justify-center rounded mb-3 text-gray-400 text-sm">
//                   No image
//                 </div>
//               )}

//               <h2 className="text-lg font-semibold">{nft.name}</h2>
//               <p className="text-gray-400 text-sm mb-2">{nft.json?.description}</p>

//               {nft.json?.attributes?.length ? (
//                 <ul className="text-sm text-gray-300 space-y-1">
//                   {nft.json.attributes.map((attr, idx) => (
//                     <li key={idx}>
//                       <strong>{attr.trait_type}:</strong> {attr.value}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-sm italic">No attributes available.</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Goods;
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase";
import { LifeLine } from "react-loading-indicators";


interface NFTData {
  mintAddress: string;
  name: string;
  description: string;
  image: string;
  manufactureDate: string;
  expiryDate: string;
  certificateUrl: string;
  owner: string;
}

const Goods: React.FC = () => {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFTs = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "nfts"));
        const nftList: NFTData[] = querySnapshot.docs.map((doc) => doc.data() as NFTData);
        setNfts(nftList);
      } catch (err) {
        console.error("Error loading NFTs from Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, []);

  return (
    <div className="p-6 text-white max-w-7xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">Minted Goods (NFTs)</h1> */}
      <div className="flex items-center justify-center">
  <h1 className="text-3xl font-bold mb-6">Minted Goods (NFTs)</h1>
</div>

      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <LifeLine color="green-400" size="medium" text="" textColor="" />
        </div>
      ) : nfts.length === 0 ? (
        <p>No NFTs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.mintAddress}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-60 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-3">{nft.name}</h2>
              <p className="text-sm text-gray-300">{nft.description}</p>
              <ul className="mt-2 text-sm">
                <li><strong>Manufactured:</strong> {nft.manufactureDate}</li>
                <li><strong>Expires:</strong> {nft.expiryDate}</li>
                <li>
                  <strong>Certificate:</strong>{" "}
                  <a href={nft.certificateUrl} className="text-blue-400 underline" target="_blank" rel="noreferrer">
                    View
                  </a>
                </li>
              </ul>
              <a
                href={`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-green-400 underline"
              >
                View on Solana Explorer
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Goods;

