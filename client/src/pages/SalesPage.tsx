import { Sidebar } from "../components/UserProfile/UserProfile";
import { DataTable } from "../components/Table/DataTable";
import goldImage1 from "../assets/activityAssets/goldImage1.png";

export const SalesPage = () => {
  const mockData = [
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0001</>, price: "SOL 0.85", rarity: "#12,300", qty: 1, to: "#82,134", time: "12 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0342</>, price: "SOL 1.25", rarity: "#5,876", qty: 2, to: "#44,223", time: "26 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0456</>, price: "SOL 0.99", rarity: "#9,112", qty: 1, to: "#11,578", time: "7 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0222</>, price: "SOL 2.00", rarity: "#3,004", qty: 3, to: "#65,349", time: "40 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0099</>, price: "SOL 0.75", rarity: "#20,456", qty: 1, to: "#78,256", time: "18 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0781</>, price: "SOL 1.85", rarity: "#2,789", qty: 2, to: "#33,042", time: "3 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0654</>, price: "SOL 0.65", rarity: "#15,678", qty: 1, to: "#92,500", time: "55 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0213</>, price: "SOL 1.10", rarity: "#7,321", qty: 1, to: "#44,999", time: "31 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0899</>, price: "SOL 1.75", rarity: "#1,345", qty: 2, to: "#17,222", time: "21 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0033</>, price: "SOL 0.95", rarity: "#11,111", qty: 1, to: "#56,789", time: "10 min" },
  ];

  return (
    <Sidebar>
      <div className="p-6 min-h-screen bg-[#0a0a0a] text-gray-200 overflow-auto">
        
        {/* Header + Filters */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold tracking-wide text-emerald-500">
            Sales Activity
          </h2>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-black border border-emerald-500/40 hover:border-emerald-500 rounded-lg text-sm transition-all">
              Sales
            </button>

            <button className="px-4 py-2 bg-black border border-gray-700 hover:border-gray-500 rounded-lg text-sm transition-all">
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-lg">
          <DataTable rows={mockData} />
        </div>

      </div>
    </Sidebar>
  );
};
