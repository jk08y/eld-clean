import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import CategoryModal from '../../components/Admin/CategoryModal';
import ConfirmationModal from '../../components/Layout/ConfirmationModal';
import { getCategories, deleteCategory } from '../../firebase/categoryService';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to fetch categories.');
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSave = () => {
    handleCloseModal();
    fetchCategories();
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id, selectedCategory.imageUrl);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category.');
      console.error(error);
    }
    setIsConfirmOpen(false);
    setSelectedCategory(null);
  };

  if (loading) {
    return (
        <div className="p-4">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2 mt-4">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral">Manage Categories</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral">
            <thead className="text-xs text-neutral/70 uppercase bg-base-200">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="bg-white border-b hover:bg-base-100">
                  <td className="px-6 py-4">
                    {category.imageUrl ? (
                      <img 
                        src={category.imageUrl} 
                        alt={category.name} 
                        className="w-12 h-12 rounded-md object-cover bg-gray-200" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                        <ImageIcon size={24} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOpenModal(category)} className="p-2 text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(category)} className="p-2 text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-neutral/70">No categories found. Click "Add Category" to get started.</p>
            </div>
          )}
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
        onSave={handleSave}
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete the "${selectedCategory?.name}" category? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminCategories;

