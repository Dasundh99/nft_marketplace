import React from "react";

const categories = ["Art", "Music", "Gaming", "Virtual Worlds", "Collectibles"];

const Categories: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-gray-950">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-6 py-2 border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white rounded-full transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
