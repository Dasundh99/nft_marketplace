import React from "react";

const categories = ["Gold", "Petroleum", "Gem", "Jewellery", "Silver", "Platinum", "Copper", "Aluminium", "Iron", "Steel"];

const Categories: React.FC = () => {
  return (
    <section className="py-6 px-6 bg-gray-950">
      <div className="flex flex-wrap justify-left gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 border border-gray-200 text-gray-200 hover:bg-gray-500 hover:text-black rounded-lg transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
