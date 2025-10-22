import React, { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import HomePageHeader from "@/components/HomePageHeader";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Search, Camera, Mic, Image } from "lucide-react"; // Import icons
import { showSuccess } from "@/utils/toast"; // Import showSuccess for toast messages

const ProductListingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for auto-focus

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity"); // popularity, price-asc, price-desc

  // Update searchTerm from URL query params and auto-focus
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentSearch = queryParams.get("search") || "";
    setSearchTerm(currentSearch);
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Auto-focus when page loads or search term changes
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
    searchInputRef.current?.blur(); // Remove focus after search
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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-playfair font-bold text-center mb-8 text-gray-900">Cari Produk Fashion</h1>

        {/* Search bar and media input buttons */}
        <form onSubmit={handleSearchSubmit} className="flex mx-auto max-w-md flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Cari produk fashion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-full bg-white border-gray-200 focus-visible:ring-soft-pink dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus-visible:ring-gold-rose"
            />
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={handleCameraClick} className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose">
            <Camera className="h-5 w-5" />
            <span className="sr-only">Cari dengan Kamera</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={handleMicClick} className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose">
            <Mic className="h-5 w-5" />
            <span className="sr-only">Cari dengan Suara</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={handleImageClick} className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose">
            <Image className="h-5 w-5" />
            <span className="sr-only">Cari dengan Gambar</span>
          </Button>
        </form>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 font-poppins">Saran:</span>
            {suggestionKeywords.map((keyword, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full text-xs bg-beige border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white"
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

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="w-full md:w-auto">
              <Label htmlFor="category-filter" className="font-poppins">Kategori</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger id="category-filter" className="w-full md:w-[180px] mt-1 border-soft-pink focus:ring-soft-pink">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-auto">
              <Label htmlFor="sort-by" className="font-poppins">Urutkan Berdasarkan</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full md:w-[180px] mt-1 border-soft-pink focus:ring-soft-pink">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularitas</SelectItem>
                  <SelectItem value="price-asc">Harga: Terendah ke Tertinggi</SelectItem>
                  <SelectItem value="price-desc">Harga: Tertinggi ke Terendah</SelectItem>
                  <SelectItem value="best-reviews">Ulasan Terbaik</SelectItem>
                  <SelectItem value="fastest-delivery">Pengiriman Tercepat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-poppins">Tidak ada produk yang ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListingPage;