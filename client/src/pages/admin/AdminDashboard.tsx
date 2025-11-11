import { useState } from "react"
import ListingTable from "../../components/Admin/ListingsTable"
import NftTable from "../../components/Admin/NftTable"

const AdminDashboard: React. FC = () => {
    const [selectedTab, setSelectedTab] = useState("nfts");

    const tabs = [
        {key: "nfts", label: "NFTs"},
        {key: "listings", label: "Listings"}
    ];

    const renderContent = () => {
        switch (selectedTab){
            case "nfts":
                return <NftTable/>;
             case "listings":
                return <ListingTable/>;
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                Admin Dashboard
            </h1>

            {/**tabs selection */}
            <div className="flex justify-left ml-10 mb-8 space-x-3 border-b border-gray-900 pb-2">
                {tabs.map((tab) => (
                    <button key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`px-40 py-2 rounded-t-lg font-medium transition-colors ${
                        selectedTab === tab.key
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}>
                        {tab.label}
                    </button>
                ))}
            
            </div>
            {/**content selection */}
            <div className="mt-4">
                {renderContent()}
            </div>
        </div>
    )
}
export default AdminDashboard;