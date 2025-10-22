"use client";

import React from "react";
import HomePageHeader from "@/components/HomePageHeader";
import Chatbot from "@/components/Chatbot"; // Import the Chatbot component
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const ChatPage: React.FC = () => {
  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-140px)] flex flex-col">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Pusat Chat</h1>

        <div className="flex-1 max-w-3xl mx-auto w-full h-[70vh]"> {/* Adjusted height for better chat experience */}
          <Chatbot />
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;