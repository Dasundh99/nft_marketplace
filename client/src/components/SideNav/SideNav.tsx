import React from "react";
import { Link } from "react-router-dom";
import { IoDocumentTextSharp, IoSettings, IoGridSharp, IoNotifications } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";


const SideNav: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-20 h-screen bg-black p-4 transition-colors duration-200 flex flex-col items-center">
      <div className="text-center p-2 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">NFT</h2>
      </div>
      <p className="text-center text-sm font-bold text-gray-600 dark:text-gray-400 mb-4">Menu</p>
      <ul className="space-y-6">
        {/* Home Icon */}
        <li>
          <Link
            to="/home"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <IoGridSharp className="w-5 h-5" />
          </Link>
        </li>

        {/* IoPieChartSharp Icon */}
        <li>
          <Link
            to="/activitypage"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <FiPieChart className="w-5 h-5" />
          </Link>
        </li>

        {/* File Icon */}
        <li>
          <Link
            to="/productdetails"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <IoDocumentTextSharp className="w-5 h-5" />
          </Link>
        </li>

        {/* people Icon */}
        <li>
          <Link
            to="/home"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <MdPeopleAlt className="w-5 h-5" />
          </Link>
        </li>

        {/* Bell Icon */}
        <li>
          <Link
            to="/notifications"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <IoNotifications className="w-5 h-5" />
          </Link>
        </li>

        {/* Settings Icon */}
        <li>
          <Link
            to="/settings"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <IoSettings className="w-5 h-5" />
          </Link>
        </li>

        {/* profile Icon */}
        <li>
          <Link
            to="/user"
            className="flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 items-center justify-center"
          >
            <MdPeopleAlt className="w-5 h-5" />
          </Link>
        </li>






      </ul>
    </div>
  );
};

export default SideNav;
