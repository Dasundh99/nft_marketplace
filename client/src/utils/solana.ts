// import { clusterApiUrl, Connection } from "@solana/web3.js";
// import {
//   Metaplex,
//   walletAdapterIdentity,
//   toMetaplexFile,
// } from "@metaplex-foundation/js";
// import { irysStorage } from "@metaplex-foundation/js";
// import type { WalletAdapter } from "@solana/wallet-adapter-base";

// export interface NFTMetadata {
//   name: string;
//   symbol: string;
//   description: string;
//   imageBuffer: Buffer;
//   manufactureDate: string;
//   expiryDate: string;
//   certificateUrl: string;
// }

// function getMetaplex(walletAdapter: WalletAdapter) {
//   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//   return Metaplex.make(connection)
//     .use(walletAdapterIdentity(walletAdapter))
//     .use(
//       irysStorage({
//         address: "https://devnet.irys.xyz",
//         providerUrl: "https://api.devnet.solana.com",
//         timeout: 60000,
//       })
//     );
// }

// export async function mintNFT(
//   walletAdapter: WalletAdapter,
//   metadata: NFTMetadata
// ): Promise<string> {
//   const metaplex = getMetaplex(walletAdapter);

//   // Convert the image buffer into a Metaplex-compatible file
//   const imageFile = toMetaplexFile(metadata.imageBuffer, "nft-image.png");

//   // Upload metadata to Irys
//   const { uri } = await metaplex.nfts().uploadMetadata({
//     name: metadata.name,
//     symbol: metadata.symbol,
//     description: metadata.description,
//     image: imageFile,
//     attributes: [
//       { trait_type: "Manufacture Date", value: metadata.manufactureDate },
//       { trait_type: "Expiry Date", value: metadata.expiryDate },
//       { trait_type: "Certificate", value: metadata.certificateUrl },
//     ],
//   });

//   // Mint NFT using Metaplex v1 `.create()` (no custom mint support here)
//   const { nft } = await metaplex.nfts().create({
//     uri,
//     name: metadata.name,
//     symbol: metadata.symbol,
//     sellerFeeBasisPoints: 0,
//   });

//   return nft.address.toBase58();
// }
// import { clusterApiUrl, Connection } from "@solana/web3.js";
// import type { Nft } from "@metaplex-foundation/js";
// import {
//   Metaplex,
//   walletAdapterIdentity,
//   toMetaplexFile,
//   irysStorage,
// } from "@metaplex-foundation/js";
// import type { WalletAdapter } from "@solana/wallet-adapter-base";

// export interface NFTMetadata {
//   name: string;
//   symbol: string;
//   description: string;
//   imageBuffer: Buffer;
//   manufactureDate: string;
//   expiryDate: string;
//   certificateUrl: string;
// }

// export function getMetaplex(walletAdapter: WalletAdapter) {
//   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//   return Metaplex.make(connection)
//     .use(walletAdapterIdentity(walletAdapter))
//     .use(
//       irysStorage({
//         address: "https://devnet.irys.xyz",
//         providerUrl: "https://api.devnet.solana.com",
//         timeout: 60000,
//       })
//     );
// }

// export async function mintNFT(
//   walletAdapter: WalletAdapter,
//   metadata: NFTMetadata
// ): Promise<string> {
//   const metaplex = getMetaplex(walletAdapter);
//   const imageFile = toMetaplexFile(metadata.imageBuffer, "nft-image.png");

//   const { uri } = await metaplex.nfts().uploadMetadata({
//     name: metadata.name,
//     symbol: metadata.symbol,
//     description: metadata.description,
//     image: imageFile,
//     attributes: [
//       { trait_type: "Manufacture Date", value: metadata.manufactureDate },
//       { trait_type: "Expiry Date", value: metadata.expiryDate },
//       { trait_type: "Certificate", value: metadata.certificateUrl },
//     ],
//   });

//   console.log("Uploaded URI:", uri); // Debug URI

//   const { nft } = await metaplex.nfts().create({
//     uri,
//     name: metadata.name,
//     symbol: metadata.symbol,
//     sellerFeeBasisPoints: 0,
//   });

//   return nft.address.toBase58();
// }

// export async function fetchNFTsForWallet(walletAdapter: WalletAdapter): Promise<Nft[]> {
//   const metaplex = getMetaplex(walletAdapter);
//   const owner = walletAdapter.publicKey;

//   if (!owner) throw new Error("Wallet not connected");

//   const assets = await metaplex.nfts().findAllByOwner({ owner });

//   const nfts: Nft[] = [];

//   for (const asset of assets) {
//     if (asset.model === "nft") {
//       try {
//         const full = await metaplex.nfts().findByMint({ mintAddress: asset.address });
//         if (full.model === "nft") {
//           console.log("Loaded NFT URI:", full.uri);
//           nfts.push(full);
//         }
//       } catch (err) {
//         console.warn("Error loading NFT:", err);
//       }
//     }
//   }

//   return nfts;
// }
import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  Metaplex,
  walletAdapterIdentity,
  irysStorage,
  
} from "@metaplex-foundation/js";
import type { WalletAdapter } from "@solana/wallet-adapter-base";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
} from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebase"; // Firebase app initialized here

// ----------------- Types -----------------
export interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  imageFile: File;
  manufactureDate: string;
  expiryDate: string;
  certificateUrl: string;
}

// ----------------- Metaplex Setup -----------------
export function getMetaplex(walletAdapter: WalletAdapter) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  return Metaplex.make(connection)
    .use(walletAdapterIdentity(walletAdapter))
    .use(
      irysStorage({
        address: "https://devnet.irys.xyz",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );
}

// ----------------- Mint NFT Function -----------------
export async function mintNFTWithFirebaseStorage(
  walletAdapter: WalletAdapter,
  metadata: NFTMetadata
): Promise<string> {
  const { name, symbol, description, imageFile, manufactureDate, expiryDate, certificateUrl } =
    metadata;

  if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

  // 1. Upload image to Firebase Storage
  const storage = getStorage(app);
  const storageRef = ref(
    storage,
    `nft-images/${Date.now()}-${imageFile.name}`
  );
  const imageBytes = await imageFile.arrayBuffer();
  await uploadBytes(storageRef, imageBytes);
  const imageUrl = await getDownloadURL(storageRef);

  // 2. Create metadata JSON
  const metadataJson = {
    name,
    symbol,
    description,
    image: imageUrl,
    attributes: [
      { trait_type: "Manufacture Date", value: manufactureDate },
      { trait_type: "Expiry Date", value: expiryDate },
      { trait_type: "Certificate", value: certificateUrl },
    ],
  };

  // 3. Upload metadata to Irys (Arweave)
  const metaplex = getMetaplex(walletAdapter);
  const { uri } = await metaplex.nfts().uploadMetadata(metadataJson);

  // 4. Mint NFT using uploaded URI
  const { nft } = await metaplex.nfts().create({
    uri,
    name,
    symbol,
    sellerFeeBasisPoints: 0, // no royalties
  });

  // 5. Save record to Firestore
  const db = getFirestore(app);
  await setDoc(doc(db, "nfts", nft.address.toBase58()), {
    mintAddress: nft.address.toBase58(),
    name,
    description,
    image: imageUrl,
    manufactureDate,
    expiryDate,
    certificateUrl,
    owner: walletAdapter.publicKey.toBase58(),
    metadataUri: uri,
    createdAt: new Date().toISOString(),
  });

  return nft.address.toBase58();
}
