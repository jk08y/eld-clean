// src/pages/public/ProductsPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from '../../components/Products/Sidebar';
import ProductGrid from '../../components/Products/ProductGrid';
import SearchBar from '../../components/Layout/SearchBar';
import { getProducts } from '../../firebase/productService';
import toast from 'react-hot-toast';
import { Filter, X, Search } from 'lucide-react';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState({
    category: 'All',
    price: 5000,
  });
  const [sort, setSort] = useState('newest');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData = await getProducts();
      setAllProducts(productsData);
    } catch (error) {
      toast.error("Could not fetch products.");
      console.error("Firebase fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Search Filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // 2. Category and Price Filtering
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }
    result = result.filter(p => (p.discountPrice || p.price) <= filters.price);

    // 3. Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Assuming products have a `createdAt` field for sorting
        result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
    }

    return result;
  }, [allProducts, filters, sort, searchQuery]);

  return (
    <div>
      <div className="text-center mb-12 pt-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Shop All Products</h1>
        <p className="text-lg text-neutral/70 mt-2">Find the perfect cleaning solution for every need</p>
      </div>

      {/* Primary Search Bar for all devices (sits above grid) */}
      <div className="max-w-xl mx-auto mb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-base-300 p-4 rounded-xl shadow-md font-bold text-neutral hover:bg-base-200 transition-colors"
        >
          <Filter size={20} />
          <span>Filter & Sort</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile Filter Modal */}
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity lg:hidden ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsFilterOpen(false)}></div>
        <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-base-100 p-4 z-50 transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto shadow-2xl`}>
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h2 className="text-2xl font-bold text-neutral">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="text-neutral hover:text-primary"><X size={24}/></button>
          </div>
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid */}
        <ProductGrid 
          products={filteredAndSortedProducts} 
          loading={loading}
          sort={sort} 
          setSort={setSort} 
        />
      </div>
    </div>
  );
};

export default ProductsPage;
