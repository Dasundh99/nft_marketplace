import React from "react";
import Header from "./Header";
import Categories from "./Categories";

const SideNav: React.FC = () => {
  return (
    <div className="w-20 h-screen bg-gray-100 dark:bg-gray-800 p-4 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">NFT</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
            
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            
          </a>
        </li>
      </ul>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <div className="flex">
        <SideNav />
        <div className="flex-1 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="p-4">
            <Header />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;