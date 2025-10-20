export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  storeName: string;
  storeReputation: string;
}