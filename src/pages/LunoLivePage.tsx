import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { Camera, ShoppingCart, PlusCircle } from "lucide-react";
import { products as mockProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { showSuccess, showError } from "@/utils/toast";
import { Card, CardContent } from "@/components/ui/card";

const LunoLivePage: React.FC = () => {
  const { addToCart } = useCart();
  const [isLive, setIsLive] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState(mockProducts[0]); // Example featured product

  const handleStartLive = () => {
    setIsLive(true);
    showSuccess("Anda sekarang sedang live!");
    // In a real app, this would initiate camera access and streaming
  };

  const handleEndLive = () => {
    setIsLive(false);
    showSuccess("Live streaming berakhir.");
    // In a real app, this would stop streaming
  };

  const handleAddToCartFromLive = () => {
    if (featuredProduct) {
      // For simplicity, assume default size/color for live product
      addToCart(featuredProduct, featuredProduct.sizes[0], featuredProduct.colors[0], 1);
    } else {
      showError("Tidak ada produk yang ditampilkan.");
    }
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">LunoLive</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6 relative">
            {isLive ? (
              <div className="w-full h-full bg-black text-white flex items-center justify-center">
                <Camera className="h-16 w-16 animate-pulse text-soft-pink" />
                <span className="ml-4 text-2xl font-poppins">LIVE STREAMING...</span>
                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">LIVE</span>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-poppins">Mulai siaran langsung Anda!</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-6">
            {!isLive ? (
              <Button onClick={handleStartLive} className="py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <Camera className="h-5 w-5 mr-2" /> Mulai Live
              </Button>
            ) : (
              <Button onClick={handleEndLive} variant="destructive" className="py-3 text-lg font-poppins">
                Akhiri Live
              </Button>
            )}
          </div>

          {isLive && featuredProduct && (
            <div className="mt-8 border-t pt-6 border-beige dark:border-gray-700">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Produk Unggulan Live</h2>
              <Card className="flex items-center p-4 bg-beige dark:bg-gray-700 rounded-lg shadow-sm">
                <img src={featuredProduct.mainImageUrl} alt={featuredProduct.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-poppins font-semibold text-gray-800 dark:text-gray-200">{featuredProduct.name}</h3>
                  <p className="text-md font-playfair font-bold text-gold-rose">Rp{featuredProduct.price.toLocaleString("id-ID")}</p>
                </div>
                <Button onClick={handleAddToCartFromLive} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                  <ShoppingCart className="h-4 w-4 mr-2" /> Tambah ke Keranjang
                </Button>
              </Card>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                (Dalam aplikasi nyata, penjual dapat memilih produk untuk ditampilkan dan menambahkan ke keranjang secara real-time.)
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LunoLivePage;