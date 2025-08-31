import React, { useState, useEffect, useCallback } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const CategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name, description: category.description });
      setImagePreview(category.imageUrl || '');
      setImageFile(null);
    } else {
      setFormData({ name: '', description: '' });
      setImagePreview('');
      setImageFile(null);
    }
  }, [category]);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
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
    setIsSubmitting(true);
    try {
      await onSave(formData, imageFile);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save category.");
    }
    setIsSubmitting(false);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col relative transform transition-all duration-300">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-neutral">{category ? 'Edit Category' : 'Add New Category'}</h2>
          <button onClick={onClose} className="text-neutral/60 hover:text-primary"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral mb-1">Category Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral mb-1">Description</label>
            <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} required className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Category Image</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary'}`}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center text-neutral/60">
                <UploadCloud size={40} className="mb-2" />
                {isDragActive ? (<p>Drop the image here...</p>) : (<p>Drag 'n' drop an image here, or click to select</p>)}
                <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-neutral mb-2">Image Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
        </form>
        <div className="flex justify-end items-center p-4 border-t bg-base-100/50 rounded-b-lg">
          <button onClick={onClose} className="text-neutral font-semibold px-4 py-2 rounded-lg hover:bg-base-200 mr-2">Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors disabled:bg-primary/50">
            {isSubmitting ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;

