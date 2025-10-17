// src/components/Layout/SearchBar.jsx
import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search products..." }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-3 pl-12 pr-10 border border-base-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-neutral"
      />
      <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral/60" />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral/60 hover:text-red-500"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
