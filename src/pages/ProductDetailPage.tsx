import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, Store } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useCart } from "@/context/CartContext"; // New import
import ReviewSection from "@/components/ReviewSection"; // New import

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use cart context
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-lg text-gray-600">Maaf, produk yang Anda cari tidak tersedia.</p>
        <Button onClick={() => navigate("/products")} className="mt-4">
          Kembali ke Daftar Produk
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      showError("Mohon pilih ukuran dan warna produk.");
      return;
    }
    if (quantity <= 0) {
      showError("Jumlah produk harus lebih dari 0.");
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      showError("Mohon pilih ukuran dan warna produk.");
      return;
    }
    if (quantity <= 0) {
      showError("Jumlah produk harus lebih dari 0.");
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate("/cart"); // Navigate to cart page after adding
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button onClick={() => navigate("/products")} variant="outline" className="mb-6">
        &larr; Kembali ke Daftar Produk
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-sm"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.category}</p>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-lg text-gray-700 font-medium">
              {product.rating.toFixed(1)} ({product.reviewsCount} ulasan)
            </span>
          </div>

          <div className="flex items-center text-gray-700 mb-6">
            <Store className="h-5 w-5 mr-2" />
            <span className="text-lg font-medium">{product.storeName}</span>
            <span className="ml-2 text-sm text-gray-500">({product.storeReputation})</span>
          </div>

          <p className="text-5xl font-extrabold text-primary mb-6">
            Rp{product.price.toLocaleString("id-ID")}
          </p>

          <p className="text-gray-800 leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="size-select" className="text-base font-medium">Ukuran</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size-select" className="w-full mt-2">
                  <SelectValue placeholder="Pilih Ukuran" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color-select" className="text-base font-medium">Warna</Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-select" className="w-full mt-2">
                  <SelectValue placeholder="Pilih Warna" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8">
            <Label htmlFor="quantity-input" className="text-base font-medium">Jumlah</Label>
            <Input
              id="quantity-input"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-24 mt-2"
            />
            <span className="ml-4 text-sm text-gray-600">Stok Tersedia: {product.stock}</span>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleAddToCart} className="flex-1 py-3 text-lg bg-rose-500 hover:bg-rose-600 text-white">
              Tambahkan ke Keranjang
            </Button>
            <Button onClick={handleBuyNow} className="flex-1 py-3 text-lg" variant="outline">
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>

      <ReviewSection productId={product.id} />
    </div>
  );
};

export default ProductDetailPage;