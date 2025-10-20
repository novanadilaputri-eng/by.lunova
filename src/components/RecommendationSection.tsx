"use client";

import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { products as mockProducts } from '@/data/products'; // Using existing mock products

interface RecommendationSectionProps {
  title: string;
  products: Product[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ title, products }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold font-playfair text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;