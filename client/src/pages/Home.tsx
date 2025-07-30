import React from "react";
import Categories from "./Categories";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <div className="ml-20 flex-1 bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
        {/* Header and Categories */}
        <div>
          <Categories />
        </div>

        {/* Five horizontal sections */}
        <div className="flex flex-col">
          <div className="h-[500px] bg-gray-300 flex items-center justify-center">
            <p>Section 1</p>
          </div>
          <div className="h-[500px] bg-gray-400 flex items-center justify-center">
            <p>Section 2</p>
          </div>
          <div className="h-[500px] bg-gray-500 flex items-center justify-center">
            <p>Section 3</p>
          </div>
          <div className="h-[500px] bg-gray-700 flex items-center justify-center">
            <p>Section 4</p>
          </div>
          <div className="h-[500px] bg-gray-900 flex items-center justify-center">
            <p>Section 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
