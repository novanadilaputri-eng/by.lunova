"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomePageHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-beige/95 backdrop-blur supports-[backdrop-filter]:bg-beige/60 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-playfair font-bold text-soft-pink hover:text-rose-700 transition-colors dark:text-gold-rose dark:hover:text-amber-400">
          By.Lunova
        </Link>
        <div className="flex-1 mx-4 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Cari produk fashion..."
              className="pl-9 pr-3 py-2 rounded-full bg-white border-gray-200 focus-visible:ring-soft-pink dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus-visible:ring-gold-rose"
            />
          </div>
        </div>
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