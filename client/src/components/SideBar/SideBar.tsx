import type { ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => (
  <div className="flex bg-black text-white min-h-screen">
    <aside className="w-64 bg-[#121212] p-4 flex flex-col justify-between">
      <div>
        <label htmlFor="search" className="sr-only">Search NFThrive</label>
        <input
          id="search"
          type="text"
          placeholder="Search NFThrive"
          className="w-full p-2 bg-gray-800 text-white rounded mb-4"
        />
        <div className="text-sm font-semibold mb-1">States</div>
        <div className="flex flex-wrap gap-2 text-xs mb-4">
          <button className="bg-gray-700 px-2 py-1 rounded">All</button>
          <button className="bg-gray-700 px-2 py-1 rounded">Buy</button>
          <button className="bg-gray-700 px-2 py-1 rounded">Top Rating</button>
          <button className="bg-gray-700 px-2 py-1 rounded">High</button>
          <button className="bg-gray-700 px-2 py-1 rounded">Minimum</button>
        </div>
        <div className="mb-4">
          <div className="text-sm font-semibold mb-2">Price (SOL)</div>
          <label htmlFor="minPrice" className="sr-only">Min Price</label>
          <input
            id="minPrice"
            placeholder="10"
            className="bg-gray-700 w-20 p-1 rounded mr-1 text-xs"
          />
          <label htmlFor="maxPrice" className="sr-only">Max Price</label>
          <input
            id="maxPrice"
            placeholder="Max"
            className="bg-gray-700 w-20 p-1 rounded text-xs"
          />
          <button className="block mt-2 bg-green-600 text-xs px-2 py-1 rounded">Apply</button>
        </div>
        <div className="text-sm font-semibold mb-2">Collection</div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center text-xs text-white mb-1">
            <input
              type="checkbox"
              id={`collection-${i}`}
              className="mr-2"
            />
            <label htmlFor={`collection-${i}`}>AurumCraft</label>
          </div>
        ))}
      </div>
      <div className="text-green-500 font-bold text-lg mt-4">NFThrive</div>
    </aside>
    <main className="flex-1">{children}</main>
  </div>
);
