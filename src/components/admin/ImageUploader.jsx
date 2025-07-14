import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiImage, FiX, FiCheck } = FiIcons;

const ImageUploader = ({ onUpload, currentImage, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    
    try {
      // Simulate upload - in real app, upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        onUpload(imageUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!currentImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging 
              ? 'border-cyan-400 bg-cyan-400/10' 
              : 'border-white/20 hover:border-white/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-300">Uploading image...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <SafeIcon icon={FiImage} className="text-4xl text-gray-400 mx-auto" />
              <div>
                <p className="text-white mb-2">Drop an image here or</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-all"
                >
                  <SafeIcon icon={FiUpload} className="text-lg" />
                  <span>Choose File</span>
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Supports: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <img
            src={currentImage}
            alt="Uploaded preview"
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg transition-all"
            >
              <SafeIcon icon={FiUpload} className="text-sm" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-all"
            >
              <SafeIcon icon={FiX} className="text-sm" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;