"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Bell, MessageSquare } from "lucide-react"; // Hapus Search, Camera, Mic, Image
import { Button } from "@/components/ui/button";
// Hapus import Input dan showSuccess karena tidak lagi digunakan di sini

const HomePageHeader: React.FC = () => {
  // Hapus state dan useEffect terkait pencarian

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-beige/95 backdrop-blur supports-[backdrop-filter]:bg-beige/60 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-playfair font-bold text-soft-pink hover:text-rose-700 transition-colors dark:text-gold-rose dark:hover:text-amber-400">
          By.Lunova
        </Link>
        {/* Bilah pencarian dan tombol input media dipindahkan ke ProductListingPage */}
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