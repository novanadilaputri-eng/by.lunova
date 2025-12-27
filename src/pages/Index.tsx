import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import ProductCollage from "@/components/ProductCollage"; // Import new component
import ShortcutMenu from "@/components/ShortcutMenu";
import FlashSaleSection from "@/components/FlashSaleSection";
import RecommendationSection from "@/components/RecommendationSection";
import OOTDBoard from "@/components/OOTDBoard";
import SellerPromotionDisplay from "@/components/SellerPromotionDisplay";
import { products as mockProducts } from '@/data/products';

const Index = () => {
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

        <SellerPromotionDisplay />
        <ProductCollage /> {/* Replaced CarouselBanner with ProductCollage */}
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