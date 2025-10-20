import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, Store, Truck, ShoppingCart } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useCart } from "@/context/CartContext";
import ReviewSection from "@/components/ReviewSection";
import ProductCard from "@/components/ProductCard";
import HomePageHeader from "@/components/HomePageHeader";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors[0]);
  const [displayImageUrl, setDisplayImageUrl] = useState<string | undefined>(product?.mainImageUrl);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      // Set initial display image based on selected color, or main image if no color selected
      const colorImage = product.colorImages.find(ci => ci.color === selectedColor);
      setDisplayImageUrl(colorImage?.imageUrl || product.mainImageUrl);
    }
  }, [product, selectedColor]);

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-playfair font-bold mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-lg text-gray-600 font-poppins">Maaf, produk yang Anda cari tidak tersedia.</p>
        <Button onClick={() => navigate("/products")} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white">
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
    navigate("/cart");
  };

  // Filter out the current product and take a few others for "Kamu mungkin juga suka"
  const similarProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <Button onClick={() => navigate("/products")} variant="outline" className="mb-6 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white">
          &larr; Kembali ke Daftar Produk
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <img
              src={displayImageUrl} // Use displayImageUrl
              alt={product.name}
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-sm"
            />
          </div>

          <div>
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 font-poppins mb-4">{product.category}</p>

            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-lg text-gray-700 font-poppins font-medium">
                {product.rating.toFixed(1)} ({product.reviewsCount} ulasan)
              </span>
            </div>

            <div className="flex items-center text-gray-700 mb-6">
              <Store className="h-5 w-5 mr-2 text-soft-pink" />
              <span className="text-lg font-poppins font-medium">{product.storeName}</span>
              <span className="ml-2 text-sm text-gray-500 font-poppins">({product.storeReputation})</span>
            </div>

            <p className="text-5xl font-playfair font-extrabold text-gold-rose mb-6">
              Rp{product.price.toLocaleString("id-ID")}
            </p>

            <p className="text-gray-800 font-poppins leading-relaxed mb-6">{product.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="size-select" className="text-base font-poppins font-medium">Ukuran</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size-select" className="w-full mt-2 border-soft-pink focus:ring-soft-pink">
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
                <Label htmlFor="color-select" className="text-base font-poppins font-medium">Warna</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="color-select" className="w-full mt-2 border-soft-pink focus:ring-soft-pink">
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
              <Label htmlFor="quantity-input" className="text-base font-poppins font-medium">Jumlah</Label>
              <Input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-24 mt-2 border-soft-pink focus:ring-soft-pink"
              />
              <span className="ml-4 text-sm text-gray-600 font-poppins">Stok Tersedia: {product.stock}</span>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <ShoppingCart className="h-5 w-5 mr-2" /> Tambahkan ke Keranjang
              </Button>
              <Button onClick={handleBuyNow} className="flex-1 py-3 text-lg border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins" variant="outline">
                Beli Sekarang
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-600 flex items-center justify-center">
              <Truck className="h-4 w-4 mr-1 text-green-600" /> Gratis Ongkir
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6">Kamu Mungkin Juga Suka</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <ReviewSection productId={product.id} />
      </div>
    </>
  );
};

export default ProductDetailPage;