import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, Store, Truck, ShoppingCart, MessageSquare } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useCart } from "@/context/CartContext";
import HomePageHeader from "@/components/HomePageHeader";

const MobileProductDetailPage: React.FC = () => {
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
        <h1 className="text-xl font-playfair font-bold mb-4 dark:text-gray-100">Produk Tidak Ditemukan</h1>
        <p className="text-sm text-gray-600 font-poppins dark:text-gray-400">Maaf, produk yang Anda cari tidak tersedia.</p>
        <Button 
          onClick={() => navigate("/products")} 
          className="mt-4 bg-soft-pink hover:bg-rose-600 text-white text-sm"
        >
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

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-2">
        <Button 
          onClick={() => navigate("/products")} 
          variant="outline" 
          className="mb-2 text-xs border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
        >
          &larr; Kembali
        </Button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center items-center bg-gray-100 h-64">
            <img 
              src={displayImageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="p-3">
            <h1 className="text-lg font-playfair font-bold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h1>
            <p className="text-sm text-gray-600 font-poppins dark:text-gray-400 mb-2">{product.category}</p>
            
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm text-gray-700 font-poppins font-medium dark:text-gray-300">
                {product.rating.toFixed(1)} ({product.reviewsCount} ulasan)
              </span>
            </div>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3">
              <Store className="h-4 w-4 mr-1 text-soft-pink dark:text-gold-rose" />
              <span className="text-sm font-poppins font-medium">{product.storeName}</span>
              <span className="ml-1 text-xs text-gray-500 font-poppins dark:text-gray-400">({product.storeReputation})</span>
            </div>
            
            <p className="text-2xl font-playfair font-extrabold text-gold-rose mb-3">
              Rp{product.price.toLocaleString("id-ID")}
            </p>
            
            <p className="text-gray-800 font-poppins text-sm leading-relaxed mb-4 dark:text-gray-200">{product.description}</p>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              <div>
                <Label htmlFor="size-select" className="text-xs font-poppins font-medium text-gray-800 dark:text-gray-200">Ukuran</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size-select" className="w-full mt-1 border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose text-sm">
                    <SelectValue placeholder="Pilih Ukuran" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gold-rose">
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size} className="text-sm">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="color-select" className="text-xs font-poppins font-medium text-gray-800 dark:text-gray-200">Warna</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="color-select" className="w-full mt-1 border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose text-sm">
                    <SelectValue placeholder="Pilih Warna" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gold-rose">
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color} className="text-sm">
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="quantity-input" className="text-xs font-poppins font-medium text-gray-800 dark:text-gray-200">Jumlah</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id="quantity-input" 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} 
                  className="w-20 border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose text-sm"
                />
                <span className="ml-2 text-xs text-gray-600 font-poppins dark:text-gray-400">Stok Tersedia: {product.stock}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 py-2 text-sm bg-soft-pink hover:bg-rose-600 text-white font-poppins"
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Keranjang
              </Button>
              <Button 
                onClick={handleBuyNow} 
                className="flex-1 py-2 text-sm border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
                variant="outline"
              >
                Beli Sekarang
              </Button>
            </div>
            
            <div className="mt-3">
              <Button 
                asChild 
                variant="outline" 
                className="w-full py-2 text-sm border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink dark:hover:text-white"
              >
                <Link to="/chat">
                  <MessageSquare className="h-4 w-4 mr-1" /> Chat dengan Penjual
                </Link>
              </Button>
            </div>
            
            <div className="mt-3 text-xs text-gray-600 flex items-center justify-center dark:text-gray-400">
              <Truck className="h-3 w-3 mr-1 text-green-600" /> Gratis Ongkir
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileProductDetailPage;