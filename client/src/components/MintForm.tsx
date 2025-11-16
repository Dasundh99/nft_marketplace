// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNFT } from "../utils/solana"; // Ensure this points to your updated file

// const MintForm: React.FC = () => {
//   const { wallet } = useWallet(); // 🟢 Get connected wallet
//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState("");
//   const [minting, setMinting] = useState(false);

//   const handleMint = async () => {
//     if (!wallet?.adapter) return alert("Please connect a wallet first.");
//     if (!imageFile) return alert("Please select an image.");

//     setMinting(true);

//     try {
//       const buffer = await imageFile.arrayBuffer();
//       const nftAddress = await mintNFT(wallet.adapter, {
//         ...form,
//         imageBuffer: Buffer.from(buffer),
//       });
//       setMintAddress(nftAddress);
//     } catch (err) {
//       console.error("Minting failed:", err);
//       alert("Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="text-white p-5 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Mint New NFT</h2>
//       <div className="space-y-3">
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           placeholder="Symbol"
//           value={form.symbol}
//           onChange={e => setForm({ ...form, symbol: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           placeholder="Description"
//           value={form.description}
//           onChange={e => setForm({ ...form, description: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           type="date"
//           placeholder="Manufacture Date"
//           onChange={e => setForm({ ...form, manufactureDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           type="date"
//           placeholder="Expiry Date"
//           onChange={e => setForm({ ...form, expiryDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           placeholder="Certificate URL"
//           value={form.certificateUrl}
//           onChange={e => setForm({ ...form, certificateUrl: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />

        // <div>
        //   <label
        //     htmlFor="fileInput"
        //     className="block text-sm text-gray-300 mb-1"
        //   >
        //     Upload Product Image
        //   </label>
        //   <input
        //     id="fileInput"
        //     type="file"
        //     accept="image/*"
        //     onChange={e => setImageFile(e.target.files?.[0] || null)}
        //     className="block w-full text-white"
        //   />
        // </div>

//         <button
//           onClick={handleMint}
//           disabled={minting}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <p className="text-green-400 mt-3 break-all">
//             NFT Minted:{" "}
//             <a
//               href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               View on Solana Explorer
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;
// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNFT } from "../utils/solana"; // adjust the path if needed

// const MintForm: React.FC = () => {
//   const { wallet } = useWallet();

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState("");
//   const [minting, setMinting] = useState(false);

//   const convertFileToBuffer = (file: File): Promise<Buffer> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const arrayBuffer = reader.result as ArrayBuffer;
//         resolve(Buffer.from(arrayBuffer));
//       };
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleMint = async () => {
//     if (!wallet?.adapter) return alert("Please connect a wallet.");
//     if (!imageFile) return alert("Please select an image.");

//     setMinting(true);
//     try {
//       const buffer = await convertFileToBuffer(imageFile);

//       const nftAddress = await mintNFT(wallet.adapter, {
//         ...form,
//         imageBuffer: buffer,
//       });

//       setMintAddress(nftAddress);
//     } catch (err) {
//       console.error("Minting failed:", err);
//       alert("Minting failed. Check console for errors.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="text-white p-5 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Mint New NFT</h2>
//       <div className="space-y-3">
//         {["name", "symbol", "description", "certificateUrl"].map(field => (
//           <input
//             key={field}
//             placeholder={field}
//             value={(form as any)[field]}
//             onChange={e => setForm({ ...form, [field]: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded"
//           />
//         ))}
//         <input
//           type="date"
//           placeholder="Manufacture Date"
//           onChange={e => setForm({ ...form, manufactureDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           type="date"
//           placeholder="Expiry Date"
//           onChange={e => setForm({ ...form, expiryDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <div>
//           <label
//             htmlFor="fileInput"
//             className="block text-sm text-gray-300 mb-1"
//           >
//             Upload Product Image
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             onChange={e => setImageFile(e.target.files?.[0] || null)}
//             className="block w-full text-white"
//           />
//         </div>

//         <button
//           onClick={handleMint}
//           disabled={minting}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <p className="text-green-400 mt-3 break-all">
//             NFT Minted:{" "}
//             <a
//               href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               View on Solana Explorer
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;
// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNFTWithFirebaseStorage } from "../utils/solana"; // updated function

// const MintForm: React.FC = () => {
//   const { wallet } = useWallet();

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState("");
//   const [minting, setMinting] = useState(false);

//   const handleMint = async () => {
//     if (!wallet?.adapter?.publicKey) return alert("Please connect a wallet.");
//     if (!imageFile) return alert("Please select an image.");

//     setMinting(true);
//     try {
//       const nftAddress = await mintNFTWithFirebaseStorage(wallet.adapter, {
//         ...form,
//         imageFile,
//       });

//       setMintAddress(nftAddress);
//     } catch (err) {
//       console.error("Minting failed:", err);
//       alert("Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="text-white p-5 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Mint New NFT</h2>
//       <div className="space-y-3">
//         {["name", "symbol", "description", "certificateUrl"].map((field) => (
//           <input
//             key={field}
//             placeholder={field}
//             title={field}
//             value={(form as any)[field]}
//             onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded"
//           />
//         ))}
//         <input
//           type="date"
//           placeholder="Manufacture Date"
//           title="Manufacture Date"
//           onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <input
//           type="date"
//           placeholder="Expiry Date"
//           title="Expiry Date"
//           onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />
//         <div>
//           <label htmlFor="fileInput" className="block text-sm text-gray-300 mb-1">
//             Upload Product Image
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             title="NFT Image"
//             placeholder="NFT Image"
//             onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//             className="block w-full text-white"
//           />
//         </div>

//         <button
//           onClick={handleMint}
//           disabled={minting}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <p className="text-green-400 mt-3 break-all">
//             NFT Minted:{" "}
//             <a
//               href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               View on Solana Explorer
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;

// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNFTWithFirebaseStorage } from "../utils/solana";

// const MintForm: React.FC = () => {
//   const { wallet } = useWallet();

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState("");
//   const [minting, setMinting] = useState(false);
//   const [error, setError] = useState("");

//   const handleMint = async () => {
//     setError("");

//     // 1️⃣ Wallet check
//     if (!wallet?.adapter?.publicKey) {
//       setError("Please connect your Solana wallet first.");
//       return;
//     }

//     // 2️⃣ Basic validation
//     if (!form.name.trim() || !form.symbol.trim() || !form.description.trim()) {
//       setError("Please fill in all required fields (name, symbol, description).");
//       return;
//     }

//     if (!imageFile) {
//       setError("Please select an image for your NFT.");
//       return;
//     }

//     setMinting(true);
//     try {
//       const nftAddress = await mintNFTWithFirebaseStorage(wallet.adapter, {
//         ...form,
//         imageFile,
//       });

//       setMintAddress(nftAddress);
//     } catch (err: any) {
//       console.error("❌ Minting failed:", err);
//       setError(err.message || "Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="text-white p-6 max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-4 text-center">Mint New NFT</h2>

//       <div className="space-y-4">
//         {["name", "symbol", "description", "certificateUrl"].map((field) => (
//           <div key={field}>
//             <label className="block text-sm text-gray-300 mb-1 capitalize" htmlFor={field}>
//               {field}
//             </label>
//             <input
//               id={field}
//               type="text"
//               placeholder={`Enter ${field}`}
//               title={`Enter ${field}`}
//               value={(form as any)[field]}
//               onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//               className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         ))}

//         <div>
//           <label className="block text-sm text-gray-300 mb-1" htmlFor="manufactureDate">
//             Manufacture Date
//           </label>
//           <input
//             id="manufactureDate"
//             type="date"
//             title="Manufacture Date"
//             value={form.manufactureDate}
//             onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-300 mb-1" htmlFor="expiryDate">
//             Expiry Date
//           </label>
//           <input
//             id="expiryDate"
//             type="date"
//             title="Expiry Date"
//             value={form.expiryDate}
//             onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-300 mb-1" htmlFor="fileInput">
//             Upload Product Image
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             title="NFT Image"
//             placeholder="NFT Image"
//             onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//             className="block w-full text-gray-300"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button
//           type="button"
//           onClick={handleMint}
//           disabled={minting}
//           className={`w-full py-2 rounded font-semibold ${
//             minting
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700"
//           }`}
//           aria-label="Mint new NFT"
//           title="Mint new NFT"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <p className="text-green-400 mt-4 text-center break-all">
//             ✅ NFT Minted Successfully:{" "}
//             <a
//               href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline text-blue-400"
//             >
//               View on Solana Explorer
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;
// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNFTWithIPFS } from "../utils/solana"; // ✅ Updated import

// const MintForm: React.FC = () => {
//   const { wallet } = useWallet();

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState("");
//   const [ipfsUri, setIpfsUri] = useState("");
//   const [minting, setMinting] = useState(false);

//   // =============================================================
//   // HANDLE MINT
//   // =============================================================
//   const handleMint = async () => {
//     if (!wallet?.adapter?.publicKey) return alert("Please connect a wallet.");
//     if (!imageFile) return alert("Please select an image.");

//     setMinting(true);
//     try {
//       const nftAddress = await mintNFTWithIPFS(wallet.adapter, {
//         ...form,
//         imageFile,
//       });

//       // Save data in UI
//       setMintAddress(nftAddress);

//       // Extract IPFS URI from the Firestore or NFT.storage URL pattern
//       setIpfsUri(`https://nftstorage.link/ipfs/${nftAddress}`);
//       alert("✅ NFT Minted Successfully!");
//     } catch (err) {
//       console.error("Minting failed:", err);
//       alert("❌ Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   // =============================================================
//   // RENDER FORM
//   // =============================================================
//   return (
//     <div className="text-white p-6 max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Mint New NFT</h2>
//       <div className="space-y-4">
//         {["name", "symbol", "description", "certificateUrl"].map((field) => (
//           <div key={field}>
//             <label htmlFor={field} className="block text-gray-300 text-sm mb-1 capitalize">
//               {field}
//             </label>
//             <input
//               id={field}
//               placeholder={field}
//               title={field}
//               value={(form as any)[field]}
//               onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//               className="w-full p-2 bg-gray-800 rounded focus:ring-2 focus:ring-green-500 outline-none"
//             />
//           </div>
//         ))}

//         <div>
//           <label htmlFor="manufactureDate" className="block text-gray-300 text-sm mb-1">
//             Manufacture Date
//           </label>
//           <input
//             id="manufactureDate"
//             type="date"
//             title="Manufacture Date"
//             onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded focus:ring-2 focus:ring-green-500 outline-none"
//           />
//         </div>

//         <div>
//           <label htmlFor="expiryDate" className="block text-gray-300 text-sm mb-1">
//             Expiry Date
//           </label>
//           <input
//             id="expiryDate"
//             type="date"
//             title="Expiry Date"
//             onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded focus:ring-2 focus:ring-green-500 outline-none"
//           />
//         </div>

//         <div>
//           <label htmlFor="fileInput" className="block text-gray-300 text-sm mb-1">
//             Upload Product Image
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             title="NFT Image"
//             onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//             className="block w-full text-white"
//           />
//         </div>

//         <button
//           onClick={handleMint}
//           disabled={minting}
//           className={`w-full px-4 py-2 rounded text-white font-semibold ${
//             minting ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//           }`}
//           title="Mint NFT"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <div className="mt-5 p-3 border border-green-600 rounded-lg bg-gray-800 text-center">
//             <p className="text-green-400 break-words">
//               ✅ <strong>NFT Minted!</strong>
//             </p>
//             <p className="text-sm text-gray-300 mt-1">
//               <a
//                 href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline text-green-400"
//               >
//                 View on Solana Explorer
//               </a>
//             </p>
//             {ipfsUri && (
//               <p className="text-sm text-gray-300 mt-1">
//                 <a
//                   href={ipfsUri}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="underline text-blue-400"
//                 >
//                   View Metadata (IPFS)
//                 </a>
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;


// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNFTWithPinata } from "../utils/solana";

// const MintForm: React.FC = () => {
//   const { wallet } = useWallet();
//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState("");
//   const [minting, setMinting] = useState(false);

//   const handleMint = async () => {
//     if (!wallet?.adapter?.publicKey) return alert("Please connect a wallet.");
//     if (!imageFile) return alert("Please select an image.");

//     setMinting(true);
//     try {
//       const nftAddress = await mintNFTWithPinata(wallet.adapter, {
//         ...form,
//         imageFile,
//       });
//       setMintAddress(nftAddress);
//     } catch (err) {
//       console.error("❌ Minting failed:", err);
//       alert("Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="text-white p-5 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Mint New NFT</h2>

//       <div className="space-y-3">
//         {["name", "symbol", "description", "certificateUrl"].map((field) => (
//           <input
//             key={field}
//             placeholder={field}
//             title={field}
//             value={(form as any)[field]}
//             onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded"
//           />
//         ))}

//         <input
//           type="date"
//           title="Manufacture Date"
//           onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />

//         <input
//           type="date"
//           title="Expiry Date"
//           onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded"
//         />

//         <div>
//           <label htmlFor="fileInput" className="block text-sm text-gray-300 mb-1">
//             Upload Product Image
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             title="NFT Image"
//             onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//             className="block w-full text-white"
//           />
//         </div>

//         <button
//           onClick={handleMint}
//           disabled={minting}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <p className="text-green-400 mt-3 break-all">
//             NFT Minted:{" "}
//             <a
//               href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline text-blue-400"
//             >
//               View on Solana Explorer
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;
// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { mintNormalNFTWithQuantity } from "../utils/solana"; // ✅ import correct function

// const MintForm: React.FC = () => {
//   const wallet = useWallet();

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [minting, setMinting] = useState(false);
//   const [mintAddresses, setMintAddresses] = useState<string[]>([]);

//   const handleMint = async () => {
//     if (!wallet.connected || !wallet.publicKey) {
//       alert("Please connect your Solana wallet first.");
//       return;
//     }

//     if (!imageFile) {
//       alert("Please select an image to mint your NFT.");
//       return;
//     }

//     if (!form.name.trim() || !form.symbol.trim()) {
//       alert("Name and Symbol are required.");
//       return;
//     }

//     setMinting(true);
//     try {
//       const nfts = await mintNormalNFTWithQuantity(wallet as any, {
//         ...form,
//         imageFile,
//       }, quantity);

//       setMintAddresses(nfts);
//       console.log("✅ Minted NFTs:", nfts);
//     } catch (err) {
//       console.error("❌ Minting Failed:", err);
//       alert("Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto text-white p-6 bg-gray-900 rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-center">Mint New NFT (SFT)</h2>
//       <div className="space-y-3">
//         {["name", "symbol", "description", "certificateUrl"].map((field) => (
//           <input
//             key={field}
//             title={field}
//             placeholder={field}
//             value={(form as any)[field]}
//             onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//             className="w-full p-2 bg-gray-800 rounded text-white placeholder-gray-400"
//           />
//         ))}

//         <input
//           type="date"
//           title="Manufacture Date"
//           value={form.manufactureDate}
//           onChange={(e) =>
//             setForm({ ...form, manufactureDate: e.target.value })
//           }
//           className="w-full p-2 bg-gray-800 rounded text-white"
//         />
//         <input
//           type="date"
//           title="Expiry Date"
//           value={form.expiryDate}
//           onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//           className="w-full p-2 bg-gray-800 rounded text-white"
//         />

//         <div>
//           <label
//             htmlFor="fileInput"
//             className="block text-sm font-medium text-gray-300 mb-1"
//           >
//             Upload Product Image
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             title="NFT Image"
//             onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//             className="block w-full text-sm text-gray-300 bg-gray-800 rounded cursor-pointer"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="quantityInput"
//             className="block text-sm font-medium text-gray-300 mb-1"
//           >
//             Quantity to Mint
//           </label>
//           <input
//             id="quantityInput"
//             type="number"
//             min="1"
//             max="100"
//             title="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-full p-2 bg-gray-800 rounded text-white"
//           />
//         </div>

//         <button
//           onClick={handleMint}
//           disabled={minting}
//           title="Mint NFT"
//           className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition"
//         >
//           {minting ? "Minting..." : "Mint NFT(s)"}
//         </button>

//         {mintAddresses.length > 0 && (
//           <div className="mt-4 space-y-2">
//             <p className="text-green-400 font-semibold">🎉 Successfully Minted:</p>
//             {mintAddresses.map((addr, index) => (
//               <p key={index} className="text-sm break-all text-gray-300">
//                 <a
//                   href={`https://explorer.solana.com/address/${addr}?cluster=devnet`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="underline text-blue-400"
//                 >
//                   {addr}
//                 </a>
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;

// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Connection, Transaction } from "@solana/web3.js";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { db } from "../utils/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const MintForm: React.FC = () => {
//   const wallet = useWallet();
//   const [minting, setMinting] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState<string | null>(null);

//   const connection = new Connection(import.meta.env.VITE_SHYFT_RPC!, "confirmed");

//   // Upload image to Pinata
//   const uploadToPinata = async (file: File) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         headers: {
//           pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//           pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//         },
//       });

//       const imageUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
//       console.log("✅ Image uploaded:", imageUrl);
//       return imageUrl;
//     } catch (err) {
//       console.error("❌ Pinata upload failed:", err);
//       toast.error("Image upload failed");
//       throw err;
//     }
//   };

//   // Upload metadata JSON to Pinata
//   const uploadMetadata = async (imageUrl: string) => {
//     try {
//       const metadata = {
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//         image: imageUrl,
//         seller_fee_basis_points: 500, // 5% royalty
//         attributes: [
//           { trait_type: "Manufacture Date", value: form.manufactureDate || "N/A" },
//           { trait_type: "Expiry Date", value: form.expiryDate || "N/A" },
//           { trait_type: "Certificate URL", value: form.certificateUrl || "N/A" },
//         ],
//         properties: {
//           creators: [
//             { address: wallet.publicKey?.toBase58(), share: 100 },
//           ],
//           files: [{ uri: imageUrl, type: "image/jpg" }],
//         },
//       };

//       const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
//         headers: {
//           pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//           pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//         },
//       });

//       const metadataUri = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
//       console.log("✅ Metadata uploaded:", metadataUri);
//       return metadataUri;
//     } catch (err) {
//       console.error("❌ Metadata upload failed:", err);
//       toast.error("Metadata upload failed");
//       throw err;
//     }
//   };

//   const handleMint = async () => {
//     if (!wallet.connected || !wallet.publicKey) {
//       toast.error("Please connect your wallet!");
//       return;
//     }

//     if (!form.name.trim() || !form.symbol.trim()) {
//       toast.error("Name and symbol are required!");
//       return;
//     }

//     if (!imageFile) {
//       toast.error("Please upload an image file.");
//       return;
//     }

//     try {
//       setMinting(true);
//       toast.loading("Minting your NFT...");

//       // Step 1: Upload image
//       const imageUrl = await uploadToPinata(imageFile);

//       // Step 2: Upload metadata
//       const metadataUri = await uploadMetadata(imageUrl);

//       // Step 3: Mint NFT via Shyft API
//       const baseUrl = import.meta.env.VITE_SHYFT_ENDPOINT!.replace(/\/+$/, "");

//       const res = await axios.post(
//         `${baseUrl}/nft/create_from_metadata`,
//         {
//           network: import.meta.env.VITE_NETWORK,
//           wallet: wallet.publicKey.toBase58(),
//           metadata_uri: metadataUri,
//         },
//         {
//           headers: {
//             "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.data.success) throw new Error(res.data.message || "Minting failed");

//       const encodedTx = res.data.result.encoded_transaction;
//       const mint = res.data.result.mint;

//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));
//       const signature = await wallet.sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, "confirmed");

//       // Step 4: Save to Firestore
//       await addDoc(collection(db, "nfts"), {
//         mintAddress: mint,
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//         image: imageUrl,
//         metadataUri: metadataUri,
//         manufactureDate: form.manufactureDate || "",
//         expiryDate: form.expiryDate || "",
//         certificateUrl: form.certificateUrl || "",
//         owner: wallet.publicKey.toBase58(),
//         txSignature: signature,
//         createdAt: serverTimestamp(),
//       });

//       toast.dismiss();
//       toast.success("🎉 NFT Minted Successfully!");
//       setMintAddress(mint);

//       // Clear form
//       setForm({
//         name: "",
//         symbol: "",
//         description: "",
//         manufactureDate: "",
//         expiryDate: "",
//         certificateUrl: "",
//       });
//       setImageFile(null);
//     } catch (err: any) {
//       toast.dismiss();
//       console.error("❌ Minting Failed:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Minting failed. Check console for details.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <Toaster position="top-right" />
//       <h2 className="text-3xl font-bold mb-4 text-center">Mint New NFT</h2>

//       <div className="max-w-lg mx-auto space-y-3 bg-gray-900 p-6 rounded-2xl shadow-lg">
//         {["name", "symbol", "description", "certificateUrl"].map((field) => (
//           <div key={field}>
//             <label
//               htmlFor={field}
//               className="block text-sm font-medium text-gray-300 mb-1 capitalize"
//             >
//               {field}
//             </label>
//             <input
//               id={field}
//               placeholder={`Enter ${field}`}
//               value={(form as any)[field]}
//               onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//               className="w-full p-2 bg-gray-800 rounded text-white placeholder-gray-400"
//             />
//           </div>
//         ))}

//         <div>
//   <label
//     htmlFor="manufactureDate"
//     className="block text-sm font-medium text-gray-300 mb-1"
//   >
//     Manufacture Date
//   </label>
//   <input
//     id="manufactureDate"
//     type="date"
//     title="Manufacture Date"
//     aria-label="Manufacture Date"
//     value={form.manufactureDate}
//     onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
//     className="w-full p-2 bg-gray-800 rounded text-white"
//   />
// </div>

// <div>
//   <label
//     htmlFor="expiryDate"
//     className="block text-sm font-medium text-gray-300 mb-1"
//   >
//     Expiry Date
//   </label>
//   <input
//     id="expiryDate"
//     type="date"
//     title="Expiry Date"
//     aria-label="Expiry Date"
//     value={form.expiryDate}
//     onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//     className="w-full p-2 bg-gray-800 rounded text-white"
//   />
// </div>

// <div>
//   <label
//     htmlFor="fileInput"
//     className="block text-sm font-medium text-gray-300 mb-1"
//   >
//     Upload Product Image
//   </label>
//   <input
//     id="fileInput"
//     type="file"
//     accept="image/*"
//     title="NFT Image"
//     aria-label="NFT Image"
//     onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//     className="block w-full text-sm text-gray-300 bg-gray-800 rounded cursor-pointer"
//   />
// </div>


//         <button
//           onClick={handleMint}
//           disabled={minting}
//           className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded transition"
//         >
//           {minting ? "Minting..." : "Mint NFT"}
//         </button>

//         {mintAddress && (
//           <div className="mt-4 text-center">
//             <p className="text-green-400 font-semibold">✅ Successfully Minted:</p>
//             <a
//               href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline text-blue-400 break-all"
//             >
//               {mintAddress}
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintForm;

// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Connection, Transaction } from "@solana/web3.js";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { db } from "../utils/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const MintForm: React.FC = () => {
//   const wallet = useWallet();
//   const [minting, setMinting] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//     weight: "", // NEW FIELD
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState<string | null>(null);

//   const connection = new Connection(import.meta.env.VITE_SHYFT_RPC!, "confirmed");

//   // Upload image to Pinata
//   const uploadToPinata = async (file: File) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         headers: {
//           pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//           pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//         },
//       });

//       return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
//     } catch (err) {
//       toast.error("Image upload failed");
//       throw err;
//     }
//   };

//   // Upload metadata JSON to Pinata
//   const uploadMetadata = async (imageUrl: string) => {
//     try {
//       const metadata = {
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//         image: imageUrl,
//         seller_fee_basis_points: 500,
//         attributes: [
//           { trait_type: "Manufacture Date", value: form.manufactureDate || "N/A" },
//           { trait_type: "Expiry Date", value: form.expiryDate || "N/A" },
//           { trait_type: "Certificate URL", value: form.certificateUrl || "N/A" },
//           { trait_type: "Weight (g)", value: form.weight || "N/A" }, // NEW
//         ],
//         properties: {
//           creators: [{ address: wallet.publicKey?.toBase58(), share: 100 }],
//           files: [{ uri: imageUrl, type: "image/jpg" }],
//         },
//       };

//       const res = await axios.post(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         metadata,
//         {
//           headers: {
//             pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//             pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//           },
//         }
//       );

//       return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
//     } catch (err) {
//       toast.error("Metadata upload failed");
//       throw err;
//     }
//   };

//   // MAIN MINT FUNCTION
//   const handleMint = async () => {
//     if (!wallet.connected || !wallet.publicKey) {
//       toast.error("Please connect your wallet!");
//       return;
//     }

//     if (!imageFile) {
//       toast.error("Please upload an image.");
//       return;
//     }

//     if (!form.weight) {
//       toast.error("Weight is required.");
//       return;
//     }

//     try {
//       setMinting(true);
//       toast.loading("Minting NFT...");

//       // 1️⃣ Upload image
//       const imageUrl = await uploadToPinata(imageFile);

//       // 2️⃣ Upload metadata
//       const metadataUri = await uploadMetadata(imageUrl);

//       // 3️⃣ MINT using SHYFT — FIXED 🚀
//       const baseUrl = import.meta.env.VITE_SHYFT_ENDPOINT!.replace(/\/+$/, "");

//       const res = await axios.post(
//         `${baseUrl}/nft/create_from_metadata`,
//         {
//           network: import.meta.env.VITE_NETWORK,
//           wallet: wallet.publicKey.toBase58(),
//           metadata_uri: metadataUri,

//           // ⭐ REQUIRED TO LET BUYER BURN LATER
//           update_authority: wallet.publicKey.toBase58(),
//         },
//         {
//           headers: {
//             "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.data.success) {
//         toast.error("Minting failed");
//         return;
//       }

//       const encodedTx = res.data.result.encoded_transaction;
//       const mint = res.data.result.mint;

//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));
//       const signature = await wallet.sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, "confirmed");

//       // 4️⃣ Save NFT info to Firestore
//       await addDoc(collection(db, "nfts"), {
//         mintAddress: mint,
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//         image: imageUrl,
//         metadataUri,
//         manufactureDate: form.manufactureDate,
//         expiryDate: form.expiryDate,
//         certificateUrl: form.certificateUrl,
//         weight: form.weight, // SAVE WEIGHT
//         owner: wallet.publicKey.toBase58(),
//         txSignature: signature,
//         createdAt: serverTimestamp(),
//       });

//       toast.dismiss();
//       toast.success("🎉 NFT Minted Successfully!");
//       setMintAddress(mint);

//       // reset form
//       setForm({
//         name: "",
//         symbol: "",
//         description: "",
//         manufactureDate: "",
//         expiryDate: "",
//         certificateUrl: "",
//         weight: "",
//       });
//       setImageFile(null);

//     } catch (err: any) {
//       toast.dismiss();
//       toast.error(err.response?.data?.message || "Minting failed.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//   <div className="min-h-screen bg-gray-950 text-white p-6">
//     <Toaster position="top-right" />
//     <h2 className="text-3xl font-bold mb-4 text-center">Mint New NFT</h2>

//     <div className="max-w-lg mx-auto space-y-3 bg-gray-900 p-6 rounded-2xl shadow-lg">

//       {/* NAME */}
//       <div>
//         <label htmlFor="name" className="block text-sm mb-1">Name</label>
//         <input
//           id="name"
//           title="NFT Name"
//           aria-label="NFT Name"
//           placeholder="Enter product name"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//       </div>

//       {/* SYMBOL */}
//       <div>
//         <label htmlFor="symbol" className="block text-sm mb-1">Symbol</label>
//         <input
//           id="symbol"
//           title="NFT Symbol"
//           aria-label="NFT Symbol"
//           placeholder="Enter NFT symbol"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.symbol}
//           onChange={(e) => setForm({ ...form, symbol: e.target.value })}
//           required
//         />
//       </div>

//       {/* DESCRIPTION */}
//       <div>
//         <label htmlFor="description" className="block text-sm mb-1">Description</label>
//         <input
//           id="description"
//           title="Description"
//           aria-label="Description"
//           placeholder="Enter product description"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         />
//       </div>

//       {/* CERTIFICATE URL */}
//       <div>
//         <label htmlFor="certificateUrl" className="block text-sm mb-1">
//           Certificate URL
//         </label>
//         <input
//           id="certificateUrl"
//           title="Certificate URL"
//           aria-label="Certificate URL"
//           placeholder="Enter certificate URL"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.certificateUrl}
//           onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
//         />
//       </div>

//       {/* MANUFACTURE DATE */}
//       <div>
//         <label htmlFor="manufactureDate" className="block text-sm mb-1">
//           Manufacture Date
//         </label>
//         <input
//           id="manufactureDate"
//           type="date"
//           title="Manufacture Date"
//           aria-label="Manufacture Date"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.manufactureDate}
//           onChange={(e) =>
//             setForm({ ...form, manufactureDate: e.target.value })
//           }
//         />
//       </div>

//       {/* EXPIRY DATE */}
//       <div>
//         <label htmlFor="expiryDate" className="block text-sm mb-1">
//           Expiry Date
//         </label>
//         <input
//           id="expiryDate"
//           type="date"
//           title="Expiry Date"
//           aria-label="Expiry Date"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.expiryDate}
//           onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//         />
//       </div>

//       {/* WEIGHT FIELD */}
//       <div>
//         <label htmlFor="weight" className="block text-sm mb-1">
//           Weight (grams)
//         </label>
//         <input
//           id="weight"
//           type="number"
//           title="Weight in grams"
//           aria-label="Weight in grams"
//           placeholder="Enter weight in grams"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.weight}
//           onChange={(e) => setForm({ ...form, weight: e.target.value })}
//           required
//         />
//       </div>

//       {/* IMAGE UPLOAD */}
//       <div>
//         <label htmlFor="fileInput" className="block text-sm mb-1">
//           Product Image
//         </label>
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           title="Product image upload"
//           aria-label="Upload product image"
//           className="block w-full text-sm bg-gray-800 rounded"
//           onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//           required
//         />
//       </div>

//       {/* MINT BUTTON */}
//       <button
//         onClick={handleMint}
//         disabled={minting}
//         className="w-full bg-green-600 py-2 rounded mt-3"
//       >
//         {minting ? "Minting..." : "Mint NFT"}
//       </button>

//       {/* MINTED ADDRESS */}
//       {mintAddress && (
//         <div className="mt-4 text-center">
//           <p className="text-green-400 font-semibold">✅ Successfully Minted:</p>
//           <a
//             href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//             target="_blank"
//             className="underline text-blue-400 break-all"
//           >
//             {mintAddress}
//           </a>
//         </div>
//       )}
//     </div>
//   </div>
// );

// };

// export default MintForm;

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { db } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const MintForm: React.FC = () => {
  const wallet = useWallet();
  const [minting, setMinting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    symbol: "",
    description: "",
    certificateUrl: "",
    manufactureDate: "",
    expiryDate: "",
    weight: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  /** Upload to Pinata: Image */
  const uploadToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  };

  /** Upload metadata JSON */
  const uploadMetadata = async (imageUrl: string) => {
    const metadata = {
      name: form.name,
      symbol: form.symbol,
      description: form.description,
      image: imageUrl,
      attributes: [
        { trait_type: "Manufacture Date", value: form.manufactureDate },
        { trait_type: "Expiry Date", value: form.expiryDate },
        { trait_type: "Certificate URL", value: form.certificateUrl },
        { trait_type: "Weight (g)", value: form.weight },
      ],
      properties: {
        files: [{ uri: imageUrl, type: "image/png" }],
        category: "image",
      },
    };

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  };

  /** Mint NFT */
  const handleMint = async () => {
    if (!wallet.publicKey) {
      toast.error("Connect your wallet first!");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    if (!form.weight.trim()) {
      toast.error("Weight is required");
      return;
    }

    try {
      setMinting(true);
      toast.loading("Uploading image…");

      const imageUrl = await uploadToPinata(imageFile);

      toast.dismiss();
      toast.loading("Uploading metadata…");

      const metadataUri = await uploadMetadata(imageUrl);

      toast.dismiss();
      toast.loading("Minting NFT…");

      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      /** MINT NFT HERE */
      const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: form.name,
        symbol: form.symbol,
        sellerFeeBasisPoints: 500,
      });

      const mintStr = nft.address.toBase58();
      setMintAddress(mintStr);

      toast.dismiss();
      toast.success("🎉 NFT Minted Successfully!");

      /** Save NFT to Firestore */
      await addDoc(collection(db, "nfts"), {
        mintAddress: mintStr,
        name: form.name,
        symbol: form.symbol,
        description: form.description,
        image: imageUrl,
        metadataUri,
        certificateUrl: form.certificateUrl,
        manufactureDate: form.manufactureDate,
        expiryDate: form.expiryDate,
        weight: form.weight,
        owner: wallet.publicKey.toBase58(),
        createdAt: serverTimestamp(),
      });

      /** Reset form */
      setForm({
        name: "",
        symbol: "",
        description: "",
        certificateUrl: "",
        manufactureDate: "",
        expiryDate: "",
        weight: "",
      });
      setImageFile(null);
    } catch (err: any) {
      toast.dismiss();
      console.error(err);
      toast.error(err.message || "Minting failed");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-4 text-center">Mint New NFT</h2>

      <div className="max-w-lg mx-auto space-y-3 bg-gray-900 p-6 rounded-xl shadow">

        {/* NAME */}
        <label>Name</label>
        <input
          placeholder="Product name"
          aria-label="Product name"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* SYMBOL */}
        <label>Symbol</label>
        <input
          placeholder="NFT symbol"
          aria-label="NFT symbol"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value })}
        />

        {/* DESCRIPTION */}
        <label>Description</label>
        <input
          placeholder="Description"
          aria-label="Description"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* CERTIFICATE */}
        <label>Certificate URL</label>
        <input
          placeholder="Certificate URL"
          aria-label="Certificate URL"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.certificateUrl}
          onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
        />

        {/* MANUFACTURE DATE */}
        <label>Manufacture Date</label>
        <input
          type="date"
          aria-label="Manufacture date"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.manufactureDate}
          onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
        />

        {/* EXPIRY DATE */}
        <label>Expiry Date</label>
        <input
          type="date"
          aria-label="Expiry date"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
        />

        {/* WEIGHT */}
        <label>Weight (grams)</label>
        <input
          type="number"
          placeholder="Weight in grams"
          aria-label="weight in grams"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />

        {/* IMAGE UPLOAD */}
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          aria-label="product image upload"
          className="w-full text-sm bg-gray-800 rounded"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        {/* BUTTON */}
        <button
          onClick={handleMint}
          disabled={minting}
          className="w-full bg-green-600 py-2 rounded mt-3"
        >
          {minting ? "Minting..." : "Mint NFT"}
        </button>

        {mintAddress && (
          <div className="mt-4 text-center">
            <p className="text-green-400 font-semibold">Minted:</p>
            <a
              className="underline text-blue-400"
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target="_blank"
            >
              {mintAddress}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintForm;
