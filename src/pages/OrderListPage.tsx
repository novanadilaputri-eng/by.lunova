import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/data/orders";
import { Order, OrderStatus } from "@/types/order";
import OrderCard from "@/components/OrderCard";
import { Package } from "lucide-react";

const OrderListPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const statusFilter = queryParams.get("status");

  const getStatusTitle = (status: string | null) => {
    switch (status) {
      case "pending-payment":
        return "Pesanan Belum Dibayar";
      case "shipped":
        return "Pesanan Dikirim";
      case "completed":
        return "Pesanan Selesai";
      case "cancelled":
        return "Pesanan Dibatalkan";
      default:
        return "Semua Pesanan";
    }
  };

  const filteredOrders = useMemo(() => {
    // For demo, assuming a single user. In real app, filter by current user ID.
    const userOrders = mockOrders;
    
    // Filter by userId if implemented
    if (!statusFilter) {
      return userOrders; // Show all orders
    }

    return userOrders.filter(order => {
      switch (statusFilter) {
        case "pending-payment":
          return order.status === "Menunggu Pembayaran";
        case "shipped":
          return order.status === "Sedang Dalam Perjalanan" || 
                 order.status === "Menunggu Penjemputan Kurir" || 
                 order.status === "Dikemas";
        case "completed":
          return order.status === "Selesai" || 
                 order.status === "Telah Sampai";
        case "cancelled":
          return order.status === "Dibatalkan";
        default:
          return true;
      }
    });
  }, [statusFilter, mockOrders]); // Add mockOrders to dependency array

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">
          {getStatusTitle(statusFilter)}
        </h1>
        
        {filteredOrders.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <Package className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 font-poppins mb-6">Tidak ada pesanan dengan status ini.</p>
            <Button asChild className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <Link to="/products">Mulai Belanja</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button 
            asChild 
            variant="outline" 
            className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
          >
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderListPage;