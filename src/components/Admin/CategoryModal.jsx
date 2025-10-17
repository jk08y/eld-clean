// src/components/Admin/CategoryModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { addCategory, updateCategory } from '../../firebase/categoryService'; // Import actual service functions

const CategoryModal = ({ isOpen, onClose, category, refreshCategories }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!category;

  useEffect(() => {
    if (isOpen) {
        if (category) {
          setFormData({ name: category.name, description: category.description });
          // CRITICAL: Set imagePreview to the existing URL, but imageFile to null
          setImagePreview(category.imageUrl || '');
        } else {
          setFormData({ name: '', description: '' });
          setImagePreview('');
        }
        // Always reset the image file buffer
        setImageFile(null);
    }
  }, [category, isOpen]);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      // Create a local URL for instant preview
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const toastId = toast.loading(`${isEditing ? 'Updating' : 'Adding'} category...`);
    
    try {
      const dataToSave = { 
        name: formData.name, 
        description: formData.description 
      };

      if (isEditing) {
        // For editing, if a new imageFile is present, it's used. 
        // Otherwise, we pass the existing URL (imagePreview) which the service will skip uploading.
        const fileOrUrl = imageFile || imagePreview;
        await updateCategory(category.id, dataToSave, fileOrUrl);
        toast.success('Category updated successfully!', { id: toastId });

      } else {
        // For adding, only use the new imageFile
        await addCategory(dataToSave, imageFile);
        toast.success('Category added successfully!', { id: toastId });
      }

      // Re-fetch categories in the dashboard view
      if (refreshCategories) refreshCategories();
      onClose();

    } catch (error) {
      // The service throws an error on upload failure; catch generic errors here.
      toast.error(error.message || `Failed to ${isEditing ? 'update' : 'add'} category.`, { id: toastId });
      console.error(error);
    }
    setIsSubmitting(false);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col relative transform transition-all duration-300">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-neutral">{category ? 'Edit Category' : 'Add New Category'}</h2>
          <button onClick={onClose} className="text-neutral/60 hover:text-primary"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral mb-1">Category Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full border border-base-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral mb-1">Description</label>
            <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} required className="w-full border border-base-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Category Image</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary'}`}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center text-neutral/60">
                <UploadCloud size={40} className="mb-2" />
                {isDragActive ? (<p className="font-semibold">Drop the image here...</p>) : (<p>Drag 'n' drop an image here, or click to select</p>)}
                <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-neutral mb-2">Image Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg shadow-md border border-base-200" />
              </div>
            )}
          </div>
        </form>
        <div className="flex justify-end items-center p-4 border-t bg-base-100/50 rounded-b-xl">
          <button onClick={onClose} className="text-neutral font-semibold px-4 py-2 rounded-full hover:bg-base-200 mr-3 transition-colors">Cancel</button>
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting || !formData.name.trim() || !formData.description.trim()} className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Category')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
