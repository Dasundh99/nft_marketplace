import React from "react";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <section className="px-5 py-4 bg-black flex items-center justify-between border-b border-gray-700">
      <div className="bg-blackflex items-center w-1/3 border border-gray-500 rounded-md">
        <input
          type="text"
          placeholder="Search NFTs..."
          className="w-full px-4 py-2 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center">
        
          <Link
            to="/home"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <FaWallet className="w-5 h-5" />
          </Link>
        
      </div>
    </section>
  );
};

export default Header;