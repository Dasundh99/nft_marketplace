import React from "react";

const Header: React.FC = () => {
  return (
    <section className="pl-25 px-6 py-4 bg-gradient-to-b from-black-700 to-black-900 flex items-center justify-between">
      <div className="flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search NFTs..."
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center">
        <svg
          className="w-8 h-8 text-white hover:text-indigo-300 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 18.879A3 3 0 018 16h8a3 3 0 012.879 2.879M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Header;