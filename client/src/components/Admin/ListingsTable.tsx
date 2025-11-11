import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface Listing {
    id: string;
    seller: string;
    nftMint: string;
    price: number;
    quantity: number;
    currency: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    expiry: string;
    txSignature?: string;
}

const ListingTable: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        //create a firestore query
        const q = query(collection(db, "listings"), orderBy("createdAt","desc"));

        // set a real time listener on the nfts collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            })) as Listing[];
            
            //update the react state with the fetched nft data
            setListings(data);
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

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()){
            case "active":
                return "text-green-400";
            case "cancelled":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-xl font-semibold text-white mb-6 text-center">
                Listings Dashoard
            </h1>
            {/**Mfts transaction table */}
            <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-3">NFT Mint</th>
                            <th className="p-3">Created Date</th>
                            <th className="p-3">Seller</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Currency</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Updated At</th>
                            <th className="p-3">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-10 text-gray-300 italic">
                                    No listings found
                                </td>
                            </tr>
                        )}
                        {listings.map((listing) => (
                            <tr
                            key={listing.id}
                            className="border-t border-gray-700 hover:bg-gray-700">
                                <td className="p-3 font-medium text-indigo-300">{listing.nftMint}</td>
                                <td className="p-3">{formattedDate(listing.createdAt)}</td>
                                <td className="p-3 font-medium">{listing.seller}</td>
                                <td className="p-3 font-semibold">{listing.price ?? "-"}</td>
                                <td className="p-3">{listing.currency ?? "-"}</td>
                                <td className="p-3">{listing.quantity ?? 1}</td>
                                <td className={`p-3 font-medium ${getStatusColor(listing.status)}`}>{listing.status || "Unknown"}</td>
                                <td className="p-3">{formattedDate(listing.updatedAt)}</td>
                                <td className="p-3">{formattedDate(listing.expiry)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListingTable;
