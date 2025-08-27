import React, { useState, useEffect, useCallback } from 'react';
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import ProductModal from '../../components/Admin/ProductModal';
import { getProducts, deleteProduct } from '../../firebase/productService';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id, imageUrls) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id, imageUrls);
        toast.success("Product deleted successfully.");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product.");
        console.error(error);
      }
    }
  };
  
  const placeholderColors = [
    '0D9488/FFFFFF', '3B82F6/FFFFFF', '8B5CF6/FFFFFF', 
    'EC4899/FFFFFF', 'F59E0B/FFFFFF', '10B981/FFFFFF'
  ];

  const getPlaceholderUrl = (id, size = '80x80') => {
    const colorIndex = id ? id.charCodeAt(0) % placeholderColors.length : 0;
    return `https://placehold.co/${size}/${placeholderColors[colorIndex]}?text=P`;
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-neutral">Product Management</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-base-300">
        {products.length === 0 ? (
          <p className="p-8 text-center text-neutral/70">No products found. Add your first product!</p>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden">
              {products.map(product => (
                <div key={product.id} className="p-4 border-b border-base-200 last:border-b-0">
                  <div className="flex items-center">
                    <img src={(product.imageUrls && product.imageUrls[0]) || getPlaceholderUrl(product.id, '48x48')} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                    <div>
                      <p className="font-semibold text-neutral">{product.name}</p>
                      <p className="text-sm text-neutral/60">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <div>
                      <p className="text-neutral/60">Price</p>
                      <p className="font-medium">Ksh {product.price}</p>
                    </div>
                    <div>
                      <p className="text-neutral/60">Stock</p>
                      <p className={`font-medium ${product.stock > 0 ? '' : 'text-red-500'}`}>
                        {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                       <button onClick={() => handleOpenModal(product)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18}/></button>
                       <button onClick={() => handleDelete(product.id, product.imageUrls)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-base-300 bg-base-100/50">
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Stock</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-base-200 hover:bg-base-100/50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <img src={(product.imageUrls && product.imageUrls[0]) || getPlaceholderUrl(product.id, '40x40')} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-4" />
                          <p className="font-semibold text-neutral">{product.name}</p>
                        </div>
                      </td>
                      <td className="p-4 text-neutral/80">{product.category}</td>
                      <td className="p-4 text-neutral/80">Ksh {product.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                           <button onClick={() => handleOpenModal(product)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18}/></button>
                           <button onClick={() => handleDelete(product.id, product.imageUrls)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={editingProduct} 
        refreshProducts={fetchProducts}
      />
    </div>
  );
};

export default AdminProducts;
