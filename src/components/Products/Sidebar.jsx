// src/components/Products/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { getCategories } from '../../firebase/categoryService';

const Sidebar = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(filters.price);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories([{ id: 'all', name: 'All' }, ...cats]);
    };
    fetchCategories();
  }, []);
  
  useEffect(() => {
    setPrice(filters.price);
  }, [filters.price]);

  const handleCategoryChange = (categoryName) => {
    setFilters(prev => ({ ...prev, category: categoryName }));
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };
  
  const handlePriceRelease = () => {
    setFilters(prev => ({ ...prev, price: price }));
  };

  return (
    <aside className="w-full lg:w-64 xl:w-72 lg:flex-shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-base-200 h-full sticky lg:top-8">
        <div>
          <h3 className="text-2xl font-bold text-neutral mb-5">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <button 
                  onClick={() => handleCategoryChange(category.name)}
                  className={`w-full text-left transition-colors duration-200 p-2 rounded-lg ${
                    filters.category === category.name 
                    ? 'font-bold text-primary bg-primary/10 shadow-sm' 
                    : 'text-neutral/80 hover:bg-base-200'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-8 border-base-300" />

        <div>
          <h3 className="text-2xl font-bold text-neutral mb-5">Price Range</h3>
          <div className="flex flex-col space-y-4">
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={price}
              onChange={handlePriceChange}
              onMouseUp={handlePriceRelease}
              onTouchEnd={handlePriceRelease}
              className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
              style={{
                '--range-progress': `${(price / 5000) * 100}%`
              }}
            />
            <div className="flex justify-between text-base text-neutral/80">
              <span>Ksh 0</span>
              <span className="font-extrabold text-primary text-xl">Ksh {price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
