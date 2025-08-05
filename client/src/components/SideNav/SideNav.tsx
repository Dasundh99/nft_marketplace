import React from "react";
import { Link } from "react-router-dom";
import {
  IoDocumentTextSharp,
  IoSettings,
  IoGridSharp,
  IoNotifications,
} from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";

interface SideNavProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const SideNav: React.FC<SideNavProps> = ({ isExpanded, setIsExpanded }) => {
  const menuItems = [
    { icon: <IoGridSharp className="w-5 h-5" />, label: "Home", path: "/home" },
    { icon: <FiPieChart className="w-5 h-5" />, label: "Activity", path: "/activitypage" },
    { icon: <IoDocumentTextSharp className="w-5 h-5" />, label: "Sales", path: "/sales" },
    { icon: <MdPeopleAlt className="w-5 h-5" />, label: "Products", path: "/productdetails" },
    { icon: <IoNotifications className="w-5 h-5" />, label: "Notifications", path: "/notifications" },
    { icon: <IoSettings className="w-5 h-5" />, label: "Settings", path: "/settings" },
    { icon: <BsPersonFill className="w-5 h-5" />, label: "Profile", path: "/user" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen bg-black p-4 transition-all duration-300 flex flex-col z-50 border-r border-gray-700 ${
          isExpanded ? "w-56" : "w-20"
        }`}
      >
        <div className="text-center p-2 mb-6">
          <h2 className="text-xl font-bold text-gray-100 ">
            {isExpanded ? "NFT Dashboard" : "NFT"}
          </h2>
        </div>

        <p className={`text-sm font-bold text-gray-400 mb-4 ${!isExpanded && "text-center"}`}>
          Menu
        </p>

        <ul className="space-y-4">
  {menuItems.map((item, index) => (
    <li key={index}>
      <Link
        to={item.path}
        className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-300 dark:text-gray-200 ${
          isExpanded ? "justify-start" : "justify-center"
        }`}
      >
        <div className="w-6 flex justify-center">{item.icon}</div>
        {isExpanded && <span className="ml-3 text-sm">{item.label}</span>}
      </Link>
    </li>
  ))}
</ul>

      </div>

      {/* Vertical notch toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        className={`
          fixed
          top-60
          left-${isExpanded ? "56" : "20"}
          -ml-2
          h-16
          w-4
          bg-gray-800
          rounded-lg
          flex
          items-center
          justify-center
          cursor-pointer
          z-50
          hover:bg-gray-700
          transition-colors
          duration-200
          `}
        style={{ 
          // To make sure the button sits exactly on the right edge of sidebar
          left: isExpanded ? 224 /* 56 * 4 px */ : 80 /* 20 * 4 px */, 
        }}
      >
        {/* Vertical notch icon: You can create a simple vertical line or use the chevron rotated */}
        <div
          className={`h-8 w-1 bg-gray-300 transition-transform duration-300 ${
            isExpanded ? "" : ""
          }`}
        />
      </button>
    </>
  );
};

export default SideNav;
