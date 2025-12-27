import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { products as mockProducts, getSellerProducts, deleteProduct } from "@/data/products"; // Tambahkan deleteProduct ke import
import { mockOrders, updateOrderStatus } from "@/data/orders";
import { PlusCircle, Edit, Trash2, Package, Truck, CheckCircle, Clock, Megaphone, Bell, Banknote } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";
import { Order } from "@/types/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerOrderItem from "@/components/SellerOrderItem";
import { mockNotifications, markNotificationAsRead } from "@/data/notifications";
import SellerBankAccountManagement from "@/components/SellerBankAccountManagement";

const SellerDashboardPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState(mockProducts);
  const [currentOrders, setCurrentOrders] = useState(mockOrders);
  const [sellerNotifications, setSellerNotifications] = useState(mockNotifications.filter(n => n.userId === "seller1"));

  const currentSellerId = "seller1";

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses ke Dashboard Penjual.");
      navigate("/profile");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    setCurrentProducts([...mockProducts]);
    setCurrentOrders([...mockOrders]);
    setSellerNotifications([...mockNotifications.filter(n => n.userId === currentSellerId)]);
  }, [mockProducts, mockOrders, mockNotifications, currentSellerId]);

  const sellerProducts = getSellerProducts(currentSellerId);

  const pendingPaymentOrders = currentOrders.filter(order => order.status === "Menunggu Pembayaran");
  const processedOrders = currentOrders.filter(order => order.status === "Diproses");
  const packedOrders = currentOrders.filter(order => order.status === "Dikemas");
  const readyForShipmentOrders = currentOrders.filter(order => order.status === "Menunggu Penjemputan Kurir");
  const inTransitOrders = currentOrders.filter(order => order.status === "Sedang Dalam Perjalanan");
  const completedOrders = currentOrders.filter(order => order.status === "Selesai" || order.status === "Telah Sampai");

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk ID: ${productId}?`)) {
      deleteProduct(productId); // Gunakan fungsi deleteProduct yang diimpor
      setCurrentProducts([...mockProducts]);
      showSuccess(`Produk ID: ${productId} berhasil dihapus.`);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus);
    setCurrentOrders([...mockOrders]);
    showSuccess(`Status pesanan ${orderId} berhasil diperbarui menjadi ${newStatus}.`);
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    setSellerNotifications([...mockNotifications.filter(n => n.userId === currentSellerId)]);
  };

  if (userRole !== "seller") {
    return null;
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Dashboard Penjual</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-soft-pink" /> Notifikasi Anda
          </h2>
          {sellerNotifications.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 font-poppins">Tidak ada notifikasi baru.</p>
          ) : (
            <div className="space-y-3">
              {sellerNotifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`flex items-center p-3 rounded-lg ${notif.isRead ? "bg-gray-50 dark:bg-gray-700" : "bg-beige dark:bg-gray-600 border border-soft-pink"}`}
                >
                  <span className={`flex-grow text-gray-800 dark:text-gray-200 font-poppins ${notif.isRead ? "text-gray-600" : "font-semibold"}`}>
                    {notif.message}
                  </span>
                  {!notif.isRead && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMarkNotificationAsRead(notif.id)}
                      className="text-soft-pink hover:text-rose-600 dark:text-gold-rose dark:hover:text-amber-400"
                    >
                      Tandai Sudah Dibaca
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Produk Saya</h2>
          <Button asChild className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <Link to="/seller/products/new">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Produk Baru
            </Link>
          </Button>
        </div>
        
        {sellerProducts.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Package className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 font-poppins dark:text-gray-400 mb-6">Anda belum memiliki produk di toko.</p>
            <Button asChild className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <Link to="/seller/products/new">Tambah Produk Pertama Anda</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {sellerProducts.map((product) => (
              <Card key={product.id} className="w-full overflow-hidden rounded-lg shadow-lg border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
                <img src={product.mainImageUrl} alt={product.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 font-poppins dark:text-gray-200">{product.name}</h3>
                  <p className="text-sm text-gray-600 font-poppins dark:text-gray-400">Stok: {product.stock}</p>
                  <p className="text-md font-bold text-gold-rose mt-1 font-playfair">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                  {product.isFeatured && (
                    <span className="text-xs font-semibold text-soft-pink dark:text-gold-rose mt-1 block">Produk Unggulan</span>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between space-x-2">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
                  >
                    <Link to={`/seller/products/edit/${product.id}`}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 font-poppins" 
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Hapus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Manajemen Promosi</h2>
          <Button asChild className="w-full py-3 text-lg bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">
            <Link to="/seller/promotions">
              <Megaphone className="h-5 w-5 mr-2" /> Kelola Promosi Anda
            </Link>
          </Button>
        </div>

        <div className="mb-10">
          <SellerBankAccountManagement sellerId={currentSellerId} />
        </div>

        <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-6">Manajemen Pesanan</h2>
        <Tabs defaultValue="pending-payment" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-6 bg-beige dark:bg-gray-700">
            <TabsTrigger value="pending-payment" className="font-poppins data-[state=active]:bg-soft-pink data-[state=active]:text-white dark:data-[state=active]:bg-gold-rose">Belum Bayar ({pendingPaymentOrders.length})</TabsTrigger>
            <TabsTrigger value="processed" className="font-poppins data-[state=active]:bg-soft-pink data-[state=active]:text-white dark:data-[state=active]:bg-gold-rose">Diproses ({processedOrders.length})</TabsTrigger>
            <TabsTrigger value="packed" className="font-poppins data-[state=active]:bg-soft-pink data-[state=active]:text-white dark:data-[state=active]:bg-gold-rose">Dikemas ({packedOrders.length})</TabsTrigger>
            <TabsTrigger value="ready-for-shipment" className="font-poppins data-[state=active]:bg-soft-pink data-[state=active]:text-white dark:data-[state=active]:bg-gold-rose">Siap Kirim ({readyForShipmentOrders.length})</TabsTrigger>
            <TabsTrigger value="in-transit" className="font-poppins data-[state=active]:bg-soft-pink data-[state=active]:text-white dark:data-[state=active]:bg-gold-rose">Dalam Pengiriman ({inTransitOrders.length})</TabsTrigger>
            <TabsTrigger value="completed" className="font-poppins data-[state=active]:bg-soft-pink data-[state=active]:text-white dark:data-[state=active]:bg-gold-rose">Selesai ({completedOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending-payment" className="mt-4">
            {pendingPaymentOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 font-poppins">Tidak ada pesanan menunggu pembayaran.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingPaymentOrders.map(order => (
                  <SellerOrderItem key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="processed" className="mt-4">
            {processedOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 font-poppins">Tidak ada pesanan sedang diproses.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedOrders.map(order => (
                  <SellerOrderItem key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="packed" className="mt-4">
            {packedOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 font-poppins">Tidak ada pesanan sedang dikemas.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packedOrders.map(order => (
                  <SellerOrderItem key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="ready-for-shipment" className="mt-4">
            {readyForShipmentOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 font-poppins">Tidak ada pesanan siap kirim.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readyForShipmentOrders.map(order => (
                  <SellerOrderItem key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="in-transit" className="mt-4">
            {inTransitOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 font-poppins">Tidak ada pesanan dalam pengiriman.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inTransitOrders.map(order => (
                  <SellerOrderItem key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            {completedOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 font-poppins">Tidak ada pesanan selesai.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedOrders.map(order => (
                  <SellerOrderItem key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Statistik Toko</h2>
          <p className="text-gray-600 dark:text-gray-400 font-poppins">Grafik penjualan dan omzet akan ditampilkan di sini.</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">(Fitur ini akan dikembangkan lebih lanjut)</p>
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

export default SellerDashboardPage;