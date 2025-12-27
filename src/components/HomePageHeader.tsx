"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, MessageSquare, Camera, Mic, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import { getUnreadNotificationsCount } from "@/data/notifications";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth"; // Import useAuth

const HomePageHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { userRole } = useAuth(); // Use useAuth hook

  // Determine the userId for notifications based on the current role
  const currentUserId = userRole === "seller" ? "seller1" : "user1"; // Example: "seller1" for seller, "user1" for buyer

  useEffect(() => {
    const updateCount = () => {
      setUnreadNotifications(getUnreadNotificationsCount(currentUserId));
    };
    updateCount();
    const interval = setInterval(updateCount, 5000);
    return () => clearInterval(interval);
  }, [currentUserId]); // Depend on currentUserId

  useEffect(() => {
    if (location.pathname === "/products" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.pathname]);

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
      navigate("/products");
    }
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
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-soft-pink dark:text-gray-400 dark:hover:text-gold-rose relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifikasi</span>
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {unreadNotifications}
              </Badge>
            )}
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