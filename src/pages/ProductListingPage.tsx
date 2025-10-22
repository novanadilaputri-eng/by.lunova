import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input"; // Keep Input for local filters if needed, but main search is in header
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import HomePageHeader from "@/components/HomePageHeader";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom"; // Import useLocation

const ProductListingPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity"); // popularity, price-asc, price-desc

  // Update searchTerm from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearchTerm(queryParams.get("search") || "");
  }, [location.search]);

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

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 font-poppins">Saran:</span>
            {suggestionKeywords.map((keyword, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full text-xs bg-beige border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white"
                onClick={() => setSearchTerm(keyword)} // This will update local state, but main search is via header
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