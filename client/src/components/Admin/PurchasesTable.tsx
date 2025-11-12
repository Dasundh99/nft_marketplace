import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface Purchase {
    id: string;
    image: string;
    name: string;
    seller: string;
    price: number;
    buyer: string;
    createdAt: string;
    mintAddress: string;
    tx: string;
}

const PurchasesTable: React.FC = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        //create a firestore query
        const q = query(collection(db, "purchases"), orderBy("createdAt","desc"));

        // set a real time listener on the nfts collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            })) as Purchase[];
            
            //update the react state with the fetched nft data
            setPurchases(data);
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
            return "Invalid Date";
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-xl font-semibold text-white mb-6 text-center">
                Purchases Dashoard
            </h1>
            {/**Mfts transaction table */}
            <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Created At</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Seller</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Mint Address</th>
                            <th className="p-3">Tx</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-10 text-gray-300 italic">
                                    No purchases found
                                </td>
                            </tr>
                        )}
                        {purchases.map((purchases) => (
                            <tr
                            key={purchases.id}
                            className="border-t border-gray-700 hover:bg-gray-700">
                                <td className="p-3 font-medium text-indigo-300">{purchases.name}</td>
                                <td className="p-3">{formattedDate(purchases.createdAt)}</td>
                                <td className="p-3 font-medium">
                                    <img src={purchases.image} alt={purchases.name} 
                                    className="w-14 h-14 rounded-lg object-cover border border-gray-800"/>
                                </td>
                                <td className="p-3 font-medium text-indigo-300">{purchases.seller}</td>
                                <td className="p-3 font-semibold">{purchases.price ?? "-"}</td>
                                <td className="p-3">{purchases.mintAddress ?? 1}</td>
                                <td className="p-3">
                                    {purchases.tx ? (
                                        <a
                                        href={`https://solscan.io/tx/${purchases.tx}?cluster=devnet`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                        >
                                        View Tx
                                        </a>
                                    ) : (
                                    "-"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PurchasesTable;
