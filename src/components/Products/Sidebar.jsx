import React from 'react';

const categories = [
  'All', 'Household', 'Laundry', 'Industrial', 'Personal Care'
];

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-64 xl:w-72">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-base-300">
        {/* Category Filter */}
        <div>
          <h3 className="text-xl font-bold text-neutral mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button className="w-full text-left text-neutral/80 hover:text-primary transition-colors duration-200">
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-base-300" />

        {/* Price Range Filter */}
        <div>
          <h3 className="text-xl font-bold text-neutral mb-4">Price Range</h3>
          <div className="flex flex-col space-y-4">
            <input 
              type="range" 
              min="0" 
              max="5000" 
              defaultValue="2500"
              className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-sm text-neutral/80">
              <span>Ksh 0</span>
              <span>Ksh 5000</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
