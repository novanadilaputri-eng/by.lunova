import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MobileProductCardProps {
  product: Product;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.mainImageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardContent className="p-3">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-md font-semibold text-gray-800 hover:text-soft-pink transition-colors duration-200 font-poppins dark:text-gray-200 dark:hover:text-gold-rose line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mt-1 font-poppins dark:text-gray-400">{product.category}</p>
        <div className="flex items-center mt-2">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-xs text-gray-700 font-poppins dark:text-gray-300">
            {product.rating.toFixed(1)} ({product.reviewsCount} ulasan)
          </span>
        </div>
        <p className="text-lg font-bold text-gold-rose mt-2 font-playfair">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
        <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 text-xs">
          <Truck className="h-2 w-2 mr-1" /> Gratis Ongkir
        </Badge>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button asChild className="w-full bg-soft-pink hover:bg-rose-600 text-white font-poppins text-sm py-2">
          <Link to={`/products/${product.id}`}>Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MobileProductCard;