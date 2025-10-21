import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, XCircle, Clock, Wallet } from "lucide-react";
import HomePageHeader from "@/components/HomePageHeader";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { mockOrders, updateOrderStatus as updateMockOrderStatus } from "@/data/orders"; // Import mockOrders and update function
import { Order, OrderStatus } from "@/types/order";
import { showSuccess, showError } from "@/utils/toast";

interface TrackingStepProps {
  icon: React.ElementType;
  label: string;
  date?: string;
  isActive: boolean;
  isCompleted: boolean;
}

const TrackingStep: React.FC<TrackingStepProps> = ({ icon: Icon, label, date, isActive, isCompleted }) => (
  <div className="flex items-start space-x-4">
    <div className={cn(
      "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
      isCompleted ? "bg-green-500 text-white" : isActive ? "bg-soft-pink text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
    )}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-grow">
      <p className={cn(
        "font-poppins font-medium dark:text-gray-200",
        isCompleted ? "text-gray-900" : isActive ? "text-soft-pink" : "text-gray-600 dark:text-gray-400"
      )}>
        {label}
      </p>
      {date && <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>}
    </div>
  </div>
);

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentOrderStatus, setCurrentOrderStatus] = useState<OrderStatus>("Pesanan Dibuat");

  useEffect(() => {
    const foundOrder = mockOrders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setCurrentOrderStatus(foundOrder.status);
    } else {
      showError("Pesanan tidak ditemukan.");
      navigate("/profile/orders"); // Redirect to order list if not found
    }
  }, [orderId, navigate]);

  if (!order) {
    return (
      <>
        <HomePageHeader />
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-playfair font-bold mb-4 dark:text-gray-100">Memuat Pesanan...</h1>
          <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Jika tidak dimuat, pesanan mungkin tidak ditemukan.</p>
        </div>
      </>
    );
  }

  const formatDateWithTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const trackingSteps = [
    { label: "Pesanan Dibuat", icon: CheckCircle, status: "Pesanan Dibuat" },
    { label: "Menunggu Pembayaran", icon: Clock, status: "Menunggu Pembayaran" },
    { label: "Pembayaran Dikonfirmasi", icon: Wallet, status: "Pembayaran Dikonfirmasi" },
    { label: "Pesanan Diproses", icon: Package, status: "Diproses" },
    { label: "Pesanan Dikemas", icon: Package, status: "Dikemas" },
    { label: "Menunggu Penjemputan Kurir", icon: Truck, status: "Menunggu Penjemputan Kurir" },
    { label: "Sedang Dalam Perjalanan", icon: Truck, status: "Sedang Dalam Perjalanan" },
    { label: "Telah Sampai di Tujuan", icon: CheckCircle, status: "Telah Sampai" },
    { label: "Pesanan Selesai", icon: CheckCircle, status: "Selesai" },
    { label: "Pesanan Dibatalkan", icon: XCircle, status: "Dibatalkan" },
  ];

  // Determine which steps are completed based on the current order status
  const currentStepIndex = trackingSteps.findIndex(step => step.status === currentOrderStatus);

  const handleConfirmDelivery = () => {
    updateMockOrderStatus(order.id, "Selesai");
    setOrder(prevOrder => prevOrder ? { ...prevOrder, status: "Selesai" } : null);
    setCurrentOrderStatus("Selesai");
    showSuccess("Pesanan berhasil dikonfirmasi diterima!");
  };

  // Simulate dates for tracking steps based on orderDate
  const getSimulatedStepDate = (baseDate: Date, stepStatus: OrderStatus) => {
    let date = new Date(baseDate);
    switch (stepStatus) {
      case "Pesanan Dibuat": return date;
      case "Menunggu Pembayaran": date.setMinutes(date.getMinutes() + 5); return date;
      case "Pembayaran Dikonfirmasi": date.setMinutes(date.getMinutes() + 30); return date;
      case "Diproses": date.setHours(date.getHours() + 1); return date;
      case "Dikemas": date.setHours(date.getHours() + 4); return date;
      case "Menunggu Penjemputan Kurir": date.setDate(date.getDate() + 1); return date;
      case "Sedang Dalam Perjalanan": date.setDate(date.getDate() + 1); date.setHours(date.getHours() + 2); return date;
      case "Telah Sampai": date.setDate(date.getDate() + 2); date.setHours(date.getHours() + 12); return date;
      case "Selesai": date.setDate(date.getDate() + 2); date.setHours(date.getHours() + 13); return date;
      case "Dibatalkan": date.setHours(date.getHours() + 1); return date;
      default: return date;
    }
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Lacak Pesanan #{order.id}</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Status Pesanan: <span className="text-soft-pink">{currentOrderStatus}</span></h2>
            {order.deliveryEstimate && (
              <span className="text-md font-poppins text-gray-600 dark:text-gray-400">Estimasi Tiba: {new Date(order.deliveryEstimate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            )}
          </div>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {order.items.map((item, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div>
                <p className="font-poppins font-semibold text-lg text-gray-800 dark:text-gray-200">{item.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Jumlah: {item.quantity}, Ukuran: {item.size}, Warna: {item.color}</p>
                <p className="text-md font-poppins font-medium text-gold-rose mt-1">
                  Rp{item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}

          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          <h3 className="text-xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Detail Pelacakan</h3>
          <div className="space-y-6">
            {trackingSteps.map((step, index) => {
              let stepDate: string | undefined;
              if (index <= currentStepIndex) {
                const baseOrderDate = new Date(order.orderDate);
                const simulatedDate = getSimulatedStepDate(baseOrderDate, step.status);
                stepDate = formatDateWithTime(simulatedDate.toISOString());
              }

              return (
                <React.Fragment key={index}>
                  <TrackingStep
                    icon={step.icon}
                    label={step.label}
                    date={stepDate}
                    isActive={index === currentStepIndex}
                    isCompleted={index < currentStepIndex}
                  />
                  {index < trackingSteps.length - 1 && (
                    <div className={cn("ml-4 h-8 w-0.5", index < currentStepIndex ? "bg-green-300" : "bg-gray-300 dark:bg-gray-600")}></div>
                  )}
                </React.Fragment>
            );})}
          </div>

          {currentOrderStatus === "Telah Sampai" && (
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <Button onClick={handleConfirmDelivery} className="flex-1 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                Konfirmasi Pesanan Diterima
              </Button>
              <Button asChild variant="outline" className="flex-1 py-3 text-lg border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                <Link to="/profile/return-request">Ajukan Pengembalian</Link>
              </Button>
            </div>
          )}
          {currentOrderStatus === "Selesai" && (
            <div className="mt-8 text-center">
              {/* Link to review the first product in the order */}
              <Button asChild className="py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <Link to={`/products/${order.items[0].productId}`}>Berikan Ulasan</Link>
              </Button>
            </div>
          )}
          {currentOrderStatus === "Menunggu Pembayaran" && (
            <div className="mt-8 text-center">
              <Button asChild className="py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <Link to="/checkout">Lanjutkan Pembayaran</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/profile/orders">Kembali ke Daftar Pesanan</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPage;