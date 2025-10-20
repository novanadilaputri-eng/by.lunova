"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Dress, Headscarf, Tally2, Footprints, ShoppingBag, Gem, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShortcutItem {
  icon: React.ElementType;
  label: string;
  to: string;
}

const shortcutItems: ShortcutItem[] = [
  { icon: Shirt, label: "Atasan", to: "/products?category=Atasan Wanita" },
  { icon: Dress, label: "Dress", to: "/products?category=Dress" },
  { icon: Headscarf, label: "Hijab", to: "/products?category=Hijab" },
  { icon: Tally2, label: "Celana", to: "/products?category=Celana" },
  { icon: Footprints, label: "Sepatu", to: "/products?category=Sepatu" },
  { icon: ShoppingBag, label: "Tas", to: "/products?category=Tas" },
  { icon: Gem, label: "Aksesoris", to: "/products?category=Aksesoris" },
  { icon: Sparkles, label: "Promo Harian", to: "/products?promo=true" },
];

const ShortcutMenu: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-md">
      {shortcutItems.map((item, index) => (
        <Link to={item.to} key={index} className="flex flex-col items-center text-center group">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-beige group-hover:bg-soft-pink/20 transition-colors duration-200">
            <item.icon className="h-6 w-6 text-soft-pink group-hover:text-rose-600" />
          </Button>
          <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ShortcutMenu;