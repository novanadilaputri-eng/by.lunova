import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import ShortcutMenu from "@/components/ShortcutMenu";
import RecommendationSection from "@/components/RecommendationSection";
import OOTDBoard from "@/components/OOTDBoard";
import SellerPromotionDisplay from "@/components/SellerPromotionDisplay";
import ProductCollage from "@/components/ProductCollage";
import { products as mockProducts } from '@/data/products';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  // Prioritize featured products for recommendations
  const featuredProducts = mockProducts.filter(p => p.isFeatured);
  const nonFeaturedProducts = mockProducts.filter(p => !p.isFeatured);
  const recommendedProducts = [...featuredProducts, ...nonFeaturedProducts].slice(0, 4);

  const handleWhatsAppClick = () => {
    const phoneNumber = '6285226426591'; // Format internasional tanpa tanda +
    const message = 'Halo admin By.Lunova, saya ingin bertanya tentang...';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-beige dark:bg-gray-900">
      <HomePageHeader />
      <div className="container mx-auto p-4 space-y-8 md:space-y-12">
        {/* Increased space-y for better separation */}
        <div className="relative text-center py-16 md:py-24 bg-gradient-to-br from-soft-pink to-gold-rose rounded-3xl shadow-2xl text-white overflow-hidden">
          {/* More rounded, stronger shadow, overflow hidden for decorative elements */}
          {/* Decorative elements inspired by SplashScreen */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white rounded-full transform rotate-45 -translate-x-1/2 -translate-y-1/2 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full transform -rotate-30 translate-x-1/2 translate-y-1/2 animate-slow-spin"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-playfair font-extrabold mb-4 leading-tight relative z-10 drop-shadow-lg">
            Selamat Datang di By.Lunova!
          </h1>
          <p className="text-xl md:text-3xl font-poppins mb-8 relative z-10">
            Find Your Glow in Every Style ✨
          </p>
          <Link to="/products">
            <Button className="px-8 py-4 text-lg md:text-xl bg-white text-soft-pink hover:bg-gray-100 font-poppins shadow-lg transition-all duration-300 hover:scale-105 relative z-10">
              Jelajahi Koleksi Kami
            </Button>
          </Link>
        </div>
        
        <SellerPromotionDisplay />
        <ProductCollage />
        <ShortcutMenu />
        <RecommendationSection title="Rekomendasi Fashion Hari Ini" products={recommendedProducts} />
        <OOTDBoard />
      </div>
      
      {/* Tombol WhatsApp di halaman beranda */}
      <div className="fixed bottom-24 right-4 z-50">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Hubungi Admin via WhatsApp"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;