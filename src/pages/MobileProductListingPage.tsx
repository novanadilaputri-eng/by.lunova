import React, { useState, useEffect, useRef } from "react";
import MobileProductCard from "@/components/MobileProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import HomePageHeader from "@/components/HomePageHeader";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Camera, Mic, Image } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const MobileProductListingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  
  // Update searchTerm from URL query params and auto-focus
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentSearch = queryParams.get("search") || "";
    setSearchTerm(currentSearch);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with new search term
    const queryParams = new URLSearchParams(location.search);
    if (searchTerm.trim()) {
      queryParams.set("search", searchTerm.trim());
    } else {
      queryParams.delete("search");
    }
    navigate(`?${queryParams.toString()}`);
    searchInputRef.current?.blur();
  };

  const handleCameraClick = () => {
    showSuccess("Fitur kamera untuk pencarian akan segera hadir!");
  };

  const handleMicClick = () => {
    showSuccess("Fitur pencarian suara akan segera hadir!");
  };

  const handleImageClick = () => {
    showSuccess("Fitur pencarian gambar akan segera hadir!");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    // Default to popularity (higher rating, more reviews)
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }
    return b.reviewsCount - a.reviewsCount;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const suggestionKeywords = ["Dress pastel", "Hijab satin", "Tas kecil", "Atasan kasual"];

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-2">
        <h1 className="text-xl font-playfair font-bold text-center mb-4 text-gray-900">Cari Produk Fashion</h1>
        
        {/* Search bar and media input buttons */}
        <form onSubmit={handleSearchSubmit} className="flex mx-auto max-w-md flex items-center space-x-1 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Cari produk fashion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-2 py-1 rounded-full bg-white border-gray-200 focus-visible:ring-soft-pink text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus-visible:ring-gold-rose"
            />
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={handleCameraClick} className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose p-1">
            <Camera className="h-4 w-4" />
            <span className="sr-only">Cari dengan Kamera</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={handleMicClick} className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose p-1">
            <Mic className="h-4 w-4" />
            <span className="sr-only">Cari dengan Suara</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={handleImageClick} className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose p-1">
            <Image className="h-4 w-4" />
            <span className="sr-only">Cari dengan Gambar</span>
          </Button>
        </form>
        
        <div className="flex flex-col gap-2 mb-4 items-center justify-between">
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="text-xs text-gray-600 font-poppins">Saran:</span>
            {suggestionKeywords.map((keyword, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="rounded-full text-xs bg-beige border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white px-2 py-0.5 h-6"
                onClick={() => {
                  setSearchTerm(keyword);
                  const queryParams = new URLSearchParams(location.search);
                  queryParams.set("search", keyword);
                  navigate(`?${queryParams.toString()}`);
                }}
              >
                {keyword}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full">
              <Label htmlFor="category-filter" className="text-xs font-poppins">Kategori</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger id="category-filter" className="w-full mt-1 border-soft-pink focus:ring-soft-pink text-xs">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-xs">{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor="sort-by" className="text-xs font-poppins">Urutkan</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full mt-1 border-soft-pink focus:ring-soft-pink text-xs">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity" className="text-xs">Popularitas</SelectItem>
                  <SelectItem value="price-asc" className="text-xs">Harga: Rendah ke Tinggi</SelectItem>
                  <SelectItem value="price-desc" className="text-xs">Harga: Tinggi ke Rendah</SelectItem>
                  <SelectItem value="best-reviews" className="text-xs">Ulasan Terbaik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-sm font-poppins py-8">Tidak ada produk yang ditemukan.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredProducts.map((product) => (
              <MobileProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MobileProductListingPage;