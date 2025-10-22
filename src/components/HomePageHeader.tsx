"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, MessageSquare, Camera, Mic, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast"; // Import showSuccess for toast messages

const HomePageHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-focus search input when navigating to /products
  useEffect(() => {
    if (location.pathname === "/products" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.pathname]);

  // Update search query state if URL search param changes (e.g., from direct link)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentSearch = queryParams.get("search") || "";
    setSearchQuery(currentSearch);
  }, [location.search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products"); // Navigate to products page without a specific search term
    }
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

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-beige/95 backdrop-blur supports-[backdrop-filter]:bg-beige/60 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-playfair font-bold text-soft-pink hover:text-rose-700 transition-colors dark:text-gold-rose dark:hover:text-amber-400">
          By.Lunova
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex-1 mx-4 max-w-md flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Cari produk fashion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifikasi</span>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose">
            <Link to="/chat">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Pesan</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HomePageHeader;