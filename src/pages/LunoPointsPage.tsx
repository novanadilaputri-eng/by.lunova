import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { Star } from "lucide-react"; // Using Star icon for points

const LunoPointsPage: React.FC = () => {
  const currentPoints = 1200; // Example value
  const pointsHistory = [
    { id: "p1", type: "Pembelian Produk #BYLNV-20231225-001", amount: 120, date: "2023-12-25" },
    { id: "p2", type: "Promo Spesial Akhir Tahun", amount: 50, date: "2023-12-20" },
    { id: "p3", type: "Penukaran Voucher Diskon", amount: -200, date: "2023-12-15" },
    { id: "p4", type: "Pembelian Produk #BYLNV-20231210-005", amount: 80, date: "2023-12-10" },
  ];

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">LunoPoints Saya</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-8 text-center">
          <Star className="h-16 w-16 text-gold-rose mx-auto mb-4 fill-gold-rose" />
          <p className="text-xl font-poppins text-gray-700 dark:text-gray-300 mb-2">Total LunoPoints Anda:</p>
          <p className="text-5xl font-playfair font-extrabold text-gold-rose mb-6">{currentPoints}</p>
          <Button className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            Tukar Poin Sekarang
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Riwayat LunoPoints</h2>
          {pointsHistory.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Belum ada riwayat LunoPoints.</p>
          ) : (
            <div className="space-y-4">
              {pointsHistory.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center border-b pb-3 last:border-b-0 border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="font-poppins font-medium text-gray-800 dark:text-gray-200">{entry.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</p>
                  </div>
                  <span className={`font-playfair font-bold text-lg ${entry.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {entry.amount > 0 ? "+" : ""} {entry.amount} Poin
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LunoPointsPage;