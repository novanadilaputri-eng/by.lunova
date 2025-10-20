"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products as mockProducts } from '@/data/products'; // Using existing mock products

interface FlashSaleProduct extends Product {
  discountPercentage: number;
  originalPrice: number;
}

const getFlashSaleProducts = (): FlashSaleProduct[] => {
  // For demo, just take a few products and add discount info
  return mockProducts.slice(0, 3).map(p => ({
    ...p,
    originalPrice: p.price * 1.5, // Example: 50% off
    discountPercentage: 30 + Math.floor(Math.random() * 20), // Random discount 30-50%
    price: p.price * (1 - (30 + Math.floor(Math.random() * 20)) / 100),
  }));
};

const FlashSaleSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const flashSaleProducts = getFlashSaleProducts();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-soft-pink to-gold-rose rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-playfair">Flash Sale!</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Berakhir dalam</span>
          <div className="flex space-x-1 font-mono text-lg font-semibold">
            <span className="bg-white text-soft-pink px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-white text-soft-pink px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-white text-soft-pink px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {flashSaleProducts.map((product) => (
          <Card key={product.id} className="flex-shrink-0 w-40 bg-white text-gray-900 rounded-lg overflow-hidden shadow-sm">
            <Link to={`/products/${product.id}`}>
              <img src={product.mainImageUrl} alt={product.name} className="w-full h-28 object-cover" /> {/* Changed to mainImageUrl */}
              <CardContent className="p-2">
                <p className="text-xs font-medium truncate">{product.name}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="destructive" className="text-xs px-1 py-0.5 mr-1 bg-red-500">
                    -{product.discountPercentage}%
                  </Badge>
                  <span className="text-xs text-gray-500 line-through">
                    Rp{product.originalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-md font-bold text-soft-pink mt-1">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>
                {/* Stock bar placeholder */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-soft-pink h-1.5 rounded-full"
                    style={{ width: `${(product.stock / 100) * 100}%` }} // Assuming max stock 100 for visual
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-1 block">Sisa {product.stock}</span>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleSection;