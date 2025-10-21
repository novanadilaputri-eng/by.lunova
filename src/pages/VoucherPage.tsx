import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { Gift } from "lucide-react";

const VoucherPage: React.FC = () => {
  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <Gift className="h-20 w-20 text-gold-rose mx-auto mb-6" />
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Voucher Saya</h1>
          <p className="text-lg text-gray-700 font-poppins mb-6">
            Anda belum memiliki voucher aktif saat ini.
          </p>
          <Button asChild className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <Link to="/">Lihat Promo Terbaru</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default VoucherPage;