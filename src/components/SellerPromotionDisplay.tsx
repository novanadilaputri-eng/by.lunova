"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { mockPromotions } from '@/data/promotions';
import { Card, CardContent } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const SellerPromotionDisplay: React.FC = () => {
  const activePromotions = mockPromotions.filter(promo => {
    const today = new Date().toISOString().split('T')[0];
    return promo.isActive && today >= promo.startDate && today <= promo.endDate;
  });

  if (activePromotions.length === 0) {
    return null; // Don't render if no active promotions
  }

  // For simplicity, display the first active promotion
  const displayPromotion = activePromotions[0];

  return (
    <Card className="p-4 bg-gradient-to-r from-gold-rose to-soft-pink rounded-lg shadow-md text-white">
      <CardContent className="p-0 flex items-center space-x-4">
        {displayPromotion.imageUrl && (
          <img
            src={displayPromotion.imageUrl}
            alt={displayPromotion.title}
            className="w-24 h-24 object-cover rounded-md flex-shrink-0 hidden sm:block"
          />
        )}
        <div className="flex-grow">
          <h3 className="text-xl font-playfair font-bold mb-1">{displayPromotion.title}</h3>
          <p className="text-sm font-poppins">{displayPromotion.message}</p>
          <p className="text-xs font-poppins mt-2 opacity-80">
            Berlaku hingga {new Date(displayPromotion.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <Link to="/profile/vouchers" className="flex-shrink-0">
          <Button variant="secondary" className="bg-white text-soft-pink hover:bg-gray-100 font-poppins">
            Lihat Detail
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SellerPromotionDisplay;