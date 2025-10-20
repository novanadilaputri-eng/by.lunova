"use client";

import React from 'react';
import { Camera } from 'lucide-react';

const OOTDBoard: React.FC = () => {
  return (
    <div className="p-6 bg-beige rounded-lg shadow-md text-center flex flex-col items-center justify-center min-h-[200px]">
      <Camera className="h-12 w-12 text-gold-rose mb-4" />
      <h3 className="text-xl font-playfair font-bold text-gray-800 mb-2">Feed Inspirasi (OOTD Board)</h3>
      <p className="text-gray-600 text-sm">Lihat gaya fashion dari pembeli lain dan bagikan OOTD Anda!</p>
      <p className="text-xs text-gray-500 mt-2">(Fitur ini akan dikembangkan lebih lanjut)</p>
    </div>
  );
};

export default OOTDBoard;