// Home.tsx
import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import SideNav from "../components/SideNav/SideNav";

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
