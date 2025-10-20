import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import HomePageHeader from "@/components/HomePageHeader";

const OrderConfirmationPage: React.FC = () => {
  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Pesanan Diterima!</h1>
          <p className="text-lg text-gray-700 font-poppins mb-6">
            Terima kasih telah berbelanja di By.Lunova. Pesanan Anda sedang diproses.
          </p>
          <p className="text-md text-gray-600 font-poppins mb-8">
            Anda akan menerima notifikasi status pengiriman segera.
          </p>
          <div className="flex flex-col space-y-4">
            <Button asChild className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <Link to="/profile">Lacak Pesanan Saya</Link>
            </Button>
            <Button asChild variant="outline" className="w-full py-3 text-lg border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins">
              <Link to="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;