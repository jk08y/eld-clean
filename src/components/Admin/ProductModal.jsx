import React, { useState, useEffect } from 'react';
import { X, UploadCloud, Trash2 } from 'lucide-react';
import { addProduct, updateProduct } from '../../firebase/productService';
import toast from 'react-hot-toast';

const ProductModal = ({ isOpen, onClose, product, refreshProducts }) => {
  const [formData, setFormData] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData(product);
        setImagePreviews(product.imageUrls || []);
      } else {
        setFormData({ name: '', description: '', price: '', stock: '', category: 'Household', imageUrls: [] });
        setImagePreviews([]);
      }
      setImageFiles([]);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const isEditing = !!product;
  const maxImages = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = imagePreviews.length + files.length;

    if (totalImages > maxImages) {
      toast.error(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    
    setImageFiles(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...imageFiles];
    
    const removedPreview = newPreviews.splice(index, 1)[0];
    setImagePreviews(newPreviews);

    // Check if the removed preview was a new file or an existing URL
    if (removedPreview.startsWith('blob:')) {
      // It's a new file, find and remove it from the files array
      const fileIndex = imageFiles.findIndex(file => URL.createObjectURL(file) === removedPreview);
      if (fileIndex > -1) {
        newFiles.splice(fileIndex, 1);
        setImageFiles(newFiles);
      }
    } else {
      // It's an existing URL, update formData
      setFormData(prev => ({
        ...prev,
        imageUrls: prev.imageUrls.filter(url => url !== removedPreview)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (isEditing) {
        // This logic would need to be expanded in productService to handle deleting old images
        await updateProduct(product.id, dataToSave, imageFiles);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(dataToSave, imageFiles);
        toast.success('Product added successfully!');
      }
      refreshProducts();
      onClose();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start sm:items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-base-300 flex-shrink-0">
          <h2 className="text-xl font-bold text-neutral">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-neutral/60 hover:text-primary">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Text inputs remain the same */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral">Product Name</label>
            <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleInputChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral">Description</label>
            <textarea name="description" id="description" rows="4" value={formData.description || ''} onChange={handleInputChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-neutral">Price (Ksh)</label>
              <input type="number" name="price" id="price" value={formData.price || ''} onChange={handleInputChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-neutral">Stock Quantity</label>
              <input type="number" name="stock" id="stock" value={formData.stock || ''} onChange={handleInputChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral">Category</label>
            <select name="category" id="category" value={formData.category || 'Household'} onChange={handleInputChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Household</option>
              <option>Laundry</option>
              <option>Industrial</option>
              <option>Personal Care</option>
            </select>
          </div>

          {/* New Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Product Images (up to 3)</label>
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square border border-base-300 rounded-lg">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {imagePreviews.length < maxImages && (
                <label htmlFor="file-upload" className="relative aspect-square border-2 border-base-300 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  <UploadCloud className="h-8 w-8 text-neutral/40" />
                  <span className="mt-2 text-xs text-center text-neutral/60">Add Image</span>
                  <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="sr-only" />
                </label>
              )}
            </div>
          </div>
        </form>
        
        <div className="flex justify-end p-4 border-t border-base-300 bg-base-100/50 flex-shrink-0">
          <button onClick={onClose} className="bg-white text-neutral font-semibold py-2 px-4 rounded-full border border-base-300 mr-2 hover:bg-base-200 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-primary/90 transition-colors disabled:bg-primary/50">
            {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Product')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
