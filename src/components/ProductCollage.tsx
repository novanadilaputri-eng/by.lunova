"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { mockCollageImages } from '@/data/collageImages';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductCollage: React.FC = () => {
  const { userRole } = useAuth();
  const currentSellerId = "seller1"; // For demo, assume this seller manages the collage

  const sellerCollageImages = mockCollageImages.filter(img => img.sellerId === currentSellerId);

  if (sellerCollageImages.length === 0 && userRole !== "seller") {
    return null; // Don't render if no images and not a seller
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-playfair font-bold text-gray-900 dark:text-gray-100">Inspirasi Gaya By.Lunova</h3>
        {userRole === "seller" && (
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/seller/collage-management">
              <PlusCircle className="h-4 w-4 mr-2" /> Kelola Kolase
            </Link>
          </Button>
        )}
      </div>
      {sellerCollageImages.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <p className="font-poppins">Belum ada foto di kolase. Penjual dapat menambahkannya.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sellerCollageImages.map((image) => (
            <div key={image.id} className="relative overflow-hidden rounded-lg group aspect-square">
              <img
                src={image.imageUrl}
                alt={image.altText}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-poppins text-center p-2">{image.altText}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCollage;