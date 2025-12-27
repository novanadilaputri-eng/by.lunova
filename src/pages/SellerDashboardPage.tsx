import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { products as mockProducts, updateProduct as updateMockProduct, addProduct as addMockProduct, deleteProduct as deleteMockProduct } from "@/data/products";
import { mockOrders, updateOrderStatus } from "@/data/orders";
import { PlusCircle, Edit, Trash2, Package, Truck, CheckCircle, Clock, Megaphone } from "lucide-react"; // Import Megaphone
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth"; // Import useAuth hook
import { Order } from "@/types/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components

interface SellerOrderItemProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: Order["status"]) => void;
}

const SellerOrderItem: React.FC<SellerOrderItemProps> = ({ order, onUpdateStatus }) => {
  const firstItem = order.items[0];
  const otherItemsCount = order.items.length - 1;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <Card className="w-full overflow-hidden rounded-lg shadow-lg border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-poppins font-semibold text-sm text-gray-800 dark:text-gray-200">
            Pesanan #{order.id}
          </span>
          <span className="text-xs text-gray-500 font-poppins dark:text-gray-400">
            {formatDate(order.orderDate)}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src={firstItem.imageUrl}
            alt={firstItem.name}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-grow">
            <h3 className="text-md font-poppins font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
              {firstItem.name}
            </h3>
            <p className="text-sm text-gray-600 font-poppins dark:text-gray-400">
              {firstItem.quantity}x {firstItem.size}, {firstItem.color}
            </p>
            {otherItemsCount > 0 && (
              <p className="text-sm text-gray-500 font-poppins dark:text-gray-400">+{otherItemsCount} produk lainnya</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-beige dark:border-gray-700">
          <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Total:</span>
          <span className="text-lg font-playfair font-bold text-gold-rose">
            Rp{order.totalAmount.toLocaleString("id-ID")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Status: <span className="font-semibold text-soft-pink">{order.status}</span></span>
        <div className="flex gap-2 w-full">
          {order.status === "Menunggu Pembayaran" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Diproses")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Konfirmasi Bayar
            </Button>
          )}
          {order.status === "Diproses" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Dikemas")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <Package className="h-4 w-4 mr-1" /> Kemas Pesanan
            </Button>
          )}
          {order.status === "Dikemas" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Menunggu Penjemputan Kurir")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <Truck className="h-4 w-4 mr-1" /> Siap Dikirim
            </Button>
          )}
          {order.status === "Menunggu Penjemputan Kurir" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Sedang Dalam Perjalanan")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <Truck className="h-4 w-4 mr-1" /> Dalam Pengiriman
            </Button>
          )}
          {(order.status === "Sedang Dalam Perjalanan" || order.status === "Telah Sampai") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Selesai")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Tandai Selesai
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="flex-1 text-gray-600 dark:text-gray-400 hover:text-soft-pink dark:hover:text-gold-rose">
            <Link to={`/profile/orders/${order.id}`}>Detail</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};


const SellerDashboardPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState(mockProducts);
  const [currentOrders, setCurrentOrders] = useState(mockOrders);

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses ke Dashboard Penjual.");
      navigate("/profile"); // Redirect if not a seller
    }
  }, [userRole, navigate]);

  // Filter products by seller (for demo, assume all mockProducts are from this seller)
  const sellerProducts = currentProducts.filter(p => p.storeName === "By.Lunova Official");

  // Filter orders by status for seller view
  const pendingPaymentOrders = currentOrders.filter(order => order.status === "Menunggu Pembayaran");
  const processedOrders = currentOrders.filter(order => order.status === "Diproses");
  const packedOrders = currentOrders.filter(order => order.status === "Dikemas");
  const readyForShipmentOrders = currentOrders.filter(order => order.status === "Menunggu Penjemputan Kurir");
  const inTransitOrders = currentOrders.filter(order => order.status === "Sedang Dalam Perjalanan");
  const completedOrders = currentOrders.filter(order => order.status === "Selesai" || order.status === "Telah Sampai");

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk ID: ${productId}?`)) {
      deleteMockProduct(productId); // Simulate deletion
      setCurrentProducts([...mockProducts]); // Update state to reflect changes
      showSuccess(`Produk ID: ${productId} berhasil dihapus.`);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus);
    setCurrentOrders([...mockOrders]); // Update state to reflect changes
    showSuccess(`Status pesanan ${orderId} berhasil diperbarui menjadi ${newStatus}.`);
  };

  if (userRole !== "seller") {
    return null; // Or a loading spinner, or a message
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Dashboard Penjual</h1>

        {/* Product Management */}
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
                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
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
                  <Button asChild variant="outline" className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
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

        {/* Promotion Management Link */}
        <div className="mb-10">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Manajemen Promosi</h2>
          <Button asChild className="w-full py-3 text-lg bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">
            <Link to="/seller/promotions">
              <Megaphone className="h-5 w-5 mr-2" /> Kelola Promosi Anda
            </Link>
          </Button>
        </div>

        {/* Order Management */}
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

        {/* Statistik Toko (Placeholder) */}
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