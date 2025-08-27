import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/Products/Sidebar';
import ProductGrid from '../../components/Products/ProductGrid';
import { getProducts } from '../../firebase/productService';
import toast from 'react-hot-toast';
import { Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    category: 'All',
    price: 5000,
  });
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
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
    };
    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Filtering
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }
    result = result.filter(p => (p.discountPrice || p.price) <= filters.price);

    // Sorting
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
        result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
    }

    return result;
  }, [allProducts, filters, sort]);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Our Products</h1>
        <p className="text-lg text-neutral/70 mt-2">Everything you need for a pristine clean</p>
      </div>

      <div className="lg:hidden mb-4">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-base-300 p-3 rounded-lg shadow-sm"
        >
          <Filter size={20} />
          <span className="font-semibold">Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity lg:hidden ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsFilterOpen(false)}></div>
        <div className={`fixed top-0 left-0 h-full w-72 bg-base-100 p-4 z-50 transform transition-transform lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}><X/></button>
          </div>
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>

        <div className="hidden lg:block">
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>

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
