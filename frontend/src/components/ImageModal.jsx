import React from 'react';
import { X, Download } from 'lucide-react';
import { downloadImage } from '../utils/downloadImage';

const ImageModal = ({ imageUrl, onClose }) => {
  const handleDownload = () => downloadImage(imageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative max-w-5xl max-h-[90vh] w-full">
        <div className="absolute top-4 right-4 flex space-x-2 z-50">
          <button 
            onClick={handleDownload} 
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <Download className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onClose} 
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <img 
          src={imageUrl} 
          alt="Full resolution" 
          className="max-w-full max-h-[90vh] w-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;