import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import CarouselBanner from "@/components/CarouselBanner";
import ShortcutMenu from "@/components/ShortcutMenu";
import FlashSaleSection from "@/components/FlashSaleSection";
import RecommendationSection from "@/components/RecommendationSection";
import OOTDBoard from "@/components/OOTDBoard";
import SellerPromotionDisplay from "@/components/SellerPromotionDisplay"; // Import new component
import { products as mockProducts } from '@/data/products';

const Index = () => {
  const bannerImages = [
    "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1607082348824-0a968821957e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  // Prioritize featured products for recommendations
  const featuredProducts = mockProducts.filter(p => p.isFeatured);
  const nonFeaturedProducts = mockProducts.filter(p => !p.isFeatured);
  const recommendedProducts = [...featuredProducts, ...nonFeaturedProducts].slice(0, 4);


  return (
    <div className="min-h-screen bg-beige">
      <HomePageHeader />
      <div className="container mx-auto p-4 space-y-6">
        <div className="text-center py-8 bg-gradient-to-br from-soft-pink to-gold-rose rounded-lg shadow-xl text-white">
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold mb-2 leading-tight">
            Selamat Datang di By.Lunova!
          </h1>
          <p className="text-lg md:text-xl font-poppins mb-6">
            Find Your Glow in Every Style ✨
          </p>
          {/* Removed the 'Mulai Belanja Sekarang' button */}
        </div>

        <SellerPromotionDisplay /> {/* Display seller promotions */}
        <CarouselBanner images={bannerImages} />
        <ShortcutMenu />
        <FlashSaleSection />
        <RecommendationSection title="Rekomendasi Fashion Hari Ini" products={recommendedProducts} />
        <OOTDBoard />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;