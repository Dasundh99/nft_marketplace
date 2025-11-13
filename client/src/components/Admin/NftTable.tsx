import { collection, onSnapshot} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface NFT {
    id: string;
    name?: string;
    image?: string;
    owner?: string;
    mintAddress?: string;
    createdAt: any;
    manufactureDate: string;
    expiryDate: string;
    certificateUrl: string;
    description: string;
    metadataUri: string;
}

interface NFTwithOrderedDate extends NFT {
    createdAtDate: Date;
}

const NftTable: React.FC = () => {
    const [nfts, setNfts] = useState<NFTwithOrderedDate[]>([]);

    useEffect(() => {
        // set a real time listener on the nfts collection
        const unsubscribe = onSnapshot(collection(db, "nfts"), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const nft = doc.data() as NFT;

                // skip NFT with no created date
                if(!nft.createdAt) return null;
                
                let createdAtDate: Date | null = null;

                try{
                    if(nft.createdAt?.toDate){
                        createdAtDate = nft.createdAt.toDate(); //Timestamp
                    } else if(typeof nft.createdAt === "string"){
                        const d= new Date(nft.createdAt);
                        if(!isNaN(d.getTime())) createdAtDate = d; // string date
                    }
                } catch {}

                // skip if created at is invalid
                if(!createdAtDate) return null;
                return {
                    ...nft,
                    id: doc.id,
                    createdAtDate,
                };
            })
            
            // remove skipped entries
            .filter((item) : item is NFTwithOrderedDate => item !== null)
            
            // sort by date desc
            .sort((a,b) => b.createdAtDate.getTime() - a.createdAtDate.getTime());

            setNfts(data);

        });

        return () => unsubscribe();
    }, []);
    
    const formattedDate = (date: Date) => {
    
        return date.toLocaleDateString();
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
                                <td className="p-3">{formattedDate(nft.createdAtDate)}</td>
                                <td className="p-3 font-medium">{nft.name}</td>
                                <td className="p-3 text-gray-400">{nft.owner}</td>
                                <td>{nft.manufactureDate}</td>
                                <td>{nft.expiryDate}</td>
                                <td>{nft.mintAddress}</td>
                                <td className="p-3">
                                    <a href={nft.certificateUrl}
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
