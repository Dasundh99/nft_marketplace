import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface NFT {
    id: string;
    name: string;
    image: string;
    owner: string;
    mintAddress: string;
    createdAt: string;
    manufactureDate: string;
    expiryDate: string;
    certificateUrl: string;
    description: string;
    metadataUri: string;
}

const NftTable: React.FC = () => {
    const [nfts, setNfts] = useState<NFT[]>([]);

    useEffect(() => {
        //create a firestore query
        const q = query(collection(db, "nfts"), orderBy("createdAt","desc"));

        // set a real time listener on the nfts collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            })) as NFT[];
            
            //update the react state with the fetched nft data
            setNfts(data);
        });

        // cleanup the listener when components unmount
        return () => unsubscribe();
    }, []);

    // handles the both created date types Timestamp and string
    const formattedDate = (createdAt: any) => {
        if(!createdAt) return "-";
        try{
            if(createdAt.toDate){
                return createdAt.toDate().toLocaleDateString(); //Timestamp
            }
            return new Date(createdAt).toLocaleDateString(); //string
        }
        catch {
            return "Imvalid Date";
        }
    };


    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-xl font-semibold text-white mb-6 text-center">
                NFT Marketplace Dashoard
            </h1>
            {/**Mfts transaction table */}
            <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Created Date</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Owner</th>
                            <th className="p-3">Manufactured Date</th>
                            <th className="p-3">Expiry Date</th>
                            <th className="p-3">Mint Address</th>
                            <th className="p-3">Certificate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nfts.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-10 text-gray-300 italic">
                                    No Nfts minted yet
                                </td>
                            </tr>
                        )}
                        {nfts.map((nft) => (
                            <tr
                            key={nft.id}
                            className="border-t border-gray-700 hover:bg-gray-700">
                                <td className="p-3">
                                    <img src={nft.image} alt={nft.name} 
                                    className="w-14 h-14 rounded-lg object-cover border border-gray-800"/>
                                </td>
                                <td className="p-3">{formattedDate(nft.createdAt)}</td>
                                <td className="p-3 font-medium">{nft.name}</td>
                                <td className="p-3 text-gray-400">{nft.owner}</td>
                                <td>{nft.manufactureDate}</td>
                                <td>{nft.expiryDate}</td>
                                <td>{nft.mintAddress}</td>
                                <td className="p-3">
                                    <a href="{nft.certificateUrl}"
                                    target="_blank"
                                    className="text-blue-500 underline hover:text-blue-400">
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NftTable;
