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
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintNFTWithFirebaseStorage } from "../utils/solana"; // updated function

const MintForm: React.FC = () => {
  const { wallet } = useWallet();

  const [form, setForm] = useState({
    name: "",
    symbol: "",
    description: "",
    manufactureDate: "",
    expiryDate: "",
    certificateUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mintAddress, setMintAddress] = useState("");
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    if (!wallet?.adapter?.publicKey) return alert("Please connect a wallet.");
    if (!imageFile) return alert("Please select an image.");

    setMinting(true);
    try {
      const nftAddress = await mintNFTWithFirebaseStorage(wallet.adapter, {
        ...form,
        imageFile,
      });

      setMintAddress(nftAddress);
    } catch (err) {
      console.error("Minting failed:", err);
      alert("Minting failed. Check console for details.");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="text-white p-5 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mint New NFT</h2>
      <div className="space-y-3">
        {["name", "symbol", "description", "certificateUrl"].map((field) => (
          <input
            key={field}
            placeholder={field}
            title={field}
            value={(form as any)[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
          />
        ))}
        <input
          type="date"
          placeholder="Manufacture Date"
          title="Manufacture Date"
          onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="date"
          placeholder="Expiry Date"
          title="Expiry Date"
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <div>
          <label htmlFor="fileInput" className="block text-sm text-gray-300 mb-1">
            Upload Product Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            title="NFT Image"
            placeholder="NFT Image"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="block w-full text-white"
          />
        </div>

        <button
          onClick={handleMint}
          disabled={minting}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {minting ? "Minting..." : "Mint NFT"}
        </button>

        {mintAddress && (
          <p className="text-green-400 mt-3 break-all">
            NFT Minted:{" "}
            <a
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on Solana Explorer
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default MintForm;

