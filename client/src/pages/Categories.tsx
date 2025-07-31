import React from "react";

const categories = ["Gold", "Petroleum", "Gem", "Jewellery", "Silver", "Platinum", "Copper", "Aluminium", "Iron", "Steel"];

const Categories: React.FC = () => {
  return (
    <section className="py-4 px-4 bg-black">
      <div className="flex flex-wrap justify-left gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 border border-white text-white hover:bg-blue-500 hover:text-black rounded-md transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
