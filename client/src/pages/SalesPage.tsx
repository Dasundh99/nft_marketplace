import { Sidebar } from "../components/UserProfile/UserProfile";
import { DataTable } from "../components/Table/DataTable";
import goldImage1 from "../assets/activityAssets/goldImage1.png"


export const SalesPage = () => {
  
  const mockData = [
    { event: 'Sale', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0001</>, price: 'SOL 0.85', rarity: '#12,300', qty: 1, to: '#82,134', time: '12 min' },
    { event: 'Buy', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0342</>, price: 'SOL 1.25', rarity: '#5,876', qty: 2, to: '#44,223', time: '26 min' },
    { event: 'Sale', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0456</>, price: 'SOL 0.99', rarity: '#9,112', qty: 1, to: '#11,578', time: '7 min' },
    { event: 'Buy', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0222</>, price: 'SOL 2.00', rarity: '#3,004', qty: 3, to: '#65,349', time: '40 min' },
    { event: 'Sale', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0099</>, price: 'SOL 0.75', rarity: '#20,456', qty: 1, to: '#78,256', time: '18 min' },
    { event: 'Sale', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0781</>, price: 'SOL 1.85', rarity: '#2,789', qty: 2, to: '#33,042', time: '3 min' },
    { event: 'Buy', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0654</>, price: 'SOL 0.65', rarity: '#15,678', qty: 1, to: '#92,500', time: '55 min' },
    { event: 'Sale', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0213</>, price: 'SOL 1.10', rarity: '#7,321', qty: 1, to: '#44,999', time: '31 min' },
    { event: 'Buy', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0899</>, price: 'SOL 1.75', rarity: '#1,345', qty: 2, to: '#17,222', time: '21 min' },
    { event: 'Sale', item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0033</>, price: 'SOL 0.95', rarity: '#11,111', qty: 1, to: '#56,789', time: '10 min' },
  ];


    return (
    <Sidebar>
      <div className="p-6 overflow-auto flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <button className="bg-gray-700 px-3 py-1 text-xs rounded mr-2">Sales</button>
              <button className="bg-gray-700 px-3 py-1 text-xs rounded">Clear</button>
            </div>
          
          </div>

        

          <DataTable rows={mockData} />
        </div>

        
      </div>
    </Sidebar>
  );
};
