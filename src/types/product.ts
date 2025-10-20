export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mainImageUrl: string; // Main image for the product
  colorImages: { color: string; imageUrl: string }[]; // Images for each color variant
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  storeName: string;
  storeReputation: string;
}